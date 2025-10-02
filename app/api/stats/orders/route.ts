import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();


    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);


    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);


    const orderThisDay = await prisma.order.count({
      where: { createAt: { gte: startOfDay, lt: endOfDay } },
    })


    const orderThisMonth = await prisma.order.count({
      where: { createAt: { gte: startOfMonth, lt: endOfMonth } },
    })

    //ยอดขายรายวัน
    const revenueThisDay = await prisma.order.aggregate({
      _sum: { totalPrice: true },
      where: { 
        createAt: { gte: startOfDay, lt: endOfDay},
        orderStatus: "COMPLETED" 
    },
    })

    //ยอดขายรายเดือน
    const revenueThisMonth = await prisma.order.aggregate({
      _sum: { totalPrice: true },
      where: { 
        createAt: { gte: startOfMonth, lt: endOfMonth },
        orderStatus: "COMPLETED"
     }
    })

 
    const orderByStatus = await prisma.order.groupBy({
      by: ["orderStatus"],
      _count: { _all: true },
    })


    const avgOrderValue = await prisma.order.aggregate({
      _avg: { totalPrice: true },
      where: { createAt: { gte: startOfMonth, lt: endOfMonth } },
    })

    return NextResponse.json(
      {
        data: {
          orderThisDay,
          orderThisMonth,
          revenueThisDay: revenueThisDay._sum.totalPrice || 0,
          revenueThisMonth: revenueThisMonth._sum.totalPrice || 0,
          orderByStatus,
          avgOrderValue: avgOrderValue._avg.totalPrice?.toFixed(2) || 0,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" },{ status: 500 })
  }
}
