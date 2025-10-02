"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateEmployee() {
  const [role, setRole] = useState("EMPLOYEE")
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      setPending(true)
      const formData = new FormData(e.currentTarget)
      const name = formData.get("name")
      const email = formData.get("email")
      const password = formData.get("password")
      const role = formData.get("role")

      const res = await fetch("/api/user",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({name,email,password,role})
      })
      const json = await res.json()
      if(!res.ok){
        throw new Error(json.error)
      }
      alert(json.message)
      router.push("./")
    }catch(err:any){
      alert(err.message)
      console.log(err)
    }
    
  }

  return (
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl my-auto p-8 w-full max-w-md border border-teal-200"
      >
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Create Employee
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Role
          </label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="EMPLOYEE">EMPLOYEE</option>
            <option value="MANAGER">MANAGER</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
        >
          {pending ? <p>Creating...</p> : <p>Create</p> }
        </button>
      </form>
  )
}
