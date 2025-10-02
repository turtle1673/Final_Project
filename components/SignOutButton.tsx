"use client"

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={async () =>{ await signOut({redirect:true,callbackUrl:"/" })}}
      className="bg-transparent border border-teal-300 hover:bg-red-500 p-2 h-fit rounded-md text-black hover:text-white cursor-pointer transition-all"
    >
      Sign Out
    </button>
  )
}