import { useReducer } from 'react'
import { Botao } from './componentes/Botao/Botao'
import { TelaFase } from './componentes/TelaFase/TelaFase'
import { INFO_DAS_FASES, ORDEM_DAS_FASES } from './jogo/fases'
import { ESTADO_INICIAL, reducerDoJogo } from './jogo/estadoDoJogo'

function App() {
  const [estado, despachar] = useReducer(reducerDoJogo, ESTADO_INICIAL)

  const info = INFO_DAS_FASES[estado.fase]
  const numero = ORDEM_DAS_FASES.indexOf(estado.fase) + 1
  const ehUltima = estado.fase === 'resultados'

  return (
    <TelaFase
      etapa={`Etapa ${numero} de ${ORDEM_DAS_FASES.length}`}
      titulo={info.titulo}
      descricao={info.descricao}
      acoes={
        ehUltima ? (
          <Botao onClick={() => despachar({ tipo: 'reiniciar' })}>Começar de novo</Botao>
        ) : (
          <Botao onClick={() => despachar({ tipo: 'avancar' })}>Próxima etapa →</Botao>
        )
      }
    />
  )
}

export default App
