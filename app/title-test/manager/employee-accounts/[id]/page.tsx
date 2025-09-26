import formathDate from "@/app/(actions)/formathDate"
import TitleTestDeleteUser from "@/components/titleTest/TitleTestDeleteUser"
import TitleTestNotfound from "@/components/titleTest/TitleTestNotfound"
import { Iuser } from "@/types/iuser"
import Link from "next/link"

export default async function page({params} : {params : {id:string}}) {
    const id = params.id
    const baseUrl = process.env.PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/user/${id}`)
    const {data,message} = await res.json()
    const user:Iuser = data
    if(res.status === 404){
      return <TitleTestNotfound message={message} />
    }
    const isSeedEmail = user.email === process.env.FIRST_MANAGER_EMAIL

  return (
    <>
      <div className="bg-white mt-16 w-5xl border rounded-lg p-6 shadow-sm">
        <h1 className="text-xl font-semibold mb-4">Employee Detail</h1>
        <div className="flex justify-between">
          <div className="w-1/3">
            <p><span className="font-medium">ชื่อ :</span> {user.name || "-"}</p>
        <p><span className="font-medium">อีเมล :</span> {user.email}</p>
        <p><span className="font-medium">ตำแหน่ง :</span> {user.role}</p>
        <p><span className="font-medium">เข้าร่วมเมื่อ :</span> {formathDate(user.create_at,"long")}</p>

          </div>
        
        <div className="mt-6 flex flex-col justify-between w-1/5">
          {isSeedEmail ? <></> : <TitleTestDeleteUser userId={user.id}/>}
          <Link
            href={`${user.id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
            Edit
          </Link>
        </div>
        </div>
      </div>
    </>
  )
}
