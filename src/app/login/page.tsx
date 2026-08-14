import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCORD_URL } from '@/data/site'
import { safeNextPath } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Entre com Discord para comprar ou acessar a dashboard SRS.',
  robots: { index: false, follow: false },
}

const ERRORS: Record<string, string> = {
  not_authorized:
    'Não foi possível entrar com este Discord. Tente de novo.',
  license_expired:
    'Sua licença expirou. Entre e renove na loja.',
  banned: 'Esta conta está banida. Fale com o suporte no Discord.',
  oauth_config:
    'Login Discord não está configurado no site. Avise o administrador.',
  invalid_state:
    'O login Discord falhou (cookie OAuth). Use srs.lat e clique em Entrar de novo.',
  discord_exchange: 'Falha ao autenticar com o Discord. Tente de novo.',
  access_denied: 'Acesso negado. Tente entrar de novo.',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const params = await searchParams
  const code = params.error || ''
  const next = safeNextPath(params.next)
  const loginHref = next
    ? `/api/auth/login?next=${encodeURIComponent(next)}`
    : '/api/auth/login'
  const message =
    ERRORS[code] ||
    (code ? 'Não foi possível entrar. Tente de novo.' : null)

  return (
    <section className="login-page">
      <div className="login-page__card">
        <p className="section__eyebrow">Acesso</p>
        <h1 className="login-page__title">Login Discord</h1>
        <p className="login-page__copy">
          Use o Discord da compra. Sem licença, você entra para pagar.
        </p>

        {message ? <p className="login-page__error">{message}</p> : null}

        <div className="login-page__actions">
          <a href={loginHref} className="btn btn--neon btn--block">
            Entrar com Discord
          </a>
          <Link href="/loja" className="btn btn--ghost btn--block">
            Ver planos
          </Link>
          <a
            href={DISCORD_URL}
            className="login-page__discord"
            target="_blank"
            rel="noopener noreferrer"
          >
            Entrar no Discord
          </a>
        </div>
      </div>
    </section>
  )
}
