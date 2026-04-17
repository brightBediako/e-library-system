import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth/session";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}
