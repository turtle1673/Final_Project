"use server"
import prisma from "@/lib/prisma";

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const user = await prisma.user.findUnique({
    where: { email },
    })

    if (!user) {
      throw new Error("User not found")
    }
    if (user.password !== password) {
      throw new Error("Invalid password")
    }
    
    // รอใส่การจัดการ session หรือ token ที่นี่

    console.log("Login successful:", user)
    return {message: "Login successful !!",user}
}catch (error:any) {
    throw new Error(error.message || "Error logging in")
  }
}
