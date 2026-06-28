import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Old WordPress spam URLs — return 410 Gone so Google deindexes them
const GONE_PREFIXES = [
  "/wp-content",
  "/wp-includes",
  "/wp-admin",
  "/wp-login",
  "/?p=",
  "/?page_id=",
  "/?cat=",
  "/?tag=",
  "/?author=",
  "/feed",
  "/xmlrpc.php",
  "/wp-cron.php",
  "/wp-json/wp/",
];

const GONE_PATHS = new Set([
  "/wp-login.php",
  "/xmlrpc.php",
  "/wp-cron.php",
]);

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const full = pathname + search;

  if (
    GONE_PATHS.has(pathname) ||
    GONE_PREFIXES.some((p) => full.startsWith(p))
  ) {
    return new NextResponse(null, { status: 410 });
  }
}

export const config = {
  matcher: [
    "/wp-:path*",
    "/xmlrpc.php",
    "/wp-cron.php",
    "/feed/:path*",
  ],
};
