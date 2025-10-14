import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
    try{
        const drinks = await prisma.drink.findMany({
            include : {ingredients:true}
        })

        return NextResponse.json({data:drinks}, { status: 200 })
    }catch(err:any){
        return NextResponse.json({error:err.message || "Internal server error"},{status:500})
    }
    
}


export async function POST(req: Request) {
    try{
        const body = await req.json()
        const {name,price,img,ings} = body
        if(!img) return NextResponse.json({error:"need image url"},{status:400})
        if(!parseFloat(price)){
            return NextResponse.json({error:"price must be number"},{status : 400})
        }
        
        if (!name || !price ) {
            return NextResponse.json({error:"filled all of values"},{status : 400})
        }
        
        // const img = await uploadImageFile(file)
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
    } catch (err: any) {
        return NextResponse.json({error:err.message || "Internal server error"}, { status: 500 })
    }
}