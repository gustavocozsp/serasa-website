'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const PLAN_LABELS: Record<string, string> = {
  week: 'Semanal',
  month: 'Mensal',
  quarter: 'Trimestral',
  year: 'Anual',
}

type CheckoutUser = {
  username: string
  displayName: string
  avatarUrl: string
}

type PlanView = {
  id: string
  name: string
  duration: string
  price: string
  featured: boolean
  perks: readonly string[]
}

type PaymentView = {
  pixId: string
  planId: string
  amountCents: number
  amountLabel: string
  originalAmountCents: number
  coupon: string | null
  status: 'pending' | 'paid' | 'expired' | 'cancelled'
  brCode: string
  qrImage: string | null
  expiresAt: string
  granted: boolean
}

function formatRemain(ms: number) {
  if (ms <= 0) return '0:00'
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function PixLogo() {
  return (
    <img
      className="pay-desk__pix-logo"
      src="/images/pix.png"
      alt=""
      width={32}
      height={32}
    />
  )
}

function DeskBar({ left, right }: { left: string; right: string }) {
  return (
    <header className="pay-desk__bar">
      <span>{left}</span>
      <i aria-hidden />
      <span>{right}</span>
    </header>
  )
}

export function CheckoutClient({
  plan,
  user,
  loginHref,
}: {
  plan: PlanView
  user: CheckoutUser | null
  loginHref: string
}) {
  const [coupon, setCoupon] = useState('')
  const [couponOpen, setCouponOpen] = useState(false)
  const [applied, setApplied] = useState<{
    code: string
    amountLabel: string
    originalAmountLabel: string
    amountCents: number
    originalAmountCents: number
  } | null>(null)
  const [busy, setBusy] = useState(false)
  const [couponBusy, setCouponBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [payment, setPayment] = useState<PaymentView | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const pollRef = useRef<number | null>(null)

  const remainMs = payment?.expiresAt
    ? new Date(payment.expiresAt).getTime() - now
    : 0
  const waiting = payment?.status === 'pending' && remainMs > 0
  const paid = payment?.status === 'paid' || payment?.granted
  const expired =
    payment != null && !paid && (payment.status === 'expired' || remainMs <= 0)

  const priceNote = useMemo(() => {
    const code = payment?.coupon || applied?.code
    const original = payment?.originalAmountCents ?? applied?.originalAmountCents
    const amount = payment?.amountCents ?? applied?.amountCents
    if (code && original != null && amount != null && original > amount) {
      return `Cupom ${code}`
    }
    return null
  }, [payment, applied])

  const displayPrice =
    payment?.amountLabel?.replace(/^R\$\s*/, '').trim() ||
    applied?.amountLabel.replace(/^R\$\s*/, '').trim() ||
    plan.price

  const originalPrice = (() => {
    const original = payment?.originalAmountCents ?? applied?.originalAmountCents
    const amount = payment?.amountCents ?? applied?.amountCents
    if (original == null || amount == null || original <= amount) return null
    if (applied && applied.originalAmountCents === original) {
      return applied.originalAmountLabel.replace(/^R\$\s*/, '').trim()
    }
    return (original / 100).toFixed(2).replace('.', ',')
  })()

  const stopPoll = useCallback(() => {
    if (pollRef.current != null) {
      window.clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  const pollOnce = useCallback(
    async (pixId: string) => {
      const res = await fetch(`/api/checkout/pix/${encodeURIComponent(pixId)}`, {
        cache: 'no-store',
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.payment) {
        setPayment(data.payment as PaymentView)
        if (data.payment.status === 'paid' || data.payment.granted) {
          stopPoll()
        }
      }
    },
    [stopPoll],
  )

  useEffect(() => {
    if (!waiting || !payment?.pixId) return
    const t = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [waiting, payment?.pixId])

  useEffect(() => {
    if (!waiting || !payment?.pixId) {
      stopPoll()
      return
    }
    pollRef.current = window.setInterval(() => {
      void pollOnce(payment.pixId)
    }, 3200)
    return stopPoll
  }, [waiting, payment?.pixId, pollOnce, stopPoll])

  async function generatePix() {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          coupon: applied?.code || coupon.trim() || undefined,
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.payment) {
        throw new Error(data?.error || 'Não foi possível gerar o PIX.')
      }
      setPayment(data.payment as PaymentView)
      setNow(Date.now())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao gerar o PIX.')
    } finally {
      setBusy(false)
    }
  }

  async function applyCoupon() {
    const code = coupon.trim()
    if (!code) {
      setError('Informe um cupom.')
      return
    }
    setCouponBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id, coupon: code }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.quote) {
        throw new Error(data?.error || 'Cupom inválido.')
      }
      setApplied({
        code: data.quote.coupon,
        amountLabel: data.quote.amountLabel,
        originalAmountLabel: data.quote.originalAmountLabel,
        amountCents: data.quote.amountCents,
        originalAmountCents: data.quote.originalAmountCents,
      })
      setCoupon(data.quote.coupon)
      setCouponOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cupom inválido.')
    } finally {
      setCouponBusy(false)
    }
  }

  async function copyCode() {
    const code = payment?.brCode
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setError('Não foi possível copiar. Selecione o código manualmente.')
    }
  }

  if (!user) {
    return (
      <div className="pay-page">
        <article className="pay-desk pay-desk--solo">
          <DeskBar left="Checkout" right="Passo 1 de 2" />
          <div className="pay-desk__body">
            <p className="pay-desk__kicker">Licença {plan.name}</p>
            <h1 className="pay-desk__title">{plan.name}</h1>
            <p className="pay-desk__copy">
              Entre com Discord para gerar o PIX. O acesso cai na mesma conta.
            </p>
            <div className="pay-desk__price">
              <span>R$</span>
              <strong>{plan.price}</strong>
              <em>{plan.duration}</em>
            </div>
            <a href={loginHref} className="btn btn--neon btn--lg btn--block">
              Continuar com Discord
            </a>
            <Link href="/loja" className="pay-desk__link">
              Voltar aos planos
            </Link>
          </div>
        </article>
      </div>
    )
  }

  if (paid) {
    return (
      <div className="pay-page">
        <article className="pay-desk pay-desk--solo">
          <DeskBar left="Checkout" right="Concluído" />
          <div className="pay-desk__body">
            <p className="pay-desk__kicker">Pagamento confirmado</p>
            <h1 className="pay-desk__title">Acesso liberado</h1>
            <p className="pay-desk__copy">
              {PLAN_LABELS[plan.id] || plan.name} ativo em @{user.username}.
              Baixe o launcher no painel.
            </p>
            <div className="pay-desk__stack">
              <Link href="/dashboard" className="btn btn--neon btn--lg btn--block">
                Ir ao painel
              </Link>
              <Link href="/loja" className="btn btn--ghost btn--lg btn--block">
                Ver planos
              </Link>
            </div>
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="pay-page">
      <article className="pay-desk">
        <DeskBar left="Checkout" right={waiting ? 'Aguardando PIX' : 'Passo 2 de 2'} />
        <div className="pay-desk__split">
          <div className="pay-desk__col">
            <p className="pay-desk__kicker">Pedido</p>
            <h1 className="pay-desk__title">{plan.name}</h1>
            <p className="pay-desk__meta">{plan.duration}</p>
            <div className="pay-desk__price">
              <span>R$</span>
              <strong>{displayPrice}</strong>
              {originalPrice ? <s className="pay-desk__was">{originalPrice}</s> : null}
            </div>
            {priceNote ? <p className="pay-desk__note">{priceNote}</p> : null}
            <ul className="pay-desk__perks">
              {plan.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <div className="pay-desk__who">
              <img
                className="pay-desk__who-avatar"
                src={user.avatarUrl}
                alt=""
                width={48}
                height={48}
                referrerPolicy="no-referrer"
              />
              <div className="pay-desk__who-id">
                <strong>{user.displayName}</strong>
                <span>@{user.username}</span>
              </div>
              <p className="pay-desk__who-hint">
                Você está adquirindo a licença para essa conta
              </p>
            </div>
          </div>

          <div className="pay-desk__col pay-desk__col--action">
            {!payment || expired ? (
              <>
                <p className="pay-desk__kicker">Pagamento</p>
                <h2 className="pay-desk__title pay-desk__title--sm pay-desk__pix">
                  <PixLogo />
                  PIX
                </h2>
                <p className="pay-desk__copy">Pagamento instantâneo via PIX.</p>

                {applied && !couponOpen ? (
                  <div className="pay-desk__applied">
                    <span>Cupom {applied.code}</span>
                    <button type="button" onClick={() => setCouponOpen(true)}>
                      Trocar
                    </button>
                  </div>
                ) : couponOpen ? (
                  <div className="pay-desk__coupon">
                    <span>Cupom</span>
                    <div className="pay-desk__coupon-row">
                      <input
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            void applyCoupon()
                          }
                        }}
                        maxLength={32}
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="Código"
                      />
                      <button
                        type="button"
                        className="btn btn--neon"
                        disabled={couponBusy}
                        onClick={() => void applyCoupon()}
                      >
                        {couponBusy ? '…' : 'Aplicar'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="pay-desk__coupon-btn"
                    onClick={() => setCouponOpen(true)}
                  >
                    Tenho cupom
                  </button>
                )}

                {error ? <p className="pay-desk__error">{error}</p> : null}

                <button
                  type="button"
                  className="btn btn--neon btn--lg btn--block"
                  disabled={busy}
                  onClick={() => void generatePix()}
                >
                  {busy ? 'Gerando…' : expired ? 'Gerar novo PIX' : 'Gerar PIX'}
                </button>
                <Link href="/loja" className="pay-desk__link">
                  Escolher outro plano
                </Link>
              </>
            ) : (
              <>
                <p className="pay-desk__kicker">PIX gerado</p>
                <h2 className="pay-desk__title pay-desk__title--sm pay-desk__pix">
                  <PixLogo />
                  PIX
                </h2>
                <p className="pay-desk__timer" aria-live="polite">
                  Expira em {formatRemain(remainMs)}
                </p>

                {payment.qrImage ? (
                  <div className="pay-desk__qr">
                    <img src={payment.qrImage} alt="QR Code PIX" width={228} height={228} />
                  </div>
                ) : null}

                <div className="pay-desk__copia">
                  <div className="pay-desk__codewrap">
                    <p className="pay-desk__code" title={payment.brCode}>
                      {payment.brCode}
                    </p>
                    <button
                      type="button"
                      className="pay-desk__copy"
                      onClick={() => void copyCode()}
                    >
                      {copied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                </div>
                <p className="pay-desk__wait">Confirmando pagamento…</p>
                {error ? <p className="pay-desk__error">{error}</p> : null}
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
