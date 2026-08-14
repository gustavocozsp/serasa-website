import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl, readAuthCookies } from '@/lib/auth'

async function apiFetch(path: string, init: RequestInit) {
  const { accessToken } = await readAuthCookies()
  if (!accessToken) {
    return NextResponse.json(
      { ok: false, error: 'Entre com Discord para continuar.', code: 'auth_missing' },
      { status: 401 },
    )
  }

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...(init.headers || {}),
    },
    cache: 'no-store',
  })

  const data = await res.json().catch(() => null)
  if (!data) {
    return NextResponse.json(
      { ok: false, error: 'Falha ao falar com o servidor.', code: 'upstream' },
      { status: 502 },
    )
  }

  return NextResponse.json(data, { status: res.status })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const planId = String(body?.planId || '')
  const coupon = String(body?.coupon || '').trim()

  if (!['week', 'month', 'quarter', 'year'].includes(planId)) {
    return NextResponse.json(
      { ok: false, error: 'Plano inválido.', code: 'validation' },
      { status: 400 },
    )
  }

  return apiFetch('/checkout/pix', {
    method: 'POST',
    body: JSON.stringify({
      planId,
      coupon: coupon || undefined,
    }),
  })
}
