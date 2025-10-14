
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl
  console.log(token)

  //ไม่มี token redirect ไปหน้า /drinks-menu และไปได้แค่หน้า /drinks-menu หรือ /login เท่านั้น
  if (!token) {
    if (pathname.startsWith("/login") || pathname.startsWith("/drinks-menu")) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/drinks-menu", req.url))
  }

  //มี token จะ redirect ไป root page และจะไปหน้า /drinks-menu และ /login ไม้ได้
  // if (pathname.startsWith("/login") || pathname.startsWith("/drinks-menu")) {
  //   return NextResponse.redirect(new URL("/", req.url))
  // }

  if(token.role !== "MANAGER" && pathname.startsWith("/manager")){
    return NextResponse.redirect(new URL("/employee",req.url))
  }

  //
  if (pathname === "/") {
    if (token.role === "EMPLOYEE") {
      return NextResponse.redirect(new URL("/employee", req.url));
    }
    if (token.role === "MANAGER") {
      return NextResponse.redirect(new URL("/manager", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}