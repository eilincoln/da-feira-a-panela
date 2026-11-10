import { useReducer } from 'react'
import { Botao } from './componentes/Botao/Botao'
import { TelaFase } from './componentes/TelaFase/TelaFase'
import { Almoco } from './fases/Almoco/Almoco'
import { Distrator } from './fases/Distrator/Distrator'
import { Feira } from './fases/Feira/Feira'
import { Panela } from './fases/Panela/Panela'
import { Receita } from './fases/Receita/Receita'
import { Resultados } from './fases/Resultados/Resultados'
import { Treino } from './fases/Treino/Treino'
import { criarEstadoInicial, reducerDoJogo } from './jogo/estadoDoJogo'
import { INFO_DAS_FASES, ORDEM_DAS_FASES } from './jogo/fases'
import { TAMANHO_INICIAL_DA_RECEITA } from './jogo/ingredientes'
import { sortearSessao } from './jogo/sessao'

function App() {
  // 3º argumento = função de inicialização: o sorteio roda UMA vez, quando o
  // app abre. (Com só 2 argumentos, sortearSessao() rodaria a cada render.)
  const [estado, despachar] = useReducer(reducerDoJogo, TAMANHO_INICIAL_DA_RECEITA, (tamanho) =>
    criarEstadoInicial(sortearSessao(tamanho)),
  )
  const { sessao } = estado

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
          receita={sessao.receita}
          aoConcluir={(apresentacoes) => despachar({ tipo: 'concluirReceita', apresentacoes })}
        />
      )

    case 'feira':
      return (
        <Feira
          etapa={etapa}
          barracas={sessao.barracas}
          troca={sessao.troca}
          aoConcluir={(resultado) => despachar({ tipo: 'concluirFeira', resultado })}
        />
      )

    case 'panela':
      return (
        <Panela
          etapa={etapa}
          itens={estado.feira?.sacolaFinal ?? []}
          aoConcluir={(resultado) => despachar({ tipo: 'concluirPanela', resultado })}
        />
      )

    case 'distrator':
      return (
        <Distrator
          etapa={etapa}
          aoConcluir={(resultado) => despachar({ tipo: 'concluirDistrator', resultado })}
        />
      )

    case 'almoco':
      return (
        <Almoco
          etapa={etapa}
          comprados={estado.feira?.sacolaFinal ?? []}
          barracas={sessao.barracas}
          aoConcluir={(resultado) => despachar({ tipo: 'concluirAlmoco', resultado })}
        />
      )

    case 'resultados':
      return (
        <Resultados
          etapa={etapa}
          estado={estado}
          // O sorteio do jogo novo acontece AQUI, no evento do botão (pode ser impuro),
          // e o reducer só recebe a sessão pronta.
          aoReiniciar={() =>
            despachar({ tipo: 'reiniciar', sessao: sortearSessao(TAMANHO_INICIAL_DA_RECEITA) })
          }
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
