"use client"

import uploadImageFile from '@/lib/functions/imageFunctions/uploadImageFile'
import { Iitem } from '@/types/item'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

interface Iings {
  id: number
  name: string
  quantity: string
  unit: string
}

export default function StockDynamicInputField() {
  const [ings, setIngs] = useState<Iings[]>([])
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [ingredients, setIngredient] = useState<Iitem[]>([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState("")  
  const router = useRouter()

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch("/api/stockItem?exclude=addon")
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
    setIngs(prev => ([...prev, { id: Date.now(), name: '', quantity: '', unit: "" }]))
  }

  // Remove a row by id
  const handleRemoveRow = (id: number) => {
    setIngs(prev => prev.filter(ing => ing.id !== id))
  }

  // Update a row's field
  const handleChange = (id: number, field: keyof Iings, value: string) => {
    setIngs(prev =>
      prev.map(ing => {
        if (ing.id !== id) return ing

        // เมื่อเปลี่ยนชื่อ ingredient → หา unit จาก ingredients[]
        if (field === 'name') {
          const found = ingredients.find(item => item.name === value)
          return { ...ing, name: value, unit: found ? found.unit : '' }
        }

        // กรณีเปลี่ยน field อื่น เช่น quantity
        return { ...ing, [field]: value }
      })
    )
  }

  // Handle file selection + preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file)) // local preview only
    }
  }

  const handleSubmit = async () => {
    const totalQuantity = ings.filter(ing => ing.unit === 'ml').reduce((sum, ing) => sum + Number(ing.quantity), 0)
    try {
      if(totalQuantity > 480 ){
        setError("ผลรวมปริมาณส่วนผสมต้องไม่เกิน 480 ml")
        return
      }
      // Build ingredients array for sending
      const processedIngs = ings
        .filter(ing => ing.name && ing.quantity)
        .map(ing => {
          const found = ingredients.find(item => item.name === ing.name)
          return {
            quantity: Number(ing.quantity),
            stockItemId: found ? found.id : null
          }
        })
        .filter(ing => ing.stockItemId !== null)

      // Build payload
      const img = await uploadImageFile(imageFile)
      const payload = {
        name,
        price: price ? Number(price) : 0,
        img,
        ings: processedIngs
      }

      const res = await fetch("/api/drink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if(!res.ok) {
        alert(data.error) 
        return
      }

      // console.log("✅ Created drink:", data)

      // Reset form
      // setName("")
      // setPrice("")
      // setIngs([])
      // setImageFile(null)
      // setPreviewUrl("")
      alert(data.message)
      router.push("./")
    } catch (error: any) {
      console.error("Error creating drink:", error)
      alert(error.message)
    }
  }

  return (
    <>
      <form
        className="max-w-2xl w-full mx-auto bg-white p-8 rounded-xl shadow-lg"
        onSubmit={e => e.preventDefault()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">เครื่องดื่มขนาด 16 ออนซ์ ( 480 ml)</h2>

        {/* Image Upload Section with preview */}
        <div className="mb-8 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <div className="text-gray-400 mb-2">Image Preview</div>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mx-auto mb-4 max-h-48 object-contain rounded-lg shadow"
            />
          )}
          <input
            type="file"
            name="file"
            hidden
            accept="image/*"
            ref={imageInputRef}
            onChange={handleFileChange}
          />
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
          <h3 className="text-lg font-semibold text-gray-700 mb-4">รายละเอียดเครื่องดื่ม</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อเครื่องดื่ม</label>
              <input
                type="text"
                name="name"
                placeholder="Enter drink name"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ราคา</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">ส่วนผสม</h3>
            <button
              type="button"
              onClick={handleAddRow}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-150"
            >
              เพิ่มส่วนผสม
            </button>
          </div>
          <div className="space-y-3">
            {ings.length === 0 && (
              <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
                กรุณาเพิ่้มส่วนผสมสำหรับเครื่องดื่ม
              </div>
            )}

            {ings.map((ing) => (
              <div key={ing.id} className="text-teal-600 flex gap-3 items-center p-3 bg-gray-50 rounded-lg">

                <select
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ing.name}
                  onChange={e => handleChange(ing.id, 'name', e.target.value)}
                >
                  <option className='text-gray-500' value="">Select ingredient</option>
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
                {ing.unit ? (
                  <p className="w-12 text-right text-teal-600 font-bold">{ing.unit}</p>
                ) : (
                  <p className="w-12 text-right text-gray-300 ">unit</p>
                )}
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-150 hover:shadow-lg"
          onClick={handleSubmit}
        >
          Create Drink
        </button>
      </form>
    </>
  )
}