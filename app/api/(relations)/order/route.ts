import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
    try {
        const orders = await prisma.order.findMany({
            where: { orderStatus: "PENDING" },
            orderBy : { id : "asc" }
        })
        return NextResponse.json(orders, { status: 200 })
    }catch (err: any) {
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { drinkId, cupSize, sweetLevel, addon, drinkType, amount, totalPrice} = body

        const drink = await prisma.drink.findUnique({
            where:{id:drinkId}
        })

        if(!drink){
            return NextResponse.json({error:"drink not found"},{status:400})
        }

        const newOrder = await prisma.order.create({
            data : {
                addon,
                drinkType,
                sweetLevel,
                cupSize,
                amount,
                totalPrice,
                drinkId
            }
        })
        return NextResponse.json({message:"order created!", data:newOrder}, { status: 201 })
    }catch (err:any) {
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
    }
}