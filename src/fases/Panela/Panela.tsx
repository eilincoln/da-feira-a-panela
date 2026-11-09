import { useEffect, useRef, useState } from 'react'
import { Botao } from '../../componentes/Botao/Botao'
import { FalaDaVo } from '../../componentes/FalaDaVo/FalaDaVo'
import { TelaFase } from '../../componentes/TelaFase/TelaFase'
import type { ResultadoDaPanela } from '../../jogo/indicadores'
import { INGREDIENTES, type IdIngrediente } from '../../jogo/ingredientes'
import { embaralhar, msDesde } from '../../jogo/utilidades'
import { FALAS, type Fala } from '../../voz/falas'
import { falar } from '../../voz/voz'
import estilos from './Panela.module.css'

type PanelaProps = {
  etapa: string
  // O que a pessoa comprou na feira (com os acertos E os erros dela).
  itens: readonly IdIngrediente[]
  aoConcluir: (resultado: ResultadoDaPanela) => void
}

export function Panela({ etapa, itens, aoConcluir }: PanelaProps) {
  // Inicializador em função: `embaralhar` roda UMA vez, quando a tela nasce.
  // Sem a função, ele rodaria a cada render e os itens trocariam de lugar.
  // Embaralhar evita que a ordem da sacola (= ordem de compra) seja uma dica.
  const [ordemNaTela] = useState(() => embaralhar(itens))
  const [sequencia, setSequencia] = useState<IdIngrediente[]>([])
  const [desfeitos, setDesfeitos] = useState(0)
  const [fala, setFala] = useState<Fala>(FALAS.panelaInstrucao)
  const [falando, setFalando] = useState(true) // a tela já abre com a vó falando

  const inicioRef = useRef(0)
  const controleRef = useRef<AbortController | null>(null)
  const panelaRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    inicioRef.current = performance.now()
    return () => controleRef.current?.abort()
  }, [])

  // A vó dá a instrução assim que a tela abre. O navegador deixa tocar
  // porque a pessoa acabou de tocar num botão ("Terminou a troca").
  useEffect(() => {
    const controle = new AbortController()
    controleRef.current = controle
    falar(FALAS.panelaInstrucao, controle.signal).then(() => {
      if (!controle.signal.aborted) setFalando(false)
    })
    return () => controle.abort()
  }, [])

  async function dizer(novaFala: Fala) {
    controleRef.current?.abort()
    const controle = new AbortController()
    controleRef.current = controle
    setFala(novaFala)
    setFalando(true)
    await falar(novaFala, controle.signal)
    if (!controle.signal.aborted) setFalando(false)
  }

  const completa = sequencia.length === ordemNaTela.length

  function colocar(id: IdIngrediente) {
    const nova = [...sequencia, id]
    setSequencia(nova)
    darTranco()
    if (nova.length === ordemNaTela.length) dizer(FALAS.panelaTerminou)
  }

  // Web Animations API: anima o elemento direto pelo JavaScript, sem
  // recriá-lo. (Trocar o `key` da panela recriaria TODOS os itens dentro
  // dela, e todos "cairiam" de novo.)
  function darTranco() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    panelaRef.current?.animate(
      [
        { transform: 'none' },
        { transform: 'translateY(0.4rem) rotate(-1deg)', offset: 0.4 },
        { transform: 'translateY(-0.15rem) rotate(0.5deg)', offset: 0.7 },
        { transform: 'none' },
      ],
      { duration: 450, easing: 'ease-out' },
    )
  }

  function desfazer() {
    setSequencia(sequencia.slice(0, -1))
    setDesfeitos((n) => n + 1)
    setFala(FALAS.panelaInstrucao)
  }

  function terminar() {
    controleRef.current?.abort()
    aoConcluir({
      ordemNaTela,
      sequencia,
      desfeitos,
      duracaoMs: msDesde(inicioRef.current),
    })
  }

  return (
    <TelaFase
      etapa={etapa}
      titulo="A panela"
      descricao="Toque nos ingredientes na ordem em que eles vão para a panela."
      acoes={
        <>
          <Botao variante="secundario" onClick={() => dizer(FALAS.panelaInstrucao)}>
            🔊 Ouvir de novo
          </Botao>
          {sequencia.length > 0 && (
            <Botao variante="secundario" onClick={desfazer}>↩ Desfazer o último</Botao>
          )}
          {(completa || ordemNaTela.length === 0) && (
            <Botao onClick={terminar}>Terminou →</Botao>
          )}
        </>
      }
    >
      <div className={estilos.fala}>
        <FalaDaVo fala={fala.texto} falando={falando} compacta />
      </div>

      {ordemNaTela.length === 0 ? (
        <p className={estilos.vazia}>A sacola ficou vazia na feira. Toque em “Terminou”.</p>
      ) : (
        <>
          <p className={estilos.rotulo}>Sua sacola</p>
          <div className={estilos.sacola}>
            {ordemNaTela.map((id) => {
              const jaFoi = sequencia.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  className={estilos.item}
                  onClick={() => colocar(id)}
                  disabled={jaFoi}
                >
                  <span className={estilos.icone} aria-hidden="true">
                    {jaFoi ? '·' : INGREDIENTES[id].icone}
                  </span>
                  {jaFoi ? 'na panela' : INGREDIENTES[id].nome}
                </button>
              )
            })}
          </div>

          <div className={estilos.areaDaPanela}>
            {/* key muda a cada ingrediente → as bolhas nascem de novo e a animação roda */}
            {sequencia.length > 0 && (
              <div key={sequencia.length} className={estilos.bolhas} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            )}
            <ol ref={panelaRef} className={estilos.panela} aria-label="Panela">
              {ordemNaTela.map((_, posicao) => {
                const id = sequencia[posicao]
                return (
                  <li
                    // key pela posição + item: trocar o item recria o lugar (e anima)
                    key={`${posicao}-${id ?? 'vazio'}`}
                    className={`${estilos.lugar} ${id ? estilos.ocupado : ''}`}
                  >
                    <span className={estilos.numero}>{posicao + 1}º</span>
                    {id ? (
                      <>
                        <span className={estilos.icone} aria-hidden="true">{INGREDIENTES[id].icone}</span>
                        {INGREDIENTES[id].nome}
                      </>
                    ) : (
                      <span className="sr-only">vazio</span>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        </>
      )}
    </TelaFase>
  )
}
