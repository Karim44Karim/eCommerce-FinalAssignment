import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const cookieName = process.env.NODE_ENV === "production"? "__Secure-next-auth.session-token":"next-auth.session-token";
    const token = await getToken({ req: request, cookieName });
    if(token){
        if (
          request.nextUrl.pathname === "/login" ||
          request.nextUrl.pathname === "/register"
        ) {
          return NextResponse.redirect(new URL("/", request.url));
        } else {
          return NextResponse.next();
        }
    } else{
        if (request.nextUrl.pathname === "/cart") {
          return NextResponse.redirect(new URL("/login", request.url));
        } else {
          return NextResponse.next();
        }
    }
}

export const config = {
  matcher: ['/cart', '/login', '/register'],
};
