"use client"

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={async () =>{ await signOut({redirect:true,callbackUrl:"/" })}}
      className="bg-red-500 p-2 h-fit rounded-md text-white cursor-pointer"
    >
      Sign Out
    </button>
  )
}