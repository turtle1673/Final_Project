// components/ConditionalNav.tsx
"use client"

import { usePathname } from "next/navigation"
import TitleTestNav from "./TitleTestNav"

export default function ConditionalNav() {
  const pathname = usePathname()
  const hideOn = ["/login"] // path ที่ไม่อยากให้มี navbar

  if (hideOn.includes(pathname)) {
    return null
  }

  return <TitleTestNav />
}
