'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/loja', label: 'Loja' },
  { href: '/termos', label: 'Termos' },
  { href: '/privacidade', label: 'Privacidade' },
] as const

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [authed, setAuthed] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    let alive = true
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return
        setAuthed(Boolean(data?.ok && data?.user))
      })
      .catch(() => {
        if (alive) setAuthed(false)
      })
    return () => {
      alive = false
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (target && frameRef.current && !frameRef.current.contains(target)) {
        setOpen(false)
      }
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const loginHref = authed ? '/dashboard' : '/api/auth/login'
  const loginLabel = authed ? 'Painel' : 'Login'

  return (
    <header className={`hud${scrolled ? ' hud--solid' : ''}${open ? ' hud--open' : ''}`}>
      <div className="hud__frame" ref={frameRef}>
        <nav className="hud__dock" aria-label="Principal">
          <Link href="/" className="hud__brand" onClick={() => setOpen(false)}>
            <span className="hud__brand-dot" aria-hidden />
            <span className="hud__brand-text">SERASA</span>
          </Link>

          <div className="hud__rail hud__rail--bar">
            {LINKS.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hud__link${active ? ' is-active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="hud__link-dot" aria-hidden />
                  <span className="hud__link-label">{link.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="hud__actions">
            {authed ? (
              <Link href="/dashboard" className="hud__buy" onClick={() => setOpen(false)}>
                Painel
              </Link>
            ) : (
              <a href={loginHref} className="hud__buy" onClick={() => setOpen(false)}>
                {loginLabel}
              </a>
            )}

            <button
              type="button"
              className="hud__menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>

        <div className={`hud__rail hud__rail--sheet${open ? ' is-open' : ''}`}>
          {LINKS.map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)

            return (
              <Link
                key={`m-${link.href}`}
                href={link.href}
                className={`hud__link${active ? ' is-active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <span className="hud__link-dot" aria-hidden />
                <span className="hud__link-label">{link.label}</span>
              </Link>
            )
          })}
          {authed ? (
            <Link
              href="/dashboard"
              className="hud__link"
              onClick={() => setOpen(false)}
            >
              <span className="hud__link-dot" aria-hidden />
              <span className="hud__link-label">Painel</span>
            </Link>
          ) : (
            <a
              href="/api/auth/login"
              className="hud__link"
              onClick={() => setOpen(false)}
            >
              <span className="hud__link-dot" aria-hidden />
              <span className="hud__link-label">Login</span>
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
