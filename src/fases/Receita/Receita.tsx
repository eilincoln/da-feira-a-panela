import { useEffect, useRef, useState } from 'react'
import { Botao } from '../../componentes/Botao/Botao'
import { FalaDaVo } from '../../componentes/FalaDaVo/FalaDaVo'
import { TelaFase } from '../../componentes/TelaFase/TelaFase'
import { INGREDIENTES, type IdIngrediente } from '../../jogo/ingredientes'
import { FALAS, falaDoIngrediente, type Fala } from '../../voz/falas'
import { esperar, falar } from '../../voz/voz'
import estilos from './Receita.module.css'

// Tempo mínimo de cada item na tela, mesmo que o áudio seja curto.
const TEMPO_MINIMO_POR_ITEM = 2000
// Quanto tempo a lista completa fica visível antes de sumir.
const TEMPO_LISTA_COMPLETA = 3000
// Duração da animação de saída (igual a --duracao-longa no CSS).
const TEMPO_SUMINDO = 700

const FALA_DA_ETAPA = {
  inicio: FALAS.receitaOla,
  apresentando: FALAS.receitaParaSopa,
  sumindo: FALAS.receitaParaSopa,
  terminou: FALAS.receitaTerminou,
} as const satisfies Record<string, Fala>

type Etapa = keyof typeof FALA_DA_ETAPA // 'inicio' | 'apresentando' | 'sumindo' | 'terminou'

type ReceitaProps = {
  etapa: string
  receita: readonly IdIngrediente[]
  aoConcluir: (apresentacoes: number) => void
}

export function Receita({ etapa, receita, aoConcluir }: ReceitaProps) {
  const [etapaDaTela, setEtapaDaTela] = useState<Etapa>('inicio')
  const [quantosVisiveis, setQuantosVisiveis] = useState(0)
  const [apresentacoes, setApresentacoes] = useState(0)
  const [falando, setFalando] = useState(false)

  // useRef guarda um valor que sobrevive entre renders SEM causar
  // novo render quando muda. Ideal para "controles", como este.
  const controleRef = useRef<AbortController | null>(null)

  // Ao sair da tela, interrompe áudio e timers que ainda estejam rodando.
  useEffect(() => {
    return () => controleRef.current?.abort()
  }, [])

  async function apresentar() {
    controleRef.current?.abort()
    const controle = new AbortController()
    controleRef.current = controle
    const { signal } = controle

    // Liga a animação da vó enquanto o áudio toca.
    async function dizer(fala: Fala) {
      setFalando(true)
      await falar(fala, signal)
      setFalando(false)
    }

    const primeiraVez = apresentacoes === 0
    setApresentacoes((n) => n + 1)
    setQuantosVisiveis(0)

    // O "olá" só na primeira vez (no "ouvir de novo" vai direto à lista).
    if (primeiraVez) await dizer(FALAS.receitaOla)
    if (signal.aborted) return

    setEtapaDaTela('apresentando')
    await dizer(FALAS.receitaParaSopa)

    for (let i = 0; i < receita.length; i++) {
      if (signal.aborted) return
      setQuantosVisiveis(i + 1)
      // Espera o áudio E o tempo mínimo: o que demorar mais.
      await Promise.all([dizer(falaDoIngrediente(receita[i])), esperar(TEMPO_MINIMO_POR_ITEM, signal)])
    }

    await esperar(TEMPO_LISTA_COMPLETA, signal)
    if (signal.aborted) return

    // A lista some com animação: a partir daqui a informação só está na memória.
    setEtapaDaTela('sumindo')
    await esperar(TEMPO_SUMINDO, signal)
    if (signal.aborted) return
    setQuantosVisiveis(0)
    setEtapaDaTela('terminou')
    await dizer(FALAS.receitaTerminou)
  }

  // Botões só quando a vó não está falando (para não interromper).
  const acoes =
    etapaDaTela === 'inicio' && !falando ? (
      <Botao onClick={apresentar}>▶ Ouvir a receita</Botao>
    ) : etapaDaTela === 'terminou' ? (
      <>
        <Botao variante="secundario" onClick={apresentar}>↻ Ouvir de novo</Botao>
        <Botao onClick={() => aoConcluir(apresentacoes)}>Ir para a feira →</Botao>
      </>
    ) : null

  return (
    <TelaFase
      etapa={etapa}
      titulo="A receita"
      descricao="Preste atenção nos ingredientes que a vó vai dizer."
      acoes={acoes}
    >
      <div className={estilos.fala}>
        <FalaDaVo fala={FALA_DA_ETAPA[etapaDaTela].texto} falando={falando} />
      </div>

      <ul
        className={`${estilos.lista} ${etapaDaTela === 'sumindo' ? estilos.sumindo : ''}`}
        aria-label="Ingredientes da receita"
      >
        {receita.slice(0, quantosVisiveis).map((id) => (
          <li key={id} className={estilos.item}>
            <span className={estilos.icone} aria-hidden="true">{INGREDIENTES[id].icone}</span>
            {INGREDIENTES[id].nome}
          </li>
        ))}
      </ul>
    </TelaFase>
  )
}
