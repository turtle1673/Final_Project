"use client"

import { Iitem } from '@/types/item'
import React, { useEffect, useRef, useState } from 'react'

interface Iings {
  id:number
  name:string
  quantity:string
}


export default function StockDynamicInputField() {
  const [ings, setIngs] = useState<Iings[]>([])
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [ingredients, setIngredient] = useState<Iitem[]>([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch("/api/stockItem?category=ingredient")
        const json = await res.json()
        if (!res.ok) throw new Error(json.error)
        setIngredient(json.data)
      } catch (err: any) {
        console.log(err)
        alert(err.message)
      }
    }
    fetchStock()
  }, [])

  // Add a new ingredient row
  const handleAddRow = () => {
    setIngs(prev => ([...prev, { id: Date.now(), name: '', quantity: '' }]))
  }

  // Remove a row by id
  const handleRemoveRow = (id: number) => {
    setIngs(prev => prev.filter(ing => ing.id !== id))
  }

  // Update a row's field
  const handleChange = (id: number, field: keyof Iings, value: string) => {
    setIngs(prev => prev.map(ing => ing.id === id ? { ...ing, [field]: value } : ing))
  }

  const handleLog = () => {
    // Build the log object
    const logObj = {
      name: name,
      price: price ? Number(price) : 0,
      img: "TestUrl",
      ings: ings
        .filter(ing => ing.name && ing.quantity)
        .map(ing => {
          const found = ingredients.find(item => item.name === ing.name)
          return {
            quantity: Number(ing.quantity),
            stockItemId: found ? found.id : null
          }
        })
        .filter(ing => ing.stockItemId !== null)
    }
    console.log(logObj)
  }

  return (
    <>
      {/* Image upload remains non-functional */}
      <form className="max-w-2xl w-full mx-auto bg-white p-8 rounded-xl shadow-lg" onSubmit={e => e.preventDefault()}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Drink</h2>
        
        {/* Image Upload Section */}
        <div className="mb-8 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <div className="text-gray-400 mb-2">Image Preview</div>
          <input type="file" name="file" hidden ref={imageInputRef} />
          <button 
            type="button" 
            onClick={() => imageInputRef.current?.click()} 
            className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border transition-colors duration-150"
          >
            Upload Image
          </button>
        </div>

        {/* Drink Details Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Drink Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Drink Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter drink name"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (THB)</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Ingredients</h3>
            <button 
              type="button" 
              onClick={handleAddRow} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-150"
            >
              Add Ingredient
            </button>
          </div>
          <div className="space-y-3">
            {ings.length === 0 && (
              <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
                No ingredients added yet. Click "Add Ingredient" to start.
              </div>
            )}
            {ings.map((ing) => (
              <div key={ing.id} className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg">
                <select
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ing.name}
                  onChange={e => handleChange(ing.id, 'name', e.target.value)}
                >
                  <option value="">Select ingredient</option>
                  {ingredients.map(item => (
                    <option key={item.id} value={item.name}>{item.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  className="w-32 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Quantity"
                  value={ing.quantity}
                  onChange={e => handleChange(ing.id, 'quantity', e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveRow(ing.id)} 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors duration-150"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-150 hover:shadow-lg"
          onClick={handleLog}
        >
          Create Drink
        </button>
      </form>
    </>
  )
}
