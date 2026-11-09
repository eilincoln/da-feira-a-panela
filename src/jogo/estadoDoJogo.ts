/* =========================================
   MÁQUINA DE ESTADOS — como o jogo muda de fase
   Função pura: recebe o estado atual + uma ação e devolve o novo estado.
   Não depende do React, então dá para testar sozinha.
   ========================================= */
import { ORDEM_DAS_FASES, type Fase } from './fases'

export type EstadoDoJogo = {
  fase: Fase
}

// União discriminada: o campo `tipo` diz qual ação é.
// Novas ações (ex.: registrar resposta) entram aqui nos próximos blocos.
export type AcaoDoJogo =
  | { tipo: 'avancar' }
  | { tipo: 'reiniciar' }

export const ESTADO_INICIAL: EstadoDoJogo = {
  fase: 'treino',
}

export function reducerDoJogo(estado: EstadoDoJogo, acao: AcaoDoJogo): EstadoDoJogo {
  switch (acao.tipo) {
    case 'avancar': {
      const indiceAtual = ORDEM_DAS_FASES.indexOf(estado.fase)
      const proxima = ORDEM_DAS_FASES[indiceAtual + 1]
      // Na última fase não há para onde ir: devolve o mesmo estado.
      if (proxima === undefined) return estado
      return { ...estado, fase: proxima }
    }
    case 'reiniciar':
      return ESTADO_INICIAL
  }
}
