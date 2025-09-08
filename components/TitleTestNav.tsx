"use client"
import { useState } from "react"

export default function TitleTestNav() {
   const [open, setOpen] = useState(false)
  return (
    <nav className="mb-4 flex gap-4">
      <div className="relative text-blue-500 underline">
        <button
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setOpen((prev) => !prev)}
        >
          Test Page ▼
        </button>
        {open && (
          <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
            <a
              href="/title-test/test-page"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Test Page
            </a>
            <a
              href="/title-test/test-page/create-drink"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Create Drink
            </a>
            <a
              href="/title-test/test-page/create-item"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Create Item
            </a>
            <a
              href="/title-test/test-page/stock-item-list"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Item List
            </a>
          </div>
        )}
      </div>
      <a href="/title-test/test-createuser" className="text-blue-500 underline">
        Create User
      </a>
      <a className="text-blue-500 underline" href="/title-test/test-login">
        Login
      </a>
      <a className="text-blue-500 underline" href="/title-test/test-drinks">
        Drinks
      </a>
    </nav>
  )
}
