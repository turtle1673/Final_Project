"use server"

import ManagerStocks from "@/components/ManagerStocks"

export default async function Stocks() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/stockItem`)
    const json = await res.json()
    if (!res.ok) {
        throw new Error(json.error || "Error fetching data")
    }
    const stocks = json.data
    return (
    <>
        <ManagerStocks stocks={stocks} />
    </>
  )
}
