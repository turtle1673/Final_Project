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
    <>
      <div className="bg-white border border-teal-500 px-6 py-12 w-fit m-auto rounded-lg shadow-md">
  <p className="text-3xl font-semibold text-center text-teal-700 mb-6">
    ต้องมีบัญชีพนักงาน
  </p>

  <form
    className="flex flex-col gap-3 w-96 items-center"
    onSubmit={handleLogin}
  >
    <label className="w-full font-medium text-teal-700" htmlFor="email">
      Email
    </label>
    <input
      className="border border-teal-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      name="email"
      id="email"
      type="email"
      placeholder="Email"
      required
    />

    {error ? <p className="text-red-500 w-full">{error}</p> : null}

    <label className="w-full font-medium text-teal-700" htmlFor="password">
      Password
    </label>
    <input
      className="border border-teal-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      name="password"
      id="password"
      type="password"
      placeholder="Password"
      required
    />

    {loading ? (
      <button
        className="flex items-center justify-center gap-2 text-white bg-teal-600 rounded-lg w-full p-2 mt-4 cursor-not-allowed"
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
        className="text-white bg-teal-600 hover:bg-teal-700 rounded-lg w-full p-2 mt-4 transition-colors"
      >
        Login
      </button>
    )}
  </form>
</div>

    </>
  );
}
