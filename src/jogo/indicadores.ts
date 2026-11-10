/* =========================================
   INDICADORES — funções puras que transformam os dados brutos
   em números para a pesquisa. Guardamos só o que aconteceu
   (os toques); os indicadores são sempre CALCULADOS a partir disso.
   ========================================= */
import type { IdBarraca } from './barracas'
import { INGREDIENTES, receitaDepoisDaTroca, type IdIngrediente, type Troca } from './ingredientes'

export type Toque = {
  item: IdIngrediente
  acao: 'colocou' | 'tirou'
  etapa: 'compras' | 'troca'
  ms: number // milissegundos desde o início da feira
}

// Dados brutos da feira, guardados no estado do jogo.
export type ResultadoDaFeira = {
  toques: readonly Toque[]
  sacolaAntesDaTroca: readonly IdIngrediente[]
  sacolaFinal: readonly IdIngrediente[]
  duracaoComprasMs: number
  duracaoTrocaMs: number
}

export type Comparacao = {
  acertos: IdIngrediente[]   // estava na lista e foi escolhido
  omissoes: IdIngrediente[]  // estava na lista e NÃO foi escolhido
  intrusoes: IdIngrediente[] // NÃO estava na lista e foi escolhido
}

export function compararListas(
  alvo: readonly IdIngrediente[],
  resposta: readonly IdIngrediente[],
): Comparacao {
  return {
    acertos: alvo.filter((id) => resposta.includes(id)),
    omissoes: alvo.filter((id) => !resposta.includes(id)),
    intrusoes: resposta.filter((id) => !alvo.includes(id)),
  }
}

export function calcularIndicadoresDaFeira(
  receita: readonly IdIngrediente[],
  troca: Troca,
  resultado: ResultadoDaFeira,
) {
  const final = resultado.sacolaFinal
  return {
    // Manutenção: o que foi comprado ANTES do aviso de troca.
    manutencao: compararListas(receita, resultado.sacolaAntesDaTroca),
    // Atualização: a sacola final comparada com a receita JÁ trocada.
    atualizacao: compararListas(receitaDepoisDaTroca(receita, troca), final),
    trocaFeita: final.includes(troca.entra) && !final.includes(troca.sai),
    // Perseveração: manteve o item antigo (erro típico de atualização).
    perseveracao: final.includes(troca.sai),
  }
}

// ---------- PANELA ----------

export type ResultadoDaPanela = {
  ordemNaTela: readonly IdIngrediente[] // como os itens apareceram (embaralhados)
  sequencia: readonly IdIngrediente[]   // ordem em que foram colocados na panela
  desfeitos: number                     // quantas vezes o aplicador desfez o último
  duracaoMs: number
}

export function calcularIndicadoresDaPanela(
  receita: readonly IdIngrediente[],
  troca: Troca,
  resultado: ResultadoDaPanela,
) {
  // Só dá para avaliar a ordem de itens cuja posição a vó ensinou:
  // os da receita original e o que entrou pela troca. Quem sai e quem
  // entra ocupam o MESMO lugar na ordem de preparo.
  const daReceita = new Set([...receita, ...receitaDepoisDaTroca(receita, troca)])
  const avaliados = resultado.sequencia.filter((id) => daReceita.has(id))
  const foraDaReceita = resultado.sequencia.filter((id) => !daReceita.has(id))
  const ordem = (id: IdIngrediente) => INGREDIENTES[id].ordemDePreparo

  // Posição correta: o item está num lugar compatível com a ordem de preparo
  // (empates, como quem sai e quem entra juntos, aceitam as duas posições).
  const posicoesCorretas = avaliados.filter((id, posicao) => {
    const antesDele = avaliados.filter((outro) => ordem(outro) < ordem(id)).length
    const empatados = avaliados.filter((outro) => ordem(outro) === ordem(id)).length
    return posicao >= antesDele && posicao < antesDele + empatados
  })

  // Pares invertidos: para cada par de itens, conta se o que deveria vir
  // depois veio antes. 0 = ordem perfeita.
  let paresInvertidos = 0
  for (let i = 0; i < avaliados.length; i++) {
    for (let j = i + 1; j < avaliados.length; j++) {
      if (ordem(avaliados[i]) > ordem(avaliados[j])) paresInvertidos++
    }
  }

  return {
    avaliados,
    posicoesCorretas,
    errosDeOrdem: avaliados.length - posicoesCorretas.length,
    paresInvertidos,
    foraDaReceita,
  }
}

