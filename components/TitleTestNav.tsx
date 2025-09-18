import Link from "next/link"

const navItems = [
  { name: 'page', href: '/title-test/test-page'},
  { name: 'create user', href: '/title-test/test-createuser'},
  { name: 'drinks', href: '/title-test/test-drinks'},
  { name: 'login', href: '/title-test/test-login'},
  { name: 'orders', href: '/title-test/test-orders'},

  { name: 'createDrink', href: '/title-test/test-page/create-drink'},
  { name: 'createItem', href: '/title-test/test-page/create-item'},
  { name: 'Stock', href: '/title-test/test-page/stock-item-list'},
]

export default function TitleTestNav() {
  return (
    <>
    <nav className="text-black mb-4 flex gap-4 ml-8">
      {navItems.map((e) => {
        return (
          <Link key={e.name} href={e.href}>{e.name}</Link>
        )
      })}
      </nav>
    </>
    )
}
