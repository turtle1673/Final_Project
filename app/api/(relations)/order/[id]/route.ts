import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request, {params}:{params : Promise<{id:string}>}) {
    try {
        const {id} = await params
        const orderId = Number(id)
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {drink:true}
        })

        return NextResponse.json(order, { status: 200 })
    }catch (error: any) {
        console.error("Error fetching order:", error)
        return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
    }
}