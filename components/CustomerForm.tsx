"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useOrder } from "@/app/context/Ordercontext";

// ---------------- Navbar ----------------
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
              <Link href="/myorder" className="hover:underline">
                My Order
              </Link>
            </li>
            <li>
              <a href="#special" className="hover:underline">
                Today's Special
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

// ---------------- Data ----------------
const todaySpecial = [
  { name: "นมสด", price: 45, image: "/IMAGES/นมสด.jpg" },
  { name: "โกโก้", price: 45, image: "/IMAGES/โกโก้.jpg" }
];

const menu = [
  { name: "นมเย็น", price: 45, image: "/IMAGES/นมเย็น.jpeg" }
];

// ---------------- CustomerPage ----------------
function CustomerPage() {
  const [tableNumber, setTableNumber] = useState("");

  const renderDrinkGrid = (items: any[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative text-center bg-white rounded flex flex-col overflow-hidden border border-black"
        >
          <div className="relative w-full">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="w-full h-40 object-cover"
            />
            {/* ปุ่ม ➕ พาไป custommenu */}
            <Link
              href={{
                pathname: "/custommenu",
                query: { name: item.name, price: item.price, image: item.image },
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
        <h2 className="text-2xl font-semibold mt-4 text-black">
          Table number:{" "}
          <input
            className="border-b-2 border-black bg-transparent outline-none"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </h2>

        <div
          id="special"
          className="mt-6 border border-black p-2 rounded-sm bg-white"
        >
          <h3 className="text-2xl font-bold mb-2 text-black">Today's Special</h3>
          {renderDrinkGrid(todaySpecial)}
        </div>

        <div
          id="menu"
          className="mt-6 border border-black p-2 rounded-sm bg-white"
        >
          <h3 className="text-2xl font-bold mb-2 text-black">Menu</h3>
          {renderDrinkGrid(menu)}
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
