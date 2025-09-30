import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(_req: Request) {
  const employees = await prisma.user.findMany()
  return NextResponse.json({data:employees}, { status: 200 })
}


export async function POST(req: Request) {

  const body = await req.json()
  const { name, email, password, role } = body

  //ตรวจว่ามี user นี้อยู่ในฐานข้อมูลหรือไม่
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (user) {
      return NextResponse.json(({ error: "User already exists" }),{status: 400})
    }

    //สร้าง user ใหม่ลงในฐานข้อมูล
    const newUser = await prisma.user.create({
      data:{
        name,
        email,
        password,
        role,
      }
    })

    return NextResponse.json(({data:newUser, message: "User created!"}), {status: 201})
  } catch (err: any) {
    return NextResponse.json(({error: err.message || "Internal server error"}),{status: 500})
  }
}
