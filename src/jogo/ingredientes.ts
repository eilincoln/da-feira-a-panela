/* =========================================
   INGREDIENTES — tudo o que existe na feira
   Uns entram na receita; os outros são "distratores" (servem para
   medir intrusões: escolher algo que não estava na receita).
   ========================================= */

export type IdIngrediente =
  // podem entrar na receita
  | 'cebola'
  | 'alho'
  | 'tomate'
  | 'batata'
  | 'cenoura'
  | 'milho'
  | 'couve'
  // entra só pela troca da feira
  | 'mandioca'
  // distratores (legumes plausíveis numa sopa, para a intrusão ser "tentadora")
  | 'pimentao'
  | 'berinjela'
  | 'pepino'
  | 'brocolis'

export type Ingrediente = {
  id: IdIngrediente
  nome: string
  icone: string // provisório: emojis mudam entre sistemas; trocar por SVG depois
  ordemDePreparo: number // usado na fase da panela (só a ordem relativa importa)
}

export const INGREDIENTES: Record<IdIngrediente, Ingrediente> = {
  cebola: { id: 'cebola', nome: 'Cebola', icone: '🧅', ordemDePreparo: 1 },
  alho: { id: 'alho', nome: 'Alho', icone: '🧄', ordemDePreparo: 2 },
  pimentao: { id: 'pimentao', nome: 'Pimentão', icone: '🫑', ordemDePreparo: 3 },
  tomate: { id: 'tomate', nome: 'Tomate', icone: '🍅', ordemDePreparo: 4 },
  batata: { id: 'batata', nome: 'Batata', icone: '🥔', ordemDePreparo: 5 },
  mandioca: { id: 'mandioca', nome: 'Mandioca', icone: '🍠', ordemDePreparo: 5 }, // ocupa o lugar da batata
  cenoura: { id: 'cenoura', nome: 'Cenoura', icone: '🥕', ordemDePreparo: 6 },
  berinjela: { id: 'berinjela', nome: 'Berinjela', icone: '🍆', ordemDePreparo: 7 },
  pepino: { id: 'pepino', nome: 'Pepino', icone: '🥒', ordemDePreparo: 8 },
  brocolis: { id: 'brocolis', nome: 'Brócolis', icone: '🥦', ordemDePreparo: 9 },
  milho: { id: 'milho', nome: 'Milho', icone: '🌽', ordemDePreparo: 10 },
  couve: { id: 'couve', nome: 'Couve', icone: '🥬', ordemDePreparo: 11 },
}

// Ordem em que os ingredientes ENTRAM na receita conforme ela cresce.
// A batata vem primeiro porque a feira pede "troque a batata por
// mandioca": ela precisa estar na receita em qualquer tamanho.
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

// A atualização da memória de trabalho pedida na feira.
export const TROCA = { sai: 'batata', entra: 'mandioca' } as const satisfies {
  sai: IdIngrediente
  entra: IdIngrediente
}

function porOrdemDePreparo(a: IdIngrediente, b: IdIngrediente) {
  return INGREDIENTES[a].ordemDePreparo - INGREDIENTES[b].ordemDePreparo
}

// Monta a receita com N itens e devolve na ordem de preparo
// (é nessa ordem que a vó fala e que a panela vai pedir).
export function montarReceita(quantidade: number): IdIngrediente[] {
  const n = Math.min(Math.max(quantidade, TAMANHO_MINIMO_DA_RECEITA), TAMANHO_MAXIMO_DA_RECEITA)
  return PRIORIDADE.slice(0, n).toSorted(porOrdemDePreparo)
}

// A receita como ela fica depois da troca (é o que a panela vai pedir).
export function receitaDepoisDaTroca(receita: readonly IdIngrediente[]): IdIngrediente[] {
  return receita.map((id) => (id === TROCA.sai ? TROCA.entra : id))
}
