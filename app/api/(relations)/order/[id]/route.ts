import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request, {params}:{params : {id:string}}) {
    try {
        const id = Number(params.id)
        const order = await prisma.order.findUnique({
            where: { id },
            include: {drink:true}
        })

        return NextResponse.json(order, { status: 200 })
    }catch (error: any) {
        console.error("Error fetching order:", error)
        return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
    }
}