import type { Metadata } from 'next'
import { Manrope, Outfit } from 'next/font/google'
import { Ambient } from '@/components/Ambient'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { SocialRail } from '@/components/SocialRail'
import { organizationJsonLd, rootMetadata, websiteJsonLd } from '@/lib/seo'
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

export const metadata: Metadata = rootMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${manrope.variable}`}>
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
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
