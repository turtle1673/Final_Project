import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
    try {
        const stockItems = await prisma.restock.findMany({
            include: {
                employee: true,
                stockItem:true
            },
            orderBy: { createAt: "desc" }
        })
        return NextResponse.json({ data: stockItems }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
    }

}

export async function DELETE(_req: Request) {
         await prisma.restock.deleteMany()
 
        return NextResponse.json({ message: "delete all restock history" },{ status: 200 })


}