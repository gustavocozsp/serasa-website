import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  type PublicUser,
  fetchWebMe,
} from '@/lib/auth'

export async function getDashboardUser(): Promise<PublicUser | null> {
  const jar = await cookies()
  const accessToken = jar.get(ACCESS_COOKIE)?.value || ''
  const refreshToken = jar.get(REFRESH_COOKIE)?.value || ''

  if (accessToken) {
    const { res, data } = await fetchWebMe(accessToken)
    if (res.ok && data?.user) return data.user as PublicUser
    if (res.status === 403) return null
  }

  if (refreshToken) {
    redirect('/api/auth/session?next=/dashboard')
  }

  return null
}

export async function requireDashboardUser() {
  const user = await getDashboardUser()
  if (!user?.hasAccess) {
    redirect('/login')
  }
  return user
}
