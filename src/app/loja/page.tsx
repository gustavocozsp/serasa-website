import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { DISCORD_URL, PLANS } from '@/data/site'
import { pageMetadata, productListJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Loja',
  description:
    'Compre sua licença SRS. Planos semanal, mensal, trimestral e anual com acesso completo ao painel FiveM.',
  path: '/loja',
  keywords: [
    'comprar SRS',
    'licença FiveM',
    'plano SRS',
    'SRS mensal',
    'SRS anual',
  ],
})

export default function LojaPage() {
  const products = PLANS.map((plan) => ({
    id: plan.id,
    name: plan.name,
    description: `${plan.duration}. ${plan.perks[0]}`,
    price: plan.price,
  }))

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: '/loja',
            title: 'Loja SRS',
            description:
              'Compre sua licença SRS. Planos semanal, mensal, trimestral e anual com acesso completo ao painel.',
          }),
          productListJsonLd(products),
        ]}
      />
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
                <Link
                  href={`/loja/checkout?plan=${plan.id}`}
                  className={`btn btn--block${plan.featured ? ' btn--neon' : ''}`}
                >
                  Comprar
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="store-note">
          <p>
            Após o pagamento PIX, o acesso cai na sua conta Discord automaticamente.
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
    </>
  )
}
