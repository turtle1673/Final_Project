"use client"

import { IDrink } from "@/types/idrink"
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

const orderDrink = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const drinkType = formData.get("drinkType")
  const sweetLevel = formData.get("sweetLevel")
  const cupSize = formData.get("cupSize")
  const addon = formData.get("addon")

  console.log({ drinkType, sweetLevel, cupSize, addon })

  // const res = await fetch(`/api/order`, {
  //   method: "POST",
  //   body: JSON.stringify({ drinkType, sweetLevel, cupSize }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   }
  // })

  // const data = await res.json()
  // if (!res.ok) {
  //   alert(`Error: ${data.error || "An unexpected error occurred"}`)
  //   return
  // }

  alert("Order drink successfully")
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
              <form className="text-black flex flex-col gap-2" onSubmit={orderDrink}>
                <label htmlFor="drinkType">ชนิดเครื่องดื่ม</label>
                <select name="drinkType" id="drinkType" value="COLD" className="p-2 border border-gray-300 rounded-md">
                  <option value="HOT">ร้อน</option>
                  <option value="COLD">เย็น</option>
                  <option value="MIXED">ปั่น</option>
                </select>
                <label htmlFor="sweetLevel">ความหวาน</label>
                <select name="sweetLevel" value="NORMAL_SUGAR" className="p-2 border border-gray-300 rounded-md">
                  <option value="NO_SUGAR">ไม่หวาน</option>
                  <option value="LESS_SUGAR">หวานน้อย</option>
                  <option value="NORMAL_SUGAR">หวานปกติ</option>
                  <option value="MORE_SUGAR">หวานมาก</option>
                </select>
                <label htmlFor="cupSize">ขนาดแก้ว</label>
                <select name="cupSize" value="MEDIUM" className="p-2 border border-gray-300 rounded-md">
                  <option value="SMALL">เล็ก</option>
                  <option value="MEDIUM">กลาง</option>
                  <option value="LARGE">ใหญ่</option>
                </select>
                <label htmlFor="addon">ส่วนเสริม</label>
                <select name="addon" value="no" className="p-2 border border-gray-300 rounded-md">
                  <option value="no">ไม่ใส่</option>
                  <option value="pearl">มุก</option>
                  <option value="jelly">เยลลี่</option>
                </select>
                
              <p className="text-xl text-gray-700 font-semibold">
                ราคา: <span className="text-teal-600">{drink.price} บาท</span>
              </p>
              <button type="submit" className="bg-blue-600 p-4 rounded-2xl cursor-pointer">order</button>
              </form>
            </div>
          </>
        ) : (
          <div className="text-red-500 text-xl">ไม่พบข้อมูลเครื่องดื่ม</div>
        )}
      </div>
    </div>
  )
}