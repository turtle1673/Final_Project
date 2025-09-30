import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { completeOrder } from "@/lib/functions/completeOrder";

export async function PATCH(req: Request,context : { params: { id: string } }) {
  try {
    const { id } = context.params
    const orderId = Number(id)
    const {employeeId} = await req.json()
    const employee = await prisma.user.findUnique({
      where:{id:employeeId}
    })
    if(!employee){
      return NextResponse.json({error:"not found this employee id in database"},{status:404})
    }

    const order = await completeOrder(orderId, employeeId);

    return NextResponse.json({message:"success in complete order",data:order}, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({error: err.message || "Internal server error"}, { status: 400 })
  }
}