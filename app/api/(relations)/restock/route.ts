import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
    const stockItems = await prisma.restock.findMany({
        include : {
            employee : true
        },
        orderBy : {restockDate : "desc"}
    })
    return NextResponse.json(stockItems, { status: 200 })
}

export async function DELETE(_req:Request){
    await prisma.restock.deleteMany()
    return NextResponse.json({message:"delete all restock history"})
}