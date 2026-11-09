/* =========================================
   ITENS DO TREINO
   De propósito, NÃO são ingredientes da sopa: se o treino usasse
   cenoura, ela ficaria "pré-ativada" na memória e contaminaria
   as fases que medem memória (interferência proativa).
   ========================================= */

export type ItemDoTreino = {
  id: string
  nome: string
  icone: string
}

export const ITENS_DO_TREINO: readonly ItemDoTreino[] = [
  { id: 'cesta', nome: 'Cesta', icone: '🧺' },
  { id: 'chapeu', nome: 'Chapéu', icone: '👒' },
  { id: 'carteira', nome: 'Carteira', icone: '👛' },
]

// Cada rodada pede para tocar em um item. O texto já vem pronto
// porque o artigo muda (na cesta / no chapéu).
export const RODADAS_DO_TREINO = [
  { alvo: 'chapeu', instrucao: 'Toque no chapéu' },
  { alvo: 'cesta', instrucao: 'Toque na cesta' },
  { alvo: 'carteira', instrucao: 'Toque na carteira' },
] as const

// Depois de quantos erros na mesma rodada a dica aparece
// (aprendizagem sem erro: não deixar a pessoa errar várias vezes seguidas).
export const ERROS_ATE_A_DICA = 2
