'use client'

import { useEffect, useState } from 'react'

type Status = 'connecting' | 'ok' | 'error'

const PORT = 3847

export default function DesktopAuthPage() {
  const [status, setStatus] = useState<Status>('connecting')
  const [detail, setDetail] = useState('Conectando ao painel SERASA…')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')
    if (error) {
      setStatus('error')
      setDetail('A autorização no Discord foi cancelada.')
      return
    }

    const code = params.get('code')
    if (!code) {
      setStatus('error')
      setDetail('Código OAuth ausente. Abra o login pelo painel SERASA.')
      return
    }

    const qs = new URLSearchParams(params)
    qs.set('format', 'json')

    const ctrl = new AbortController()
    const timer = window.setTimeout(() => ctrl.abort(), 20_000)

    fetch(`http://127.0.0.1:${PORT}/auth/callback?${qs.toString()}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: ctrl.signal,
      cache: 'no-store',
    })
      .then(async (res) => {
        const data = await res.json().catch(() => null)
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || 'Falha ao entregar o login ao painel')
        }
        setStatus('ok')
        setDetail('Login concluído. Pode fechar esta aba e voltar ao painel.')
      })
      .catch(() => {
        setStatus('error')
        setDetail(
          'Não achamos o painel aberto neste PC. Abra o SERASA e tente entrar de novo.',
        )
      })
      .finally(() => {
        window.clearTimeout(timer)
      })

    return () => {
      ctrl.abort()
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <section className="desktop-auth">
      <div className="desktop-auth__card">
        <p className="desktop-auth__brand">SERASA</p>
        <span className={`desktop-auth__pill${status === 'ok' ? ' is-ok' : ''}${status === 'error' ? ' is-err' : ''}`}>
          {status === 'connecting' ? 'Conectando' : status === 'ok' ? 'Autenticado' : 'Atenção'}
        </span>
        <h1>
          {status === 'connecting'
            ? 'Quase lá'
            : status === 'ok'
              ? 'Login concluído'
              : 'Não deu certo'}
        </h1>
        <p>{detail}</p>
      </div>
    </section>
  )
}
