"use client"

import { useRouter } from "next/navigation"

export default function TitleTestDeleteUserButton({ stockId }: { stockId: string }) {
    const router = useRouter()
     const handleDelete = async () => {
      if (!confirm("ต้องการลบรายการหรือไม่")) return
      try{
        //เริ่มลบตาม id ที่ส่งมา
        const res = await fetch(`/api/stockItem/${stockId}`,{
          method: "DELETE"
        })
        const json = await res.json()
        if(!res.ok) throw new Error(json.error)
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
