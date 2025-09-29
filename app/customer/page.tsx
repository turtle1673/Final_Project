"use client";

import React, { useState,useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Idrink } from "@/types/idrink"
import { useOrder } from "@/components/OrderProvider";
import Image from "next/image";

// ----------------- Navbar ----------------
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartTotalItems } = useOrder();
  
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
        
        <div className="flex items-center gap-3 ml-auto">
          {/* ปุ่มตะกร้า */}
          <Link href="/customer/cart" className="text-white hover:text-gray-200 relative">
            <ShoppingCart size={24} />
            {getCartTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartTotalItems()}
              </span>
            )}
          </Link>
          
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute right-4 mt-2 bg-white text-black rounded-md shadow-lg w-48 p-4">
          <h3 className="font-bold mb-2">Smoothies</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              <Link href="/customer/cart" className="hover:underline">
                ตะกร้าสินค้า ({getCartTotalItems()})
              </Link>
            </li>
            <li>
              <a href="#special" className="hover:underline">
                Today&apos;s Special
              </a>
            </li>
            <li>
              <a href="#menu" className="hover:underline">
                Menu
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

// ---------------- Data handled inside component ----------------

// ---------------- CustomerPage ----------------
function CustomerPage() {
  const [drinks, setDrinks] = useState<Idrink[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/drink`, { method: "GET" })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data?.message || "Failed to fetch drinks")
        }
        setDrinks(data.data)
      } catch (err: unknown) {
        console.error(err)
        const message = err instanceof Error ? err.message : "Unexpected error"
        setError(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const renderDrinkGrid = (items: Idrink[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={String(item.id)}
          className="relative text-center bg-white rounded flex flex-col overflow-hidden border border-black"
        >
          <div className="relative w-full">
            <img
              src={item.img}
              alt={item.name}
              width={100}
              height={160}
              className="w-full h-40 object-cover"
            />
            {/* ปุ่ม ➕ พาไป custommenu */}
            <Link
              href={{
                pathname: "/custommenu",
                query: { name: item.name, price: String(item.price), image: item.img },
              }}
              className="absolute bottom-2 right-2 bg-white text-3xl rounded-full border border-black w-10 h-10 flex items-center justify-center"
            >
              ➕
            </Link>
          </div>
          <div className="text-black font-bold p-2 text-start">
            <p>{item.name}</p>
            <p>฿{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pt-20 min-h-screen flex justify-center items-start bg-[#F6EEE0] px-4 pb-8 w-full">
      <div className="w-full max-w-screen-lg">
        

        <div
          id="special"
          className="mt-6 border border-black p-2 rounded-sm bg-white"
        >
          <h3 className="text-2xl font-bold mb-2 text-black">Today&apos;s Special</h3>
          {loading && <p className="text-black">Loading...</p>}
          {!loading && error && <p className="text-red-600">{error}</p>}
          {!loading && !error && drinks && renderDrinkGrid(drinks.slice(0, 4))}
        </div>

        <div
          id="menu"
          className="mt-6 border border-black p-2 rounded-sm bg-white"
        >
          <h3 className="text-2xl font-bold mb-2 text-black">Menu</h3>
          {loading && <p className="text-black">Loading...</p>}
          {!loading && error && <p className="text-red-600">{error}</p>}
          {!loading && !error && drinks && renderDrinkGrid(drinks)}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Navbar />
      <CustomerPage />
    </>
  );
}