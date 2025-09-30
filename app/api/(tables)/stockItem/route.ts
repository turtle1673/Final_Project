import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  const stockItems = await prisma.stockItem.findMany({orderBy : {id : "desc"}})
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
