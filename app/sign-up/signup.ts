"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function signUp(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  //ตรวจว่าข้อมูลครบหรือไม่
  if (!name || !email || !password) {
    return {error: "All fields are required"}
  }
  
  //ตรวจว่ามี user นี้อยู่ในฐานข้อมูลหรือไม่
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })
  try {
  if (existingUser) {
    throw new Error("User already exists");
  }
  //สร้าง user ใหม่ลงในฐานข้อมูล
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
  console.log("Signing up user:", newUser);
} catch (error: any) {
  console.error("Error signing up user:", error);
  return {error: error.message || "An unexpected error occurred"};
}
redirect("/sign-in")
}
