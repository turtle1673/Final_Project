import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
  const stocks = await prisma.stockItem.findMany()
  return new NextResponse(JSON.stringify(stocks), { status: 200 })
}

export async function POST(req: Request) {
  const body = await req.json()
  try {
  const item = await prisma.stockItem.create({
    data: body
  })
  return new NextResponse(JSON.stringify({message : "item created",item}), { status: 201 })
}
  catch (error: any) {
    console.error("Error creating stock item:", error)
    return new NextResponse(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { status: 500 }
    )
  }
}