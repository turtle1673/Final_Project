import { Iitem } from "@/types/item"

interface Ingredient {
    id:string
    quantity:string
    stockItem:Iitem
}
export default function DrinkIngredients({ingredients} : {ingredients:Ingredient[]}) {
  return (
    <>
    <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-md">
      <p className="text-teal-700 font-semibold mb-2">วัตถุดิบ:</p>
      <div className="grid grid-cols-4 gap-2">
        {ingredients.map((ing) => (
          <div
            key={ing.id}
            className="col-span-1 flex justify-between items-center bg-white border border-teal-100 rounded-md px-3 py-2 shadow-sm"
          >
            <p className="text-teal-700 font-bold">
              {ing.stockItem.name}
            </p>
            <p className="text-gray-600">
              {ing.quantity} {ing.stockItem.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
