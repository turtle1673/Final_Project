import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request, {params}:{params : Promise<{id:string}>}) {
    try {
        const {id:sId} = await params
        const id = Number(sId)
        const order = await prisma.order.findUnique({
            where: { id },
            include: {drink:{include:{ingredients:{include:{stockItem:true}}}}}
        })
        if(!order){
            return NextResponse.json({error:"order not found"},{status:404})
        }

        return NextResponse.json({data:order}, { status: 200 })
    }catch (err: any) {
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
    }
}