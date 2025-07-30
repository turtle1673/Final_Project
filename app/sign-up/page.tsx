"use client"
import { useState } from "react"
import signUp from "./signup"

export default function page() {
  const [error, setError] = useState<string | null>(null);
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setError(null);

    const result = await signUp(formData)
    if (result.error) {
      setError(result.error);
      return
    }
 
  }
  return (
    <>
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-4 max-w-md mx-auto bg-slate-400 p-6 rounded-md shadow-md"
      >
        <p className="text-3xl text-teal-300 uppercase justify-self-center">
          Sign Up
        </p>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="p-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          className="p-2 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800"
        >
          Sign Up
        </button>
        <div className="text-white text-center">
          {error && <p className="bg-red-500 py-1 px-3 rounded-lg">{error}</p>}
        </div>
      </form>
    </>
  );
}
