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

        return NextResponse.json({item:item},{status:200})
    }catch(error:any){
        console.log("Error " + error)
        return NextResponse.json({message:error.message || "An unexpected error occurred"}, { status: 500 })
    }
}


export async function PATCH(req:Request, {params} : {params : {id:string}}) {
    const id = Number(params.id)
    const body = req.json()
    try{
        const updateItem = await prisma.stockItem.update({
            where:{id},
            data:body
        })

        if(!updateItem){
            return NextResponse.json({message:"error in update item"},{status:404})
        }

        return NextResponse.json({message:"update success!",item:updateItem},{status:200})
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
            return NextResponse.json({message:"delete item failed"},{status:404})
        }

        return NextResponse.json({message:"Item deleted !",item:deleteItem},{status:200})
    }catch(error:any){
        console.log("Error " + error)
        return NextResponse.json({message:error.message || "An unexpected error occurred"}, { status: 500 })
    }
}