import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = await req.nextUrl.pathname;
  if (
    url.includes("/api/auth") ||
    url.includes("/api/register") ||
    url.includes("/signin") ||
    url.includes("/register")
  ) {
    return NextResponse.next();
  }
  if (!token && url.includes("/api")) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("user-id", token.id as string);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/api/:path*", "/todos/:path*", "/"],
};
