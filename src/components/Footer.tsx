import Link from 'next/link'
import { DISCORD_URL, SOCIALS } from '@/data/site'

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/loja', label: 'Loja' },
  { href: '/termos', label: 'Termos' },
  { href: '/privacidade', label: 'Privacidade' },
] as const

export function Footer() {
  const year = new Date().getFullYear()
  const discord = SOCIALS.find((s) => s.id === 'discord')?.href || DISCORD_URL
  const twitter = SOCIALS.find((s) => s.id === 'twitter')?.href || 'https://x.com/serasafix'
  const instagram =
    SOCIALS.find((s) => s.id === 'instagram')?.href || 'https://www.instagram.com/serasafix'

  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden />
      <div className="footer__mark" aria-hidden>
        SRS
      </div>

      <div className="footer__shell">
        <div className="footer__panel">
          <div className="footer__top">
            <div className="footer__identity">
              <span className="footer__dot" aria-hidden />
              <div>
                <p className="footer__kicker">SRS</p>
                <p className="footer__line">Domine o jogo. Seja o melhor.</p>
              </div>
            </div>

            <div className="footer__actions">
              <Link href="/loja" className="btn btn--neon">
                Comprar licença
              </Link>
              <a
                href={discord}
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
                href={discord}
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
                href={twitter}
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
                href={instagram}
                className="footer__social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.25-2.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__meta">
            <span>© {year} SRS</span>
            <span className="footer__sep" aria-hidden />
            <span>srs.lat</span>
            <span className="footer__sep" aria-hidden />
            <span>Todos os direitos reservados</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
