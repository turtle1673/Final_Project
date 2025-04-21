"use server"

import prisma from '@/lib/prisma'

const signUp = async (formData: FormData) => {
  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    console.error('Email or password is missing')
    return
  }

  try {
    // ใช้ Prisma เพื่อสร้างผู้ใช้โดยตรง
    const user = await prisma.user.create({
      data: {
        email,
        password, // อย่าลืมเข้ารหัสรหัสผ่านก่อนบันทึก (เช่น ใช้ bcrypt)
      },
    })

    console.log('User registered successfully:', user)
    return user
  } catch (error) {
    console.error('Error during sign-up:', error)
    throw new Error('Failed to register user')
  }
}

export default signUp