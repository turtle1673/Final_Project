"use client"
import {useState} from 'react'
import { signIn } from './signin'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    setError(null)
    setMessage(null)

    try {
      const res = await signIn(formData)

      if (res) {
        setMessage(res.message)
        setTimeout(() => {
          window.location.href = "/"
        }
        , 1000)
      }
    } catch (error:any) {
      setError(error.message || "An unexpected error occurred")
      setMessage(null)
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 max-w-md mx-auto bg-slate-400 p-6 rounded-md shadow-md"
    >
      <p className='text-3xl text-teal-300 uppercase justify-self-center'>Sign In</p>
      <input
        type="text"
        name="email"
        placeholder="Email"
        className="p-2 border rounded-md"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="p-2 border rounded-md"
        required
      />
      <button
        type="submit"
        className="bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800"
      >
        Login
      </button>
      <div className='text-white text-center'>
        {error && <p className="bg-red-500 py-1 px-3 rounded-lg">{error}</p>}
        {message && <p className="bg-green-500 py-2 px-3 rounded-lg">{message}</p>}
      </div>
    </form>
  )
}