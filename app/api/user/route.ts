import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET(_req: Request) {
  const employees = await prisma.user.findMany()
  return NextResponse.json((employees), { status: 200 })
}


export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== "MANAGER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(({ error: "All fields are required" }),{status: 400})}

  //ตรวจว่ามี user นี้อยู่ในฐานข้อมูลหรือไม่
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return NextResponse.json(({ error: "User already exists" }),{status: 400})}

    //สร้าง user ใหม่ลงในฐานข้อมูล
    const newUser = await prisma.user.create({
      data:body
    })

    console.log("Creating user:", newUser)
    return NextResponse.json(({ message: "User created!",user:newUser}), {status: 201})
  } catch (error: any) {
    console.error("Error creating user:", error)
    return NextResponse.json(({error: error.message || "An unexpected error occurred"}),{status: 500})
  }
}
