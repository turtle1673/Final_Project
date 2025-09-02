import { uploadImg } from "@/app/(actions)/uploadImage";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  const stockItems = await prisma.stockItem.findMany();
  return NextResponse.json(stockItems, { status: 200 });
}

export async function POST(req: Request) {
  try{
    const formData = await req.formData()
    const name = formData.get("name") as string
    const category = formData.get("category") as string
    const maxQuantity = formData.get("maxQuantity") as string
    const unit = formData.get("unit") as string
    const file = formData.get("file") as File

    if(!parseFloat(maxQuantity)){
            return NextResponse.json({message:"price must be number"},{status : 400})
    }

    if(!name || !category || !maxQuantity || !unit || !file){
      return NextResponse.json({message:"filled all of values"},{status : 400})
    }
    const img = await uploadImg(file)
    const newItem = await prisma.stockItem.create({
      data:{
        name,
        category,
        maxQuantity:Number(maxQuantity),
        unit,
        img
      }
    })

    return NextResponse.json({message:"Item created !",item:newItem},{status:201})
  }catch(error:any){
    console.log("Error creating Item : " + error)
    return NextResponse.json({ message:error.message || "An unexpected error occurred"}, { status: 500 })
  }
}
