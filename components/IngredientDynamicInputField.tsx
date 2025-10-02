"use client"
import uploadImageFile from '@/lib/functions/imageFunctions/uploadImageFile'
import { Iitem } from '@/types/item'
import React, { useEffect, useRef, useState } from 'react'

interface Iings {
  id:number
  name:string
  quantity:string
}

export default function StockDynamicInputField() {
  const [ings,setIngs] = useState<Iings[]>([])
    const imageInputRef = useRef<HTMLInputElement>(null)
  const [ingredients, setIngredient] = useState<Iitem[]>([])

  useEffect(() => {
    const fetchStock = async() => {
      try{
        const res = await fetch("/api/stockItem?category=ingredient")
        const json = await res.json()
        if(!res.ok) throw new Error(json.error)
        const ingredients = json.data
      setIngredient(ingredients)
      }catch(err:any){
        console.log(err)
        alert(err.message)
      } 
    }

    fetchStock()
  },[])
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const price = formData.get("price")
    const file = formData.get("file") as File

    uploadImageFile(file)
    console.log("name:", name)
    console.log("price : ", price)
    if (file) {
      console.log("file:", file.name)
    }else{
      console.log("no select file")
    }
  }

  return (
    <>
    {/* ทำ dynamic input (กดเพิ่มช่อง Input ได้เรื่อยๆ) ลบช่องที่เพิ่มมาได้ เมื่อกดส่ง form จากต้องได้ค่าเป็น array
    input 1 ช่อง ให้เลือก 1. ingredients ที่ fetch มาแสดงเป็นชื่อ 2.เลือกจำนวนที่ต้องการใช้ในเครื่องดื่ม */}
    
    <form onSubmit={handleSubmit} className="bg-white">
      <div>
        <div>image show up here</div>
        <input type="file" name="file" hidden ref={imageInputRef} />
      <button type="button" onClick={() => imageInputRef.current?.click()}>Uploadimage</button>
      </div>
      <div>
        <input type="text" name="name" />
        <input type="price" name="price"/>
        <div>
          ใส่ ingredients ตรงนี้
        </div>
      </div>
      <button type="submit">submit</button>
    </form>
    </>
  )
}
