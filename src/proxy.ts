import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked 'async if using await inside
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = await getToken({ req: request });

    console.log(pathname);
    const isAuthPages = pathname == "/login" || pathname == "/register"


    if (token && isAuthPages) {
        return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/`))
    }
    if (!token && !isAuthPages) {
        return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}login`))

    }


    return NextResponse.next()
}
export const config = {
    matcher: ["/cart", "/login", "/register"],
}