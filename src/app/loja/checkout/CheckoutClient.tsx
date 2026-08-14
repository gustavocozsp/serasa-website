'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const PLAN_LABELS: Record<string, string> = {
  week: 'Semanal',
  month: 'Mensal',
  quarter: 'Trimestral',
  year: 'Anual',
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

export function CheckoutClient({
  plan,
  user,
  loginHref,
}: {
  plan: PlanView
  user: { username: string } | null
  loginHref: string
}) {
  const [coupon, setCoupon] = useState('')
  const [couponOpen, setCouponOpen] = useState(false)
  const [busy, setBusy] = useState(false)
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
    if (!payment) return null
    if (
      payment.coupon &&
      payment.originalAmountCents > payment.amountCents
    ) {
      return `Cupom ${payment.coupon}`
    }
    return null
  }, [payment])

  const stopPoll = useCallback(() => {
    if (pollRef.current != null) {
      window.clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  const pollOnce = useCallback(async (pixId: string) => {
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
  }, [stopPoll])

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
          coupon: coupon.trim() || undefined,
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
      <div className="pay">
        <div className="pay__card pay__card--narrow">
          <p className="section__eyebrow">Checkout</p>
          <h1 className="pay__title">{plan.name}</h1>
          <p className="pay__lead">
            Entre com Discord para gerar o PIX. O acesso cai na mesma conta.
          </p>
          <div className="pay__price-row">
            <span>R$</span>
            <strong>{plan.price}</strong>
          </div>
          <a href={loginHref} className="btn btn--neon btn--block">
            Continuar com Discord
          </a>
          <Link href="/loja" className="pay__back">
            Voltar aos planos
          </Link>
        </div>
      </div>
    )
  }

  if (paid) {
    return (
      <div className="pay">
        <div className="pay__card pay__card--narrow pay__card--ok">
          <p className="section__eyebrow">Pago</p>
          <h1 className="pay__title">Acesso liberado</h1>
          <p className="pay__lead">
            {PLAN_LABELS[plan.id] || plan.name} ativo em @{user.username}.
            Baixe o launcher no painel.
          </p>
          <div className="pay__actions">
            <Link href="/dashboard" className="btn btn--neon btn--block">
              Ir ao painel
            </Link>
            <Link href="/loja" className="btn btn--ghost btn--block">
              Ver planos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pay">
      <div className="pay__grid">
        <aside className="pay__card pay__summary">
          <p className="section__eyebrow">Plano</p>
          <h1 className="pay__title">{plan.name}</h1>
          <p className="pay__meta">{plan.duration}</p>
          <div className="pay__price-row">
            <span>R$</span>
            <strong>{payment?.amountLabel?.replace('R$', '').trim() || plan.price}</strong>
          </div>
          {priceNote ? <p className="pay__coupon-note">{priceNote}</p> : null}
          <ul className="plan__list">
            {plan.perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
          <p className="pay__account">
            Conta · <strong>@{user.username}</strong>
          </p>
        </aside>

        <section className="pay__card pay__stage">
          {!payment || expired ? (
            <>
              <p className="section__eyebrow">PIX</p>
              <h2 className="pay__stage-title">Pagamento instantâneo</h2>
              <p className="pay__lead">
                O QR expira em 60 minutos. A licença libera sozinha após a confirmação.
              </p>

              {couponOpen || coupon ? (
                <label className="pay__coupon">
                  <span>Cupom</span>
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    maxLength={32}
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Opcional"
                  />
                </label>
              ) : (
                <button
                  type="button"
                  className="pay__coupon-toggle"
                  onClick={() => setCouponOpen(true)}
                >
                  Tenho um cupom
                </button>
              )}

              {error ? <p className="pay__error">{error}</p> : null}

              <button
                type="button"
                className="btn btn--neon btn--block"
                disabled={busy}
                onClick={() => void generatePix()}
              >
                {busy ? 'Gerando…' : expired ? 'Gerar novo PIX' : 'Gerar PIX'}
              </button>
              <Link href="/loja" className="pay__back">
                Escolher outro plano
              </Link>
            </>
          ) : (
            <>
              <p className="section__eyebrow">Aguardando</p>
              <h2 className="pay__stage-title">Escaneie o QR</h2>
              <p className="pay__timer" aria-live="polite">
                Expira em {formatRemain(remainMs)}
              </p>

              {payment.qrImage ? (
                <div className="pay__qr">
                  <img src={payment.qrImage} alt="QR Code PIX" width={196} height={196} />
                </div>
              ) : null}

              <button type="button" className="btn btn--block" onClick={() => void copyCode()}>
                {copied ? 'Copiado' : 'Copiar código PIX'}
              </button>

              <p className="pay__code" title={payment.brCode}>
                {payment.brCode}
              </p>

              <p className="pay__wait">Confirmando pagamento…</p>
              {error ? <p className="pay__error">{error}</p> : null}
            </>
          )}
        </section>
      </div>
    </div>
  )
}
