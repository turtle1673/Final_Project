import formatToThaiDate from '@/lib/functions/formatToThaiDate'
import { Iitem } from '@/types/item'
import Link from 'next/link'

export default function EmployeeStock({ stocks }: { stocks: Iitem[] }) {
  return (
    <>
      <table className="w-full bg-gray-200">
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
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Update at
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              <></>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {stocks.map(s => (
            <tr key={s.id} className="hover:bg-blue-50 transition">
              <td className="px-6 py-4 font-semibold text-teal-600">{s.name}</td>
              <td className="px-6 py-4 text-gray-700">{s.category}</td>
              <td className="px-6 py-4 text-gray-700">{s.currentQuantity} <span className='text-teal-600 font-semibold'>{s.unit}</span></td>
              <td className={`px-6 py-4 font-semibold ${s.status === "LOW"
                  ? "text-yellow-600"
                  : s.status === "OK"
                    ? "text-teal-600"
                    : "text-red-600"
                }`}>{s.status}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(s.updateAt)}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`stocks/${s.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Refill
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}