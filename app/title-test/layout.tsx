"use client"
import TitleTestNav from "@/components/titleTest/TitleTestNav";
import { usePathname } from "next/navigation";

export default function TitleTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const hidelayout = ['/title-test/login'].includes(pathname)
  return (
    <div className="bg-amber-50 text-black flex flex-col w-full min-h-screen items-center">
      {!hidelayout && <TitleTestNav />}
      {children}
    </div>
  )
}