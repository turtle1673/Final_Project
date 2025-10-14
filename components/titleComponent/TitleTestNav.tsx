"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import SignOutButton from "../SignOutButton"

const navItems = [
  // { name: "page", href: "/" },
  { name: "menu", href: "/drinks-menu" },
  { name: "employee", href: "/employee" },
  { name: "manager", href: "/manager" },
]

export default function TitleTestNav() {
  const { data: session,status } = useSession()
  if(status === "loading") return <p className="flex items-center text-teal-600 text-2xl font-bold justify-center h-20 w-full bg-white border-b border-teal-200 shadow-sm animate-pulse">loading...</p>
  return (
    <nav className="flex justify-between px-16 h-20 w-full bg-white border-b border-teal-200 items-center shadow-sm">
      <div className="flex gap-6 text-lg font-medium text-gray-700">
        {navItems.map((e) => (
          <Link
            key={e.name}
            href={e.href}
            className="hover:text-teal-600 transition-colors"
          >
            {e.name}
          </Link>
        ))}
      </div>

      {session ? (
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-gray-700 font-semibold">{session.user.name}</p>
            <p className="text-teal-600 font-semibold tracking-wider">{session.user.email}</p>
            <p className="text-sm text-gray-500">{session.user.role}</p>
          </div>
          <SignOutButton />
        </div>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg border border-teal-300 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Staff
        </Link>
      )}
    </nav>
  )
}
