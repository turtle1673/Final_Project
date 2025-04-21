import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        email,
        password, // Note: Store passwords securely using hashing (e.g., bcrypt)
      },
    })

    return NextResponse.json({ message: 'User registered successfully', user })
  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}