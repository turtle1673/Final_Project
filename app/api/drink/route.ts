import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
    const drinks = await prisma.drink.findMany({
        include: {
            ingredients: {
                include: {
                    stockItem: true
                }
            }
        }
    })
    return new NextResponse(JSON.stringify(drinks), { status: 200 })
}

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const newDrink = await prisma.drink.create({
        data: {
            ...body,
            ingredients: {
            create: [
                ...body.ingredients.map((e: any) => ({
                    stockItemId: e.stockItemId,
                    quantity: e.quantity
                }))
            ]
            }
        }
    })

        return NextResponse.json({ message: "Drink created!", drink: newDrink }, { status: 201 })
    } catch (error: any) {
        console.error("Error creating drink:", error)
        return new NextResponse(
            JSON.stringify({ error: error.message || "An unexpected error occurred" }), { status: 500 }
        )
    }
}