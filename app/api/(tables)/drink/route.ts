import uploadImageFile from "@/lib/functions/imageFunctions/uploadImageFile"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
    try{
        const drinks = await prisma.drink.findMany({
            include : {ingredients : true}
        })

        return NextResponse.json({data:drinks}, { status: 200 })
    }catch(err:any){
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
    
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
            return NextResponse.json({error:"price must be number"},{status : 400})
        }
        
        if (!name || !price || !file ) {
            return NextResponse.json({error:"filled all of values"},{status : 400})
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
        return NextResponse.json({ message: "Drink created! ", data: newDrink }, { status: 201 })
    } catch (error: any) {
        console.error("Error creating drink : ", error)
        return NextResponse.json({error:"Internal server error"}, { status: 500 })
    }
}