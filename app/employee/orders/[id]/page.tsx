"use client"
import TitleTestLoading from "@/components/titleComponent/TitleTestLoading"
import { Iorder } from "@/types/iorders"
import { use, useEffect, useState } from "react"
import Image from "next/image"
import DrinkIngredients from "@/components/DrinkIngredients"
import formatToThaiDate from "@/lib/functions/formatToThaiDate"
import OrderButtons from "@/components/OrderButtons"

export default function OrderDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [order, setOrder] = useState<Iorder | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order/${id}`)
        const json = await res.json()
        if (!res.ok) throw new Error(json.error)
        setOrder(json.data)
      } catch (err: any) {
        alert(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [])

  if (loading) return <TitleTestLoading />
  if (!order) return <p className="text-center text-red-500">ไม่พบข้อมูลคำสั่งซื้อ</p>
  return (
    <div className="w-full flex flex-col h-full p-6 bg-white border border-teal-200">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-teal-100 pb-3 mb-4">
        <p className="text-lg font-semibold text-teal-700">
          คำสั่งซื้อที่ : <span className="text-black">{order.id}</span>
        </p>

        <p>
          <span className="font-semibold text-teal-700">วันที่สั่งซื้อ : </span>
            {formatToThaiDate(order.createAt)}
        </p>
        <p>
          <span className="font-semibold text-teal-700">สถานะ : </span>
            {order.orderStatus}
        </p>
      </div>

      {/* Body */}
      <div className="flex gap-6 items-center">
        {/* รูปภาพวงกลม */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-teal-300 shadow-md">
          <Image
            src={order.drink.img !== "no image" ? order.drink.img : "/placeholder.png"}
            alt="order drink image"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>

        {/* รายละเอียด */}
        <div className="flex flex-col gap-2 text-gray-700">
          <p><span className="font-semibold text-teal-700">เครื่องดื่ม: </span>{order.drink.name}</p>
          <p><span className="font-semibold text-teal-700">ประเภท: </span>{order.drinkType}</p>
          <p><span className="font-semibold text-teal-700">ขนาดแก้ว: </span>{order.cupSize}</p>
          <p><span className="font-semibold text-teal-700">ระดับความหวาน: </span>{order.sweetLevel}</p>
          <p className="underline"><span className="font-semibold text-teal-700">จำนวน: </span>{order.amount} แก้ว</p>
        </div>
      </div>

      {/* Total Price */}
        <DrinkIngredients ingredients={order.drink.ingredients} />
      <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-md text-end">
        <p className="text-lg font-bold text-teal-700">
          ราคารวม: <span className="text-black">{order.totalPrice} บาท</span>
        </p>
      </div>
      <OrderButtons orderId={id}/>
    </div>
  )
}
