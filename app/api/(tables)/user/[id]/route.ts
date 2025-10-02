import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request,{ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params
 
  const user = await prisma.user.findUnique({
    where: { id },
    include:{orders:true}
  })

  if (!user) {
    return NextResponse.json({ error : "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data:user }, { status: 200 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await req.json()
  const {name,role} = body
  try {
    const user = await prisma.user.findUnique({where: { id }})
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        role
      }
    })

    return NextResponse.json({ message: "user updated! ", data: updatedUser },{ status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error:err.message || "Internal server error" },{ status: 500 })
  }
}

export async function DELETE(_req: Request,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params
    const user = await prisma.user.findUnique({where: { id }})

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if(user.email === process.env.NEXT_PUBLIC_SEED_EMAIL){
      return NextResponse.json({error:"Can not delete seed user"},{status:400})
    }

    //delete user by id
    const deletedUser = await prisma.user.delete({where: { id }})

    return NextResponse.json({ message: "User deleted successfully", data: deletedUser },{ status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error:err.message || "Internal server error" },{ status: 500 }
    )
  }
}
