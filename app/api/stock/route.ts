import { NextResponse } from "next/server";

export default function GET(_req:Request){
    const data = {
        name:"choco",
        age: 20,
    }
    return NextResponse.json(data, { status: 200 });
}