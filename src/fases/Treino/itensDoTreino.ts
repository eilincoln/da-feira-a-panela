/* =========================================
   ITENS DO TREINO
   De propósito, NÃO são ingredientes da sopa: se o treino usasse
   cenoura, ela ficaria "pré-ativada" na memória e contaminaria
   as fases que medem memória (interferência proativa).
   A cada jogo, 3 dos 8 objetos são sorteados, em posições e ordem novas.
   ========================================= */
import { embaralhar } from '../../jogo/utilidades'

export type ItemDoTreino = {
  id: string
  nome: string
  icone: string
  instrucao: string // pronta, porque o artigo muda (na cesta / no chapéu)
}

const OBJETOS: readonly ItemDoTreino[] = [
  { id: 'cesta', nome: 'Cesta', icone: '🧺', instrucao: 'Toque na cesta' },
  { id: 'chapeu', nome: 'Chapéu', icone: '👒', instrucao: 'Toque no chapéu' },
  { id: 'carteira', nome: 'Carteira', icone: '👛', instrucao: 'Toque na carteira' },
  { id: 'guarda-chuva', nome: 'Guarda-chuva', icone: '☂️', instrucao: 'Toque no guarda-chuva' },
  { id: 'oculos', nome: 'Óculos', icone: '👓', instrucao: 'Toque nos óculos' },
  { id: 'chave', nome: 'Chave', icone: '🔑', instrucao: 'Toque na chave' },
  { id: 'relogio', nome: 'Relógio', icone: '⌚', instrucao: 'Toque no relógio' },
  { id: 'livro', nome: 'Livro', icone: '📖', instrucao: 'Toque no livro' },
]

export const QUANTIDADE_DE_RODADAS = 3

// itens = o que aparece na tela (na ordem das posições);
// alvos = o que cada rodada pede (outra ordem, sorteada à parte).
export function sortearTreino() {
  const itens = embaralhar(OBJETOS).slice(0, QUANTIDADE_DE_RODADAS)
  return { itens, alvos: embaralhar(itens) }
}

// Depois de quantos erros na mesma rodada a dica aparece
// (aprendizagem sem erro: não deixar a pessoa errar várias vezes seguidas).
export const ERROS_ATE_A_DICA = 2
