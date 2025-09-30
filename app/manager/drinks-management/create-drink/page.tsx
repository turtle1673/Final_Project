"use client"
import IngredientDynamicInputField from "@/components/IngredientDynamicInputField"
import { useRef, useState, useEffect } from "react"

interface Iing {
  id: string
  name: string
  quantity: string
}

export default function CreateDrinkPage() {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [ings, setIngs] = useState<Iing[]>([])
  const [stock, setStock] = useState<Iing[]>([])

  const handleAdd = () => {

  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const price = formData.get("price")
    const file = formData.get("file") as File | null

    console.log("name:", name)
    console.log("price:", price)
    if (file) console.log("file:", file.name)
    console.log("ingredients:", ings)
  }

  return (
    <>
    <IngredientDynamicInputField />
    </>
  )
}
