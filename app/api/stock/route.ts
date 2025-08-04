import { NextResponse } from "next/server"

export default function GET(_req: Request) {
  const data = {
    name: "coffee",
    price: 100
  }
  return new NextResponse(JSON.stringify(data), { status: 200 });
}