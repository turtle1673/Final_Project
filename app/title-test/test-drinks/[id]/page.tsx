"use client"

import { IDrink } from "@/types/drink"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const { id } = useParams()
  const [drink, setDrink] = useState<IDrink | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/drink/${id}`, {
        method: "GET",
      })
      const data = await res.json()

      if (!res.ok) {
        console.log("error in fetching data")
        alert("error")
        setLoading(false)
        return
      }
      setDrink(data)
      setLoading(false)
    }

    fetchData()
  }, [id])


  const orderDrink = (e:React.MouseEvent<HTMLButtonElement>) => {
    alert("drink ordered")
  }

  return (
    <div className="flex justify-center items-center min-h-screen from-teal-400">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center p-8 gap-8 max-w-2xl w-full">
        {loading ? (
          <div className="text-gray-500 text-xl">กำลังโหลดข้อมูล...</div>
        ) : drink ? (
          <>
            <img
              src={drink.img}
              alt={drink.name}
              width={300}
              height={300}
              className="rounded-lg shadow-md object-cover"
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-teal-700">{drink.name}</h2>
              <p className="text-xl text-gray-700 font-semibold">
                ราคา: <span className="text-teal-600">{drink.price} บาท</span>
              </p>
            <button onClick={orderDrink} className="bg-blue-600 p-4 rounded-2xl cursor-pointer">order</button>
            </div>
          </>
        ) : (
          <div className="text-red-500 text-xl">ไม่พบข้อมูลเครื่องดื่ม</div>
        )}
      </div>
    </div>
  )
}