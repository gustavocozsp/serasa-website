import type { Metadata } from 'next'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://srs.lat'
).replace(/\/$/, '')

export const SITE_NAME = 'SRS'
export const SITE_TAGLINE = 'Domine o jogo. Seja o melhor.'
export const SITE_DESCRIPTION =
  'SRS: otimização, Pure Mode, mira, skins e ajustes de input para FiveM. Painel completo para dominar o jogo.'

export const SITE_KEYWORDS = [
  'SRS',
  'srs.lat',
  'FiveM',
  'otimização FiveM',
  'Pure Mode',
  'crosshair FiveM',
  'painel FiveM',
  'FPS FiveM',
  'latência FiveM',
  'skins FiveM',
  'software FiveM',
  'GTA RP',
]

export const DEFAULT_OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'SRS · Domine o jogo',
  type: 'image/png' as const,
}

export const PUBLIC_ROUTES = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
  { path: '/loja', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/termos', changeFrequency: 'monthly' as const, priority: 0.3 },
  { path: '/privacidade', changeFrequency: 'monthly' as const, priority: 0.3 },
]

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim()

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'pt-BR': SITE_URL,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  ...(googleVerification
    ? {
        verification: {
          google: googleVerification,
        },
      }
    : {}),
}

type PageMetaInput = {
  title: string
  description: string
  path: string
  index?: boolean
  keywords?: string[]
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
  keywords,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  const image = DEFAULT_OG_IMAGE.url

  return {
    title,
    description,
    keywords: keywords ?? SITE_KEYWORDS,
    alternates: {
      canonical: url,
    },
    robots: index
      ? {
          index: true,
          follow: true,
        }
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: 'website',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [image],
    },
  }
}

export function organizationJsonLd() {
  const discord = 'https://discord.gg/srs'
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/favicon.svg'),
    sameAs: [discord, 'https://x.com/srs', 'https://www.youtube.com/@srs'],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function webPageJsonLd({
  path,
  title,
  description,
}: {
  path: string
  title: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: 'pt-BR',
  }
}

export function productListJsonLd(
  products: ReadonlyArray<{
    id: string
    name: string
    description: string
    price: string
  }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Licenças ${SITE_NAME}`,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: `SRS ${product.name}`,
        description: product.description,
        brand: {
          '@type': 'Brand',
          name: SITE_NAME,
        },
        offers: {
          '@type': 'Offer',
          url: absoluteUrl(`/loja/checkout?plan=${product.id}`),
          priceCurrency: 'BRL',
          price: product.price.replace(',', '.'),
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  }
}
