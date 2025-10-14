import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { statusOrder } from "@prisma/client";
export async function GET(req:NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams
        const status = searchParams.get("status")
    
        const count = await prisma.order.aggregate({
            where : status? {orderStatus:status as statusOrder} : {},
            _count:true
        })

        return NextResponse.json({data:count},{status:200})
    }catch(err:any){
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}