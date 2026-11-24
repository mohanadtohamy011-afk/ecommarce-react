import { authOpthions } from "@/lib/authOptions"
import NextAuth from "next-auth"

const handler = NextAuth(authOpthions)
export { handler as GET, handler as POST }