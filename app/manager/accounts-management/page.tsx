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
      <TitleTestAccounts accounts={users}/>
  </>
  )
}
