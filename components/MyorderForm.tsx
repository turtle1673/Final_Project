'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, CheckCircle } from 'lucide-react'

// ---------------- Navbar Component ----------------
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

        <button onClick={() => setIsOpen(!isOpen)} className="ml-auto">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-4 mt-2 bg-white text-black rounded-md shadow-lg w-48 p-4">
          <h3 className="font-bold mb-2">Smoothies</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              <Link href="/myorder" className="hover:underline">My Order</Link>
            </li>
            <li>
              <Link href="/customer#special" className="hover:underline">Today's Special</Link>
            </li>
            <li>
              <Link href="/customer#menu" className="hover:underline">Menu</Link>
            </li>
            <li>
              <a href="#feedback" className="hover:underline">Feedback</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

// ---------------- Mock Order Data ----------------
const orderItems = [
  {
    id: 1,
    name: 'นมสด',
    quantity: 1,
    price: 45,
    image: '/IMAGES/นมสด.jpg',
  },
]

const trackingSteps = [
  'รับออเดอร์แล้ว',
  'กำลังเตรียมออเดอร์',
  'ออเดอร์เสร็จแล้ว กรุณารับที่เคาน์เตอร์',
]

// ---------------- MyOrder Page ----------------
export default function MyOrder() {
  const [orderState, setOrderState] = useState<'initial' | 'tracking' | 'completed'>('initial')
  const [trackingProgress, setTrackingProgress] = useState(0)
  const [showPlacedPopup, setShowPlacedPopup] = useState(false)
  const [showEnjoyedPopup, setShowEnjoyedPopup] = useState(false)

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleConfirm = () => {
    setShowPlacedPopup(true)
    setTimeout(() => {
      setShowPlacedPopup(false)
      setOrderState('tracking')
    }, 2000)
  }

  useEffect(() => {
    if (orderState === 'tracking') {
      setTrackingProgress(0)
      const timer1 = setTimeout(() => setTrackingProgress(1), 3000)
      const timer2 = setTimeout(() => {
        setTrackingProgress(2)
        setOrderState('completed')
      }, 6000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [orderState])

  useEffect(() => {
    if (orderState === 'completed') {
      const timer = setTimeout(() => setShowEnjoyedPopup(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [orderState])

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen flex justify-center items-center bg-[#F6EEE0] px-4 pb-8 w-full">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative overflow-hidden">
          <h2 className="text-2xl font-bold mb-6 text-start text-[#1A4365]">My Order</h2>

          {/* Order Items List */}
          <div className="space-y-4">
            {orderItems.length === 0 ? (
              <p className="text-gray-400 text-center">คุณยังไม่มีรายการสั่งซื้อ</p>
            ) : (
              orderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-black">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                      style={{ aspectRatio: '1 / 1' }}
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">฿{item.price}</p>
                </div>
              ))
            )}
          </div>

          <hr className="my-6 border-t border-gray-200" />

          {/* Summary */}
          <div className="space-y-3 flex flex-row justify-between">
            <div className="flex justify-between items-center">
              <label htmlFor="table-number" className="text-gray-600">Table number:</label>
              <input
                id="table-number"
                type="text"
                className="w-23 border-b-2 border-black text-center font-semibold outline-none focus:border-[#1A4365] transition-colors text-black"
                disabled={orderState !== 'initial'}
              />
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-[#1A4365]">
              <p>Total:</p>
              <p>฿{total}</p>
            </div>
          </div>

          {/* Buttons or Tracker */}
          {orderState === 'initial' ? (
            <div className="mt-8 flex gap-4">
              <button className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Back
              </button>
              <button
                onClick={() => {
                  if (orderItems.length === 0) {
                    alert('คุณยังไม่มีรายการสั่งซื้อ')
                    return
                  }
                  handleConfirm()
                }}
                disabled={orderItems.length === 0}
                className={`w-full py-3 rounded-lg font-semibold transition-colors shadow-sm ${
                  orderItems.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                Confirm
              </button>
            </div>
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
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className={`pt-1 text-sm font-medium ${index <= trackingProgress ? 'text-black' : 'text-gray-400'}`}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Popups */}
          {showPlacedPopup && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
                <div className="text-5xl mb-4">🎉</div>
                <p className="font-bold text-lg text-gray-800">Your Order have been placed!</p>
              </div>
            </div>
          )}

          {showEnjoyedPopup && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg z-50">
              <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
                <div className="text-5xl mb-4">🥤</div>
                <p className="font-bold text-lg text-gray-800">Hope you enjoyed your meal!</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
