'use client'

import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

export function LogoutButton() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const titleId = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const modal =
    open && mounted
      ? createPortal(
          <div
            className="modal"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false)
            }}
          >
            <div
              className="modal__panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <p className="modal__eyebrow">Conta</p>
              <h2 id={titleId} className="modal__title">
                Sair da dashboard?
              </h2>
              <p className="modal__copy">Você vai precisar entrar com Discord de novo.</p>

              <div className="modal__actions">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </button>
                <a href="/api/auth/logout" className="btn btn--neon">
                  Sair
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      <button
        type="button"
        className="btn btn--ghost"
        onClick={() => setOpen(true)}
      >
        Sair
      </button>
      {modal}
    </>
  )
}
