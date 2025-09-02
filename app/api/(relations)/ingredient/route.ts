import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
    const stockItems = await prisma.stockItem.findMany()
    return NextResponse.json(stockItems, { status: 200 })
}

export async function POST(req: Request) {
    const body = await req.json()
    
}

