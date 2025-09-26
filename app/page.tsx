import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default function homepage() {
  const session = getServerSession(authOptions)
  if(!session) alert ("no session")
  return (
    <>
    <p>Hello</p>
    </>
  )
}
