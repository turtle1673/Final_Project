import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(_req:Request,context:{params : {id : string}}){
    try{
        const id = Number(context.params.id)
        const drink = await prisma.drink.findUnique({
            where : {id},
        })

        if(!drink) return NextResponse.json({message:"drink not found "},{status:404})
        
        return NextResponse.json((drink),{status:200})
    }catch(error:any){
        console.log(error)
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}


export async function PATCH(req:Request,{params}:{params : {id : string}}){
    try{
        const id = Number(params.id)
        const body = await req.json()
        const updateDrink = await prisma.drink.update({
            where : {id},
            data:body
        })

        return NextResponse.json({message:"drink updated ", drink:updateDrink})
    }catch(error:any){
        console.log(error)
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}


export async function DELETE(_req:Request,{params}: {params: {id: string}}) {
    try {
        const id = Number(params.id)
        const deletedDrink = await prisma.drink.delete({
            where: { id }
        })
        return NextResponse.json(({ message: "Drink deleted!", drink: deletedDrink }), { status: 200 })
    } catch (error: any) {
        console.error("Error deleting drink:", error)
        return NextResponse.json(({ error: error.message || "An unexpected error occurred" }), { status: 500 }
        )
    }
}