"use client"

import Link from "next/link"
import SignOutButton from "../SignOutButton"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Iuser } from "@/types/iuser"

export default function TitleTestNavRole() {
  const [user, setUser] = useState<Iuser | null> ()
  const {data:session} = useSession()

  useEffect(() => {
    if(session){
      setUser(session.user as Iuser)
    }
  },[session])

  return (
      <>
        {session? (
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-4">
              <div>{session.user.name}</div>
              <div>{session.user.role}</div>
            </div>
            
            <SignOutButton/>
          </div>
        ) :
          <Link href={"/login"}> Staff </Link>
        }
      </>
  )}
