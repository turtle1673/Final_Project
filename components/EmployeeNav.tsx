"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EmployeeNavClient() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [lowStockCount, setLowStockCount] = useState<number>(0)
  const [pendingOrdersCount, setPendingOrdersCount] = useState<number>(0)

  const fetchCounts = async () => {
    try {
      const [stockRes, orderRes] = await Promise.all([
        fetch(`${baseUrl}/api/stats/stock/count?status=LOW`, { cache: "no-store" }),
        fetch(`${baseUrl}/api/stats/orders/count?status=PENDING`, { cache: "no-store" }),
      ])

      const stockJson = await stockRes.json()
      const orderJson = await orderRes.json()

      if (stockRes.ok) setLowStockCount(stockJson.data._count || 0)
      if (orderRes.ok) setPendingOrdersCount(orderJson.data._count || 0)
    } catch (err) {
      console.error("Error fetching counts:", err)
    }
  }

  // อัปเดตทุก 10 วินาที
  useEffect(() => {
    fetchCounts()
    const interval = setInterval(fetchCounts, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="flex flex-col items-start gap-2 w-1/6 bg-white border-r border-teal-300 min-h-screen p-4 shadow-md">
      {/* Dashboard */}
      <Link
        href="/employee"
        className="px-3 py-2 w-full font-semibold text-teal-700 hover:bg-blue-100 rounded-lg transition"
      >
        Employee Dashboard
      </Link>

      {/* Orders */}
      <Link
        href="/employee/orders"
        className="relative px-3 py-2 w-full font-semibold text-teal-700 hover:bg-blue-100 rounded-lg transition"
      >
        <div className="flex justify-between">
          <p>Orders</p>
          {pendingOrdersCount ?
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs text-end rounded-full px-2 py-0.5">
              {pendingOrdersCount}
            </span> : <></>
          }
        </div>
      </Link>

      {/* Stocks */}
      <Link
        href="/employee/stocks"
        className="relative px-3 py-2 w-full font-semibold text-teal-700 hover:bg-blue-100 rounded-lg transition"
      >
        <div className="flex justify-between">
          <p>Stocks</p>
          {lowStockCount ? 
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs text-end rounded-full px-2 py-0.5">
              {lowStockCount}
            </span> : <></>
          }
        </div>
      </Link>
    </nav>
  );
}
