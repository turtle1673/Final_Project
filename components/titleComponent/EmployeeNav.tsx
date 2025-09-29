"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function EmployeeNav() {
  const pathname = usePathname()
  
  const navItems = [
    {
      href: "/employee",
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
        </svg>
      )
    },
    {
      href: "/employee/orders",
      label: "Order Management",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      href: "/employee/storage",
      label: "Storage Management",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    }
  ]

  return (
    <nav className="flex flex-col w-64 bg-amber-100 min-h-screen border-r border-amber-200">
      <div className="p-6 border-b border-amber-200">
        <h2 className="text-xl font-bold text-amber-800">Employee Portal</h2>
        <p className="text-sm text-amber-600">Order Management System</p>
      </div>
      
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-200 text-amber-900 border-r-2 border-amber-600'
                      : 'text-amber-700 hover:bg-amber-50 hover:text-amber-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      
      <div className="p-4 border-t border-amber-200">
        <div className="text-xs text-amber-600">
          <p>Employee Access</p>
          <p className="font-medium">Order Management</p>
        </div>
      </div>
    </nav>
  )
}
