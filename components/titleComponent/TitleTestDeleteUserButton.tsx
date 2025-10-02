"use client"

import { useRouter } from "next/navigation"

export default function TitleTestDeleteUserButton({ userId }: { userId: string }) {
    const router = useRouter()
     const handleDelete = async () => {
      if (!confirm("ต้องการลบบัญชีนี้หรือไม่")) return
      try{
        const res = await fetch (`/api/user/${userId}`)
        const json = await res.json()
        if(!res.ok) throw new Error(json.error)    
        alert(json.message)
        router.push("./")
      }catch(err:any){
        alert(err.message)
      }
    }

    if(!userId) return <p>loading...</p>
  return (
    <button type="button" onClick={handleDelete} className="bg-red-500 text-white w-full px-4 py-2 rounded hover:bg-red-600 transition">
      delete
    </button>
  )
}
