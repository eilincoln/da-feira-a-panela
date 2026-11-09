import { useReducer } from 'react'
import { Botao } from './componentes/Botao/Botao'
import { TelaFase } from './componentes/TelaFase/TelaFase'
import { Treino } from './fases/Treino/Treino'
import { INFO_DAS_FASES, ORDEM_DAS_FASES } from './jogo/fases'
import { ESTADO_INICIAL, reducerDoJogo } from './jogo/estadoDoJogo'

function App() {
  const [estado, despachar] = useReducer(reducerDoJogo, ESTADO_INICIAL)

  const info = INFO_DAS_FASES[estado.fase]
  const numero = ORDEM_DAS_FASES.indexOf(estado.fase) + 1
  const etapa = `Etapa ${numero} de ${ORDEM_DAS_FASES.length}`

  if (estado.fase === 'treino') {
    return (
      <Treino
        etapa={etapa}
        aoConcluir={(tentativas) => despachar({ tipo: 'concluirTreino', tentativas })}
      />
    )
  }

  if (estado.fase === 'resultados') {
    return (
      <TelaFase
        etapa={etapa}
        titulo={info.titulo}
        descricao={info.descricao}
        acoes={<Botao onClick={() => despachar({ tipo: 'reiniciar' })}>Começar de novo</Botao>}
      >
        <p>Tentativas no treino: {estado.tentativasNoTreino ?? '—'}</p>
      </TelaFase>
    )
  }

  // Fases que ainda não têm tela própria (próximos blocos)
  return (
    <TelaFase
      etapa={etapa}
      titulo={info.titulo}
      descricao={info.descricao}
      acoes={<Botao onClick={() => despachar({ tipo: 'avancar' })}>Próxima etapa →</Botao>}
    />
  )
}

export default App
