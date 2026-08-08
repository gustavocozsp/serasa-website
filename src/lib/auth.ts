import { cookies } from 'next/headers'

export const ACCESS_COOKIE = 'serasa_web_access'
export const REFRESH_COOKIE = 'serasa_web_refresh'
export const OAUTH_STATE_COOKIE = 'serasa_oauth_state'

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
    process.env.SERASA_API_URL ||
    process.env.NEXT_PUBLIC_SERASA_API_URL ||
    'https://serasa-api-best.squareweb.app'
  ).replace(/\/$/, '')
}

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    'https://serasa.best'
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
  if (user.avatar) {
    const ext = user.avatar.startsWith('a_') ? 'gif' : 'png'
    return `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.${ext}?size=128`
  }
  const index = Number(user.discordId.slice(-1)) % 6
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`
}

export function cookieSecure() {
  return process.env.NODE_ENV === 'production'
}

export function accessCookieOptions(maxAge = 15 * 60) {
  return {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  }
}

export function refreshCookieOptions(maxAge = 7 * 24 * 60 * 60) {
  return {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
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
