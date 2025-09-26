import TitleTestAccounts from "@/components/titleComponent/TitleTestAccounts"
import { Iuser } from "@/types/iuser"

export default async function page() {
    //ลอง fetch ฝั่ง server
    const baseUrl = process.env.PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/user`,{cache:"no-store"})
    const users:Iuser[] = await res.json()

  return (
  <>
  <header className="uppercase text-blue-900 text-3xl font-bold my-10">Manager accounts management</header>
    <TitleTestAccounts accounts={users}/>
  </>
  )
}
