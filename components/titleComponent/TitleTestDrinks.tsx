import { Idrink } from "@/types/idrink";
import Image from "next/image";
import TitleTestLoading from "./TitleTestLoading";
import TitleTestCustomDrink from "./TitleTestCustomDrink";

export default function TitleTestDrinks({ drinks }: { drinks: Idrink[] }) {
  if (drinks.length === 0) return <TitleTestLoading/>
  return (
    <>
    <ul className="grid grid-cols-6 gap-4">
      {drinks.map((drink) => (
        <li
          key={drink.id}
          className="col-span-1 flex flex-col items-center bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
        >
          {/* รูป */}
          <div className="h-48 w-48 overflow-hidden rounded-xl">
            <Image
              src={drink.img}
              width={300}
              height={300}
              alt="drink image"
              className="object-cover w-full h-full"
            />
          </div>

          {/* เนื้อหา */}
          <div className="flex justify-between items-center w-full mt-3">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-800">
                {drink.name}
              </p>
              <p className="text-sm text-gray-600">{drink.price} ฿</p>
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow">
              Order
            </button>
          </div>
        </li>
      ))}
    </ul>

    <TitleTestCustomDrink />
  </>
  )
}
