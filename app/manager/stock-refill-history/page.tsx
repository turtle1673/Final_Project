import RefillLogs from "@/components/RefillLogs";

export default async function page() {
    const baseUrl = process.env.PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/restock`)
    const json = await res.json()
    if (!res.ok) {
        throw new Error(json.error || "Error fetching data")
    }
    const data = json.data
  return (
    <>
        <RefillLogs historiesData={data} />
    </>
  )
}
