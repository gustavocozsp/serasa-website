import { NextRequest, NextResponse } from 'next/server'
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  accessCookieOptions,
  getSiteUrl,
  readAuthCookies,
  refreshCookieOptions,
  refreshWebSession,
} from '@/lib/auth'

export async function GET(req: NextRequest) {
  const site = getSiteUrl()
  const next = req.nextUrl.searchParams.get('next') || '/dashboard'
  const safeNext = next.startsWith('/') ? next : '/dashboard'
  const { refreshToken } = await readAuthCookies()

  if (!refreshToken) {
    return NextResponse.redirect(`${site}/login`)
  }

  const { res, data } = await refreshWebSession(refreshToken)
  if (!res.ok || !data?.accessToken) {
    const out = NextResponse.redirect(
      `${site}/login?error=${encodeURIComponent(data?.code || 'session_invalid')}`,
    )
    out.cookies.set(ACCESS_COOKIE, '', { path: '/', maxAge: 0 })
    out.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 })
    return out
  }

  const out = NextResponse.redirect(`${site}${safeNext}`)
  out.cookies.set(ACCESS_COOKIE, data.accessToken, accessCookieOptions(data.expiresIn || 900))
  if (data.refreshToken) {
    out.cookies.set(REFRESH_COOKIE, data.refreshToken, refreshCookieOptions())
  }
  return out
}
