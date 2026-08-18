import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { pageMetadata, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Política de privacidade',
  description:
    'Política de privacidade do SRS: dados coletados, uso, retenção e seus direitos.',
  path: '/privacidade',
})

export default function PrivacidadePage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: '/privacidade',
          title: 'Política de privacidade SRS',
          description:
            'Política de privacidade do SRS: dados coletados, uso, retenção e seus direitos.',
        })}
      />
    <section className="legal">
      <article className="legal__panel">
        <header className="legal__header">
          <p className="legal__eyebrow">
            <span className="legal__eyebrow-dot" aria-hidden />
            legal
          </p>
          <h1>Política de privacidade</h1>
          <p className="legal__updated">Última atualização: 6 de agosto de 2026</p>
          <div className="legal__rule" aria-hidden>
            <i />
          </div>
        </header>

        <div className="legal__body">
          <section className="legal__block">
            <h2>
              <span>01</span> Introdução
            </h2>
            <p>
              Esta Política descreve como o SRS (&quot;nós&quot;) trata
              informações pessoais no site, no app desktop e nos serviços
              associados (incluindo autenticação e licenciamento). Ao usar
              o SRS, você declara ciência deste documento.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>02</span> Dados que coletamos
            </h2>
            <p>Podemos tratar as seguintes categorias:</p>
            <ul>
              <li>
                <strong>Conta Discord:</strong> identificadores públicos
                necessários à autenticação OAuth (ex.: ID de usuário,
                nome de exibição, avatar).
              </li>
              <li>
                <strong>Licença e assinatura:</strong> plano contratado,
                datas de início/expiração e status de acesso.
              </li>
              <li>
                <strong>Uso técnico:</strong> versão do app, sistema
                operacional, logs de erro e eventos de atualização,
                quando necessários à operação e suporte.
              </li>
              <li>
                <strong>Comunicações:</strong> mensagens enviadas por você
                no Discord ou canais oficiais de suporte.
              </li>
              <li>
                <strong>Site:</strong> dados mínimos de navegação (ex.:
                logs de servidor, cookies estritamente necessários).
              </li>
            </ul>
          </section>

          <section className="legal__block">
            <h2>
              <span>03</span> Finalidades
            </h2>
            <ul>
              <li>Autenticar usuários e validar licenças.</li>
              <li>Entregar, manter e atualizar o Software.</li>
              <li>Prevenir fraude, abuso e compartilhamento indevido de contas.</li>
              <li>Prestar suporte e comunicar mudanças relevantes do serviço.</li>
              <li>Cumprir obrigações legais quando aplicável.</li>
            </ul>
          </section>

          <section className="legal__block">
            <h2>
              <span>04</span> Bases legais (LGPD)
            </h2>
            <p>
              O tratamento ocorre com base em execução de contrato
              (prestação do serviço de licença), legítimo interesse
              (segurança, melhoria e prevenção a abuso) e, quando
              necessário, consentimento ou cumprimento de obrigação legal.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>05</span> Compartilhamento
            </h2>
            <p>
              Não vendemos seus dados. Podemos compartilhar informações
              com provedores de infraestrutura (hospedagem, CDN,
              autenticação Discord) estritamente para operar o serviço, e
              com autoridades quando houver obrigação legal. O Discord é
              um serviço de terceiros com política própria.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>06</span> Retenção
            </h2>
            <p>
              Mantemos dados de conta e licença enquanto a assinatura
              estiver ativa e pelo tempo adicional necessário a suporte,
              auditoria antifraude e obrigações legais. Logs técnicos são
              retidos por período limitado, salvo necessidade de
              investigação.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>07</span> Segurança
            </h2>
            <p>
              Adotamos medidas técnicas e organizacionais razoáveis para
              proteger dados (controle de acesso, comunicação segura,
              práticas de desenvolvimento). Nenhum sistema é 100% isento
              de risco. Reporte incidentes pelos canais oficiais.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>08</span> Seus direitos
            </h2>
            <p>
              Nos termos da LGPD, você pode solicitar confirmação de
              tratamento, acesso, correção, anonimização, portabilidade
              (quando aplicável), eliminação de dados desnecessários e
              informações sobre compartilhamentos. Para exercer direitos,
              contate-nos no Discord oficial. Podemos pedir confirmação de
              identidade antes de atender.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>09</span> Menores
            </h2>
            <p>
              O serviço não é direcionado a menores de 16 anos. Se você
              for responsável legal e souber de uso indevido, entre em
              contato para avaliarmos a remoção dos dados.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>10</span> Cookies
            </h2>
            <p>
              O site pode usar cookies ou armazenamento local apenas para
              funcionamento essencial (ex.: preferências de sessão). Não
              utilizamos cookies de publicidade de terceiros nesta
              política base.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>11</span> Alterações
            </h2>
            <p>
              Esta política pode ser atualizada. A data no topo indica a
              versão vigente. Mudanças materiais serão refletidas nesta
              página.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>12</span> Contato
            </h2>
            <p>
              Privacidade: Discord{' '}
              <a href="https://discord.gg/srs">discord.gg/srs</a>.
              Site: srs.lat. Veja também os{' '}
              <Link href="/termos">termos de uso</Link>.
            </p>
          </section>
        </div>
      </article>
    </section>
    </>
  )
}
