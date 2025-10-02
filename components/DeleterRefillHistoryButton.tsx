"use client"

import { useRouter } from "next/navigation"

export default function DeleterRefillHistoryButton() {
  const router = useRouter()
  const handleDelete = async () => {
    if(!confirm("ต้องการลบประวัติการเติมสตอกทั้งหมดหรือไม่")) return
    try{
      const res = await fetch("/api/restock",{
        method : "DELETE"
      })
      const json = await res.json()
      if(!res.ok){
        throw new Error(json.error)
      }
      alert(json.message)
      router.refresh()
    }catch(err:any){
      alert(err.message)
    }

  }
  return (
    <button type="button" onClick={handleDelete} className="bg-red-500 text-white w-full px-4 py-2 rounded hover:bg-red-600 transition">Delete All</button>
  )
}
