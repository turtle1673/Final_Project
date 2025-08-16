'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)

  return (
    <nav className="relative text-white text-xl">
      
      <button
        onClick={toggleMenu}
        className="m-2 focus:outline-none fixed top-[-2] left-2 rounded z-[9999]"
        aria-label="Toggle menu"
      >
        <Image
          src={isOpen ? '/IMAGES/smoothielogo.png' : '/IMAGES/smoothielogo.png'}
          alt={isOpen ? '' : ''}
          width={30}
          height={30}
          priority={true}
        />
      </button>

      {/* เมนู slide-in/out */}
      <div
        className={`
          fixed top-0 left-0 h-full w-48 bg-[#1A4365] p-6
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          z-50
        `}
      >
        <nav className="flex flex-col gap-4 mt-8">
          <Link href={'/'} onClick={() => setIsOpen(false)}>หน้าหลัก</Link>
          <Link href={"/drink-templates"} onClick={() => setIsOpen(false)}>เครื่องดื่มแนะนำ</Link>
          <Link href={"/alldrinks"} onClick={() => setIsOpen(false)}>เครื่องดื่มทั้งหมด</Link>
          <Link href={"/customer"} onClick={() => setIsOpen(false)}>customer</Link>
          <Link href={'/sign-in'} className='bg-amber-300 p-1 rounded-md' onClick={() => setIsOpen(false)}>พนักงาน</Link>
          <Link href={'/sign-up'} className='bg-amber-300 p-1 rounded-md' onClick={() => setIsOpen(false)}>ผู้จัดการ</Link>
        </nav>
      </div>
    </nav>
  )
}