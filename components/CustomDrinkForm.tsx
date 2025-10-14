"use client"

import { Idrink } from "@/types/idrink"
import { Iitem } from "@/types/item"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CustomDrinkForm({ drink }: { drink: Idrink }) {
  const [addons, setAddons] = useState<Iitem[] | null>(null)
    const [pending, setPending] = useState(false)

  const [amount, setAmount] = useState<number>(1)
  const [totalPrice, setTotalPrice] = useState<number>(drink.price)
  const [sweetLevel, setSweetLevel] = useState("NORMAL_SUGAR")
  // const [cupSize, setCupSize] = useState("MEDIUM")
  const [drinkType, setDrinkType] = useState("COLD")
  const [addonId, setAddonId] = useState<string>("")

  const router = useRouter()

  useEffect(() => {
    const fetchAddon = async () => {
      try {
        const res = await fetch(`/api/stockItem?category=addon`)
        const json = await res.json()
        if (!res.ok) throw new Error(json.error)
        setAddons(json.data)
      } catch (err: any) {
        alert(err.message)
      }
    }
    fetchAddon()
  }, [])

  // อัพเดท total price
  useEffect(() => {
    setTotalPrice((drink.price * amount) + ((addonId ? 5 : 0) * amount) + ((drinkType === "HOT" ? 15 : drinkType === "MIXED" ? 10 : 0) * amount))
  }, [amount, addonId, drink, drinkType])

  if (!addons) return <p>Loading...</p>

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
        setPending(true)
        const addon = Number(addonId)
        const drinkId = drink.id
        const body = {sweetLevel, drinkType, addon, amount, totalPrice, drinkId}
        const res = await fetch("/api/order",{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify(body)
            }
        )
        const json = await res.json()
        if(!res.ok) throw new Error(json.error)
        setPending(false)
        alert(json.message)
        router.push("./")
    }catch(err:any){
        console.log(err.message)
        alert(err.message)
        setPending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 space-y-4 max-w-md mx-auto border border-teal-200"
    >
      {/* ขนาดแก้ว */}
      {/* <div>
        <label className="block text-teal-700 font-medium mb-1">ขนาดแก้ว</label>
        <select
          value={cupSize}
          onChange={e => setCupSize(e.target.value)}
          className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500"
        >
          <option value="SMALL">เล็ก</option>
          <option value="MEDIUM">กลาง</option>
          <option value="LARGE">ใหญ่</option>
        </select>
      </div> */}

      {/* ความหวาน */}
      <div>
        <label className="block text-teal-700 font-medium mb-1">ความหวาน</label>
        <select
          value={sweetLevel}
          onChange={e => setSweetLevel(e.target.value)}
          className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500"
        >
          <option value="NO_SUGAR">ไม่หวาน</option>
          <option value="LESS_SUGAR">หวานน้อย</option>
          <option value="NORMAL_SUGAR">ปกติ</option>
        </select>
      </div>

      {/* ประเภทเครื่องดื่ม */}
      <div>
        <label className="block text-teal-700 font-medium mb-1">ประเภทเครื่องดื่ม</label>
        <select
          value={drinkType}
          onChange={e => setDrinkType(e.target.value)}
          className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500"
        >
          <option value="HOT">ร้อน</option>
          <option value="COLD">เย็น</option>
          <option value="MIXED">ปั่น</option>
        </select>
      </div>

      {/* Addon Options*/}
      <div>
        <p className="text-teal-700 font-medium mb-2">เลือก Addon</p>
        <div className="grid grid-cols-3 gap-2">
          <label className="flex items-center gap-2 border border-teal-200 rounded-md p-2">
            <input
              type="radio"
              name="addon"
              value=""
              checked={addonId === ""}
              onChange={e => setAddonId(e.target.value)}
            />
            ไม่ใส่
          </label>

          {addons.map(adn => (
            <label
              key={adn.id}
              className="flex items-center gap-2 border border-teal-200 rounded-md p-2"
            >
              <input
                type="radio"
                name="addon"
                value={adn.id}
                checked={addonId === String(adn.id)}
                onChange={e => setAddonId(e.target.value)}
              />
              {adn.name}
            </label>
          ))}
        </div>
      </div>

      {/* จำนวน */}
      <div>
        <label className="block text-teal-700 font-medium mb-1">จำนวน</label>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* ราคารวม */}
      <div>
        <label className="block text-teal-700 font-medium mb-1">ราคารวม</label>
        <input
          type="text"
          readOnly
          value={totalPrice}
          className="w-full border border-teal-300 bg-gray-50 rounded-md p-2 text-teal-700 font-bold"
        />
      </div>

      {/* ปุ่ม */}
      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md font-semibold transition-colors"
      >
        {pending ? <p>กำลังสั่งซื้อ...</p> : <p>สั่งซื้อ</p>}
      </button>
    </form>
  )
}
