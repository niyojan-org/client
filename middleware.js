import { NextResponse } from "next/server";

export function middleware(request) {
  // Allow POST to root to prevent 405 errors when Cloudflare triggers probe
  if (request.method === "POST" && request.nextUrl.pathname === "/") {
    return new NextResponse(null, { status: 200 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
