import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import calStockStatus from "@/lib/functions/calStockStatus"

export async function PATCH(req:Request, {params} : {params : {id:string}}) {
    const id = Number(params.id)
    const body = await req.json()
    const { newQuantity,employeeId } = body
    try{
        //ดูว่ามี id ของสตอกและพนักงานที่กำลังหาอยู่จริงป่าว
        const employee = await prisma.user.findUnique({ where : {id:employeeId}})
        if(!employee){
            return NextResponse.json({error:"Employee not found"},{status:404})
        }
        const stock = await prisma.stockItem.findUnique({where:{id}})
        if(!stock){
            return NextResponse.json({ error: "Item not found" },{status:404})
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
        return NextResponse.json({message:"Stock updated",data:updatedItem},{status:200})
    }catch(err:any){
        return NextResponse.json({err:err.message || "Internal server error"}, { status: 500 })
    }
}