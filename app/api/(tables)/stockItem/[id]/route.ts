import calStockStatus from "@/lib/functions/calStockStatus"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req:Request,{params} : {params : {id:string}}) {
    const id = Number(params.id)
    try{
        const item = await prisma.stockItem.findUnique({
            where: { id }
        })

        if(!item){
            return NextResponse.json({message:"Item not found"},{status:404})
        }

        return NextResponse.json(item,{status:200})
    }catch(error:any){
        console.log("Error " + error)
        return NextResponse.json({message:error.message || "An unexpected error occurred"}, { status: 500 })
    }
}


export async function PATCH(req:Request, {params} : {params : {id:string}}) {
    const id = Number(params.id)
    const body = await req.json()
    const {name,maxQuantity,unit,category,img} = body
    try{
        //ดูว่ามีสตอกไอดีที่กำลังหาอยู่จริงป่าว
        const stock = await prisma.stockItem.findUnique({where:{id}})
        if(!stock){
            return NextResponse.json({ message: "Item not found" },{status:404})
        }
        //อัพเดท metadata ของ stockItem
        const updatedItem = await prisma.stockItem.update({
            where: {id},
            data : {
                name:name || stock.name,
                maxQuantity:maxQuantity || stock.maxQuantity,
                unit:unit || stock.unit,
                category:category || stock.category,
                img,
                status:maxQuantity? calStockStatus(stock.currentQuantity,maxQuantity) : stock.status
            }
        })

        return NextResponse.json({message:"Stock updated",stokcItem:updatedItem},{status:200})
    }catch(error:any){
        console.log("Error " + error)
        return NextResponse.json({message:error.message || "An unexpected error occurred"}, { status: 500 })
    }
}


export async function DELETE(_req:Request, {params} : {params : {id:string}}) {
    const id = Number(params.id)
    try{
        const deleteItem = await prisma.stockItem.delete({
            where:{id}
        })

        if(!deleteItem){
            return NextResponse.json({message:"Delete item failed"},{status:404})
        }

        return NextResponse.json({message:"Item deleted",item:deleteItem},{status:200})
    }catch(error:any){
        console.log("Error " + error)
        return NextResponse.json({message:error.message || "An unexpected error occurred"}, { status: 500 })
    }
}