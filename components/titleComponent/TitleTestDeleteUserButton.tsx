"use client"

import { useRouter } from "next/navigation"

export default function TitleTestDeleteUserButton({ userId }: { userId: string }) {
    const router = useRouter()
     const handleDelete = async () => {
      if (!confirm("Are you sure you want to delete this user?")) return
      try{
        //เช็คว่าเป็น seed email รึเปล่า
        const res1 = await fetch(`/api/user/${userId}`)
        let json = await res1.json()
        if(!res1.ok) throw new Error(json.error)
        const user = json.data
        const isSeedEmail = user.email === process.env.NEXT_PUBLIC_FIRST_MANAGER_EMAIL
        if(isSeedEmail){
          throw new Error("Cannot delete seed user")
        }
        //เริ่มลบตาม id ที่ส่งมา
        const res2 = await fetch(`/api/user/${userId}`,{
          method: "DELETE"
        })
        json = await res2.json()
        if(!res1.ok) throw new Error(json.error)
        alert(json.message)
        router.push("./")
      }catch(err:any){
        alert(err.message)
      }
      
    }

  return (
    <button type="button" onClick={handleDelete} className="bg-red-500 text-white w-full px-4 py-2 rounded hover:bg-red-600 transition">
      delete
    </button>
  )
}
