import { NextResponse } from 'next/server'

const CDN_BASE = (process.env.SERASA_CDN_URL || 'https://serasa.best/win').replace(
  /\/$/,
  '',
)

export async function GET() {
  try {
    const res = await fetch(`${CDN_BASE}/latest.yml`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: 'Não foi possível obter a versão mais recente' },
        { status: 502 },
      )
    }

    const yml = await res.text()
    const pathMatch = /^path:\s*(.+)$/m.exec(yml)
    const urlMatch = /^\s*-\s*url:\s*(.+)$/m.exec(yml)
    const file = (pathMatch?.[1] || urlMatch?.[1] || '').trim().replace(/^['"]|['"]$/g, '')

    if (!file) {
      return NextResponse.json(
        { ok: false, error: 'Arquivo de setup não encontrado no feed' },
        { status: 502 },
      )
    }

    const target = file.startsWith('http')
      ? file
      : `${CDN_BASE}/${file.replace(/^\//, '')}`

    return NextResponse.redirect(target, 302)
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Falha ao resolver download' },
      { status: 502 },
    )
  }
}
