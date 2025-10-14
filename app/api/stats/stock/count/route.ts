import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stockStatus } from "@prisma/client"

export async function GET(req:NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams
        const status = searchParams.get("status")
    
        const count = await prisma.stockItem.aggregate({
            where : {
                OR:[
                    status? {status:status as stockStatus} : {},
                    {status:"OUT"}
                ]
            },
            _count:true
        })

        return NextResponse.json({data:count},{status:200})
    }catch(err:any){
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}