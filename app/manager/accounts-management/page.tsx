"use server"
import TitleTestAccounts from "@/components/titleComponent/TitleTestAccounts"
import { Iuser } from "@/types/iuser"

export default async function page() {
    //ลอง fetch ฝั่ง server
    const baseUrl = process.env.PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/user`,{cache:"no-store"})
    const json = await res.json()
    const users:Iuser[] = json.data

  return (
  <>
    <header className="uppercase text-blue-900 text-3xl font-bold my-10">Manager accounts management</header>
    <div className="overflow-x-auto min-w-md rounded-lg shadow-lg bg-white p-6">
      <TitleTestAccounts accounts={users}/>
    </div>
  </>
  )
}
