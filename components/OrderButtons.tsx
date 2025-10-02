"use client"

import { useSession } from "next-auth/react"
import TitleTestLoading from "./titleComponent/TitleTestLoading"
import { useRouter } from "next/navigation"

export default function OrderButtons({orderId} : {orderId: string}) {
    const router = useRouter()
    const {data:session,status} = useSession()

    const handleCancel = async () => {
        try{
            const employeeId = session?.user.id
            const body = {orderId,employeeId}
            const res = await fetch(`/api/order/${orderId}/cancel`,{
                method : "PATCH",
                headers : { "Content-Type": "application/json" },
                body:JSON.stringify(body)
            })
            const json = await res.json()
            if(!res.ok) throw new Error(json.error)
            alert(json.message)
            router.push("./")
        }catch(err:any){
            console.log(err)
            alert(err.message)
        }
    }

    const handleComplete = async () => {
        try{
            const employeeId = session?.user.id
            const body = {orderId,employeeId}
            const res = await fetch(`/api/order/${orderId}/complete`,{
                method : "PATCH",
                headers : { "Content-Type": "application/json" },
                body:JSON.stringify(body)
            })
            const json = await res.json()
            if(!res.ok) throw new Error(json.error)
            alert(json.message)
            router.push("./")
        }catch(err:any){
            console.log(err)
            alert(err.message)
        }
        
    }
    if(status === "loading") return <TitleTestLoading />
    if(!orderId || !session) return <p>no session or orderId</p>
  return (
    <>
        {/* Action buttons */}
      <div className="flex gap-4 w-full mt-6 justify-end">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium shadow-md"
          onClick={handleCancel}
        >
          Cancel Order
        </button>
        <button
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-md"
          onClick={handleComplete}
        >
          Complete Order
        </button>
      </div>
    </>
  )
}
