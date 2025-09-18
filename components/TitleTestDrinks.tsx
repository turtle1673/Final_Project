"use client"
import { IDrink } from "@/types/idrink"
import Image from "next/image"

export default function TitleTestDrinks({drinks}:{drinks:IDrink[]}) {

  const handleDelete = (id:number) => async () => {
    try{
      const res = await fetch(`/api/drink/${id}`,{
        method : "DELETE"
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }
      console.log(data.message)
      window.location.reload()
    }catch(err:any){
      console.log("error in deleting drink" + err)
    }
  }

  return (
    <ul className="list-disc pl-6 text-black border grid grid-cols-4 gap-6">
      {drinks.map((d) => (
        <div key={d.id}>{d.name}
        {d.img && (
          <Image
            src={d.img}
            alt="image"
            width={300}
            height={300}
          />
        )}
        <button className="bg-red-500 text-white" onClick={handleDelete(Number(d.id))}>Delete</button>
        <button className="bg-green-400">
        <a href={`test-drinks/${d.id}`}>Order now</a>
        </button>
        </div>
      ))}
    </ul>
  )
}
