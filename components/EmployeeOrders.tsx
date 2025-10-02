import { Iorder } from "@/types/iorders";
import Link from "next/link";

export default function EmployeeOrders({orders} : {orders : Iorder[]}) {
  return (
    <>
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-teal-400 to-blue-400 text-white">
          <tr className="text-xl">
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ชื่อเครื่องดื่ม
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ประเภทเครื่องดื่ม
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ระดับความหวาน
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ขนาดแก้ว
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              จำนวน
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ราคารวม
            </th>
            <th scope="col" className="px-6 py-3 text-right font-bold uppercase tracking-wider">
              <></>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {orders.map(o => (
            <tr key={o.id} className="hover:bg-blue-50 transition">
              <td className="px-6 py-4 font-semibold text-teal-600">{o.drink.name}</td>
              <td className="px-6 py-4 text-gray-700">{o.drinkType}</td>
              <td className="px-6 py-4 text-gray-700">{o.sweetLevel}</td>
              <td className="px-6 py-4 text-gray-700">{o.cupSize}</td>
              <td className="px-6 py-4 text-gray-700">{o.amount}</td>
              <td className="px-6 py-4 text-gray-700">{o.totalPrice} บาท</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`orders/${o.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Order details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
