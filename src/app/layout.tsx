import type { Metadata } from 'next'
import { Manrope, Outfit } from 'next/font/google'
import { Ambient } from '@/components/Ambient'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SocialRail } from '@/components/SocialRail'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['500', '600', '700'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'SRS · Domine o jogo',
    template: '%s · SRS',
  },
  description:
    'SRS: otimização, Pure Mode, mira, skins e ajustes de input para FiveM. Domine o jogo. Seja o melhor.',
  metadataBase: new URL('https://srs.lat'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'SRS · Domine o jogo',
    description:
      'Otimização e utilitários para FiveM num só painel. Domine o jogo. Seja o melhor.',
    siteName: 'SRS',
    locale: 'pt_BR',
    type: 'website',
    url: 'https://srs.lat',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'SRS',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SRS · Domine o jogo',
    description:
      'Otimização e utilitários para FiveM num só painel. Domine o jogo. Seja o melhor.',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${manrope.variable}`}>
      <body>
        <Ambient />
        <div className="shell">
          <Header />
          <SocialRail />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
