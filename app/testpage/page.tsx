"use client"
import SignOutButton from "@/components/SignOutButton"
import { useSession } from "next-auth/react"

export default function testPage() {
  const { data: session } = useSession()

  if (!session) {
    return <p className="text-black">คุณคือ Guest (role: CUSTOMER)</p>
  }

  return (
    <div className="justify-self-center text-black font-bold font-3xl">
      <p className="">สวัสดี {session.user.name}</p>
      <p>Role: {session.user.role}</p>
      <SignOutButton />
    </div>
  )
}
