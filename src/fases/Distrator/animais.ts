/* =========================================
   ANIMAIS DO INTERVALO (distrator)
   De propósito, nada de comida, cores de barraca, símbolos (★●▲■)
   ou pessoas: o intervalo deve OCUPAR a mente sem "ensaiar" nem
   atrapalhar o que será perguntado no almoço (interferência).
   ========================================= */

export type Animal = {
  id: string
  nome: string
  icone: string
  instrucao: string // o plural muda o artigo: "todos os gatos" / "todas as vacas"
}

export const ANIMAIS: readonly Animal[] = [
  { id: 'gato', nome: 'Gato', icone: '🐱', instrucao: 'Toque em todos os gatos' },
  { id: 'cachorro', nome: 'Cachorro', icone: '🐶', instrucao: 'Toque em todos os cachorros' },
  { id: 'peixe', nome: 'Peixe', icone: '🐟', instrucao: 'Toque em todos os peixes' },
  { id: 'passarinho', nome: 'Passarinho', icone: '🐦', instrucao: 'Toque em todos os passarinhos' },
  { id: 'tartaruga', nome: 'Tartaruga', icone: '🐢', instrucao: 'Toque em todas as tartarugas' },
  { id: 'borboleta', nome: 'Borboleta', icone: '🦋', instrucao: 'Toque em todas as borboletas' },
  { id: 'coelho', nome: 'Coelho', icone: '🐰', instrucao: 'Toque em todos os coelhos' },
  { id: 'vaca', nome: 'Vaca', icone: '🐮', instrucao: 'Toque em todas as vacas' },
]

export const CARTAS_POR_RODADA = 12
export const ALVOS_POR_RODADA = 3

// Tempo mínimo do intervalo antes de liberar o almoço (CLAUDE.md: 5 a 10 min).
// Em desenvolvimento, 15 s, para dar para testar sem esperar.
export const TEMPO_MINIMO_MS = import.meta.env.DEV ? 15_000 : 5 * 60_000
