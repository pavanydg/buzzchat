import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest){
    const token = await getToken({req,secret: process.env.NEXTAUTH_SECRET})
    console.log(token)

    const {pathname} = req.nextUrl;

    if (pathname.includes('/api/auth') || pathname.startsWith('/_next') || pathname.includes('/static')) {
        return NextResponse.next();
      }

    if(!token){
        return NextResponse.redirect(new URL("/signin",req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/chats']
}