"use client";
import { useCallback } from 'react';

export default function ItemFormPage() {
  const handleDrink = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/drink", { method: "POST", body: formData });
      if (!res.ok) {
        const error = await res.json();
        alert(error.message);
        return;
      }
      alert("Drink created");
      e.currentTarget.reset();
    } catch (error: unknown) {
      const err = error as { message?: string } | undefined;
      console.log("drink upload error:", error);
      alert("upload failed " + (err?.message || ""));
    }
  }, []);

  const handleItem = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/stockItem", { method: "POST", body: formData });
      if (!res.ok) {
        const error = await res.json();
        alert(error.message);
        return;
      }
      alert("Item created");
      e.currentTarget.reset();
    } catch (error: unknown) {
      const err = error as { message?: string } | undefined;
      console.log("item upload error:", error);
      alert("upload failed " + (err?.message || ""));
    }
  }, []);

  return (
    <div className="h-full bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-white">Create Drink</h2>
          <form onSubmit={handleDrink} className="flex flex-col gap-4">
            <input type="file" name="file" id="drink-file" required />
            <input type="text" name="name" id="drink-name" placeholder="drink name" required />
            <input type="text" name="price" id="drink-price" placeholder="price" required />
            <input type="text" name="mainIngredient" id="drink-mainIngredient" placeholder="main ingredient" required />
            <button className="bg-gray-800 text-white rounded-md px-4 py-2" type="submit">Create Drink</button>
          </form>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Create Stock Item</h2>
          <form onSubmit={handleItem} className="flex flex-col gap-4">
            <input type="file" name="file" id="item-file" required />
            <input type="text" name="name" id="item-name" placeholder="name" required />
            <input type="text" name="category" id="item-category" placeholder="category" required />
            <input type="text" name="maxQuantity" id="item-maxQuantity" placeholder="max quantity" required />
            <input type="text" name="unit" id="item-unit" placeholder="unit" required />
            <button className="bg-gray-800 text-white rounded-md px-4 py-2" type="submit">Create Item</button>
          </form>
        </div>
      </div>
    </div>
  );
}
