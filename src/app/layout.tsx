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
    default: 'SERASA · Domine o jogo',
    template: '%s · SERASA',
  },
  description:
    'SERASA: otimização, Pure Mode, mira, skins e ajustes de input para FiveM. Domine o jogo. Seja o melhor.',
  metadataBase: new URL('https://serasa.best'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'SERASA · Domine o jogo',
    description:
      'Otimização e utilitários para FiveM num só painel. Domine o jogo. Seja o melhor.',
    siteName: 'SERASA',
    locale: 'pt_BR',
    type: 'website',
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
