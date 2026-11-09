/* =========================================
   MÁQUINA DE ESTADOS — como o jogo muda de fase
   Função pura: recebe o estado atual + uma ação e devolve o novo estado.
   Não depende do React, então dá para testar sozinha.
   Atenção: o reducer NÃO sorteia nada (Math.random é impuro). O sorteio
   acontece fora (no início ou no botão "começar de novo") e chega pronto
   dentro da ação.
   ========================================= */
import { ORDEM_DAS_FASES, type Fase } from './fases'
import type { ResultadoDaFeira, ResultadoDaPanela, ResultadoDoDistrator } from './indicadores'
import type { Sessao } from './sessao'

export type EstadoDoJogo = {
  fase: Fase
  // O que foi sorteado para este jogo: receita, troca e barracas.
  sessao: Sessao
  // null = treino ainda não feito. Covariável de familiaridade digital.
  tentativasNoTreino: number | null
  // Quantas vezes a receita foi ouvida (1 = sem repetição).
  apresentacoesDaReceita: number | null
  // Dados brutos de cada fase (os indicadores são calculados a partir deles).
  feira: ResultadoDaFeira | null
  panela: ResultadoDaPanela | null
  distrator: ResultadoDoDistrator | null
}

// União discriminada: o campo `tipo` diz qual ação é.
export type AcaoDoJogo =
  | { tipo: 'avancar' }
  | { tipo: 'reiniciar'; sessao: Sessao }
  | { tipo: 'concluirTreino'; tentativas: number }
  | { tipo: 'concluirReceita'; apresentacoes: number }
  | { tipo: 'concluirFeira'; resultado: ResultadoDaFeira }
  | { tipo: 'concluirPanela'; resultado: ResultadoDaPanela }
  | { tipo: 'concluirDistrator'; resultado: ResultadoDoDistrator }

export function criarEstadoInicial(sessao: Sessao): EstadoDoJogo {
  return {
    fase: 'treino',
    sessao,
    tentativasNoTreino: null,
    apresentacoesDaReceita: null,
    feira: null,
    panela: null,
    distrator: null,
  }
}

function proximaFase(fase: Fase): Fase {
  const indiceAtual = ORDEM_DAS_FASES.indexOf(fase)
  // Na última fase não há para onde ir: fica onde está.
  return ORDEM_DAS_FASES[indiceAtual + 1] ?? fase
}

export function reducerDoJogo(estado: EstadoDoJogo, acao: AcaoDoJogo): EstadoDoJogo {
  switch (acao.tipo) {
    case 'avancar':
      return { ...estado, fase: proximaFase(estado.fase) }

    case 'concluirTreino':
      // Proteção: só aceita essa ação se estivermos mesmo no treino.
      if (estado.fase !== 'treino') return estado
      return { ...estado, tentativasNoTreino: acao.tentativas, fase: proximaFase(estado.fase) }

    case 'concluirReceita':
      if (estado.fase !== 'receita') return estado
      return { ...estado, apresentacoesDaReceita: acao.apresentacoes, fase: proximaFase(estado.fase) }

    case 'concluirFeira':
      if (estado.fase !== 'feira') return estado
      return { ...estado, feira: acao.resultado, fase: proximaFase(estado.fase) }

    case 'concluirPanela':
      if (estado.fase !== 'panela') return estado
      return { ...estado, panela: acao.resultado, fase: proximaFase(estado.fase) }

    case 'concluirDistrator':
      if (estado.fase !== 'distrator') return estado
      return { ...estado, distrator: acao.resultado, fase: proximaFase(estado.fase) }

    case 'reiniciar':
      return criarEstadoInicial(acao.sessao)
  }
}
