/* =========================================
   INGREDIENTES DA SOPA
   ========================================= */

export type IdIngrediente =
  | 'cebola'
  | 'alho'
  | 'tomate'
  | 'batata'
  | 'cenoura'
  | 'milho'
  | 'couve'

export type Ingrediente = {
  id: IdIngrediente
  nome: string
  icone: string // provisório: emojis mudam entre sistemas; trocar por SVG depois
  ordemDePreparo: number // usado na fase da panela
}

export const INGREDIENTES: Record<IdIngrediente, Ingrediente> = {
  cebola: { id: 'cebola', nome: 'Cebola', icone: '🧅', ordemDePreparo: 1 },
  alho: { id: 'alho', nome: 'Alho', icone: '🧄', ordemDePreparo: 2 },
  tomate: { id: 'tomate', nome: 'Tomate', icone: '🍅', ordemDePreparo: 3 },
  batata: { id: 'batata', nome: 'Batata', icone: '🥔', ordemDePreparo: 4 },
  cenoura: { id: 'cenoura', nome: 'Cenoura', icone: '🥕', ordemDePreparo: 5 },
  milho: { id: 'milho', nome: 'Milho', icone: '🌽', ordemDePreparo: 6 },
  couve: { id: 'couve', nome: 'Couve', icone: '🥬', ordemDePreparo: 7 },
}

// Ordem em que os ingredientes ENTRAM na receita conforme ela cresce.
// A batata vem primeiro porque a fase da feira pede "troque a batata
// por mandioca": ela precisa estar na receita em qualquer tamanho.
const PRIORIDADE: readonly IdIngrediente[] = [
  'batata',
  'cenoura',
  'cebola',
  'milho',
  'tomate',
  'alho',
  'couve',
]

export const TAMANHO_MINIMO_DA_RECEITA = 3
export const TAMANHO_MAXIMO_DA_RECEITA = 7

// Monta a receita com N itens e devolve na ordem de preparo
// (é nessa ordem que a vó fala e que a panela vai pedir).
export function montarReceita(quantidade: number): IdIngrediente[] {
  const n = Math.min(Math.max(quantidade, TAMANHO_MINIMO_DA_RECEITA), TAMANHO_MAXIMO_DA_RECEITA)
  return PRIORIDADE.slice(0, n).toSorted(
    (a, b) => INGREDIENTES[a].ordemDePreparo - INGREDIENTES[b].ordemDePreparo,
  )
}
