import { NextResponse } from 'next/server'
import {
  ACCESS_COOKIE,
  OAUTH_STATE_COOKIE,
  REFRESH_COOKIE,
  cookieSecure,
  getDiscordClientId,
  getOAuthRedirectUri,
  getSiteUrl,
  readAuthCookies,
  fetchWebMe,
} from '@/lib/auth'

export async function GET() {
  const site = getSiteUrl()
  const { accessToken } = await readAuthCookies()

  if (accessToken) {
    const { res } = await fetchWebMe(accessToken)
    if (res.ok) {
      return NextResponse.redirect(`${site}/dashboard`)
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

  res.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: 'lax',
    path: '/',
    maxAge: 10 * 60,
  })

  res.cookies.set(ACCESS_COOKIE, '', { path: '/', maxAge: 0 })
  res.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 })

  return res
}
