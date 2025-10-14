"use server"

import EmployeeStock from "@/components/EmployeeStocks"

export default async function employeeStock() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/stockItem`)
    const json = await res.json()
    if (!res.ok) {
        throw new Error(json.error || "Error fetching data")
    }
    const stocks = json.data
  return (
    <>
    <div className="w-full bg-white">
      <EmployeeStock stocks={stocks} />
    </div>
    </>
  )
}
