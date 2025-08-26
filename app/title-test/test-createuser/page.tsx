"use client"

import { useRouter } from "next/navigation"

export default function createUser() {
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const role = formData.get("role")

    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      alert(`Error: ${errorData.error || "An unexpected error occurred"}`)
      return
    }

    alert("User created successfully")
    router.push("/title-test/test-page")
  }
  return (
    <>
    <h1>create user</h1>
    <form
      onSubmit={handleSubmit}
      className="bg-amber-400 justify-self-center flex flex-col w-xl p-4 rounded-lg shadow-md"
    >
      <div className="flex flex-col gap-2 mb-4">
      <input type="text" name="name" placeholder="Name" required/>
      <input type="text" name="email" placeholder="Email" required/>
      <input type="password" name="password" placeholder="Password" required/>
      </div>
      <select  className="w-fit bg-amber-300" name="role" id="role" defaultValue={"EMPLOYEE"}>
      <option value="EMPLOYEE">พนักงาน</option>
      <option value="MANAGER">ผู้จัดการ</option>
      </select>
      <button className="bg-amber-700 w-fit py-2 px-4 mx-auto rounded-2xl" type="submit">Create User</button>
    </form>
    </>
  )
}