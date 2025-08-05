'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

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
            <li><Link href="/customer#special" className="hover:underline">Today's Special</Link></li>
            <li><Link href="/customer#menu" className="hover:underline">Menu</Link></li>
            <li><a href="#feedback" className="hover:underline">Feedback</a></li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default function MyOrder() {
  return (
    <>
      <Navbar />
      <section
        className="text-4xl flex items-center justify-center text-center min-h-screen text-black bg-[#F6EEE0] w-full pt-14"
      >
        <div>My Order</div>
      </section>
    </>
  )
}
