"use client"

import React from "react"
import { useState } from "react"

interface Iingredient {
  quantity: number
  stockItemId: number
  drinkId: string
}

export default function page() {
  const [price, setPrice] = useState<number>(0)
  const [ingredients, setIngredients] = useState<Iingredient[]>([])

  const handleDrink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
  }
  
  return (
    <>
    {/* create drinks */}
    <h1 className="text-black font-bold font-3xl text-center uppercase">create drink</h1>
    <div className="bg-amber-100 w-4/5 h-4/5 mx-auto text-black p-2">
      <form onSubmit={handleDrink} className="mt-12 w-md border bg-amber-500 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 p-2 w-1/2">
            <h2 className="underline font-bold">basic info</h2>
            <input type="file" name="image" id="image" />
            <input  type="text" name="name" id="name" placeholder="drink name" />
            <input onChange={(e) => setPrice(Number(e.target.value))} type="number" name="price" id="price" placeholder="price" min={0}/>
            {price < 0 ? <span className="text-red-500">price must be positive number</span> : null}
          </div>
          <div className="flex flex-col gap-2 p-2 w-1/2">
            <h2 className="underline font-bold">ingredients</h2>
            <input type="text" name="mainIngredient" id="mainIngredient" placeholder="main ingredient" />
          </div>
        </div>
        <button className="bg-gray-500 p-2" type="submit">create Drink</button>
      </form>
    </div>
    </>
  )
}
