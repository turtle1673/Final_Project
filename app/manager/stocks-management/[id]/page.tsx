"use client"
import DeleteStockItemButton from "@/components/DeleteStockItemButton"
import TitleTestLoading from "@/components/titleComponent/TitleTestLoading"
import formatToThaiDate from "@/lib/functions/formatToThaiDate"
import { Iitem } from "@/types/item"
import { use, useEffect, useState } from "react"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [edit, setEdit] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState("")
  const [oldData, setOldData] = useState<Iitem | null>(null)

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch(`/api/stockItem/${id}`)
        const json = await res.json()
        if (!res.ok) throw new Error(json.error)
        const data = json.data
        setOldData(data)
      } catch (err: any) { setError(err.message) }
      finally { setLoading(false) }
    }
    fetchStock()
  }, [submit])

  if (loading) return <TitleTestLoading />
    if(!oldData) return <TitleTestLoading />

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    // try {
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")
        const maxQuantity = formData.get("maxQuantity")
        const unit = formData.get("unit")
        const category = formData.get("category")
        
        const body = {name,maxQuantity,unit,category}
        console.log(body)
        
    //     const res = await fetch(`/api/user/${id}`, {
    //       method: "PATCH",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(body),
    //     })

    //     const json = await res.json()
    //     if (!res.ok) throw new Error(json.error)
    //     setSubmit(prev => !prev)
    //     setEdit(false)
    //   } catch (err: any) {
    //     setError(err.message)
    //   }finally {
    //     setSaving(false)
    // }
    setSaving(false)
  }

  return (
    <div className="bg-white mt-16 w-5xl border border-teal-200 rounded-lg p-6 shadow-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-teal-700 border-b border-teal-100 pb-2">Stock item details</h1>
        <p><span className="font-bold text-teal-700">สร้างเมื่อวันที่ </span>{formatToThaiDate(oldData.createAt)}</p>
        <p className={`${oldData.status === "LOW"
                  ? "text-yellow-600"
                  : oldData.status === "OK"
                    ? "text-teal-600"
                    : "text-red-600"
                }`}><span className="font-bold text-teal-700">สถานะ </span>{oldData.status} </p>
        <button onClick={() => setEdit(prev => !prev)} className={`flex items-center gap-2 border-2 border-teal-600 text-teal-600 p-2 rounded-xl ${edit ? "bg-teal-600 text-white" : ""}`}>
          {/* icon ปากกา */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M21 6L8 19L3 21L5 16L18 3L21 6Z" />
          </svg>
          {edit ? <p>edting</p> : <p>edit</p> }
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-between gap-6 mt-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text" defaultValue={oldData.name}
            name="name"
            readOnly={!edit}
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none read-only:bg-gray-50"
          />
          <input
            type="text" defaultValue={oldData.maxQuantity}
            name="maxQuantity"
            readOnly={!edit}
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none read-only:bg-gray-50"
          />
          <select
            defaultValue={oldData.unit}
            name="unit"
            disabled={!edit}
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none disabled:bg-gray-100"
          >
            <option value="g">g</option>
            <option value="ml">ml</option>
          </select>

          <select
            defaultValue={oldData.category}
            name="category"
            disabled={!edit}
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none disabled:bg-gray-100"
          >
            <option value="ingredient">ingredient</option>
            <option value="addon">addon</option>
          </select>
        </div>

        <div className="flex flex-col gap-4 w-1/5 items-end">
          
          <button type="submit" disabled={!edit} className="bg-teal-600 text-white w-full px-4 py-2 rounded-md hover:bg-teal-700 transition-colors font-medium disabled:bg-teal-300">
            {saving? <p>saving...</p> : <p>save</p> }
          </button>
          <DeleteStockItemButton stockId={id} />
        </div>
      </form>

      {error && <p className="m-4 w-fit bg-red-500 py-1 px-4 text-white text-md rounded-2xl">{error}</p>}
    </div>
  )
}
