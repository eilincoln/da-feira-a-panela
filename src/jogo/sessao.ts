/* =========================================
   SESSÃO — o sorteio de cada jogo novo
   Sorteia a troca, a receita e o que cada barraca vende (e em que
   posição a barraca aparece). Assim, repetir o jogo não é decorar.
   O resultado fica guardado no estado: o almoço vai perguntar
   "onde você comprou?" e precisa saber como era ESTA feira.
   ========================================= */
import { BARRACAS, ITENS_POR_BARRACA, type Barraca } from './barracas'
import { porOrdemDePreparo, TODOS_OS_INGREDIENTES, type IdIngrediente, type Troca } from './ingredientes'
import { embaralhar, sortearUm } from './utilidades'

export type BarracaDaSessao = Barraca & {
  itens: IdIngrediente[]
}

export type Sessao = {
  receita: IdIngrediente[] // na ordem de preparo
  troca: Troca
  barracas: BarracaDaSessao[] // na ordem em que aparecem na tela
  iniciadaEm: string // data e hora (ISO) em que o jogo começou, para o relatório
}

export function sortearSessao(tamanhoDaReceita: number): Sessao {
  // Receita: N itens quaisquer entre os 16 (4.368 receitas possíveis com N = 5)
  const receita = embaralhar(TODOS_OS_INGREDIENTES)
    .slice(0, tamanhoDaReceita)
    .toSorted(porOrdemDePreparo)

  // Troca: sai um item da receita, entra um de fora dela
  const troca: Troca = {
    sai: sortearUm(receita),
    entra: sortearUm(TODOS_OS_INGREDIENTES.filter((id) => !receita.includes(id))),
  }

  return {
    receita,
    troca,
    barracas: distribuirNasBarracas(troca),
    // Ler a data também é impuro: por isso fica aqui, junto do sorteio, fora do reducer
    iniciadaEm: new Date().toISOString(),
  }
}

function distribuirNasBarracas(troca: Troca): BarracaDaSessao[] {
  const itens = embaralhar(TODOS_OS_INGREDIENTES)
  const barracas = embaralhar(BARRACAS).map((barraca, i) => ({
    ...barraca,
    itens: itens.slice(i * ITENS_POR_BARRACA, (i + 1) * ITENS_POR_BARRACA),
  }))

  // Regra: o item novo da troca fica numa barraca DIFERENTE do antigo,
  // para trocar exigir "ir a outro lugar". Se o sorteio juntou os dois,
  // o novo troca de lugar com um item de outra barraca.
  const comOsDois = barracas.find((b) => b.itens.includes(troca.sai) && b.itens.includes(troca.entra))
  if (comOsDois) {
    const outra = barracas.find((b) => b !== comOsDois)!
    const i = comOsDois.itens.indexOf(troca.entra)
    ;[comOsDois.itens[i], outra.itens[0]] = [outra.itens[0], comOsDois.itens[i]]
  }

  return barracas
}
