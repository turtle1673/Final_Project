"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function page() {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      setPending(true)
      const formData = new FormData(e.currentTarget)
      const name = formData.get("name")
      const maxQuantity = formData.get("maxQuantity")
      const unit = formData.get("unit")
      const category = formData.get("category")

      const body = { name, maxQuantity, unit, category }
      const res = await fetch("/api/stockItem",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(body)
      })
      const json = await res.json()
      if(!res.ok){
        throw new Error(json.error)
      }
      alert(json.message)
      router.push("./")
    }catch(err:any){
      alert(err.message)
    }finally{
      setPending(false)
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        <div>
          <label className="block text-teal-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-teal-700 font-medium mb-1">Max Quantity</label>
          <input
            type="text"
            name="maxQuantity"
            className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-teal-700 font-medium mb-1">Unit</label>
          <select
            name="unit"
            className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required

          >
            <option value="">ระบุหน่วย</option>
            <option value="g">g</option>
            <option value="ml">ml</option>
          </select>
        </div>

        <div>
          <label className="block text-teal-700 font-medium mb-1">Category</label>
          <select
            name="category"
            className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="">ระบุหมวดหมู่</option>
            <option value="ingredient">ingredient</option>
            <option value="sweeten ingredient">sweeten ingredient</option>
            <option value="addon">addon</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition"
        >
          {pending ? <p>Creating...</p> : <p>Create</p> }
        </button>
      </form>

    </>
  )
}
