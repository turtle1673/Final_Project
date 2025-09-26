import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
    try {
        const orders = await prisma.order.findMany({
            where: { orderStatus: "PENDING" },
            orderBy : { id : "asc" }
        })
        return NextResponse.json(orders, { status: 200 })
    }catch (error: any) {
        console.error("Error fetching orders:", error)
        return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { drinkId, cupSize, sweetLevel, addon, drinkType, amount} = body

        const newOrder = await prisma.order.create({
            data: {
                drinkId,
                cupSize,
                sweetLevel,
                addon,
                drinkType,
                amount
            }
        })
        return NextResponse.json(newOrder, { status: 201 })
    }catch (err:any) {
        console.error("Error creating order:", err)
        return NextResponse.json({ error: err.message || "An unexpected error occurred" }, { status: 500 })
    }
}