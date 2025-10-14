import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: sId } = await params
        const id = Number(sId)
        const { employeeId } = await req.json()
        if (!employeeId) return NextResponse.json({ error: "staff id needed" }, { status: 400 })

        const employee = await prisma.user.findUnique({
            where: { id: employeeId }
        })
        if (!employee) {
            return NextResponse.json({ error: "not found this employee id in database" }, { status: 404 })
        }
        const order = await prisma.order.findUnique({
            where: { id }
        })
        if (!order) {
            return NextResponse.json({ error: "order not found" }, { status: 404 })
        }

        //เริ่มอัพเดท order
        const cancelledOrder = await prisma.order.update({
            where:{id},
            data:{
                employeeId:employeeId,
                orderStatus: "CANCELLED"
            }
        })

        return NextResponse.json({message:"order got cancelled",data:cancelledOrder},{status:200})
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
    }
}