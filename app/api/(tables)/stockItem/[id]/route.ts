import calStockStatus from "@/lib/functions/calStockStatus"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req:Request,{params} : {params : Promise<{id:string}>}) {
    const {id:stringId} = await params
    const id = Number(stringId)
    try{
        const item = await prisma.stockItem.findUnique({
            where: { id }
        })

        if(!item){
            return NextResponse.json({error:"Item not found"},{status:404})
        }

        return NextResponse.json({data:item},{status:200})
    }catch(err:any){
        return NextResponse.json({error:err.message || "Internal server error"}, { status: 500 })
    }
}


export async function PATCH(req:Request, {params} : {params : {id:string}}) {
    try{
        const {id} = params
        const stockId = Number(id)
        const body = await req.json()
        const {name,maxQuantity:stringMaxQ,unit,category} = body
        const maxQuantity = Number(stringMaxQ)
        if(!maxQuantity) return NextResponse.json({error:"maxQuantity must be a number"},{status:400})
        //ดูว่ามีสตอกไอดีที่กำลังหาอยู่จริงป่าว
        const stock = await prisma.stockItem.findUnique({where:{id:stockId}})
        if(!stock){
            return NextResponse.json({ error: "Item not found" },{status:404})
        }
        //อัพเดท metadata ของ stockItem
        const updatedItem = await prisma.stockItem.update({
            where: {id:stockId},
            data : {
                name:name || stock.name,
                maxQuantity:maxQuantity || stock.maxQuantity,
                unit:unit || stock.unit,
                category:category || stock.category,
                status:maxQuantity? calStockStatus(stock.currentQuantity,maxQuantity) : stock.status
            }
        })

        return NextResponse.json({message:"Stock updated",data:updatedItem},{status:200})
    }catch(err:any){
        return NextResponse.json({error:err.message || "Internal server error"}, { status: 500 })
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
    }catch(err:any){
        return NextResponse.json({message:err.message || "An unexpected error occurred"}, { status: 500 })
    }
}