"use client";
import { useState } from "react";

type Ingredient = {
  stockItemId: string;
  quantity: number;
  drinkId: string;
};

export default function IngredientForm() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { stockItemId: "", quantity: 0, drinkId: "" }]);
  };

  const handleChange = (index: number,field: keyof Ingredient,value: string | number) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleRemove = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Submit Ingredients:", ingredients);
    // TODO: ส่งไป API (เช่น prisma.create)
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Add Ingredients</h2>

      {ingredients.map((ing, i) => (
        <div
          key={i}
          className="flex gap-2 items-center border p-2 rounded-lg shadow-sm"
        >
          <input
            type="text"
            placeholder="Name"
            value={ing.stockItemId}
            onChange={(e) => handleChange(i, "stockItemId", e.target.value)}
            className="border p-2 rounded w-1/3"
          />
          <input
            type="string"
            placeholder="Quantity"
            value={ing.quantity}
            onChange={(e) => handleChange(i, "quantity", Number(e.target.value))}
            className="border p-2 rounded w-1/4"
          />
          <input
            type="text"
            placeholder="Unit"
            value={ing.drinkId}
            onChange={(e) => handleChange(i, "drinkId", e.target.value)}
            className="border p-2 rounded w-1/4"
          />
          <button
            type="button"
            onClick={() => handleRemove(i)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            X
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleAddIngredient}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          + Add Ingredient
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
