import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
    const drinks = await prisma.drink.findMany({
        include : {ingredients : true}
    })

    return NextResponse.json(drinks, { status: 200 })
}


export async function POST(req: Request) {
    const { name, price, img, ingList } = await req.json()
    try{
        
        if(!parseFloat(price)){
            return NextResponse.json({message:"price must be number"},{status : 400})
        }
        
        if (!name || !price ) {
            return NextResponse.json({message:"filled all of values"},{status : 400})
        }
        
        
        const newDrink = await prisma.drink.create({
        data : {
            name,
            price:parseFloat(price),
            // mainIngredient,
            img,
            ingredients : {
                create : ingList
                // [
                //     { quantity: 88, stockItemId: 4 },
                //     { quantity: 99, stockItemId: 2 },
                //     { quantity: 77, stockItemId: 3 }
                // ]
            }
        }
    })
        return NextResponse.json({ message: "Drink created! ", drink: newDrink }, { status: 201 })
    } catch (error: any) {
        console.error("Error creating drink : ", error)
        return NextResponse.json({ message:error.message || "An unexpected error occurred"}, { status: 500 })
    }
}