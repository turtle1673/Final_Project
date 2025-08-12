import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='px-6 py-2 flex flex-col items-end justify-between bg-black text-white text-xl'>
      <div className='flex flex-col gap-4'>
        <Link href={'/'}>หน้าหลัก</Link>
        <Link href={"/drink-templates"}>เครื่องดื่มแนะนำ</Link>
        <Link href={"/alldrinks"}>เครื่องดื่มทั้งหมด</Link>
        <Link href={'/sign-in'} className='bg-amber-300 p-1 rounded-md'>พนักงาน</Link>
        <Link href={'/sign-up'} className='bg-amber-300 p-1 rounded-md'>ผู้จัดการ</Link>
        <Link href={'/staff/orders_list'} className='bg-amber-300 p-1 rounded-md'>order list</Link>
        <Link href={'/staff/inventory'} className='bg-amber-300 p-1 rounded-md'>inventory</Link>
      </div>
    </div>
  )
}
