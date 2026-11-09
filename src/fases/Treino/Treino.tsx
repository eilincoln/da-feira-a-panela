import { useState } from 'react'
import { Botao } from '../../componentes/Botao/Botao'
import { Feedback } from '../../componentes/Feedback/Feedback'
import { TelaFase } from '../../componentes/TelaFase/TelaFase'
import { ERROS_ATE_A_DICA, ITENS_DO_TREINO, RODADAS_DO_TREINO } from './itensDoTreino'
import estilos from './Treino.module.css'

type TreinoProps = {
  etapa: string
  aoConcluir: (tentativas: number) => void
}

type UltimoToque = 'certo' | 'errado' | null

export function Treino({ etapa, aoConcluir }: TreinoProps) {
  // Estado LOCAL: só interessa enquanto o treino está na tela.
  // O que importa para a pesquisa (total de tentativas) sobe para o
  // estado global pelo `aoConcluir` quando o treino termina.
  const [indiceRodada, setIndiceRodada] = useState(0)
  const [errosNaRodada, setErrosNaRodada] = useState(0)
  const [tentativas, setTentativas] = useState(0)
  const [ultimoToque, setUltimoToque] = useState<UltimoToque>(null)

  const rodada = RODADAS_DO_TREINO[indiceRodada]
  const acertou = ultimoToque === 'certo'
  const ehUltimaRodada = indiceRodada === RODADAS_DO_TREINO.length - 1
  const mostrarDica = errosNaRodada >= ERROS_ATE_A_DICA && !acertou

  function tocar(idItem: string) {
    setTentativas((t) => t + 1)
    if (idItem === rodada.alvo) {
      setUltimoToque('certo')
    } else {
      setUltimoToque('errado')
      setErrosNaRodada((e) => e + 1)
    }
  }

  function proximaRodada() {
    setIndiceRodada((i) => i + 1)
    setErrosNaRodada(0)
    setUltimoToque(null)
  }

  return (
    <TelaFase
      etapa={etapa}
      titulo="Treino"
      descricao="Rodada para conhecer a tela. Não vale ponto."
      acoes={
        acertou &&
        (ehUltimaRodada ? (
          <Botao onClick={() => aoConcluir(tentativas)}>Começar o jogo →</Botao>
        ) : (
          <Botao onClick={proximaRodada}>Próximo →</Botao>
        ))
      }
    >
      <p className={estilos.instrucao}>{rodada.instrucao}</p>

      <div className={estilos.opcoes}>
        {ITENS_DO_TREINO.map((item) => {
          const ehDica = mostrarDica && item.id === rodada.alvo
          const ehCerto = acertou && item.id === rodada.alvo
          const classes = [estilos.opcao, ehDica && estilos.dica, ehCerto && estilos.certo]
            .filter(Boolean)
            .join(' ')
          return (
            <button
              key={item.id}
              type="button"
              className={classes}
              onClick={() => tocar(item.id)}
              disabled={acertou}
            >
              <span className={estilos.icone} aria-hidden="true">{item.icone}</span>
              {item.nome}
              {ehDica && <span className={estilos.textoDica}>Este aqui</span>}
            </button>
          )
        })}
      </div>

      {/* aria-live: leitores de tela anunciam a mudança sem mover o foco */}
      <div aria-live="polite">
        {/* key={tentativas}: cada toque recria o aviso, e a animação roda de novo
            (senão, dois erros seguidos mostrariam o mesmo aviso parado) */}
        {ultimoToque === 'certo' && <Feedback key={tentativas} tipo="certo" mensagem="Isso mesmo!" />}
        {ultimoToque === 'errado' && (
          <Feedback key={tentativas} tipo="tentarDeNovo" mensagem="Quase! Tente outra vez." />
        )}
      </div>
    </TelaFase>
  )
}
