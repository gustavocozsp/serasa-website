'use client'

import {
  Crosshair,
  Gauge,
  Keyboard,
  LogOut,
  Monitor,
  Mouse,
  Palette,
  Server,
  Settings2,
  Shield,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

const NAV: {
  label: string
  icon: typeof Gauge | null
  active?: boolean
}[] = [
  { label: 'Overview', icon: Gauge, active: true },
  { label: 'Otimização', icon: Sparkles },
  { label: 'PureMode', icon: Shield },
  { label: 'FiveM', icon: null },
  { label: 'Mira', icon: Crosshair },
  { label: 'Skins', icon: Palette },
  { label: 'Mouse', icon: Mouse },
  { label: 'Teclado', icon: Keyboard },
  { label: 'Monitor', icon: Monitor },
  { label: 'Serviços', icon: Server },
  { label: 'Configurações', icon: Settings2 },
]

const CARDS = [
  {
    title: 'Otimização',
    blurb: 'Perfis leves de mouse, latência, desempenho e rede. Aplique com um toque.',
    cta: 'Abrir otimização',
    icon: Sparkles,
  },
  {
    title: 'Pure Mode',
    blurb: 'Entre nos servidores de FiveM com pure mode e use skins/rpfs em todos.',
    cta: 'Configurar Pure Mode',
    icon: Shield,
  },
  {
    title: 'Mouse',
    blurb: 'Ajustes de precisão, tracking e resposta do periférico num painel visual.',
    cta: 'Ir para Mouse',
    icon: Mouse,
  },
  {
    title: 'Configurações',
    blurb: 'Preferências da conta, preferências do app e vínculo com o Discord.',
    cta: 'Abrir ajustes',
    icon: Settings2,
  },
] as const

function FiveMIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.4 24h-5.225c-.117 0-.455-1.127-1.026-3.375-1.982-6.909-3.124-10.946-3.417-12.12l3.37-3.325h.099c.454 1.42 2.554 7.676 6.299 18.768ZM12.342 7.084h-.048a3.382 3.385 0 0 1-.098-.492v-.098a102.619 102.715 0 0 1 3.272-3.275c.13.196.196.356.196.491v.05a140.694 140.826 0 0 1-3.322 3.324ZM5.994 10.9h-.05c.67-2.12 1.076-3.209 1.223-3.275L14.492.343c.08 0 .258.524.533 1.562zm1.37-4.014h-.05C8.813 2.342 9.612.048 9.71 0h4.495v.05a664.971 664.971 0 0 1-6.841 6.839Zm-2.69 7.874h-.05c.166-.798.554-1.418 1.174-1.855a312.918 313.213 0 0 1 5.71-5.717h.05c-.117.672-.375 1.175-.781 1.52zM1.598 24l-.098-.05c1.399-4.172 2.148-6.322 2.248-6.45l6.74-6.694v.05C10.232 11.88 8.974 16.263 6.73 24Z" />
    </svg>
  )
}

export function PanelMock() {
  return (
    <div className="pm" aria-hidden>
      <div className="pm__glow" />
      <div className="pm__stage">
        <div className="pm__window">
          <div className="pm__titlebar">
            <div className="pm__titlebrand">
              <span className="pm__dot" />
              SERASA
            </div>
            <div className="pm__winbtns">
              <span className="pm__winbtn pm__winbtn--min" />
              <span className="pm__winbtn pm__winbtn--close" />
            </div>
          </div>

          <div className="pm__workspace">
            <aside className="pm__sidebar">
              <div className="pm__sidebrand">SERASA</div>

              <nav className="pm__nav">
                {NAV.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className={`pm__navitem${item.active ? ' is-active' : ''}`}
                    >
                      {Icon ? (
                        <Icon className="pm__navicon" strokeWidth={1.75} />
                      ) : (
                        <FiveMIcon className="pm__navicon" />
                      )}
                      <span>{item.label}</span>
                    </div>
                  )
                })}
              </nav>

              <div className="pm__sidefoot">
                <div className="pm__user">
                  <div className="pm__avatar">S</div>
                  <div className="pm__usermeta">
                    <div className="pm__username">Serasa</div>
                    <div className="pm__handle">@serasa</div>
                  </div>
                </div>
                <div className="pm__logout">
                  <LogOut size={14} strokeWidth={1.75} />
                  <span>Sair</span>
                </div>
              </div>
            </aside>

            <section className="pm__main">
              <div className="pm__mascot">
                <img src="/images/anime-welcome.png" alt="" draggable={false} />
              </div>

              <div className="pm__eyebrow">
                <span className="pm__eyebrow-dot" />
                bem-vindo
              </div>

              <div className="pm__hero">
                <h2 className="pm__hello">
                  Olá, <span className="pm__name">jogador</span>
                </h2>
                <p className="pm__lead">
                  O <strong>SERASA</strong> junta otimização e ajustes de mouse
                  num só painel. Escolhe o que precisa e aplica em um toque.
                </p>
                <div className="pm__ctas">
                  <span className="pm__cta pm__cta--primary">
                    Começar pela otimização
                    <ArrowRight size={12} strokeWidth={2} />
                  </span>
                  <span className="pm__cta pm__cta--ghost">Ver Pure Mode</span>
                </div>
              </div>

              <div className="pm__guide">
                <div className="pm__guide-head">
                  <h3>Explora o painel</h3>
                  <p>
                    Atalhos rápidos para as ferramentas principais do{' '}
                    <strong>SERASA</strong>.
                  </p>
                </div>
                <div className="pm__cards">
                  {CARDS.map((card) => {
                    const Icon = card.icon
                    return (
                      <div key={card.title} className="pm__card">
                        <div className="pm__card-top">
                          <span className="pm__card-icon">
                            <Icon size={14} strokeWidth={1.75} />
                          </span>
                        </div>
                        <h4>{card.title}</h4>
                        <p>{card.blurb}</p>
                        <span className="pm__card-link">
                          {card.cta}
                          <ArrowRight size={11} strokeWidth={2} />
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
