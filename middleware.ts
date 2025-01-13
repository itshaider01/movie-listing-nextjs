import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const token = (await cookies()).get("access-token");
  const url = req.nextUrl.clone();
  const authPaths = ["/login", "/sign-up", "/icons"];
  if (authPaths.includes(url.pathname)) {
    if (token) {
      url.pathname = "/movies";
      return NextResponse.redirect(url);
    }
  } else {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next|static|public|favicon.ico|login|icons).*)"],
};
