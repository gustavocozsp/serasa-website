import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { pageMetadata, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Termos de uso',
  description: 'Termos de uso do SRS: regras de licença, uso do software e responsabilidades.',
  path: '/termos',
})

export default function TermosPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: '/termos',
          title: 'Termos de uso SRS',
          description:
            'Termos de uso do SRS: regras de licença, uso do software e responsabilidades.',
        })}
      />
    <section className="legal">
      <article className="legal__panel">
        <header className="legal__header">
          <p className="legal__eyebrow">
            <span className="legal__eyebrow-dot" aria-hidden />
            legal
          </p>
          <h1>Termos de uso</h1>
          <p className="legal__updated">Última atualização: 6 de agosto de 2026</p>
          <div className="legal__rule" aria-hidden>
            <i />
          </div>
        </header>

        <div className="legal__body">
          <section className="legal__block">
            <h2>
              <span>01</span> Aceitação
            </h2>
            <p>
              Ao adquirir, baixar, instalar ou utilizar o software SRS
              (&quot;Software&quot;), você concorda com estes Termos de Uso.
              Se não concordar, não utilize o Software.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>02</span> Licença de uso
            </h2>
            <p>
              O SRS concede a você uma licença pessoal, limitada, não
              exclusiva, intransferível e revogável para usar o Software
              durante o período ativo da sua assinatura (semana, mês,
              trimestre ou ano), vinculada à sua conta Discord.
            </p>
            <ul>
              <li>É proibido compartilhar, revender ou alugar a licença.</li>
              <li>É proibido fazer engenharia reversa, modificar ou redistribuir o Software.</li>
              <li>Uma licença ativa equivale a um usuário autorizado.</li>
            </ul>
          </section>

          <section className="legal__block">
            <h2>
              <span>03</span> Conta e autenticação
            </h2>
            <p>
              O acesso ao painel é feito mediante autenticação Discord.
              Você é responsável por manter a segurança da sua conta e por
              toda atividade realizada sob ela. O uso de contas falsas,
              compartilhadas ou comprometidas pode resultar em suspensão.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>04</span> Uso permitido
            </h2>
            <p>
              O Software destina-se a otimização de sistema, ajustes de
              input e utilitários relacionados a jogos (incluindo FiveM)
              no seu próprio dispositivo. Você deve utilizá-lo em
              conformidade com as leis aplicáveis e com os termos de
              terceiros (ex.: plataformas de jogo).
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>05</span> Uso proibido
            </h2>
            <ul>
              <li>Usar o Software para violar leis ou direitos de terceiros.</li>
              <li>Tentar burlar proteções, limites de licença ou sistemas de autenticação.</li>
              <li>Distribuir cracks, keys, dumps ou builds não oficiais.</li>
              <li>Assediar a equipe ou a comunidade do SRS.</li>
            </ul>
          </section>

          <section className="legal__block">
            <h2>
              <span>06</span> Pagamentos e renovação
            </h2>
            <p>
              Os planos são vendidos conforme a oferta vigente na loja ou
              no Discord. O acesso permanece ativo até o fim do período
              pago. Não há renovação automática implícita nestes termos:
              a continuidade depende de nova compra ou ativação. Reembolsos,
              quando aplicáveis, seguem a política comunicada no canal
              oficial de vendas.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>07</span> Atualizações
            </h2>
            <p>
              O SRS pode publicar atualizações, correções e novos
              módulos. Algumas funções podem mudar, ser descontinuadas ou
              exigir versão mínima do sistema. O uso contínuo após
              atualizações implica aceitação das mudanças razoáveis.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>08</span> Isenção de garantias
            </h2>
            <p>
              O Software é fornecido &quot;como está&quot;, sem garantias
              expressas ou implícitas de desempenho específico, ausência
              de erros ou adequação a um propósito particular. Ajustes de
              sistema (serviços Windows, rede, input etc.) podem afetar
              outros programas. Use por sua conta e risco.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>09</span> Limitação de responsabilidade
            </h2>
            <p>
              Na máxima extensão permitida pela lei, o SRS não se
              responsabiliza por danos indiretos, lucros cessantes, perda
              de dados, banimentos em jogos ou plataformas de terceiros ou
              prejuízos decorrentes do uso ou da impossibilidade de uso
              do Software.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>10</span> Suspensão e encerramento
            </h2>
            <p>
              Podemos suspender ou encerrar o acesso em caso de violação
              destes termos, abuso, fraude no pagamento ou risco à
              integridade do serviço, sem obrigação de reembolso quando a
              causa for imputável ao usuário.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>11</span> Alterações
            </h2>
            <p>
              Estes termos podem ser atualizados periodicamente. A versão
              vigente será publicada nesta página, com a data de
              atualização. O uso contínuo após alterações relevantes
              constitui aceitação.
            </p>
          </section>

          <section className="legal__block">
            <h2>
              <span>12</span> Contato
            </h2>
            <p>
              Dúvidas sobre estes termos: Discord oficial{' '}
              <a href="https://discord.gg/srs">discord.gg/srs</a>.
              Também veja a{' '}
              <Link href="/privacidade">política de privacidade</Link>.
            </p>
          </section>
        </div>
      </article>
    </section>
    </>
  )
}
