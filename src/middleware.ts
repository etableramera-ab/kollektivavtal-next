import { NextRequest, NextResponse } from "next/server";

const locales = ["sv", "en", "ar", "so", "fa", "es", "pl"];
const defaultLocale = "sv";

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

  // Swedish (default) needs no prefix — existing URLs work as-is
  const locale = getLocale(request);
  if (locale === defaultLocale) return;

  // Redirect to /{locale}/path
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|sitemap|robots|ads|favicon|manifest|icons).*)"],
};
