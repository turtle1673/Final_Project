import calStockStatus from "@/app/(actions)/calStockStatus"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PATCH(req:Request, {params} : {params : {id:string}}) {
    const id = Number(params.id)
    const body = await req.json()
    const { newQuantity,employeeId } = body
    try{
        //ดูว่ามีสตอกไอดีที่กำลังหาอยู่จริงป่าว
        const employee = await prisma.user.findUnique({ where : {id:employeeId}})
        if(!employee){
            return NextResponse.json({message:"Employee not found"},{status:404})
        }
        const stock = await prisma.stockItem.findUnique({where:{id}})
        if(!stock){
            return NextResponse.json({ message: "Item not found" },{status:404})
        }
        
        //เติมสตอกและสร้างประวัติการอัพเดท
        const totalQuantity = stock.currentQuantity + newQuantity
        const updatedItem = await prisma.stockItem.update({
            where: { id },
            data : {
                currentQuantity : { increment : newQuantity},
                status : calStockStatus(totalQuantity,stock.maxQuantity),
                restock : {
                    create : [
                        {
                            newQuantity,
                            oldQuantity:stock.currentQuantity,
                            totalQuantity,
                            employeeId:employee.id
                        }
                    ]
                }
            }
        })
        return NextResponse.json({message:"Stock updated",stokcItem:updatedItem},{status:200})
    }catch(error:any){
        console.log("Error " + error)
        return NextResponse.json({message:error.message || "An unexpected error occurred"}, { status: 500 })
    }
}