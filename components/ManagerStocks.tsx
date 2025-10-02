import formatToThaiDate from '@/lib/functions/formatToThaiDate'
import { Iitem } from '@/types/item'
import Link from 'next/link'

export default function Stocks({ stocks }: { stocks: Iitem[] }) {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-teal-400 to-blue-400 text-white">
          <tr className="text-lg">
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase">
              ชื่อรายการ
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase">
              หมวดหมู่
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase">
              จำนวนคงเหลือ
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase">
              จำนวนสูงสุดที่แนะนำ
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase">
              หน่วย
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase">
              สถานะรายการ
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase">
              อัพเดทเมื่อวันที่
            </th>
            <th scope="col" className="px-6 py-3 text-right font-bold uppercase">
              <Link href={"stocks-management/create-stock-item"} className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition">
                เพิ่มรายการ
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {stocks.map(s => (
            <tr key={s.id} className="hover:bg-blue-50 transition">
              <td className="px-6 py-4 font-semibold text-teal-600">{s.name}</td>
              <td className="px-6 py-4 text-gray-700">{s.category}</td>
              <td className="px-6 py-4 text-gray-700">{s.currentQuantity}</td>
              <td className="px-6 py-4 text-gray-700">{s.maxQuantity}</td>
              <td className="px-6 py-4 text-gray-700">{s.unit}</td>
              <td className={`px-6 py-4 font-semibold ${s.status === "LOW"
                  ? "text-yellow-600"
                  : s.status === "OK"
                    ? "text-teal-600"
                    : "text-red-600"
                }`}>{s.status}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(s.updateAt)}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`stocks-management/${s.id}`}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
                >
                  Manage
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}