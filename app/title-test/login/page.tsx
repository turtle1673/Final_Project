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
        router.push("/title-test")
    } else {
      setLoading(false)
      setError("email หรือ password ไม่ถูกต้อง")
      return
    }
  }

  return (
    <>
      <div className="bg-amber-200 border border-red-500 px-4 py-16 w-fit m-auto">
        <p className="text-3xl font-semibold text-center">ต้องมีบัญชีพนักงาน</p>
        <form
          className="flex flex-col gap-2 w-3xl h-3xl items-center"
          onSubmit={handleLogin}
        >
          <label className="w-md font-sans" htmlFor="email">
            Email
          </label>
          <input
            className="border w-md p-1 rounded-sm focus:outline-none"
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            required
          />

          {error ? <p className="text-red-500 w-md">{error}</p> : <></> }
          <label className="w-md" htmlFor="password">
            Password
          </label>
          <input
            className="border w-md"
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
          {loading ? (
            <button
  className="flex items-center justify-center gap-2 text-white bg-indigo-600 rounded-xl w-md p-2"
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
      className=""
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
  Processing…
</button>

          ) : (
            <button type="submit" className="text-white bg-indigo-600 rounded-xl w-md p-2">
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
