"use client"
import TitleTestDeleteUserButton from "@/components/titleComponent/TitleTestDeleteUserButton"
import TitleTestLoading from "@/components/titleComponent/TitleTestLoading"
import TitleTestNotfound from "@/components/titleComponent/TitleTestNotfound"
import { Iuser } from "@/types/iuser"
import { use, useEffect, useState } from "react"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [edit, setEdit] = useState(false)
  const [user, setUser] = useState<Iuser | null>(null)
  const [submit, setSubmit] = useState(false)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${id}`)
        const json = await res.json()
        if (res.status === 404) return setUser(null)
        if (!res.ok) throw new Error(json.error)
        const u: Iuser = json.data
        setUser(u); setName(u.name); setRole(u.role); setEmail(u.email);
      } catch (err: any) { setError(err.message) }
      finally { setLoading(false) }
    }
    fetchUser()
  }, [submit])

  if (loading) return <TitleTestLoading />
  if (!user) return <TitleTestNotfound message="User not found" />

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
      setSaving(true)
      try {
        const res = await fetch(`/api/user/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, role }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error)
        setSubmit(prev => !prev)
        setEdit(false)
      } catch (err: any) {
        setError(err.message)
      }finally {
        setSaving(false)
    }
  }

  return (
    <div className="bg-white mt-16 w-5xl border border-teal-200 rounded-lg p-6 shadow-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-teal-700 border-b border-teal-100 pb-2">Employee Detail</h1>
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
            type="text" value={name} onChange={e => setName(e.target.value)}
            readOnly={!edit}
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none read-only:bg-gray-50"
          />
          <select
            value={role} onChange={e => setRole(e.target.value)}
            disabled={!edit}
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none disabled:bg-gray-100"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
          </select>
          <input
            type="text" value={email} readOnly
            className="focus:outline-none w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        <div className="flex flex-col gap-4 w-1/5 items-end">
          
          <button type="submit" disabled={!edit} className="bg-teal-600 text-white w-full px-4 py-2 rounded-md hover:bg-teal-700 transition-colors font-medium disabled:bg-teal-300">
            {saving? <p>saving...</p> : <p>save</p> }
          </button>
          <TitleTestDeleteUserButton userId={id} />
        </div>
      </form>

      {error && <p className="m-4 w-fit bg-red-500 py-1 px-4 text-white text-md rounded-2xl">{error}</p>}
    </div>
  )
}
