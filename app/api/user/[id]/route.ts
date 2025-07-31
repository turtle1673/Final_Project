import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const userId = Number(params.id);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
    })
  }

  return new NextResponse(JSON.stringify(user), { status: 200 })
}

export async function PATCH(req: Request,{ params }: { params: { id: string } }) {
  const userId = Number(params.id)
  const body = await req.json()
  const existingUser = await prisma.user.findUnique({
    where: { id: userId }
  })

  const existingEmail = await prisma.user.findUnique({
    where: { email: body.email }
})
  if (!existingUser) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {status: 404})
  }
  if (existingEmail) {
    return new NextResponse(JSON.stringify({ error: "Email had been used." }), {status: 400})
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: body,
    })
    return new NextResponse(JSON.stringify(updatedUser), { status: 200 })
  } catch (error: any) {
    console.error("Error updating user:", error)
    return new NextResponse(
      JSON.stringify({ error: "An unexpected error occurred" }),{ status: 500 })
  }
}

export async function DELETE(_req: Request,{ params }: { params: { id: string } }) {
  const userId = Number(params.id)
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!existingUser) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
    })
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    })
    return new NextResponse(JSON.stringify({ message: "User deleted successfully",user:deletedUser}), { status: 200 })
  } catch (error: any) {
    console.error("Error deleting user:", error)
    return new NextResponse(
      JSON.stringify({ error: "An unexpected error occurred" }),{ status: 500 })
  }
}