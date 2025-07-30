import prisma from "@/lib/prisma";

export async function GET(req:Request) {
    const employees = await prisma.employee.findMany()    
}

export async function POST(req: Request) {

}