"use client";

import Link from "next/link"
import React, { useState, useEffect } from "react"
import Image from "next/image"

export default function TitleTestNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState<any>(null)

  const toggleMenu = () => setIsOpen(prev => !prev)

  // ดึง session ใน client
  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session")
      const data = await res.json()
      setSession(data?.user ? data : null)
    }
    fetchSession()
  }, [])

  const navItems = [
    { name: "หน้าหลัก", href: "/" },
    { name: "Employee", href: "/employee" },
    { name: "Manager", href: "/manager" },
    { name: "Customer", href: "/customer" },
  ]

  return (
    <nav className="text-white items-center p-6 text-xl">
      {/* ปุ่ม toggle */}
      <button
        onClick={toggleMenu}
        className="ml-2 focus:outline-none fixed top-1 left-2 rounded z-[9999]"
        aria-label="Toggle menu"
      >
        <Image
          src={'/IMAGES/smoothielogo.png'}
          alt="menu"
          width={30}
          height={30}
          priority

        />
      </button>

      {/* เมนู slide-in/out */}
      <div
        className={`
          fixed top-0 left-0 h-full w-56 bg-[#1A4365] p-6
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          z-50 flex flex-col justify-between
        `}
      >
        {/* เมนูด้านบน */}
        <div className="flex flex-col gap-4 mt-8">
          {navItems.map((e) => (
            <Link
              key={e.name}
              href={e.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-300"
            >
              {e.name}
            </Link>
          ))}
        </div>

        {/* ส่วน Signin / Signout + ชื่อผู้ใช้ */}
        <div className="mt-8 border-t border-gray-400 pt-4">
          {session ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-200">
                 {session.user?.name || "ไม่ทราบชื่อ"}
              </p>
              <Link href="/api/auth/signout" className="text-white hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)}>
                LOGOUT
              </Link>
            </div>
          ) : (
            <Link href="/api/auth/signin" onClick={() => setIsOpen(false)}>
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
