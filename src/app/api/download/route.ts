import { NextResponse } from 'next/server'

const CDN_BASE = (process.env.SERASA_CDN_URL || 'https://cdn.serasa.best/win').replace(
  /\/$/,
  '',
)

/** Site delivers the WinForms launcher; Electron setup is fetched by the launcher via latest.yml. */
export async function GET() {
  return NextResponse.redirect(`${CDN_BASE}/SERASA-Launcher-2.exe`, 302)
}
