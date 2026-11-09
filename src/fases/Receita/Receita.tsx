import { useEffect, useRef, useState } from 'react'
import { Botao } from '../../componentes/Botao/Botao'
import { TelaFase } from '../../componentes/TelaFase/TelaFase'
import { INGREDIENTES, type IdIngrediente } from '../../jogo/ingredientes'
import { esperar, falar } from '../../voz/voz'
import estilos from './Receita.module.css'

// Tempo mínimo de cada item na tela, mesmo sem voz no aparelho.
const TEMPO_MINIMO_POR_ITEM = 2000
// Quanto tempo a lista completa fica visível antes de sumir.
const TEMPO_LISTA_COMPLETA = 3000

const FALAS = {
  inicio: 'Olá! Vou contar a receita da minha sopa.',
  apresentando: 'Para a sopa, vamos precisar de:',
  terminou: 'Agora vamos à feira comprar tudo!',
} as const

type Etapa = keyof typeof FALAS // 'inicio' | 'apresentando' | 'terminou'

type ReceitaProps = {
  etapa: string
  receita: readonly IdIngrediente[]
  aoConcluir: (apresentacoes: number) => void
}

export function Receita({ etapa, receita, aoConcluir }: ReceitaProps) {
  const [etapaDaTela, setEtapaDaTela] = useState<Etapa>('inicio')
  const [quantosVisiveis, setQuantosVisiveis] = useState(0)
  const [apresentacoes, setApresentacoes] = useState(0)

  // useRef guarda um valor que sobrevive entre renders SEM causar
  // novo render quando muda. Ideal para "controles", como este.
  const controleRef = useRef<AbortController | null>(null)

  // Ao sair da tela, interrompe voz e timers que ainda estejam rodando.
  useEffect(() => {
    return () => controleRef.current?.abort()
  }, [])

  async function apresentar() {
    controleRef.current?.abort()
    const controle = new AbortController()
    controleRef.current = controle
    const { signal } = controle

    setApresentacoes((n) => n + 1)
    setQuantosVisiveis(0)
    setEtapaDaTela('apresentando')

    await falar(FALAS.apresentando, signal)

    for (let i = 0; i < receita.length; i++) {
      if (signal.aborted) return
      setQuantosVisiveis(i + 1)
      // Espera a fala E o tempo mínimo: o que demorar mais.
      await Promise.all([
        falar(INGREDIENTES[receita[i]].nome, signal),
        esperar(TEMPO_MINIMO_POR_ITEM, signal),
      ])
    }

    await esperar(TEMPO_LISTA_COMPLETA, signal)
    if (signal.aborted) return

    // A lista some: a partir daqui a informação só está na memória.
    setQuantosVisiveis(0)
    setEtapaDaTela('terminou')
    await falar(FALAS.terminou, signal)
  }

  const acoes =
    etapaDaTela === 'inicio' ? (
      <Botao onClick={apresentar}>▶ Ouvir a receita</Botao>
    ) : etapaDaTela === 'terminou' ? (
      <>
        <Botao variante="secundario" onClick={apresentar}>↻ Ouvir de novo</Botao>
        <Botao onClick={() => aoConcluir(apresentacoes)}>Ir para a feira →</Botao>
      </>
    ) : null // durante a apresentação, nenhum botão (para não interromper)

  return (
    <TelaFase
      etapa={etapa}
      titulo="A receita"
      descricao="Preste atenção nos ingredientes que a vó vai dizer."
      acoes={acoes}
    >
      <div className={estilos.cena}>
        <div className={estilos.vo} aria-hidden="true">👵</div>
        <p className={estilos.balao} aria-live="polite">{FALAS[etapaDaTela]}</p>
      </div>

      <ul className={estilos.lista} aria-label="Ingredientes da receita">
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
