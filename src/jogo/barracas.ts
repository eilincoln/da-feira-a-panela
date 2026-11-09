/* =========================================
   BARRACAS DA FEIRA
   Cada barraca tem 4 pistas ao mesmo tempo: feirante, cor, símbolo
   e nome. Na fase do almoço elas viram as perguntas "onde?" e "quem?".
   A cor nunca é a única pista (daltonismo): símbolo e nome também mudam.
   ========================================= */
import type { IdIngrediente } from './ingredientes'

export type IdBarraca = 'ze' | 'rosa' | 'tiao' | 'cida'

export type Barraca = {
  id: IdBarraca
  nome: string
  feirante: string
  simbolo: string
  nomeDoSimbolo: string // para leitor de tela e para o aplicador
  cor: string // variável CSS de tokens.css
  itens: readonly IdIngrediente[]
}

// Os itens da receita estão espalhados entre as barracas, e cada
// barraca mistura itens da receita com distratores. A mandioca fica
// numa barraca diferente da batata: trocar exige "ir a outro lugar".
export const BARRACAS: readonly Barraca[] = [
  {
    id: 'ze',
    nome: 'Barraca do Seu Zé',
    feirante: 'Seu Zé',
    simbolo: '★',
    nomeDoSimbolo: 'estrela',
    cor: 'var(--cor-barraca-azul)',
    itens: ['cebola', 'pimentao', 'batata'],
  },
  {
    id: 'rosa',
    nome: 'Barraca da Dona Rosa',
    feirante: 'Dona Rosa',
    simbolo: '●',
    nomeDoSimbolo: 'círculo',
    cor: 'var(--cor-barraca-ambar)',
    itens: ['cenoura', 'berinjela', 'alho'],
  },
  {
    id: 'tiao',
    nome: 'Barraca do Seu Tião',
    feirante: 'Seu Tião',
    simbolo: '▲',
    nomeDoSimbolo: 'triângulo',
    cor: 'var(--cor-barraca-roxa)',
    itens: ['tomate', 'mandioca', 'pepino'],
  },
  {
    id: 'cida',
    nome: 'Barraca da Dona Cida',
    feirante: 'Dona Cida',
    simbolo: '■',
    nomeDoSimbolo: 'quadrado',
    cor: 'var(--cor-barraca-petroleo)',
    itens: ['milho', 'brocolis', 'couve'],
  },
]
