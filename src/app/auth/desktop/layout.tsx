import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Login no painel',
  description: 'Conecte sua conta Discord ao painel desktop SRS.',
  path: '/auth/desktop',
  index: false,
})

export default function DesktopAuthLayout({ children }: { children: React.ReactNode }) {
  return children
}
