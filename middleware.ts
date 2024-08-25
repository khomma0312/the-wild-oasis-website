// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import { auth } from "@/app/_lib/auth";

export const middleware = auth;

// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/about", request.url));
// }

export const config = {
  matcher: ["/account", "/account/profile"],
};
