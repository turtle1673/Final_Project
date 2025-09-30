import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(_req:Request,context:{params : {id : string}}){
    try{
        const id = Number(context.params.id)
        const drink = await prisma.drink.findUnique({
            where : {id},
            include : {ingredients : {include : {stockItem : true}}}
        })

        if(!drink) return NextResponse.json({error:"drink not found "},{status:404})
        
        return NextResponse.json({data:drink},{status:200})
    }catch(err:any){
        return NextResponse.json({error:err.message || "Internal server error"},{status:500})
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

        return NextResponse.json({message:"drink updated ", data:updateDrink},{status:200})
    }catch(err:any){
        return NextResponse.json({error:err.message || "Internal server error"},{status:500})
    }
}


export async function DELETE(_req:Request,{params}: {params: {id: string}}) {
    try {
        
        const id = Number(params.id)

        await prisma.ingredient.deleteMany({
            where: { drinkId: id }
        })
        
        const deletedDrink = await prisma.drink.delete({
            where: { id },
            include : {ingredients : true}
        })
        
        return NextResponse.json(({ message: "Drink deleted!", data: deletedDrink }), { status: 200 })
    } catch (err: any) {
        return NextResponse.json(({ error: err.message || "An unexpected error occurred" }), { status: 500 }
        )
    }
}