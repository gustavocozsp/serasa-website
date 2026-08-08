export const DOWNLOAD_URL = '/api/download'
export const DOWNLOAD_LABEL = 'SERASA Setup (Windows)'
export const DOWNLOAD_CDN_BASE = 'https://serasa.best/win'

export const TUTORIALS = [
  {
    id: 'install',
    title: 'Instalar o painel',
    steps: [
      'Baixe o instalador na seção Download desta página.',
      'Execute o setup e aguarde a instalação concluir.',
      'Abra o SERASA e faça login com o mesmo Discord da licença.',
    ],
  },
  {
    id: 'optimize',
    title: 'Primeira otimização',
    steps: [
      'Na aba Overview, comece pela otimização recomendada.',
      'Feche jogos e apps pesados antes de aplicar os tweaks.',
      'Reinicie o PC se o painel pedir — alguns ajustes só valem após reboot.',
    ],
  },
  {
    id: 'puremode',
    title: 'Pure Mode no FiveM',
    steps: [
      'Abra a aba PureMode antes de entrar no servidor.',
      'Escolha modo manual ou automático conforme sua preferência.',
      'Entre no FiveM só depois do bypass concluir.',
    ],
  },
  {
    id: 'crosshair',
    title: 'Configurar a mira',
    steps: [
      'Vá em Mira e escolha um preset ou ajuste cor, tamanho e gap.',
      'A overlay funciona inclusive em fullscreen exclusive.',
      'Salve e teste em um servidor/treino para validar a posição.',
    ],
  },
  {
    id: 'support',
    title: 'Suporte e renovação',
    steps: [
      'Problemas de login ou HWID? Abra ticket no Discord.',
      'Licença expirada: compre um plano na Loja e aguarde a liberação.',
      'Use sempre o mesmo Discord da compra — o acesso é vinculado a ele.',
    ],
  },
] as const
