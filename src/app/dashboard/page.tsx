import type { Metadata } from 'next'
import Link from 'next/link'
import { LogoutButton } from '@/components/LogoutButton'
import { DOWNLOAD_LABEL, DOWNLOAD_URL, QUICK_STEPS } from '@/data/dashboard'
import { DISCORD_URL } from '@/data/site'
import {
  discordAvatarUrl,
  formatDatePt,
  formatRemaining,
} from '@/lib/auth'
import { requireDashboardUser } from '@/lib/session'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Área do cliente SRS.',
  robots: { index: false, follow: false },
}

export default async function DashboardPage() {
  const user = await requireDashboardUser()
  const remaining = formatRemaining(user.licenseRemainingMs)
  const expires = formatDatePt(user.planExpiresAt)

  return (
    <section className="dash">
      <div className="dash__inner">
        <header className="dash__top">
          <div className="dash__identity">
            <img
              className="dash__avatar"
              src={discordAvatarUrl(user)}
              alt=""
              width={56}
              height={56}
              referrerPolicy="no-referrer"
            />
            <div className="dash__hello">
              <h1>{user.displayName || user.username}</h1>
              <p>@{user.username}</p>
            </div>
            <span className={`dash__pill${user.hasAccess ? ' is-on' : ''}`}>
              {user.hasAccess ? 'Ativa' : 'Inativa'}
            </span>
          </div>

          <div className="dash__top-actions">
            <Link href="/loja" className="btn btn--neon">
              {user.hasAccess ? 'Renovar' : 'Comprar'}
            </Link>
            <LogoutButton />
          </div>
        </header>

        <div className="dash__stats">
          <article className="dash__box">
            <span className="dash__label">Tempo restante</span>
            <strong className="dash__value dash__value--neon">{remaining}</strong>
          </article>
          <article className="dash__box">
            <span className="dash__label">Expira em</span>
            <strong className="dash__value dash__value--sm">{expires}</strong>
          </article>
        </div>

        <div className="dash__panels">
          <article className="dash__box dash__dl">
            <div className="dash__dl-mark" aria-hidden>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                <path
                  d="M12 3v10m0 0l3.5-3.5M12 13L8.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="square"
                />
                <path
                  d="M5 16.5V19h14v-2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="square"
                />
              </svg>
            </div>

            <div className="dash__dl-copy">
              <span className="dash__label">Download</span>
              <h2>Painel Windows</h2>
              <p>Instalador oficial</p>
            </div>

            {user.hasAccess ? (
              <a
                href={DOWNLOAD_URL}
                className="btn btn--neon btn--block dash__dl-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {DOWNLOAD_LABEL}
              </a>
            ) : (
              <Link href="/loja" className="btn btn--neon btn--block dash__dl-btn">
                Ativar licença
              </Link>
            )}
          </article>

          <article className="dash__box dash__box--guide">
            <div className="dash__box-head">
              <span className="dash__label">Início rápido</span>
            </div>
            <ol className="dash__steps">
              {QUICK_STEPS.map((step, i) => (
                <li key={step}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
            <a
              href={DISCORD_URL}
              className="btn btn--ghost btn--block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
