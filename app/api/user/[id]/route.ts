import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) {
    return NextResponse.json(({ error: "User not found" }), {status: 404})
  }

  return NextResponse.json((user), { status: 200 })
}


export async function PATCH(req: Request,{ params }: { params: { id: string } }) {
  const id = params.id
  const body = await req.json()

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(({message:"user updated! ",user:updatedUser}), { status: 200 })
  } catch (error: any) {
    console.error("Error updating user:", error)
    return NextResponse.json(({ message: "An unexpected error occurred",Error:error}),{ status: 500 })
  }
}


export async function DELETE(_req: Request,{ params }: { params: { id: string } }) {
  const id = params.id
  const existingUser = await prisma.user.findUnique({
    where: { id },
  })

  if (!existingUser) {
    return NextResponse.json(({ error: "User not found" }),{status: 404,})
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    })
    return NextResponse.json(({ message: "User deleted successfully",user:deletedUser}), { status: 200 })
  } catch (error: any) {
    console.error("Error deleting user:", error)
    return NextResponse.json(({ error: "An unexpected error occurred" }),{ status: 500 })
  }
}