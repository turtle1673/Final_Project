"use server"

import EmployeeOrders from "@/components/EmployeeOrders"

export default async function employeeOrder() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/order?status=PENDING`)
    const json = await res.json()
    if (!res.ok) {
        throw new Error(json.error || "Error fetching data")
    }
    const orders = json.data
  return (
    <>
    <div className="min-w-md w-full bg-white">
      <EmployeeOrders orders={orders} />
    </div>
    </>
  )
}
