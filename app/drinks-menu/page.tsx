import DrinksMenu from "@/components/DrinksMenu"

export default async function customer() {
  const baseUrl = process.env.PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/drink`)
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json.error || "Error fetching data")
  }
  const drinks = json.data
  return (
    <>
      <div className="grid grid-cols-4 min-h-screen bg-white">
        <DrinksMenu drinks={drinks}/>
      </div>
    </>
  )
}
