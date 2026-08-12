import { cookies } from 'next/headers'

export const ACCESS_COOKIE = 'srs_web_access'
export const REFRESH_COOKIE = 'srs_web_refresh'
export const OAUTH_STATE_COOKIE = 'srs_oauth_state'

export type PublicUser = {
  discordId: string
  username: string
  displayName: string
  avatar: string | null
  banner: string | null
  accentColor: string | null
  role: string
  plan: 'week' | 'month' | 'quarter' | 'year' | null
  planExpiresAt: string | null
  licenseRemainingMs: number
  banned: boolean
  hasAccess: boolean
  lastLoginAt: string | null
  createdAt: string | null
}

export function getApiBaseUrl() {
  return (
    process.env.SRS_API_URL ||
    process.env.NEXT_PUBLIC_SRS_API_URL ||
    process.env.SERASA_API_URL ||
    process.env.NEXT_PUBLIC_SERASA_API_URL ||
    'https://serasa-api-best.squareweb.app'
  ).replace(/\/$/, '')
}

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    'https://srs.lat'
  ).replace(/\/$/, '')
}

export function getDiscordClientId() {
  return (
    process.env.DISCORD_CLIENT_ID ||
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ||
    ''
  ).trim()
}

export function getOAuthRedirectUri() {
  return `${getSiteUrl()}/api/auth/callback`
}

export function discordAvatarUrl(user: Pick<PublicUser, 'discordId' | 'avatar'>) {
  const avatar = String(user.avatar || '').trim()
  if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
    return avatar
  }
  if (avatar) {
    const ext = avatar.startsWith('a_') ? 'gif' : 'png'
    return `https://cdn.discordapp.com/avatars/${user.discordId}/${avatar}.${ext}?size=128`
  }
  const index = Number(user.discordId.slice(-1)) % 6
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`
}

export function cookieSecure() {
  return process.env.NODE_ENV === 'production'
}

export function cookieDomain(): string | undefined {
  try {
    const host = new URL(getSiteUrl()).hostname
    if (host === 'srs.lat' || host.endsWith('.srs.lat')) {
      return '.srs.lat'
    }
  } catch {}
  return undefined
}

function baseCookieOptions() {
  const domain = cookieDomain()
  return {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: 'lax' as const,
    path: '/',
    ...(domain ? { domain } : {}),
  }
}

export function accessCookieOptions(maxAge = 15 * 60) {
  return {
    ...baseCookieOptions(),
    maxAge,
  }
}

export function refreshCookieOptions(maxAge = 7 * 24 * 60 * 60) {
  return {
    ...baseCookieOptions(),
    maxAge,
  }
}

export function oauthStateCookieOptions(maxAge = 10 * 60) {
  return {
    ...baseCookieOptions(),
    maxAge,
  }
}

export function clearCookieOptions() {
  return {
    ...baseCookieOptions(),
    maxAge: 0,
  }
}

export async function readAuthCookies() {
  const jar = await cookies()
  return {
    accessToken: jar.get(ACCESS_COOKIE)?.value || '',
    refreshToken: jar.get(REFRESH_COOKIE)?.value || '',
  }
}

export async function fetchWebMe(accessToken: string) {
  const res = await fetch(`${getApiBaseUrl()}/me/web`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  })
  const data = await res.json().catch(() => null)
  return { res, data }
}

export async function refreshWebSession(refreshToken: string) {
  const res = await fetch(`${getApiBaseUrl()}/auth/web/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
    cache: 'no-store',
  })
  const data = await res.json().catch(() => null)
  return { res, data }
}

export const PLAN_LABELS: Record<string, string> = {
  week: 'Semanal',
  month: 'Mensal',
  quarter: 'Trimestral',
  year: 'Anual',
}

export function formatRemaining(ms: number) {
  if (ms <= 0) return 'Expirada'
  const totalMin = Math.floor(ms / 60_000)
  const days = Math.floor(totalMin / (60 * 24))
  const hours = Math.floor((totalMin % (60 * 24)) / 60)
  const mins = totalMin % 60
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

export function formatDatePt(iso: string | null) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
