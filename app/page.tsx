"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function homepage() {
  const session = await getServerSession(authOptions)
  if(!session){
    return <p>no session</p>
  }
  console.log(session)
  return (
    <>
    <p>Hello</p>
    </>
  )
}
