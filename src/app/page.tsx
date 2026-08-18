import type { Metadata } from 'next'
import Link from 'next/link'
import { FeatureIcon } from '@/components/FeatureIcon'
import { JsonLd } from '@/components/JsonLd'
import { PanelMock } from '@/components/PanelMock'
import { DISCORD_URL, FEATURES } from '@/data/site'
import { pageMetadata, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Domine o jogo',
  description:
    'SRS: otimização, Pure Mode, mira, skins e ajustes de input para FiveM. Domine o jogo. Seja o melhor.',
  path: '/',
  keywords: [
    'SRS',
    'FiveM',
    'otimização FiveM',
    'Pure Mode FiveM',
    'crosshair overlay',
    'painel FiveM',
    'FPS GTA RP',
  ],
})

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: '/',
          title: 'SRS · Domine o jogo',
          description:
            'SRS: otimização, Pure Mode, mira, skins e ajustes de input para FiveM. Domine o jogo. Seja o melhor.',
        })}
      />
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <h1 className="hero__mark">SRS</h1>
            <p className="hero__headline">Domine o jogo. Seja o melhor.</p>
            <p className="hero__sub">
              Chega de ficar pra trás. Ativa o SRS e joga no nível máximo.
            </p>
            <div className="hero__actions">
              <Link href="/loja" className="btn btn--neon btn--lg">
                Ver planos
              </Link>
              <a
                href={DISCORD_URL}
                className="btn btn--ghost btn--lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Entrar no Discord
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <PanelMock />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="section__eyebrow">Módulos</p>
            <h2 className="section__title">Tudo que você precisa, num só painel</h2>
            <p className="section__copy">
              O SRS junta otimização e ajustes de input num fluxo limpo.
              Escolhe o que precisa e aplica em um toque.
            </p>
          </div>

          <div className="features">
            {FEATURES.map((f) => (
              <article key={f.title} className="feature">
                <div className="feature__top">
                  <span className="feature__icon" aria-hidden>
                    <FeatureIcon name={f.icon} />
                  </span>
                </div>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__copy">{f.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta__aura" aria-hidden />
        <div className="cta__inner">
          <p className="cta__eyebrow">
            <span className="cta__eyebrow-dot" aria-hidden />
            próximo passo
          </p>
          <h2 className="cta__title">Pronto para ser o melhor?</h2>
          <div className="cta__divider" aria-hidden>
            <span />
            <i />
            <span />
          </div>
          <p className="cta__copy">
            Escolha um plano e ative sua licença.
          </p>
          <div className="cta__actions">
            <Link href="/loja" className="btn btn--neon btn--lg">
              Ir para a loja
            </Link>
            <a
              href={DISCORD_URL}
              className="btn btn--ghost btn--lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no Discord
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
