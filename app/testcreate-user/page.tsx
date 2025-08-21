"use client"
export default function createUser() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      alert(`Error: ${errorData.error || "An unexpected error occurred"}`)
      return
    }
  }
  return (
    <>
    <h1>create user</h1>
    <form
      onSubmit={handleSubmit}
      className="bg-amber-400 flex flex-col items-center p-4 rounded-lg shadow-md"
    >
      <input type="text" name="name" placeholder="Name" required/>
      <input type="text" name="email" placeholder="Email" required/>
      <input type="password" name="password" placeholder="Password" required/>
      <button type="submit">Create User</button>
    </form>
    </>
  )
}