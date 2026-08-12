import { NextResponse } from 'next/server'

const CDN_BASE = (
  process.env.SRS_CDN_URL ||
  process.env.SERASA_CDN_URL ||
  'https://cdn.srs.lat/win'
).replace(/\/$/, '')

export async function GET() {
  return NextResponse.redirect(`${CDN_BASE}/SRS-Launcher.exe`, 302)
}
