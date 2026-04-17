import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, getAllowedRolesForPath, type AppRole } from "@/lib/auth/session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const allowedRoles = getAllowedRolesForPath(pathname);

  if (!allowedRoles) {
    return NextResponse.next();
  }

  const role = request.cookies.get(AUTH_COOKIE_NAME)?.value as AppRole | undefined;

  if (!role) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("reason", "auth-required");
    return NextResponse.redirect(redirectUrl);
  }

  if (!allowedRoles.includes(role)) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("reason", "role-mismatch");
    redirectUrl.searchParams.set("from", pathname);
    redirectUrl.searchParams.set("role", role);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/super-admin/:path*", "/admin/:path*", "/librarian/:path*", "/lecturer/:path*", "/student/:path*", "/guest/:path*", "/search/:path*"],
};
