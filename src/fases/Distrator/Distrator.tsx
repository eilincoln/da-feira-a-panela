import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Botao } from '../../componentes/Botao/Botao'
import { Feedback } from '../../componentes/Feedback/Feedback'
import { TelaFase } from '../../componentes/TelaFase/TelaFase'
import type { ResultadoDoDistrator } from '../../jogo/indicadores'
import { embaralhar, msDesde, sortearUm } from '../../jogo/utilidades'
import { ALVOS_POR_RODADA, ANIMAIS, CARTAS_POR_RODADA, TEMPO_MINIMO_MS, type Animal } from './animais'
import estilos from './Distrator.module.css'

// Pausa entre uma rodada completa e a próxima (para ver o "Muito bem!").
const PAUSA_ENTRE_RODADAS = 1500

type Rodada = {
  numero: number
  alvo: Animal
  cartas: Animal[]
}

function sortearRodada(numero: number, anterior?: Animal): Rodada {
  // Evita repetir o mesmo animal-alvo duas rodadas seguidas.
  const alvo = sortearUm(ANIMAIS.filter((a) => a !== anterior))
  const outros = ANIMAIS.filter((a) => a !== alvo)
  const resto = Array.from({ length: CARTAS_POR_RODADA - ALVOS_POR_RODADA }, () => sortearUm(outros))
  const cartas = embaralhar([...Array<Animal>(ALVOS_POR_RODADA).fill(alvo), ...resto])
  return { numero, alvo, cartas }
}

type DistratorProps = {
  etapa: string
  aoConcluir: (resultado: ResultadoDoDistrator) => void
}

export function Distrator({ etapa, aoConcluir }: DistratorProps) {
  const [rodada, setRodada] = useState(() => sortearRodada(1))
  const [encontradas, setEncontradas] = useState<number[]>([]) // posições das cartas
  const [ultimoToque, setUltimoToque] = useState<'certo' | 'errado' | null>(null)
  const [toques, setToques] = useState(0)
  const [liberado, setLiberado] = useState(false)

  const rodadasCompletasRef = useRef(0)
  const errosRef = useRef(0)
  const inicioRef = useRef(0)
  const proximaRodadaRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    inicioRef.current = performance.now()
    // Depois do tempo mínimo, aparece o botão do aplicador. Nada de
    // relógio na tela: quem joga não vê quanto tempo passou.
    const id = setTimeout(() => setLiberado(true), TEMPO_MINIMO_MS)
    return () => {
      clearTimeout(id)
      if (proximaRodadaRef.current) clearTimeout(proximaRodadaRef.current)
    }
  }, [])

  const completa = encontradas.length === ALVOS_POR_RODADA

  function tocar(posicao: number) {
    setToques((n) => n + 1)
    if (rodada.cartas[posicao] !== rodada.alvo) {
      errosRef.current++
      setUltimoToque('errado')
      return
    }

    const novas = [...encontradas, posicao]
    setEncontradas(novas)
    setUltimoToque('certo')

    if (novas.length === ALVOS_POR_RODADA) {
      rodadasCompletasRef.current++
      proximaRodadaRef.current = setTimeout(() => {
        setRodada(sortearRodada(rodada.numero + 1, rodada.alvo))
        setEncontradas([])
        setUltimoToque(null)
      }, PAUSA_ENTRE_RODADAS)
    }
  }

  function terminar() {
    aoConcluir({
      rodadasCompletas: rodadasCompletasRef.current,
      toquesErrados: errosRef.current,
      duracaoMs: msDesde(inicioRef.current),
    })
  }

  return (
    <TelaFase
      etapa={etapa}
      titulo="Um intervalo"
      descricao="Um joguinho diferente para descansar."
      acoes={liberado && <Botao onClick={terminar}>Ir para o almoço →</Botao>}
    >
      {/* key={rodada.numero}: a cada rodada a instrução e as cartas nascem de novo (e animam) */}
      <p key={`instrucao-${rodada.numero}`} className={estilos.instrucao}>
        <span className={estilos.iconeAlvo} aria-hidden="true">{rodada.alvo.icone}</span>
        {rodada.alvo.instrucao}
      </p>

      <div key={`cartas-${rodada.numero}`} className={estilos.cartas}>
        {rodada.cartas.map((animal, posicao) => {
          const encontrada = encontradas.includes(posicao)
          return (
            <button
              // A posição é a identidade da carta (o mesmo animal aparece várias vezes)
              key={posicao}
              type="button"
              className={`${estilos.carta} ${encontrada ? estilos.encontrada : ''}`}
              style={{ '--ordem': posicao } as CSSProperties}
              onClick={() => tocar(posicao)}
              disabled={encontrada || completa}
              aria-label={animal.nome}
              aria-pressed={encontrada}
            >
              {encontrada && <span className={estilos.selo} aria-hidden="true">✓</span>}
              <span aria-hidden="true">{animal.icone}</span>
            </button>
          )
        })}
      </div>

      <div aria-live="polite">
        {completa && <Feedback key={toques} tipo="certo" mensagem="Muito bem!" />}
        {!completa && ultimoToque === 'errado' && (
          <Feedback key={toques} tipo="tentarDeNovo" mensagem="Esse não. Procure outro." />
        )}
      </div>
    </TelaFase>
  )
}
