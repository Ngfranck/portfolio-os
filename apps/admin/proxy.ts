import { NextResponse } from "next/server";

import { auth } from "./auth";

// Les redirections du proxy doivent inclure le basePath de production.
const basePath =
  process.env.NODE_ENV === "production" ? "/admin" : "";

export default auth((request) => {
  const pathname = request.nextUrl.pathname.startsWith(basePath)
    ? request.nextUrl.pathname.slice(basePath.length) || "/"
    : request.nextUrl.pathname;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname === "/login") {
    if (request.auth?.user) {
      return NextResponse.redirect(new URL(`${basePath}/`, request.url));
    }

    return NextResponse.next();
  }

  if (!request.auth?.user) {
    return NextResponse.redirect(
      new URL(`${basePath}/login`, request.url),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
