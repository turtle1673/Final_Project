import { uploadImg } from "@/app/(actions)/uploadImage";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  const stockItems = await prisma.stockItem.findMany({orderBy : {id : "asc"}});
  return NextResponse.json(stockItems, { status: 200 });
}

export async function POST(req: Request) {
  try{

    const body = await req.json()
    const {name,category,maxQuantity,unit,img} = body

    if(!parseFloat(maxQuantity)){
            return NextResponse.json({message:"Price must be number"},{status : 400})
    }

    if(!name || !category || !maxQuantity || !unit ){
      return NextResponse.json({message:"Filled all of the values"},{status : 400})
    }
    const newItem = await prisma.stockItem.create({
      data:{
        name,
        category,
        maxQuantity:Number(maxQuantity),
        unit,
        img,
      }
    })

    return NextResponse.json({message:"New stockItem created !",item:newItem},{status:201})
  }catch(error:any){
    console.log("Error creating Item : " + error)
    return NextResponse.json({ message:error.message || "An unexpected error occurred"}, { status: 500 })
  }
}
