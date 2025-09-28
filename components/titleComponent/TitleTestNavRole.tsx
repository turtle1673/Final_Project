"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function TitleTestNavRole() {
    const {data:session} = useSession()
  return (
    <>
        {session ? 
        <button onClick={async () =>{ await signOut({redirect:false})}}>SingOut</button>
         : 
         <Link href="/login">สำหรับพนักงาน</Link>}
    </>
  )
}
