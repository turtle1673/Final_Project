"use client"
import SignOutButton from "@/components/SignOutButton"
import { useSession } from "next-auth/react"

export default function testPage() {
  const { data: session } = useSession()

  if (!session) {
    return <p className="text-center text-black">คุณคือ Guest (role: CUSTOMER)</p>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try{
      const res = await fetch("/api/drink",{
        method : "POST",
        body : formData,
      })

      if(!res.ok){
        const error = await res.json()
        alert(error.message)
        return
      }
      alert("upload successful")
    }catch(error:any){
      console.log("catch-----error " + error)
      alert("upload failed " + error.message)
    }

  }

  return (
    <>
    <div className="justify-self-center text-black font-bold font-3xl">
      <p className="">สวัสดี {session.user.name}</p>
      <p>Role: {session.user.role}</p>
      <SignOutButton />

  //สร้างเครื่องดื่ม
    <form onSubmit={handleSubmit} className="mt-12 bg-white border flex flex-col gap-4">
      <input type="file" name="file" id="file" required/>
      <input type="text" name="name" id="name" placeholder="drinkname" required/>
      <input type="text" name="price" id="price" placeholder="price" required/>
      <input type="text" name="mainIngredient" placeholder="mainIngredient" id="mainIngredient" required/>

      <button className="bg-gray-500 p-2" type="submit">Upload</button>
    </form>

    </div>
    </>
    
  )
}
