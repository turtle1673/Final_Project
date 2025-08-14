import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
  const employees = await prisma.user.findMany()
  return new NextResponse(JSON.stringify(employees), { status: 200 })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { userName, userEmail, userPassword } = body
  //ตรวจว่าข้อมูลครบหรือไม่
  if (!userName || !userEmail || !userPassword) {
    return new NextResponse(
      JSON.stringify({ error: "All fields are required" }),{status: 400})
  }
  //ตรวจว่ามี user นี้อยู่ในฐานข้อมูลหรือไม่
  try {
    const existingUser = await prisma.user.findUnique({
      where: { userEmail },
    })
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "User already exists" }),{status: 400})
    }
    //สร้าง user ใหม่ลงในฐานข้อมูล
    const newUser = await prisma.user.create({
      data: {
        userName,
        userEmail,
        userPassword,
      },
    })

    console.log("Creating user:", newUser)
    return new NextResponse(JSON.stringify({ message: "User created!",user:newUser}), {status: 201})
  } catch (error: any) {
    console.error("Error creating user:", error)
    return new NextResponse(
      JSON.stringify({
        error: error.message || "An unexpected error occurred"}),{status: 500})
  }
}
