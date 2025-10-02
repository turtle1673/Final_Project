"use client"

import { useRouter } from "next/navigation"

export default function DeleteDrinkButton({drinkId} : {drinkId:string}) {
    if(!drinkId) return <p>loading...</p>

    const router = useRouter()
      const handleDelete = async () => {
        if(!confirm("ต้องการลบเมนูเครื่องดื่มนี้หรือไม่")) return
        try{
          const res = await fetch(`/api/drink/${drinkId}`,{
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
    <button type="button" onClick={handleDelete} className="bg-white text-black w-full px-4 py-2 rounded hover:bg-red-600 border-2 hover:text-white transition">delete</button>
  )
}
