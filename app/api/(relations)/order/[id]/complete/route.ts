import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const orderId = Number(id)
    const {employeeId, status} = await req.json()
    
    
    // Simple status update for both completion and cancellation
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        orderStatus: status,
        employeeId: employeeId || null
      }
    });

    return NextResponse.json({updateOrder: updatedOrder}, { status: 200 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
    return NextResponse.json({message: errorMessage}, { status: 400 })
  }
}