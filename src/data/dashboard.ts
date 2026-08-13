const CDN_BASE = (
  process.env.NEXT_PUBLIC_SRS_CDN_URL ?? 'https://cdn.srs.lat/win'
).replace(/\/$/, '')

export const DOWNLOAD_URL = `${CDN_BASE}/SRS-Launcher.exe`
export const DOWNLOAD_LABEL = 'Baixar instalador'

export const QUICK_STEPS = [
  'Baixe e instale o painel',
  'Entre com o Discord da licença',
  'Rode a otimização no Overview',
  'Ative o Pure Mode antes do FiveM',
] as const
