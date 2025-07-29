"use server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function signUp(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  try {
    const existingUser = await prisma.user.findUnique({where: { email }})
    if (existingUser) {
      throw new Error("This user already exists")
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    console.log("User created:", newUser)
    redirect("/sign-in")
  } catch (error:any) {
    throw new Error(error.message || "Error creating user")
  }
}