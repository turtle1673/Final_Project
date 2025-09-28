"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function homepage() {
console.log("hello world")
  return (
    <>
    <p>Hello</p>
    </>
  )
}
