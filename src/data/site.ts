export const PLANS = [
  {
    id: 'week',
    name: 'Semanal',
    duration: '7 dias de acesso',
    price: '14,90',
    featured: false,
    perks: [
      'Acesso completo ao painel',
      'Atualizações inclusas',
      'Suporte via Discord',
    ],
  },
  {
    id: 'month',
    name: 'Mensal',
    duration: '30 dias de acesso',
    price: '34,99',
    featured: true,
    perks: [
      'Tudo do plano Semanal',
      'Atualizações inclusas',
      'Prioridade no suporte',
      'Melhor custo-benefício curto',
    ],
  },
  {
    id: 'quarter',
    name: 'Trimestral',
    duration: '90 dias de acesso',
    price: '69,90',
    featured: false,
    perks: [
      'Tudo do plano Mensal',
      '3 meses sem renovar',
      'Economia vs mensal',
      'Acesso a novos módulos',
    ],
  },
  {
    id: 'year',
    name: 'Anual',
    duration: '365 dias de acesso',
    price: '199,90',
    featured: false,
    perks: [
      'Tudo do plano Trimestral',
      '1 ano completo',
      'Maior economia',
      'Status VIP na comunidade',
    ],
  },
] as const

export const DISCORD_URL = 'https://discord.gg/srsgg'

export const SOCIALS = [
  {
    id: 'discord',
    label: 'Discord',
    href: 'https://discord.gg/srsgg',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    href: 'https://x.com/serasafix',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@serasafix',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/serasafix',
  },
] as const

export const FEATURES = [
  {
    title: 'Otimização',
    copy: 'Libera RAM, fecha processos e ajusta latência, rede e desempenho com um toque.',
    icon: 'zap',
  },
  {
    title: 'Pure Mode',
    copy: 'Bypass do Pure Mode do FiveM, manual ou automático, antes de entrar no servidor.',
    icon: 'shield',
  },
  {
    title: 'Mira',
    copy: 'Overlay de crosshair estável, inclusive em fullscreen exclusive, com presets.',
    icon: 'crosshair',
  },
  {
    title: 'FiveM',
    copy: 'Canal, camera shake, prioridade, cache e ajustes finos para jogar sem travar.',
    icon: 'game',
  },
  {
    title: 'Mouse & Teclado',
    copy: 'Tweaks de input do Windows para resposta linear, estável e previsível.',
    icon: 'mouse',
  },
  {
    title: 'Skins & Monitor',
    copy: 'Catálogo de skins FiveM e presets de cor/resolução prontos para o setup.',
    icon: 'monitor',
  },
] as const
