import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const category = searchParams.get("category")

  const stockItems = await prisma.stockItem.findMany({
    where: category ? { category } : {},
    orderBy:{id:"asc"}
  })

  return NextResponse.json({data:stockItems}, { status: 200 });
}

export async function POST(req: Request) {
  try{

    const body = await req.json()
    const {name,category,maxQuantity,unit,img} = body
    
    const number = Number(maxQuantity)
    if(!number){
      return NextResponse.json({error:"quantity must be a number"},{status:400})
    }

    const newItem = await prisma.stockItem.create({
      data:{
        name,
        category,
        maxQuantity:number,
        unit,
        img,
      }
    })

    return NextResponse.json({message:"New item created",data:newItem},{status:201})
  }catch(err:any){
    return NextResponse.json({ error:err.message || "Internal server error"}, { status: 500 })
  }
}
