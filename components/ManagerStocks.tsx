import formatToThaiDate from '@/lib/functions/formatToThaiDate'
import { Iitem } from '@/types/item'
import Link from 'next/link'

export default function Stocks({ stocks }: { stocks: Iitem[] }) {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-teal-400 to-blue-400 text-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Current Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Unit
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Update at
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Create at
            </th>
            <th scope="col" className="px-6 py-3 text-right font-bold uppercase tracking-wider">
              <Link href={"stocks-management/create-stock-item"} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Add new item
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {stocks.map(s => (
            <tr key={s.id} className="hover:bg-blue-50 transition">
              <td className="px-6 py-4 font-medium text-gray-800">{s.name}</td>
              <td className="px-6 py-4 text-gray-700">{s.category}</td>
              <td className="px-6 py-4 text-gray-700">{s.currentQuantity}</td>
              <td className="px-6 py-4 text-gray-700">{s.unit}</td>
              <td className={`px-6 py-4 font-semibold ${s.status === "LOW"
                  ? "text-yellow-600"
                  : s.status === "OK"
                    ? "text-teal-600"
                    : "text-red-600"
                }`}>{s.status}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(s.updateAt)}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(s.createAt, "long")}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`stocks-management/${s.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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