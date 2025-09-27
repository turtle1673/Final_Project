import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const Ssession = async () => {
    return await getServerSession(authOptions)
}

export default Ssession