"use client"
import CustomDrinkForm from "@/components/CustomDrinkForm"
import TitleTestLoading from "@/components/titleComponent/TitleTestLoading"
import { Idrink } from "@/types/idrink"
import { use, useEffect, useState } from "react"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [drink, setDrink] = useState<Idrink>()

  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const res = await fetch(`/api/drink/${id}`)
        const json = await res.json()
        if (!res.ok) throw new Error(json.error)
        setDrink(json.data)
      } catch (err: any) {
        alert(err.message)
      }
    }

    if (id) {
      fetchDrink()
    }
  }, [id])

  if (!drink) return <TitleTestLoading />

  return (
    <div className="container h-screen mx-auto p-8 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
      {/* รูปเครื่องดื่ม */}
      <div className="flex justify-center md:w-1/2">
        <img
          src={drink.img}
          alt="drink image"
          className="w-96 h-96 object-cover rounded-full border-4 border-teal-500 shadow-md"
        />
      </div>

      {/* ฟอร์ม */}
      <div className="md:w-1/2 w-full">
        <h1 className="text-3xl font-bold text-teal-700 mb-4">{drink.name}</h1>
        <CustomDrinkForm drink={drink} />
      </div>
    </div>
  )
}
