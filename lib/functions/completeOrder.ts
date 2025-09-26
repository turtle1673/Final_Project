import prisma from "@/lib/prisma";
import calStockStatus from "./calStockStatus";

export async function completeOrder(orderId: number, employeeId: string) {
  try{
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: {
        drink: {
          include: {
            ingredients: {
              include: {
                stockItem: true,
              },
            },
          },
        },
      },
    })

    if (!order) {
      throw new Error("Order not found")
    }
    if (order.orderStatus === "COMPLETED") {
      throw new Error("Order is already completed")
    }
    //ตัดสตอกตามสูตรใน ingredients
    for(const ing of order.drink.ingredients) {
      const totalUsed = ing.quantity * order.amount
      if(totalUsed > ing.stockItem.currentQuantity) {
        throw new Error(`Insufficient stock for ingredient: ${ing.stockItem.name}`)
      }
      const stock = ing.stockItem
      const remainQuantity = stock.currentQuantity - totalUsed
      const status = calStockStatus(remainQuantity,stock.maxQuantity)
      
      await tx.stockItem.update({
        where: { id: ing.stockItemId },
        data: {
          currentQuantity: remainQuantity,
          status
        }
      })
    }

    //ตัดสตอกตาม id addon ที่อยู่ใน order.addon
    if(order.addon) {
      const addonInStock = await tx.stockItem.findUnique({
        where:{id:order.addon},
      })

      if(!addonInStock){
        throw new Error("don't have this addon in stock")
      }
      
      //กำหนดค่าตายตัวเป็น 10 กรัม
      const remainQuantity = addonInStock.currentQuantity - (10 * order.amount)
      const status = calStockStatus(remainQuantity,addonInStock.maxQuantity)
      await tx.stockItem.update({
        where: { id: order.addon },
        data: { currentQuantity:remainQuantity,status }
      })
    }
  })

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      orderStatus: "COMPLETED",
      employeeId: employeeId
    }
  })

  return updatedOrder
}catch (error: any) {
    console.error("Error completing order:", error)
    throw new Error(error.message || "An unexpected error occurred while completing the order")
  }
}