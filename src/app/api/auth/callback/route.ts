import { NextRequest, NextResponse } from 'next/server'
import {
  ACCESS_COOKIE,
  OAUTH_NEXT_COOKIE,
  OAUTH_STATE_COOKIE,
  REFRESH_COOKIE,
  accessCookieOptions,
  clearCookieOptions,
  getApiBaseUrl,
  getOAuthRedirectUri,
  getSiteUrl,
  refreshCookieOptions,
  safeNextPath,
} from '@/lib/auth'

function fail(code: string) {
  return NextResponse.redirect(`${getSiteUrl()}/login?error=${encodeURIComponent(code)}`)
}

export async function GET(req: NextRequest) {
  const site = getSiteUrl()
  const url = req.nextUrl
  const error = url.searchParams.get('error')
  if (error) return fail(error)

  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const savedState = req.cookies.get(OAUTH_STATE_COOKIE)?.value
  const next = safeNextPath(req.cookies.get(OAUTH_NEXT_COOKIE)?.value)

  if (!code || !state || !savedState || state !== savedState) {
    return fail('invalid_state')
  }

  const api = getApiBaseUrl()
  const redirectUri = getOAuthRedirectUri()

  const exchangeRes = await fetch(`${api}/auth/discord/exchange`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, redirectUri }),
    cache: 'no-store',
  })
  const exchange = await exchangeRes.json().catch(() => null)

  if (!exchangeRes.ok || !exchange?.accessToken) {
    return fail(exchange?.code || 'discord_exchange')
  }

  const loginRes = await fetch(`${api}/auth/discord/web`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ discordAccessToken: exchange.accessToken }),
  })
  const login = await loginRes.json().catch(() => null)

  if (!loginRes.ok || !login?.accessToken || !login?.refreshToken) {
    return fail(login?.code || 'access_denied')
  }

  const dest = next || (login.user?.hasAccess ? '/dashboard' : '/loja')
  const res = NextResponse.redirect(`${site}${dest}`)
  res.cookies.set(ACCESS_COOKIE, login.accessToken, accessCookieOptions(login.expiresIn || 900))
  res.cookies.set(REFRESH_COOKIE, login.refreshToken, refreshCookieOptions())
  res.cookies.set(OAUTH_STATE_COOKIE, '', clearCookieOptions())
  res.cookies.set(OAUTH_NEXT_COOKIE, '', clearCookieOptions())
  return res
}
