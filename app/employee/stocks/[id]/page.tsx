"use client"
import TitleTestLoading from "@/components/titleComponent/TitleTestLoading"
import { Iitem } from "@/types/item"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const {data:session} = useSession()
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [oldData, setOldData] = useState<Iitem | null>(null)
  
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch(`/api/stockItem/${id}`)
        const json = await res.json()
        if (!res.ok) throw new Error(json.error)
        const data: Iitem = json.data
        setOldData(data)
      } catch (err: any) { setError(err.message) }
      finally { setLoading(false) }
    }
    fetchStock()
  }, [])

  if (loading) return <TitleTestLoading />
  if (!oldData) return <TitleTestLoading />

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    try {
      const employeeId = session?.user.id
      const formData = new FormData(e.currentTarget)
      const newQuantity = formData.get("newQuantity")
      console.log(employeeId)
      const body = { newQuantity, employeeId}

      const res = await fetch(`/api/stockItem/${id}/restock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setSaving(false)
      alert(json.message)
      router.push("./")
    } catch (err: any) {
      console.log(err)
      setError(err.message)
    }
  }

  return (
    <div className="bg-white mt-16 w-5xl border border-teal-200 rounded-lg p-6 shadow-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-teal-700 border-b border-teal-100 pb-2">Stock item details</h1>
        <p><span className="font-bold text-teal-700">employeeName : </span>{}</p>
        <p className={`${oldData.status === "LOW"
          ? "text-yellow-600"
          : oldData.status === "OK"
            ? "text-teal-600"
            : "text-red-600"
          }`}><span className="font-bold text-teal-700">สถานะ </span>{oldData.status} </p>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-between gap-6 mt-4">
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-bold text-teal-700">จำนวนที่ต้องการเพิ่ม</p>
          <input
            type="text"
            name="newQuantity"
            required
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none read-only:bg-gray-50"
          />
          <p className="font-bold text-teal-700">จำนวนคงเหลือ</p>
          <input
            type="text" defaultValue={oldData.currentQuantity}
            name="maxQuantity"
            readOnly
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none read-only:bg-gray-50 text-gray-700"
          />
          <p className="font-bold text-teal-700">จำนวนสูงสุด</p>
          <input
            type="text" defaultValue={oldData.maxQuantity}
            name="maxQuantity"
            readOnly
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none read-only:bg-gray-50 text-gray-700"
          />
        </div>

        <div className="flex flex-col gap-4 w-1/5 items-end">

          <button type="submit" className="bg-teal-600 text-white w-full px-4 py-2 rounded-md hover:bg-teal-700 transition-colors font-medium disabled:bg-teal-300">
            {saving ? <p>saving...</p> : <p>save</p>}
          </button>
        </div>
      </form>

      {error && <p className="m-4 w-fit bg-red-500 py-1 px-4 text-white text-md rounded-2xl">{error}</p>}
    </div>
  )
}
