import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PLANS } from '@/data/site'
import { discordAvatarUrl } from '@/lib/auth'
import { getSessionUser } from '@/lib/session'
import { pageMetadata } from '@/lib/seo'
import { CheckoutClient } from './CheckoutClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = pageMetadata({
  title: 'Checkout',
  description: 'Pague com PIX e receba o acesso SRS na hora.',
  path: '/loja/checkout',
  index: false,
})

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>
}) {
  const params = await searchParams
  const plan = PLANS.find((item) => item.id === params.plan)
  if (!plan) notFound()

  const next = `/loja/checkout?plan=${plan.id}`
  const user = await getSessionUser(next)

  return (
    <CheckoutClient
      plan={plan}
      user={
        user
          ? {
              username: user.username,
              displayName: user.displayName || user.username,
              avatarUrl: discordAvatarUrl(user),
            }
          : null
      }
      loginHref={`/api/auth/login?next=${encodeURIComponent(next)}`}
    />
  )
}
