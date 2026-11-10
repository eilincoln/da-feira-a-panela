/* =========================================
   BARRACAS DA FEIRA — a "identidade" de cada barraca
   Cada barraca tem 4 pistas ao mesmo tempo: feirante, cor, símbolo
   e nome. Na fase do almoço elas viram as perguntas "onde?" e "quem?".
   A cor nunca é a única pista (daltonismo): símbolo e nome também mudam.
   O QUE cada barraca vende e ONDE ela fica na tela são sorteados a cada
   jogo (ver sessao.ts).
   ========================================= */

export type IdBarraca = 'ze' | 'rosa' | 'tiao' | 'cida'

export type Barraca = {
  id: IdBarraca
  nome: string
  feirante: string
  simbolo: string
  nomeDoSimbolo: string // para leitor de tela e para o aplicador
  // Pista do almoço, pronta porque o gênero muda ("da estrela azul", "do triângulo roxo").
  // A cor é dita como uma pessoa a chamaria olhando a tela (o âmbar escuro parece marrom).
  descricaoDaPista: string
  cor: string // variável CSS de tokens.css
}

export const ITENS_POR_BARRACA = 4

export const BARRACAS: readonly Barraca[] = [
  {
    id: 'ze',
    nome: 'Barraca do Seu Zé',
    feirante: 'Seu Zé',
    simbolo: '★',
    nomeDoSimbolo: 'estrela',
    descricaoDaPista: 'a da estrela azul',
    cor: 'var(--cor-barraca-azul)',
  },
  {
    id: 'rosa',
    nome: 'Barraca da Dona Rosa',
    feirante: 'Dona Rosa',
    simbolo: '●',
    nomeDoSimbolo: 'círculo',
    descricaoDaPista: 'a do círculo marrom',
    cor: 'var(--cor-barraca-ambar)',
  },
  {
    id: 'tiao',
    nome: 'Barraca do Seu Tião',
    feirante: 'Seu Tião',
    simbolo: '▲',
    nomeDoSimbolo: 'triângulo',
    descricaoDaPista: 'a do triângulo roxo',
    cor: 'var(--cor-barraca-roxa)',
  },
  {
    id: 'cida',
    nome: 'Barraca da Dona Cida',
    feirante: 'Dona Cida',
    simbolo: '■',
    nomeDoSimbolo: 'quadrado',
    descricaoDaPista: 'a do quadrado verde-escuro',
    cor: 'var(--cor-barraca-petroleo)',
  },
]
