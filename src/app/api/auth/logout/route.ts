import { NextResponse } from 'next/server'
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  getApiBaseUrl,
  getSiteUrl,
  readAuthCookies,
} from '@/lib/auth'

export async function POST() {
  const { refreshToken } = await readAuthCookies()
  if (refreshToken) {
    try {
      await fetch(`${getApiBaseUrl()}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
        cache: 'no-store',
      })
    } catch {}
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ACCESS_COOKIE, '', { path: '/', maxAge: 0 })
  res.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 })
  return res
}

export async function GET() {
  const { refreshToken } = await readAuthCookies()
  if (refreshToken) {
    try {
      await fetch(`${getApiBaseUrl()}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
        cache: 'no-store',
      })
    } catch {}
  }

  const res = NextResponse.redirect(`${getSiteUrl()}/`)
  res.cookies.set(ACCESS_COOKIE, '', { path: '/', maxAge: 0 })
  res.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 })
  return res
}
