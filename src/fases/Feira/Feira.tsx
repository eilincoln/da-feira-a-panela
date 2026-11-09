import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Botao } from '../../componentes/Botao/Botao'
import { FalaDaVo } from '../../componentes/FalaDaVo/FalaDaVo'
import { TelaFase } from '../../componentes/TelaFase/TelaFase'
import { BARRACAS } from '../../jogo/barracas'
import type { ResultadoDaFeira, Toque } from '../../jogo/indicadores'
import { INGREDIENTES, type IdIngrediente } from '../../jogo/ingredientes'
import { msDesde } from '../../jogo/utilidades'
import { FALAS } from '../../voz/falas'
import { falar } from '../../voz/voz'
import estilos from './Feira.module.css'

type Etapa = 'compras' | 'troca'

type FeiraProps = {
  etapa: string
  aoConcluir: (resultado: ResultadoDaFeira) => void
}

export function Feira({ etapa, aoConcluir }: FeiraProps) {
  const [etapaDaTela, setEtapaDaTela] = useState<Etapa>('compras')
  const [sacola, setSacola] = useState<IdIngrediente[]>([])
  const [falando, setFalando] = useState(false)

  // Refs: dados que precisamos guardar, mas que NÃO aparecem na tela.
  // Mudar um ref não renderiza de novo (diferente do useState).
  const toquesRef = useRef<Toque[]>([])
  const inicioRef = useRef(0)
  const inicioDaTrocaRef = useRef(0)
  const sacolaAntesDaTrocaRef = useRef<IdIngrediente[]>([])
  const controleRef = useRef<AbortController | null>(null)

  useEffect(() => {
    // O relógio começa quando a tela aparece. performance.now() é
    // monotônico: não "pula" se o relógio do sistema mudar.
    inicioRef.current = performance.now()
    return () => controleRef.current?.abort()
  }, [])

  function tocar(id: IdIngrediente) {
    const jaEstava = sacola.includes(id)
    toquesRef.current.push({
      item: id,
      acao: jaEstava ? 'tirou' : 'colocou',
      etapa: etapaDaTela,
      ms: msDesde(inicioRef.current),
    })
    setSacola(jaEstava ? sacola.filter((i) => i !== id) : [...sacola, id])
  }

  async function terminarCompras() {
    sacolaAntesDaTrocaRef.current = [...sacola]
    inicioDaTrocaRef.current = msDesde(inicioRef.current)
    setEtapaDaTela('troca')

    const controle = new AbortController()
    controleRef.current = controle
    setFalando(true)
    await falar(FALAS.feiraTroca, controle.signal)
    setFalando(false)
  }

  function terminarTroca() {
    controleRef.current?.abort()
    const fim = msDesde(inicioRef.current)
    aoConcluir({
      toques: toquesRef.current,
      sacolaAntesDaTroca: sacolaAntesDaTrocaRef.current,
      sacolaFinal: sacola,
      duracaoComprasMs: inicioDaTrocaRef.current,
      duracaoTrocaMs: fim - inicioDaTrocaRef.current,
    })
  }

  return (
    <TelaFase
      etapa={etapa}
      titulo="A feira"
      descricao="Toque nos ingredientes da sopa para colocar na sacola."
      acoes={
        etapaDaTela === 'compras' ? (
          <Botao onClick={terminarCompras}>Terminou as compras →</Botao>
        ) : (
          <Botao onClick={terminarTroca}>Terminou a troca →</Botao>
        )
      }
    >
      {etapaDaTela === 'troca' && (
        <div className={estilos.fala}>
          <FalaDaVo fala={FALAS.feiraTroca.texto} falando={falando} compacta />
        </div>
      )}

      <div className={estilos.barracas}>
        {BARRACAS.map((barraca, indice) => (
          <section
            key={barraca.id}
            className={estilos.barraca}
            // Variáveis CSS por barraca: a cor e o atraso da animação de entrada
            style={{ '--cor-barraca': barraca.cor, '--ordem': indice } as CSSProperties}
            aria-labelledby={`toldo-${barraca.id}`}
          >
            <h2 id={`toldo-${barraca.id}`} className={estilos.toldo}>
              <span className={estilos.simbolo} aria-hidden="true">{barraca.simbolo}</span>
              {barraca.nome}
              <span className="sr-only">(símbolo: {barraca.nomeDoSimbolo})</span>
            </h2>

            <div className={estilos.itens}>
              {barraca.itens.map((id) => {
                const naSacola = sacola.includes(id)
                return (
                  <button
                    key={id}
                    type="button"
                    className={`${estilos.item} ${naSacola ? estilos.naSacola : ''}`}
                    // aria-pressed: o leitor de tela anuncia "pressionado / não pressionado"
                    aria-pressed={naSacola}
                    onClick={() => tocar(id)}
                  >
                    {naSacola && <span className={estilos.selo} aria-hidden="true">✓</span>}
                    <span className={estilos.icone} aria-hidden="true">{INGREDIENTES[id].icone}</span>
                    {INGREDIENTES[id].nome}
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </TelaFase>
  )
}
