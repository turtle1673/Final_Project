import formatToThaiDate from "@/lib/functions/formatToThaiDate";
import { Idrink } from "@/types/idrink";
import Link from "next/link";
import TitleTestLoading from "./TitleTestLoading";
import DeleteDrinkButton from "../DeleteDrinkButton";

export default function TitleTestDrinks({ drinks }: { drinks: Idrink[] }) {
  if (!drinks) return <TitleTestLoading />
  if (drinks.length === 0) return <p>no drink found</p>
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-teal-400 to-blue-400 text-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              รูปเครื่องดื่ม
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ชื่อเครื่องดื่ม
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              ราคาขาย
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              อัพเดทเมื่อวันที่
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              วันที่สร้าง
            </th>
            <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">
              จำนวนส่วนผสม
            </th>
            <th scope="col" className="px-6 py-3 text-right font-bold uppercase tracking-wider">
              <Link href="drinks-management/create-drink" className=" bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition">
                เพิ่มเมนู
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {drinks.map(drink => (
            <tr key={drink.id} className="hover:bg-blue-50 transition">
              <td className="px-6 py-4 font-medium text-gray-800">
                <img
                  src={drink.img}
                  alt={drink.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </td>
              <td className="px-6 py-4 text-gray-700">{drink.name}</td>
              <td className="px-6 py-4 text-gray-600 font-semibold">{drink.price} บาท</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(drink.updateAt)}</td>
              <td className="px-6 py-4 text-gray-500">{formatToThaiDate(drink.createAt, "long")}</td>
              <td className="px-6 py-4 text-gray-500">{drink.ingredients.length} อย่าง</td>
              <td className="px-6 py-4 text-right">
                <DeleteDrinkButton drinkId={drink.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
