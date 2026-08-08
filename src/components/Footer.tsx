import Link from 'next/link'

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/loja', label: 'Loja' },
  { href: '/termos', label: 'Termos' },
  { href: '/privacidade', label: 'Privacidade' },
] as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden />
      <div className="footer__mark" aria-hidden>
        SERASA
      </div>

      <div className="footer__shell">
        <div className="footer__panel">
          <div className="footer__top">
            <div className="footer__identity">
              <span className="footer__dot" aria-hidden />
              <div>
                <p className="footer__kicker">SERASA</p>
                <p className="footer__line">Domine o jogo. Seja o melhor.</p>
              </div>
            </div>

            <div className="footer__actions">
              <Link href="/loja" className="btn btn--neon">
                Comprar licença
              </Link>
              <a
                href="https://discord.gg/serasa"
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>
            </div>
          </div>

          <div className="footer__rail">
            <nav className="footer__nav" aria-label="Rodapé">
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="footer__chip">
                  <span className="footer__chip-dot" aria-hidden />
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="footer__socials">
              <a
                href="https://discord.gg/serasa"
                className="footer__social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                title="Discord"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                  <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.07.07 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.07.07 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.07.07 0 0 0 .084-.027 14.09 14.09 0 0 0 1.226-1.994.07.07 0 0 0-.041-.098 13.107 13.107 0 0 1-1.872-.892.07.07 0 0 1-.007-.117c.126-.094.252-.192.371-.291a.07.07 0 0 1 .076-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .078.01c.12.098.245.198.372.292a.07.07 0 0 1-.006.117 12.3 12.3 0 0 1-1.873.891.07.07 0 0 0-.041.099c.36.698.772 1.362 1.225 1.993a.07.07 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.07.07 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="https://x.com/serasa"
                className="footer__social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                title="X"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@serasa"
                className="footer__social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                  <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__meta">
            <span>© {year} SERASA</span>
            <span className="footer__sep" aria-hidden />
            <span>serasa.best</span>
            <span className="footer__sep" aria-hidden />
            <span>Todos os direitos reservados</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
