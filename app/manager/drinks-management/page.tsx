"use server"

import TitleTestDrinks from "@/components/titleComponent/TitleTestDrinks"

export default async function DrinksManagement() {
  const baseUrl = process.env.PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/drink`)
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json.error || "Error fetching data")
  }
  const drinks = json.data

  if(drinks.length === 0 ) return <p>drinks menu is empty</p>
  return (
    <>
      <header className="uppercase text-blue-900 text-3xl font-bold my-10">เมนู เครื่องดื่มปัจจุบัน</header>
      <TitleTestDrinks drinks={drinks} />
    </>
  )
}
