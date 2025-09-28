"use server"
import Ssession from "@/lib/getServerSession"
import Link from "next/link"
import SignOutButton from "../SignOutButton"

const navItems = [
  { name: 'customer', href: '/customer'},
  { name: 'employee', href: '/employee'},
  { name: 'manager', href: '/manager'},
]

export default async function TitleTestNav() {
  const session = await Ssession()
  if(session){
    console.log(session)
  }
  return (
    <>
    <nav className="flex justify-between px-16 h-20 w-full bg-blue-900 text-white items-center">
      <div className="flex gap-4 text-2xl">
      {navItems.map((e) => {
        return (
          <Link className="hover:underline" key={e.name} href={e.href}>{e.name}</Link>
        )
      })}
      </div>
      {session? <SignOutButton/> : <Link href={"/login"}>staff only</Link> }
      </nav>
    </>
    )
}
