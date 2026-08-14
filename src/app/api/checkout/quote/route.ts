import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl, readAuthCookies } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { accessToken } = await readAuthCookies()
  if (!accessToken) {
    return NextResponse.json(
      { ok: false, error: 'Entre com Discord para continuar.', code: 'auth_missing' },
      { status: 401 },
    )
  }

  const body = await req.json().catch(() => null)
  const planId = String(body?.planId || '')
  const coupon = String(body?.coupon || '').trim()

  if (!['week', 'month', 'quarter', 'year'].includes(planId) || !coupon) {
    return NextResponse.json(
      { ok: false, error: 'Informe um cupom válido.', code: 'validation' },
      { status: 400 },
    )
  }

  const res = await fetch(`${getApiBaseUrl()}/checkout/quote`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ planId, coupon }),
    cache: 'no-store',
  })

  const data = await res.json().catch(() => null)
  if (!data) {
    return NextResponse.json(
      { ok: false, error: 'Falha ao validar o cupom.', code: 'upstream' },
      { status: 502 },
    )
  }

  return NextResponse.json(data, { status: res.status })
}
