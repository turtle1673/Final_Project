import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='px-6 py-2 flex items-end gap-12 bg-black text-white text-xl'>
        <Link href={'/login'}>login</Link>
        <p>item 2</p>
        <p>item 3</p>
    </div>
  )
}
