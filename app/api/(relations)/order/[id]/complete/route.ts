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
      return NextResponse.json({message:"not found this employee id in database"})
    }

    const order = await completeOrder(orderId, employeeId);

    return NextResponse.json({updateOrder:order}, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({message: error.message }, { status: 400 })
  }
}