/* =========================================
   FASES DO JOGO — a ordem e os textos de cada etapa
   ========================================= */

// União de strings literais: o TypeScript só aceita estes 7 valores.
// (Não usamos `enum` porque o tsconfig tem `erasableSyntaxOnly`.)
export type Fase =
  | 'treino'
  | 'receita'
  | 'feira'
  | 'panela'
  | 'distrator'
  | 'almoco'
  | 'resultados'

// `as const satisfies` = o array fica somente leitura E o TS confere
// que cada item é uma Fase válida.
export const ORDEM_DAS_FASES = [
  'treino',
  'receita',
  'feira',
  'panela',
  'distrator',
  'almoco',
  'resultados',
] as const satisfies readonly Fase[]

type InfoDaFase = {
  titulo: string
  descricao: string
}

// `Record<Fase, ...>` obriga a ter uma entrada para CADA fase:
// se alguém criar uma fase nova e esquecer o texto, o build quebra.
export const INFO_DAS_FASES: Record<Fase, InfoDaFase> = {
  treino: {
    titulo: 'Treino',
    descricao: 'Rodada para conhecer a tela. Não vale ponto.',
  },
  receita: {
    titulo: 'A receita',
    descricao: 'A vó vai dizer os ingredientes da sopa.',
  },
  feira: {
    titulo: 'A feira',
    descricao: 'Escolha nas barracas os ingredientes da receita.',
  },
  panela: {
    titulo: 'A panela',
    descricao: 'Coloque os ingredientes na ordem de preparo.',
  },
  distrator: {
    titulo: 'Um intervalo',
    descricao: 'Uma atividade diferente antes do almoço.',
  },
  almoco: {
    titulo: 'O almoço',
    descricao: 'Vamos lembrar como foi a ida à feira.',
  },
  resultados: {
    titulo: 'Resultados',
    descricao: 'Resumo do desempenho para o aplicador.',
  },
}
