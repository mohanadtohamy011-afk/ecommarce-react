import { decode } from "next-auth/jwt";
import {cookies } from "next/headers";
export async function getOurToken(){


    const token = (await cookies()).get("next-auth.session-token")?.value

    const decodedToken = await decode({token: token , secret : process.env.AUTH_SECRET! })

    // console.log(decodedToken);

    return decodedToken!.token as string
    
}
