import type { Metadata } from 'next'
import Link from 'next/link'
import { DOWNLOAD_CDN_BASE, DOWNLOAD_LABEL, DOWNLOAD_URL, TUTORIALS } from '@/data/dashboard'
import { DISCORD_URL } from '@/data/site'
import {
  PLAN_LABELS,
  discordAvatarUrl,
  formatDatePt,
  formatRemaining,
} from '@/lib/auth'
import { requireDashboardUser } from '@/lib/session'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Área do cliente SERASA: licença, download e tutoriais.',
  robots: { index: false, follow: false },
}

const PLAN_MS: Record<string, number> = {
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  quarter: 90 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
}

export default async function DashboardPage() {
  const user = await requireDashboardUser()
  const planLabel = user.plan ? PLAN_LABELS[user.plan] || user.plan : '—'
  const remaining = formatRemaining(user.licenseRemainingMs)
  const expires = formatDatePt(user.planExpiresAt)
  const totalMs = (user.plan && PLAN_MS[user.plan]) || user.licenseRemainingMs || 1
  const progress = Math.min(
    100,
    Math.max(6, Math.round((user.licenseRemainingMs / totalMs) * 100)),
  )

  return (
    <section className="dash">
      <div className="dash__inner">
        <header className="dash__hero">
          <div className="dash__identity">
            <img
              className="dash__avatar"
              src={discordAvatarUrl(user)}
              alt=""
              width={64}
              height={64}
            />
            <div>
              <p className="dash__eyebrow">Área do cliente</p>
              <h1 className="dash__title">
                Olá, {user.displayName || user.username}
              </h1>
              <p className="dash__sub">@{user.username}</p>
            </div>
          </div>

          <div className="dash__hero-actions">
            <Link href="/loja" className="btn">
              Renovar
            </Link>
            <a href="/api/auth/logout" className="btn btn--ghost">
              Sair
            </a>
          </div>
        </header>

        <div className="dash__grid">
          <article className="dash__card dash__card--license">
            <div className="dash__card-head">
              <span className="dash__badge">Licença</span>
              <span className={`dash__status${user.hasAccess ? ' is-on' : ''}`}>
                {user.hasAccess ? 'Ativa' : 'Inativa'}
              </span>
            </div>

            <div className="dash__license-row">
              <div>
                <p className="dash__metric-label">Plano</p>
                <p className="dash__metric-value">{planLabel}</p>
              </div>
              <div>
                <p className="dash__metric-label">Tempo restante</p>
                <p className="dash__metric-value dash__metric-value--neon">
                  {remaining}
                </p>
              </div>
              <div>
                <p className="dash__metric-label">Expira em</p>
                <p className="dash__metric-value dash__metric-value--sm">{expires}</p>
              </div>
            </div>

            <div className="dash__bar" aria-hidden>
              <i style={{ width: `${progress}%` }} />
            </div>
            <p className="dash__hint">
              O acesso é vinculado ao seu Discord. Sem licença ativa, o painel e
              esta dashboard bloqueiam o login.
            </p>
          </article>

          <article className="dash__card dash__card--download">
            <div className="dash__card-head">
              <span className="dash__badge">Download</span>
            </div>
            <h2 className="dash__card-title">Painel Windows</h2>
            <p className="dash__card-copy">
              Baixe o instalador oficial, faça login com o Discord da licença e
              comece pela otimização.
            </p>
            <ul className="dash__checklist">
              <li>Windows 10/11</li>
              <li>Login só com licença ativa</li>
              <li>1 PC por conta (HWID)</li>
            </ul>
            <a
              href={DOWNLOAD_URL}
              className="btn btn--neon btn--block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Baixar {DOWNLOAD_LABEL}
            </a>
            <p className="dash__hint">
              Feed de updates:{' '}
              <a
                href={`${DOWNLOAD_CDN_BASE}/latest.yml`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {DOWNLOAD_CDN_BASE}
              </a>
            </p>
          </article>

          <article className="dash__card dash__card--tutorials">
            <div className="dash__card-head">
              <span className="dash__badge">Tutoriais</span>
            </div>
            <h2 className="dash__card-title">Como usar o SERASA</h2>
            <p className="dash__card-copy">
              Guia rápido do zero ao setup. Dúvidas? Chama no Discord.
            </p>

            <div className="dash__tutorials">
              {TUTORIALS.map((item, index) => (
                <details key={item.id} className="dash__tutorial" open={index === 0}>
                  <summary>
                    <span className="dash__tutorial-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{item.title}</span>
                  </summary>
                  <ol>
                    {item.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </details>
              ))}
            </div>

            <a
              href={DISCORD_URL}
              className="btn btn--ghost btn--block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir Discord
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
