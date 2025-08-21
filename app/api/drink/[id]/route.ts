import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(_req:Request,{params}: {params: {id: string}}) {
    const drinkId = Number(params.id)

    try {
        const deletedDrink = await prisma.drink.delete({
            where: { id: drinkId }
        })
        return NextResponse.json(({ message: "Drink deleted!", drink: deletedDrink }), { status: 200 })
    } catch (error: any) {
        console.error("Error deleting drink:", error)
        return NextResponse.json(({ error: error.message || "An unexpected error occurred" }), { status: 500 }
        )
    }
}