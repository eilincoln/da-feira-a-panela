/* =========================================
   INGREDIENTES — tudo o que existe na feira (16 itens = 4 barracas × 4)
   Uns podem entrar na receita; os outros são "distratores" (servem para
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
  // entram pela troca da feira (quando não são sorteados para a troca, viram distratores)
  | 'mandioca'
  | 'abobora'
  | 'pimentao'
  // distratores (plausíveis numa sopa, para a intrusão ser "tentadora")
  | 'berinjela'
  | 'pepino'
  | 'brocolis'
  | 'cogumelo'
  | 'pimenta'
  | 'feijao'

export type Ingrediente = {
  id: IdIngrediente
  nome: string
  artigo: 'a' | 'o' // para montar frases: "troque A batata", "troque O tomate"
  ordemDePreparo: number // usado na fase da panela (só a ordem relativa importa)
}

// Quem entra pela troca tem a MESMA ordem de quem sai (ocupa o lugar dele).
export const INGREDIENTES: Record<IdIngrediente, Ingrediente> = {
  cebola: { id: 'cebola', nome: 'Cebola', artigo: 'a', ordemDePreparo: 1 },
  alho: { id: 'alho', nome: 'Alho', artigo: 'o', ordemDePreparo: 2 },
  tomate: { id: 'tomate', nome: 'Tomate', artigo: 'o', ordemDePreparo: 3 },
  pimentao: { id: 'pimentao', nome: 'Pimentão', artigo: 'o', ordemDePreparo: 3 },
  batata: { id: 'batata', nome: 'Batata', artigo: 'a', ordemDePreparo: 4 },
  mandioca: { id: 'mandioca', nome: 'Mandioca', artigo: 'a', ordemDePreparo: 4 },
  cenoura: { id: 'cenoura', nome: 'Cenoura', artigo: 'a', ordemDePreparo: 5 },
  abobora: { id: 'abobora', nome: 'Abóbora', artigo: 'a', ordemDePreparo: 5 },
  milho: { id: 'milho', nome: 'Milho', artigo: 'o', ordemDePreparo: 6 },
  couve: { id: 'couve', nome: 'Couve', artigo: 'a', ordemDePreparo: 7 },
  berinjela: { id: 'berinjela', nome: 'Berinjela', artigo: 'a', ordemDePreparo: 8 },
  pepino: { id: 'pepino', nome: 'Pepino', artigo: 'o', ordemDePreparo: 9 },
  brocolis: { id: 'brocolis', nome: 'Brócolis', artigo: 'o', ordemDePreparo: 10 },
  cogumelo: { id: 'cogumelo', nome: 'Cogumelo', artigo: 'o', ordemDePreparo: 11 },
  pimenta: { id: 'pimenta', nome: 'Pimenta', artigo: 'a', ordemDePreparo: 12 },
  feijao: { id: 'feijao', nome: 'Feijão', artigo: 'o', ordemDePreparo: 13 },
}

export const TODOS_OS_INGREDIENTES = Object.keys(INGREDIENTES) as IdIngrediente[]

export const PODEM_ENTRAR_NA_RECEITA: readonly IdIngrediente[] = [
  'cebola',
  'alho',
  'tomate',
  'batata',
  'cenoura',
  'milho',
  'couve',
]

export const TAMANHO_MINIMO_DA_RECEITA = 3
export const TAMANHO_MAXIMO_DA_RECEITA = 7
// Começa em 5 (estava 3: "muito fácil" no teste). A adaptação de
// dificuldade, num bloco futuro, vai mexer neste número durante o jogo.
export const TAMANHO_INICIAL_DA_RECEITA = 5

export type Troca = {
  sai: IdIngrediente
  entra: IdIngrediente
}

// Trocas possíveis: uma é sorteada por jogo. São poucas e fixas porque
// cada uma precisa de uma gravação de voz própria.
export const TROCAS_POSSIVEIS: readonly Troca[] = [
  { sai: 'batata', entra: 'mandioca' },
  { sai: 'cenoura', entra: 'abobora' },
  { sai: 'tomate', entra: 'pimentao' },
]

export function porOrdemDePreparo(a: IdIngrediente, b: IdIngrediente) {
  return INGREDIENTES[a].ordemDePreparo - INGREDIENTES[b].ordemDePreparo
}

// A receita como ela fica depois da troca (é o que a panela vai pedir).
export function receitaDepoisDaTroca(receita: readonly IdIngrediente[], troca: Troca): IdIngrediente[] {
  return receita.map((id) => (id === troca.sai ? troca.entra : id))
}
