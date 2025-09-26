"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { Idrink } from "@/types/idrink"
import TitleTestDrinks from "@/components/titleTest/TitleTestDrinks"

export default async function UserInfo() {
  const baseUrl = process.env.PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/drink`)
  const drinks:Idrink[] = await res.json()

  const session = await getServerSession(authOptions)
  if(!session) return <p className="text-3xl text-cyan-400">welcome</p>
  return (
    <>
    <div>
      <p>ยินดีต้อนรับ {session.user.name}</p>
      <p>Role: {session.user.role}</p>
    </div>
    <TitleTestDrinks drinks={drinks}/>
    </>
  )
}