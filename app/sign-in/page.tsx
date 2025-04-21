'use client'
import { login } from './signin'

export default function LoginPage() {
  return (
    <form
      action={login}
      className="flex flex-col gap-4 max-w-md mx-auto bg-slate-400 p-6 rounded-md shadow-md"
    >
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
    </form>
  )
}