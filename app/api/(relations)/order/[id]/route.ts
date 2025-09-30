import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request, {params}:{params : {id:string}}) {
    try {
        const id = Number(params.id)
        const order = await prisma.order.findUnique({
            where: { id },
            include: {drink:true}
        })

        return NextResponse.json({data:order}, { status: 200 })
    }catch (err: any) {
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
    }
}