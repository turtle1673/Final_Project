'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, CheckCircle } from 'lucide-react'
import { useOrder } from '@/app/context/Ordercontext'

// ---------------- Navbar ----------------
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="fixed top-0 left-0 w-full bg-[#1A4365] text-white px-4 py-3 z-50">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <input type="text" placeholder="Search..." className="px-3 py-1 rounded-md text-black bg-gray-200 w-64" />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="ml-auto">{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
      </div>
      {isOpen && (
        <div className="absolute right-4 mt-2 bg-white text-black rounded-md shadow-lg w-48 p-4">
          <h3 className="font-bold mb-2">Smoothies</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><Link href="/myorder" className="hover:underline">My Order</Link></li>
            <li><Link href="/customer#menu" className="hover:underline">Menu</Link></li>
          </ul>
        </div>
      )}
    </div>
  )
}

// ---------------- Steps ----------------
const trackingSteps = ['รับออเดอร์แล้ว', 'กำลังเตรียมออเดอร์', 'ออเดอร์เสร็จแล้ว กรุณารับที่เคาน์เตอร์']

// ---------------- MyOrder ----------------
export default function MyOrder() {
  const { orders } = useOrder()
  const [orderState, setOrderState] = useState<'initial' | 'tracking' | 'completed'>('initial')
  const [trackingProgress, setTrackingProgress] = useState(0)

  const total = orders.reduce((sum, item) => sum + item.totalPrice, 0)

  const handleConfirm = () => {
    if (orders.length === 0) {
      alert('คุณยังไม่มีรายการสั่งซื้อ')
      return
    }
    setOrderState('tracking')
  }

  useEffect(() => {
    if (orderState === 'tracking') {
      setTrackingProgress(0)
      const t1 = setTimeout(() => setTrackingProgress(1), 3000)
      const t2 = setTimeout(() => { setTrackingProgress(2); setOrderState('completed') }, 6000)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [orderState])

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen flex justify-center items-center bg-[#F6EEE0] px-4 pb-8 w-full">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-start text-[#1A4365]">My Order</h2>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center">คุณยังไม่มีรายการสั่งซื้อ</p>
            ) : (
              orders.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-black">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">฿{item.totalPrice}</p>
                </div>
              ))
            )}
          </div>

          <hr className="my-6" />

          <div className="flex justify-between items-center text-xl font-bold text-[#1A4365]">
            <p>Total:</p>
            <p>฿{total}</p>
          </div>

          {orderState === 'initial' ? (
            <button onClick={handleConfirm} className="mt-8 w-full py-3 bg-green-500 text-white rounded-lg font-semibold">Confirm</button>
          ) : (
            <div className="mt-8">
              <ul className="relative pl-3">
                <div className="absolute left-3 top-0 h-full w-0.5 bg-gray-200 -translate-x-1/2"></div>
                {trackingSteps.map((label, index) => (
                  <li key={index} className="flex items-start gap-4 mb-5 relative">
                    <div className="z-10 mt-1">
                      {index <= trackingProgress ? (
                        <CheckCircle className="text-green-500 bg-white" size={24} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white"></div>
                      )}
                    </div>
                    <p className={`text-sm ${index <= trackingProgress ? 'text-black' : 'text-gray-400'}`}>{label}</p>
                  </li>
                ))}
              </ul>
              {orderState === 'completed' && <p className="text-green-600 font-bold text-center">ออเดอร์ของคุณเสร็จแล้ว!</p>}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
