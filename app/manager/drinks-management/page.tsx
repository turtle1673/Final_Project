"use server"

import TitleTestDrinks from "@/components/titleComponent/TitleTestDrinks"

export default async function DrinksManagement() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/drink`)
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json.error || "Error fetching data")
  }
  const drinks = json.data

  if(drinks.length === 0 ) return <p>drinks menu is empty</p>
  return (
    <>
      <TitleTestDrinks drinks={drinks} />
    </>
  )
}
