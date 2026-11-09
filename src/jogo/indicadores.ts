/* =========================================
   INDICADORES — funções puras que transformam os dados brutos
   em números para a pesquisa. Guardamos só o que aconteceu
   (os toques); os indicadores são sempre CALCULADOS a partir disso.
   ========================================= */
import { INGREDIENTES, receitaDepoisDaTroca, TROCA, type IdIngrediente } from './ingredientes'

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
  resultado: ResultadoDaFeira,
) {
  const final = resultado.sacolaFinal
  return {
    // Manutenção: o que foi comprado ANTES do aviso de troca.
    manutencao: compararListas(receita, resultado.sacolaAntesDaTroca),
    // Atualização: a sacola final comparada com a receita JÁ trocada.
    atualizacao: compararListas(receitaDepoisDaTroca(receita), final),
    trocaFeita: final.includes(TROCA.entra) && !final.includes(TROCA.sai),
    // Perseveração: manteve o item antigo (erro típico de atualização).
    perseveracao: final.includes(TROCA.sai),
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
  resultado: ResultadoDaPanela,
) {
  // Só dá para avaliar a ordem de itens cuja posição a vó ensinou:
  // os da receita original e o que entrou pela troca. A batata e a
  // mandioca ocupam o MESMO lugar na ordem de preparo.
  const daReceita = new Set([...receita, ...receitaDepoisDaTroca(receita)])
  const avaliados = resultado.sequencia.filter((id) => daReceita.has(id))
  const foraDaReceita = resultado.sequencia.filter((id) => !daReceita.has(id))
  const ordem = (id: IdIngrediente) => INGREDIENTES[id].ordemDePreparo

  // Posição correta: o item está num lugar compatível com a ordem de preparo
  // (empates, como batata e mandioca juntas, aceitam as duas posições).
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
