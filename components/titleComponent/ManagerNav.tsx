"use server"
import Link from "next/link"

export default async function ManagerNav() {
    const managerPages = [
        {}
    ]
  return (
    <nav className="flex flex-col w-1/6 bg-teal-200 min-h-screen">
        <Link href="/manager/employee-accounts">accounts</Link>
    </nav>
  )
}
