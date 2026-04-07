import { NextRequest, NextResponse } from "next/server";

const locales = ["sv", "en", "ar", "so", "fa", "es", "pl"];
const defaultLocale = "sv";

// Paths that have dynamic locale versions: /[locale]/avtal/[slug]
function hasLocaleVersion(pathname: string): boolean {
  // Homepage
  if (pathname === "/" || pathname === "") return true;
  // Individual agreement pages: /avtal/[slug]
  if (pathname.startsWith("/avtal/") && pathname.split("/").length === 3) return true;
  return false;
}

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage) {
    for (const locale of locales) {
      if (acceptLanguage.toLowerCase().includes(locale)) return locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API, _next, sitemap, robots etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/sitemap") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Check if locale already in URL
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Swedish (default) needs no prefix
  const locale = getLocale(request);
  if (locale === defaultLocale) return;

  // Only redirect if the path has a locale version — otherwise serve Swedish
  if (!hasLocaleVersion(pathname)) return;

  // Redirect to /{locale}/path
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|sitemap|robots|ads|favicon|manifest|icons).*)"],
};
