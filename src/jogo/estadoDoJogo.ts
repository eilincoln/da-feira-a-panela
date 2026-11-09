/* =========================================
   MÁQUINA DE ESTADOS — como o jogo muda de fase
   Função pura: recebe o estado atual + uma ação e devolve o novo estado.
   Não depende do React, então dá para testar sozinha.
   ========================================= */
import { ORDEM_DAS_FASES, type Fase } from './fases'

export type EstadoDoJogo = {
  fase: Fase
  // null = treino ainda não feito. Covariável de familiaridade digital.
  tentativasNoTreino: number | null
}

// União discriminada: o campo `tipo` diz qual ação é.
export type AcaoDoJogo =
  | { tipo: 'avancar' }
  | { tipo: 'reiniciar' }
  | { tipo: 'concluirTreino'; tentativas: number }

export const ESTADO_INICIAL: EstadoDoJogo = {
  fase: 'treino',
  tentativasNoTreino: null,
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

    case 'reiniciar':
      return ESTADO_INICIAL
  }
}
