/* =========================================
   MÁQUINA DE ESTADOS — como o jogo muda de fase
   Função pura: recebe o estado atual + uma ação e devolve o novo estado.
   Não depende do React, então dá para testar sozinha.
   ========================================= */
import { ORDEM_DAS_FASES, type Fase } from './fases'
import type { ResultadoDaFeira, ResultadoDaPanela } from './indicadores'
import { montarReceita, TAMANHO_MINIMO_DA_RECEITA, type IdIngrediente } from './ingredientes'

export type EstadoDoJogo = {
  fase: Fase
  // null = treino ainda não feito. Covariável de familiaridade digital.
  tentativasNoTreino: number | null
  // Ingredientes da sessão, na ordem de preparo. A feira e a panela comparam com esta lista.
  receita: readonly IdIngrediente[]
  // Quantas vezes a receita foi ouvida (1 = sem repetição).
  apresentacoesDaReceita: number | null
  // Dados brutos da feira (os indicadores são calculados a partir deles).
  feira: ResultadoDaFeira | null
  panela: ResultadoDaPanela | null
}

// União discriminada: o campo `tipo` diz qual ação é.
export type AcaoDoJogo =
  | { tipo: 'avancar' }
  | { tipo: 'reiniciar' }
  | { tipo: 'concluirTreino'; tentativas: number }
  | { tipo: 'concluirReceita'; apresentacoes: number }
  | { tipo: 'concluirFeira'; resultado: ResultadoDaFeira }
  | { tipo: 'concluirPanela'; resultado: ResultadoDaPanela }

export const ESTADO_INICIAL: EstadoDoJogo = {
  fase: 'treino',
  tentativasNoTreino: null,
  receita: montarReceita(TAMANHO_MINIMO_DA_RECEITA),
  apresentacoesDaReceita: null,
  feira: null,
  panela: null,
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
      return {
        ...estado,
        tentativasNoTreino: acao.tentativas,
        fase: proximaFase(estado.fase),
      }

    case 'concluirReceita':
      if (estado.fase !== 'receita') return estado
      return {
        ...estado,
        apresentacoesDaReceita: acao.apresentacoes,
        fase: proximaFase(estado.fase),
      }

    case 'concluirFeira':
      if (estado.fase !== 'feira') return estado
      return {
        ...estado,
        feira: acao.resultado,
        fase: proximaFase(estado.fase),
      }

    case 'concluirPanela':
      if (estado.fase !== 'panela') return estado
      return {
        ...estado,
        panela: acao.resultado,
        fase: proximaFase(estado.fase),
      }

    case 'reiniciar':
      return ESTADO_INICIAL
  }
}
