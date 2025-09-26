"use client"

import { signOut } from "next-auth/react";

export default function SignOutButton() {

  const handleSignOut = async () => {
    await signOut({ redirect: true })
  }

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 p-2 h-fit rounded-md text-white cursor-pointer"
    >
      Sign Out
    </button>
  )
}