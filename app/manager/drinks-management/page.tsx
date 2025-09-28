"use server"

import DrinksListManagement from "@/components/titleComponent/DrinksListManagement"

export default async function DrinksManagement() {
  const baseUrl = process.env.PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/drink`)
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json.error || "Error fetching data")
  }
  const drinks = json.data

  return (
    <>
      <header className="uppercase text-blue-900 text-3xl font-bold my-10">เมนู เครื่องดื่มปัจจุบัน</header>
      <DrinksListManagement drinks={drinks} />
    </>
  )
}
