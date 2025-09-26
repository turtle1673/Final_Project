import Link from "next/link"
import TitleTestNavRole from "./TitleTestNavRole"

const navItems = [
  { name: 'page', href: '/title-test/'},
  { name: 'customer', href: '/title-test/customer'},
  { name: 'employee', href: '/title-test/employee'},
  { name: 'manager', href: '/title-test/manager'},
  { name: 'create drink', href: '/title-test/manager/create-drink'},

  { name: 'login', href: '/title-test/login'},
]

export default function TitleTestNav() {
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
