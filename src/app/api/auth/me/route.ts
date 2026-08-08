import { NextResponse } from 'next/server'
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  accessCookieOptions,
  fetchWebMe,
  readAuthCookies,
  refreshCookieOptions,
  refreshWebSession,
} from '@/lib/auth'

export async function GET() {
  const { accessToken, refreshToken } = await readAuthCookies()

  if (accessToken) {
    const { res, data } = await fetchWebMe(accessToken)
    if (res.ok && data?.user) {
      return NextResponse.json({ ok: true, user: data.user })
    }
    if (res.status === 403) {
      const out = NextResponse.json(
        { ok: false, error: data?.error || 'Acesso negado', code: data?.code || 'access_denied' },
        { status: 403 },
      )
      out.cookies.set(ACCESS_COOKIE, '', { path: '/', maxAge: 0 })
      out.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 })
      return out
    }
  }

  if (refreshToken) {
    const { res, data } = await refreshWebSession(refreshToken)
    if (res.ok && data?.accessToken && data?.user) {
      const out = NextResponse.json({ ok: true, user: data.user })
      out.cookies.set(
        ACCESS_COOKIE,
        data.accessToken,
        accessCookieOptions(data.expiresIn || 900),
      )
      if (data.refreshToken) {
        out.cookies.set(REFRESH_COOKIE, data.refreshToken, refreshCookieOptions())
      }
      return out
    }

    const out = NextResponse.json(
      {
        ok: false,
        error: data?.error || 'Sessão expirada',
        code: data?.code || 'session_invalid',
      },
      { status: 401 },
    )
    out.cookies.set(ACCESS_COOKIE, '', { path: '/', maxAge: 0 })
    out.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 })
    return out
  }

  return NextResponse.json(
    { ok: false, error: 'Não autenticado', code: 'auth_missing' },
    { status: 401 },
  )
}
