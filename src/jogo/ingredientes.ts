/* =========================================
   INGREDIENTES — tudo o que existe na feira (16 itens = 4 barracas × 4)
   QUALQUER um pode ser sorteado para a receita; os que sobram viram
   "distratores" daquele jogo (servem para medir intrusões). Todos são
   plausíveis numa sopa, para a intrusão ser "tentadora".
   ========================================= */

export type IdIngrediente =
  | 'cebola'
  | 'alho'
  | 'pimenta'
  | 'pimentao'
  | 'tomate'
  | 'feijao'
  | 'mandioca'
  | 'batata'
  | 'cenoura'
  | 'abobora'
  | 'milho'
  | 'berinjela'
  | 'pepino'
  | 'cogumelo'
  | 'brocolis'
  | 'couve'

export type Ingrediente = {
  id: IdIngrediente
  nome: string
  artigo: 'a' | 'o' // para montar frases: "troque A batata", "troque O tomate"
  ordemDePreparo: number // usado na fase da panela (só a ordem relativa importa)
}

// Ordem de preparo da sopa: temperos primeiro, folhas por último.
// É nessa ordem que a vó fala a receita e que a panela é corrigida.
export const INGREDIENTES: Record<IdIngrediente, Ingrediente> = {
  cebola: { id: 'cebola', nome: 'Cebola', artigo: 'a', ordemDePreparo: 1 },
  alho: { id: 'alho', nome: 'Alho', artigo: 'o', ordemDePreparo: 2 },
  pimenta: { id: 'pimenta', nome: 'Pimenta', artigo: 'a', ordemDePreparo: 3 },
  pimentao: { id: 'pimentao', nome: 'Pimentão', artigo: 'o', ordemDePreparo: 4 },
  tomate: { id: 'tomate', nome: 'Tomate', artigo: 'o', ordemDePreparo: 5 },
  feijao: { id: 'feijao', nome: 'Feijão', artigo: 'o', ordemDePreparo: 6 },
  mandioca: { id: 'mandioca', nome: 'Mandioca', artigo: 'a', ordemDePreparo: 7 },
  batata: { id: 'batata', nome: 'Batata', artigo: 'a', ordemDePreparo: 8 },
  cenoura: { id: 'cenoura', nome: 'Cenoura', artigo: 'a', ordemDePreparo: 9 },
  abobora: { id: 'abobora', nome: 'Abóbora', artigo: 'a', ordemDePreparo: 10 },
  milho: { id: 'milho', nome: 'Milho', artigo: 'o', ordemDePreparo: 11 },
  berinjela: { id: 'berinjela', nome: 'Berinjela', artigo: 'a', ordemDePreparo: 12 },
  pepino: { id: 'pepino', nome: 'Pepino', artigo: 'o', ordemDePreparo: 13 },
  cogumelo: { id: 'cogumelo', nome: 'Cogumelo', artigo: 'o', ordemDePreparo: 14 },
  brocolis: { id: 'brocolis', nome: 'Brócolis', artigo: 'o', ordemDePreparo: 15 },
  couve: { id: 'couve', nome: 'Couve', artigo: 'a', ordemDePreparo: 16 },
}

export const TODOS_OS_INGREDIENTES = Object.keys(INGREDIENTES) as IdIngrediente[]

export const TAMANHO_MINIMO_DA_RECEITA = 3
export const TAMANHO_MAXIMO_DA_RECEITA = 7
// Começa em 5 (estava 3: "muito fácil" no teste). A adaptação de
// dificuldade, num bloco futuro, vai mexer neste número durante o jogo.
export const TAMANHO_INICIAL_DA_RECEITA = 5

// A troca pedida na feira: um item da receita sai e um de fora entra
// NO LUGAR dele (inclusive na ordem de preparo). Sorteada a cada jogo.
export type Troca = {
  sai: IdIngrediente
  entra: IdIngrediente
}

export function porOrdemDePreparo(a: IdIngrediente, b: IdIngrediente) {
  return INGREDIENTES[a].ordemDePreparo - INGREDIENTES[b].ordemDePreparo
}

// A receita como ela fica depois da troca (é o que a panela vai pedir).
export function receitaDepoisDaTroca(receita: readonly IdIngrediente[], troca: Troca): IdIngrediente[] {
  return receita.map((id) => (id === troca.sai ? troca.entra : id))
}

// Posição de um item na ordem de preparo DESTA receita: quem entra pela
// troca herda a posição de quem saiu.
export function ordemNaReceita(id: IdIngrediente, troca: Troca): number {
  return INGREDIENTES[id === troca.entra ? troca.sai : id].ordemDePreparo
}
