// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JWTVerifyResult, jwtVerify } from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const jwt = request.cookies.get('bca-token');

    if (jwt === undefined)
        return NextResponse.redirect(new URL('/login', request.url));

    if (process.env.SECRET === undefined) throw new Error('Unable to load SECRET environment variable');

    try {
        const payload: JWTVerifyResult = await jwtVerify(jwt.value, new TextEncoder().encode(process.env.SECRET));
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/admin/:path*',
    ],
};