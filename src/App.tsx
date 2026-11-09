import { useReducer } from 'react'
import { Botao } from './componentes/Botao/Botao'
import { TelaFase } from './componentes/TelaFase/TelaFase'
import { Receita } from './fases/Receita/Receita'
import { Treino } from './fases/Treino/Treino'
import { INFO_DAS_FASES, ORDEM_DAS_FASES } from './jogo/fases'
import { INGREDIENTES } from './jogo/ingredientes'
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

  if (estado.fase === 'receita') {
    return (
      <Receita
        etapa={etapa}
        receita={estado.receita}
        aoConcluir={(apresentacoes) => despachar({ tipo: 'concluirReceita', apresentacoes })}
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
        <p>Receita: {estado.receita.map((id) => INGREDIENTES[id].nome).join(', ')}</p>
        <p>Vezes que a receita foi ouvida: {estado.apresentacoesDaReceita ?? '—'}</p>
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
