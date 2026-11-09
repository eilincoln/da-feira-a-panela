import { useReducer } from 'react'
import { Botao } from './componentes/Botao/Botao'
import { TelaFase } from './componentes/TelaFase/TelaFase'
import { Feira } from './fases/Feira/Feira'
import { Receita } from './fases/Receita/Receita'
import { Resultados } from './fases/Resultados/Resultados'
import { Treino } from './fases/Treino/Treino'
import { INFO_DAS_FASES, ORDEM_DAS_FASES } from './jogo/fases'
import { ESTADO_INICIAL, reducerDoJogo } from './jogo/estadoDoJogo'

function App() {
  const [estado, despachar] = useReducer(reducerDoJogo, ESTADO_INICIAL)

  const info = INFO_DAS_FASES[estado.fase]
  const numero = ORDEM_DAS_FASES.indexOf(estado.fase) + 1
  const etapa = `Etapa ${numero} de ${ORDEM_DAS_FASES.length}`

  switch (estado.fase) {
    case 'treino':
      return (
        <Treino
          etapa={etapa}
          aoConcluir={(tentativas) => despachar({ tipo: 'concluirTreino', tentativas })}
        />
      )

    case 'receita':
      return (
        <Receita
          etapa={etapa}
          receita={estado.receita}
          aoConcluir={(apresentacoes) => despachar({ tipo: 'concluirReceita', apresentacoes })}
        />
      )

    case 'feira':
      return (
        <Feira
          etapa={etapa}
          aoConcluir={(resultado) => despachar({ tipo: 'concluirFeira', resultado })}
        />
      )

    case 'resultados':
      return (
        <Resultados
          etapa={etapa}
          estado={estado}
          aoReiniciar={() => despachar({ tipo: 'reiniciar' })}
        />
      )

    default:
      // Fases que ainda não têm tela própria (próximos blocos)
      return (
        <TelaFase
          // key: força o React a recriar a tela ao trocar de fase (e rodar a animação de entrada)
          key={estado.fase}
          etapa={etapa}
          titulo={info.titulo}
          descricao={info.descricao}
          acoes={<Botao onClick={() => despachar({ tipo: 'avancar' })}>Próxima etapa →</Botao>}
        />
      )
  }
}

export default App
