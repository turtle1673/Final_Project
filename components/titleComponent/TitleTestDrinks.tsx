import formatToThaiDate from "@/lib/functions/formatToThaiDate";
import { Idrink } from "@/types/idrink";
import Link from "next/link";

export default function TitleTestDrinks({ drinks }: { drinks: Idrink[] }) {
  if (drinks.length === 0) return <p>no drink found</p>
  return (
    <>
    <table>
      <thead className="bg-gradient-to-r from-teal-400 to-blue-400 text-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              image
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Lastest Update
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              Create Date
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              <Link href="drinks-management/create-drink" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Add a new drink
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {drinks.map(drink => (
            <tr key={drink.id} className="hover:bg-blue-50 transition">
              <td className="px-6 py-4 font-medium text-gray-800">{drink.img}</td>
              <td className="px-6 py-4 text-gray-700">{drink.name}</td>
              <td className="px-6 py-4 text-teal-600 font-semibold">{drink.price}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(drink.updateAt)}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(drink.createAt,"long")}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`drinks-management/${drink.id}`}
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
