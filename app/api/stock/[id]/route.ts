import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(_req: Request,{ params }: { params: { id: string } }) {
  const stockId = Number(params.id)
  const body = await _req.json()
  try {
    const item = await prisma.stockItem.update({where: { id: stockId },data: body})
    return new NextResponse(JSON.stringify({ message: "item updated", item }), { status: 200 })
  }catch (error: any) {
    console.error("Error updating stock item:", error)
    return new NextResponse(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { status: 500 }
    )
  }
}

export async function DELETE(_req: Request,{ params }: { params: { id: string } }) {
    const id = Number(params.id)
    try {
        const item = await prisma.stockItem.delete({
        where: { id: id }
        })
        return new NextResponse(JSON.stringify({ message: "item deleted", item }), { status: 200 })
    } catch (error: any) {
        console.error("Error deleting stock item:", error)
        return new NextResponse(
        JSON.stringify({ error: error.message || "An unexpected error occurred" }),
        { status: 500 }
        )
    }
}