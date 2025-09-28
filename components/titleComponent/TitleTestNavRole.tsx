"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import SignOutButton from "../SignOutButton"
import { useEffect, useState } from "react"
import { Iuser } from "@/types/iuser"

export default function TitleTestNavRole() {
    const {data:session} = useSession()
    const [user, setUser] = useState<Iuser>()

    useEffect(() => {
    if (session?.user) {
      console.log("session.user:", session.user)
      setUser(session.user as Iuser)
    }
  }, [session])

  return (
    <>
      <div className="flex gap-4">

      <div className="flex flex-col gap-2">
          <p>{user?.name}</p>
          <p>{user?.role}</p>
        </div>
        
        {session ? 
        <SignOutButton />
         : 
         <Link href="/login">สำหรับพนักงาน</Link>}
      </div>
    </>
  )
}
