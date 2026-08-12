import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCORD_URL, PLANS } from '@/data/site'

export const metadata: Metadata = {
  title: 'Loja',
  description:
    'Compre sua licença SRS. Planos semanal, mensal, trimestral e anual com acesso completo ao painel.',
}

export default function LojaPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Loja</p>
          <h1 className="section__title">Licenças SRS</h1>
          <p className="section__copy">
            Compre o melhor. Seja o melhor. Seja MVP.
          </p>
        </div>

        <div className="plans">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`plan${plan.featured ? ' plan--featured' : ''}`}
            >
              <div className="plan__head">
                {plan.featured ? (
                  <span className="plan__badge">Popular</span>
                ) : (
                  <span className="plan__badge plan__badge--ghost">Plano</span>
                )}
              </div>

              <h2 className="plan__name">{plan.name}</h2>
              <p className="plan__duration">{plan.duration}</p>

              <div className="plan__price">
                <span className="plan__currency">R$</span>
                <strong>{plan.price}</strong>
              </div>

              <div className="plan__rule" aria-hidden>
                <i />
              </div>

              <ul className="plan__list">
                {plan.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>

              <div className="plan__action">
                <a
                  href={DISCORD_URL}
                  className={`btn btn--block${plan.featured ? ' btn--neon' : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Comprar
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="store-note">
          <p>
            Após o pagamento, sua conta recebe o acesso automaticamente.
            Dúvidas?{' '}
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              Entre no servidor
            </a>{' '}
            ou leia os{' '}
            <Link href="/termos">termos de uso</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
