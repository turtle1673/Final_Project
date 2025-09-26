import uploadImageFile from "@/lib/functions/imageFunctions/uploadImageFile"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
    const drinks = await prisma.drink.findMany({
        include : {ingredients : true}
    })

    return NextResponse.json(drinks, { status: 200 })
}


export async function POST(req: Request) {
    
    try{
        const formData = await req.formData()
        const name = formData.get("name") as string
        const price = formData.get("price") as string
        const file = formData.get("file") as File
        const ingsRaw = formData.get("ings") as string
        const ings = JSON.parse(ingsRaw)
        
        if(!parseFloat(price)){
            return NextResponse.json({message:"price must be number"},{status : 400})
        }
        
        if (!name || !price || !file ) {
            return NextResponse.json({message:"filled all of values"},{status : 400})
        }
        
        const img = await uploadImageFile(file)
        const newDrink = await prisma.drink.create({
        data : {
            name,
            price:parseFloat(price),
            img,
            ingredients : {
                create : ings
            }
        }
    })
        return NextResponse.json({ message: "Drink created! ", drink: newDrink }, { status: 201 })
    } catch (error: any) {
        console.error("Error creating drink : ", error)
        return NextResponse.json({ message:error.message || "An unexpected error occurred"}, { status: 500 })
    }
}