"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (res?.ok) {
      router.push("/")
    } else {
      setLoading(false)
      setError("email หรือ password ไม่ถูกต้อง")
      return
    }
  }

  return (
    <div className="bg-white border border-teal-500 rounded-xl shadow-md px-8 py-12 w-[400px] m-auto mt-20">
      <p className="text-3xl font-semibold text-center text-teal-700 mb-6">
        ต้องมีบัญชีพนักงาน
      </p>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleLogin}
      >
        <label className="font-medium text-teal-700" htmlFor="email">
          Email
        </label>
        <input
          className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          required
        />

        <label className="font-medium text-teal-700" htmlFor="password">
          Password
        </label>
        <input
          className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {loading ? (
          <button
            className="flex items-center justify-center gap-2 text-white bg-teal-600 rounded-lg py-2 disabled:opacity-70"
            disabled
          >
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-50"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Processing…
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-teal-600 hover:bg-teal-700 rounded-lg py-2 transition-colors"
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
}
