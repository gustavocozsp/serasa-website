import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl, readAuthCookies } from '@/lib/auth'

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { accessToken } = await readAuthCookies()
  if (!accessToken) {
    return NextResponse.json(
      { ok: false, error: 'Entre com Discord para continuar.', code: 'auth_missing' },
      { status: 401 },
    )
  }

  const { id } = await ctx.params
  const pixId = String(id || '').trim()
  if (!pixId || pixId.length > 128 || /[^\w.:-]/i.test(pixId)) {
    return NextResponse.json(
      { ok: false, error: 'PIX inválido.', code: 'validation' },
      { status: 400 },
    )
  }

  const res = await fetch(`${getApiBaseUrl()}/checkout/pix/${encodeURIComponent(pixId)}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  })

  const data = await res.json().catch(() => null)
  if (!data) {
    return NextResponse.json(
      { ok: false, error: 'Falha ao consultar o PIX.', code: 'upstream' },
      { status: 502 },
    )
  }

  return NextResponse.json(data, { status: res.status })
}