// ---------- DISTRATOR ----------
// Não é um indicador de memória: serve para conferir que a pessoa ficou
// mesmo ocupada no intervalo (e quanto tempo ele durou).

export type ResultadoDoDistrator = {
  rodadasCompletas: number
  toquesErrados: number
  duracaoMs: number
}

// ---------- ALMOÇO (memória episódica) ----------
// Referência: o que a pessoa REALMENTE comprou (sacola final da feira),
// e não a receita. A memória episódica é do episódio vivido.

export type RespostaDeOnde = {
  item: IdIngrediente
  resposta: IdBarraca
  certa: IdBarraca
}

export type ResultadoDoAlmoco = {
  comprados: readonly IdIngrediente[] // sacola final, na ordem de compra
  livre: {
    lembrados: readonly IdIngrediente[] // marcados pelo aplicador
    outros: number // itens falados que nem existem na feira
  }
  pista: readonly { barraca: IdBarraca; lembrados: readonly IdIngrediente[] }[]
  reconhecimento: readonly IdIngrediente[] // tocados pela própria pessoa
  onde: readonly RespostaDeOnde[]
  quando: { opcoes: readonly IdIngrediente[]; resposta: IdIngrediente; certa: IdIngrediente } | null
  duracaoMs: number
}

export function calcularIndicadoresDoAlmoco(resultado: ResultadoDoAlmoco) {
  const { comprados } = resultado
  const total = comprados.length

  // 1. Recordação livre
  const livre = compararListas(comprados, resultado.livre.lembrados)

  // 2. Com pista: só conta o que NÃO tinha sido lembrado antes
  const ditosComPista = resultado.pista.flatMap((p) => p.lembrados)
  const recuperadosComPista = comprados.filter(
    (id) => ditosComPista.includes(id) && !livre.acertos.includes(id),
  )
  const intrusoesComPista = ditosComPista.filter((id) => !comprados.includes(id))
  const evocadosNoTotal = livre.acertos.length + recuperadosComPista.length

  // 3. Reconhecimento (intrusão aqui se chama "falso alarme")
  const reconhecimento = compararListas(comprados, resultado.reconhecimento)

  // 4. Associação (onde/quem)
  const ondeCertos = resultado.onde.filter((r) => r.resposta === r.certa).length

  const porcentagem = (parte: number, todo: number) => (todo === 0 ? null : Math.round((parte / todo) * 100))

  return {
    total,
    livre,
    intrusoesLivresForaDaFeira: resultado.livre.outros,
    recuperadosComPista,
    intrusoesComPista,
    // Ganho com pista: quantos itens a pista "destravou" (falha de evocação, não de armazenamento)
    ganhoComPista: recuperadosComPista.length,
    evocadosNoTotal,
    reconhecimento,
    ondeCertos,
    ondePerguntas: resultado.onde.length,
    quandoCerto: resultado.quando ? resultado.quando.resposta === resultado.quando.certa : null,
    // Item × associação: reconhecer O QUÊ costuma resistir mais ao envelhecimento
    // do que lembrar ONDE/COM QUEM (hipótese do déficit associativo).
    porcentagemItem: porcentagem(reconhecimento.acertos.length, total),
    porcentagemAssociacao: porcentagem(ondeCertos, resultado.onde.length),
  }
}
