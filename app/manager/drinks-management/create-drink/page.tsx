"use client"

import { useState } from "react"
interface ing {
  id:number
  name:string
  quantity:number
}

export default function page() {
const [ings, setIngs] = useState<ing[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      setIngs([
        {id:1,name:"a",quantity:20},
        {id:2,name:"b",quantity:20}
      ])
      
      const formData = new FormData(e.currentTarget)
      formData.append("ings",JSON.stringify(ings))
      const res = await fetch("/api/drink",{
        method:"POST",
        body:formData
      })
      const data = await res.json()
      if(!res.ok){
        throw Error(data.message || "api error")
      }
      alert(data.message)
      console.log(data.drink)
    }catch(err:any){
      alert(err)
    }
  }

    return (
    <>
    <form className="bg-white" onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <input type="text" name="price" />
        <input type="file" name="file" />
        <button type="submit">create</button>
    </form>
    </>
  )
}
