import Link from 'next/link'
import { FeatureIcon } from '@/components/FeatureIcon'
import { PanelMock } from '@/components/PanelMock'
import { DISCORD_URL, FEATURES } from '@/data/site'

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <h1 className="hero__mark">SERASA</h1>
            <p className="hero__headline">Domine o jogo. Seja o melhor.</p>
            <p className="hero__sub">
              Chega de ficar pra trás. Ativa o SERASA e joga no nível máximo.
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
              O SERASA junta otimização e ajustes de input num fluxo limpo.
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
