'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 w-full bg-[#1A4365] text-white px-4 py-3 z-50">
      <div className="relative flex items-center justify-between">
    
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md text-black bg-gray-200 w-64"
          />
        </div>

        {/* ปุ่ม Hamburger (ด้านขวา) */}
        <button onClick={() => setIsOpen(!isOpen)} className="ml-auto">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* เมนู Dropdown */}
      {isOpen && (
        <div className="absolute right-4 mt-2 bg-white text-black rounded-md shadow-lg w-48 p-4">
          <h3 className="font-bold mb-2">Smoothies</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><Link href={"/myorder"} className='"hover:underline' >My Order</Link></li>
            <li><a href="#special" className="hover:underline">Today's Special</a></li>
            <li><a href="#menu" className="hover:underline">Menu</a></li>
            <li><a href="#feedback" className="hover:underline">Feedback</a></li>
          </ul>
        </div>
      )}
    </div>
  )
}

// Data for drinks
const todaySpecial = [
  { name: 'นมสด', price: 45, image: '/drinks/milk.jpg' },
  { name: 'ชาไทย', price: 45, image: '/drinks/thaitea.jpg' },
  { name: 'ชาเขียว', price: 45, image: '/drinks/greentea.jpg' },
  { name: 'ไมโล', price: 55, image: '/drinks/milo.jpg' },
]

const menu = [
  { name: 'นมเย็น', price: 45, image: '/drinks/icedmilk.jpg' },
  { name: 'นมปั่นโอรีโอ้', price: 45, image: '/drinks/oreo.jpg' },
  { name: 'โกโก้', price: 45, image: '/drinks/cocoa.jpg' },
  { name: 'กาแฟ', price: 55, image: '/drinks/coffee.jpg' },
  { name: 'ชามะนาว', price: 45, image: '/drinks/lemontea.jpg' },
  { name: 'ส้มปั่น', price: 45, image: '/drinks/orange.jpg' },
  { name: 'ชาบลู', price: 45, image: '/drinks/blue.jpg' },
  { name: 'แตงโมปั่น', price: 55, image: '/drinks/watermelon.jpg' },
  { name: 'นมสดเย็น', price: 45, image: '/drinks/coldmilk.jpg' },
  { name: 'ชาพีชเย็น', price: 45, image: '/drinks/peach.jpg' },
  { name: 'ชาเย็น', price: 45, image: '/drinks/redtea.jpg' },
  { name: 'นมคาราเมล', price: 65, image: '/drinks/caramel.jpg' },
]

// CustomerPage Component
function CustomerPage() {
  const [order, setOrder] = useState<any[]>([])
  const [tableNumber, setTableNumber] = useState('')

  const addToOrder = (item: any) => {
    setOrder([...order, item])
  }

  const totalPrice = order.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="pt-20 min-h-screen flex justify-center items-start bg-[#F6EEE0] px-4 pb-8 w-full">
      
      <div className="w-full max-w-screen-lg">

        {/* Table Number */}
        <h2 id="special" className="text-lg font-semibold mt-4 text-black">
          Table number:{' '}
          <input
            className="border-b-2 border-black bg-transparent outline-none"
            value={tableNumber}
            onChange={e => setTableNumber(e.target.value)}
          />
        </h2>

        {/* Today’s Special */}
        <section className="mt-6">
          <h3 className="text-md font-bold mb-2 text-black">Today's Special</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {todaySpecial.map((item, i) => (
              <div key={i} className="text-center bg-white p-2 rounded shadow">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="mx-auto rounded"
                />
                <p>{item.name}</p>
                <p>฿{item.price}</p>
                <button
                  onClick={() => addToOrder(item)}
                  className="text-lg"
                >
                  ➕
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Menu */}
        <section id="menu" className="mt-8">
          <h3 className="text-md font-bold mb-2 text-black">Menu</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {menu.map((item, i) => (
              <div key={i} className="text-center bg-white p-2 rounded shadow">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="mx-auto rounded"
                />
                <p>{item.name}</p>
                <p>฿{item.price}</p>
                <button
                  onClick={() => addToOrder(item)}
                  className="text-lg"
                >
                  ➕
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Order Summary */}
        <section id="order" className="mt-8 bg-white p-4 rounded shadow">
          <h3 className="text-md font-bold mb-2 text-black">Order Summary</h3>
          {order.length === 0 ? (
            <p className="text-gray-500">ยังไม่มีรายการสั่งซื้อ</p>
          ) : (
            <ul>
              {order.map((item, i) => (
                <li key={i} className="flex justify-between border-b py-1">
                  <span>{item.name}</span>
                  <span>฿{item.price}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 font-semibold text-right">Total: ฿{totalPrice}</p>
        </section>

      </div>
    </div>
  )
}

// Page รวม Navbar + CustomerPage
export default function Page() {
  return (
    <>
      <Navbar />
      <CustomerPage />
    </>
  )
}
