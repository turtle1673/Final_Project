"use client"

import React from "react"

export default function page() {

    const handleDrink = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleItem = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try{
      const res = await fetch("/api/stockItem",{
          method : "POST",
          body : formData
        })
        if(!res.ok){
            const error = await res.json()
            alert(error.message)
            return
          }

      alert("upload successful" )
    }catch(error:any){
      console.log("catch-----error " + error)
      alert("upload failed " + error.message)
    }
  }
  
  return (
    <>
    <div className="flex flex-col gap-12 items-center bg-black">
    {/* create drinks */}
    <form onSubmit={handleDrink} className="mt-12 w-md border border-white flex flex-col gap-4">
      <input type="file" name="file" id="file" required/>
      <input type="text" name="name" id="name" placeholder="drinkname" required/>
      <input type="text" name="price" id="price" placeholder="price" required/>
      <input type="text" name="mainIngredient" placeholder="mainIngredient" id="mainIngredient" required/>

      <button className="bg-gray-500 p-2" type="submit">create Drink</button>
    </form>

    {/* create item */}
    <form onSubmit={handleItem} className="mt-12 w-md border border-white flex flex-col gap-4">
    <input type="file" name="file" id="file" required/>
      <input type="text" name="name" id="name" placeholder="name" required/>
      <input type="text" name="category" id="category" placeholder="category" required/>
      <input type="text" name="maxQuantity" placeholder="maxQuantity" id="maxQuantity" required/>
      <input type="text" name="unit" placeholder="unit" id="unit" required/>

    <button className="bg-gray-500 p-2" type="submit">create Item</button>
    </form>

    </div>

    </>
  )
}
