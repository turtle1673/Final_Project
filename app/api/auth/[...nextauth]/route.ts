import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
// import bcrypt from "bcryptjs"

export const authOptions:AuthOptions = ({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user) return null

        // const valid = await bcrypt.compare(credentials.password, user.password)
        // if (!valid) return null

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
        token.id = user.id
        token.role = user.role
    }
    return token
  },
  async session({ session, token }) {
    if (token) {
        session.user.id = String(token.id)
        session.user.role = token.role as string
    }
    if(!session){
      return {
        user: {
          id: "guest",
          role: "CUSTOMER",
          name: "Guest",
          email: null,
        },
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
      }
    }
    return session
  },
},
  secret: process.env.NEXTAUTH_SECRET,
})
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
