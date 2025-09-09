import { uploadImg } from "@/app/(actions)/uploadImage"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(_req: Request) {
    const drinks = await prisma.drink.findMany({
        include : {ingredients : {include : {stockItem : true}}}
    })

    return new NextResponse(JSON.stringify(drinks), { status: 200 })
}


export async function POST(req: Request) {
    
    try{
        const body = await req.json()
        const { name, price, mainIngredient, file, quantity, stockItemId } = body
        // const formData = await req.formData()
        // const name = formData.get("name") as string
        // const price = formData.get("price") as string
        // const mainIngredient = formData.get("mainIngredient") as string
        // const file = formData.get("file") as File
        // const quantity = formData.get("quantity") as string
        // const stockItemId = formData.get("stockItemId") as string
        
        if(!parseFloat(price)){
            return NextResponse.json({message:"price must be number"},{status : 400})
        }
        
        if (!name || !price || !mainIngredient) {
            return NextResponse.json({message:"filled all of values"},{status : 400})
        }
        
        // const img = await uploadImg(file)
        const newDrink = await prisma.drink.create({
        data : {
            name,
            price:parseFloat(price),
            mainIngredient,
            // img,
            ingredients : {
                create : [
                    {
                        quantity : parseFloat(quantity),
                        stockItem : {connect: {id : Number(stockItemId)}}
                    }
            ]
        }
        }
    })
        return NextResponse.json({ message: "Drink created! ", drink: newDrink }, { status: 201 })
    } catch (error: any) {
        console.error("Error creating drink : ", error)
        return NextResponse.json({ message:error.message || "An unexpected error occurred"}, { status: 500 })
    }
}