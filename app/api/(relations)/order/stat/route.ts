import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    return NextResponse.json({message : "response ok"},{status:200})
}