"use server"
import Link from "next/link";

export default async function EmployeeNav() {

  return (
    <nav className="flex flex-col items-start gap-2 w-1/6 bg-white border-r border-teal-300 min-h-screen p-4 shadow-md">
      {/* Orders */}
      <Link
        href="/employee"
        className="px-3 py-2 w-full font-semibold text-teal-700 hover:bg-blue-100 rounded-lg transition"
      >
        Employee dashboard
      </Link>

      {/* Orders */}
      <Link
        href="/employee/orders"
        className="px-3 py-2 w-full font-semibold text-teal-700 hover:bg-blue-100 rounded-lg transition"
      >
        Orders
      </Link>

      {/* Stocks */}
      <Link
        href="/employee/stocks"
        className="px-3 py-2 w-full font-semibold text-teal-700 hover:bg-blue-100 rounded-lg transition"
      >
        Stocks
      </Link>
    </nav>
  );
}
