import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='px-6 py-2 flex items-end justify-between bg-black text-white text-xl'>
      <div className='flex gap-4'>
        <Link href={'/'}>หน้าหลัก</Link>
        <Link href={"/drink-templates"}>เครื่องดื่มแนะนำ</Link>
        <Link href={"/alldrinks"}>เครื่องดื่มทั้งหมด</Link>
      </div>
        <div className='flex gap-4'>
          <Link href={'/sign-in'} className='bg-amber-300 p-1 rounded-md'>Login</Link>
          <Link href={'/sign-up'} className='bg-amber-300 p-1 rounded-md'>SignUp</Link>
        </div>
    </div>
  )
}
