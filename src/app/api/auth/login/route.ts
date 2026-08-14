import { NextRequest, NextResponse } from 'next/server'
import {
  ACCESS_COOKIE,
  OAUTH_NEXT_COOKIE,
  OAUTH_STATE_COOKIE,
  REFRESH_COOKIE,
  clearCookieOptions,
  fetchWebMe,
  getDiscordClientId,
  getOAuthRedirectUri,
  getSiteUrl,
  isSameSiteHost,
  oauthNextCookieOptions,
  oauthStateCookieOptions,
  readAuthCookies,
  safeNextPath,
} from '@/lib/auth'

export async function GET(req: NextRequest) {
  const site = getSiteUrl()
  const siteHost = new URL(site).host
  const reqHost = req.headers.get('x-forwarded-host') || req.nextUrl.host

  if (!isSameSiteHost(reqHost, siteHost)) {
    return NextResponse.redirect(`${site}/api/auth/login`)
  }

  const next = safeNextPath(req.nextUrl.searchParams.get('next'))
  const { accessToken } = await readAuthCookies()

  if (accessToken) {
    const { res, data } = await fetchWebMe(accessToken)
    if (res.ok && data?.user) {
      const dest = next || (data.user.hasAccess ? '/dashboard' : '/loja')
      return NextResponse.redirect(`${site}${dest}`)
    }
  }

  const clientId = getDiscordClientId()
  if (!clientId) {
    return NextResponse.redirect(`${site}/login?error=oauth_config`)
  }

  const state = crypto.randomUUID().replace(/-/g, '')
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    scope: 'identify',
    redirect_uri: getOAuthRedirectUri(),
    state,
    prompt: 'consent',
  })

  const res = NextResponse.redirect(
    `https://discord.com/api/oauth2/authorize?${params.toString()}`,
  )

  res.cookies.set(OAUTH_STATE_COOKIE, state, oauthStateCookieOptions())
  if (next) {
    res.cookies.set(OAUTH_NEXT_COOKIE, next, oauthNextCookieOptions())
  } else {
    res.cookies.set(OAUTH_NEXT_COOKIE, '', clearCookieOptions())
  }
  res.cookies.set(ACCESS_COOKIE, '', clearCookieOptions())
  res.cookies.set(REFRESH_COOKIE, '', clearCookieOptions())

  return res
}
