"use client"

import { useParams } from "next/navigation"

export default function page() {
    const {id} = useParams()
  return (
    <>
    <div className="text-black">Item ID : {id}</div>
    </>
  )
}
