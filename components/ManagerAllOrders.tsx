import formatToThaiDate from '@/lib/functions/formatToThaiDate'
import { Iorder } from '@/types/iorders'
import React from 'react'

export default async function ManagerAllOrders() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/order?sorted=desc`, { cache: "no-store" })
    const json = await res.json()
    const orders: Iorder[] = json.data
    if(!orders) return <p>loading...</p>
    return (
        <>
            {/* ฝั่งขวา (Orders List) */}
            <div className="w-max p-8 bg-white shadow-inner flex flex-col h-screen">
                <h2 className="text-2xl font-semibold text-teal-700 mb-4">
                    Orders ทั้งหมด
                </h2>
                {/* ทำให้เฉพาะ list scroll ได้ */}
                <div className="overflow-y-auto flex-1 space-y-3 pr-2">
                    {orders.map((o) => (
                        <div
                            key={o.id}
                            className="flex justify-between items-center p-4 bg-teal-50 rounded"
                        >
                            <div>
                                <p className="text-sm">
                                    <strong>วันที่ :</strong> {formatToThaiDate(o.createAt)}
                                </p>
                                <p className="text-sm">
                                    <strong>Drink:</strong> {o.drinkType} | {o.amount} แก้ว | {o.totalPrice} ฿
                                </p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded font-semibold text-white text-sm ${o.orderStatus === "COMPLETED"
                                        ? "bg-teal-600"
                                        : o.orderStatus === "PENDING"
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                            >
                                {o.orderStatus}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
