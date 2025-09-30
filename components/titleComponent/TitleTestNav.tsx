import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"
import TitleTestNavRole from "./TitleTestNavRole"

const navItems = [
  { name: 'page', href: '/'},
  { name: 'customer', href: '/customer'},
  { name: 'employee', href: '/employee'},
  { name: 'manager', href: '/manager'},
]

export default async function TitleTestNav() {
  const session = await getServerSession(authOptions)
  if(session){
    console.log("now you have a session")
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
        <TitleTestNavRole/>
      </nav>
    </>
    )
}
