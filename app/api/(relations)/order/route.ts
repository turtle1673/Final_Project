import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                drink: true,
                employee: true
            },
            orderBy : { orderDate : "desc" }
        })
        return NextResponse.json(orders, { status: 200 })
    }catch (error: unknown) {
        console.error("Error fetching orders:", error)
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
        return NextResponse.json({ error: errorMessage }, { status: 500 })
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
    }catch (err: unknown) {
        console.error("Error creating order:", err)
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
        return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
}