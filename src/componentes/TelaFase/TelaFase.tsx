import { useEffect, useRef, type ReactNode } from 'react'
import { sons } from '../../som/sons'
import estilos from './TelaFase.module.css'

type TelaFaseProps = {
  etapa: string
  titulo: string
  descricao: string
  larga?: boolean
  children?: ReactNode // conteúdo próprio de cada fase
  acoes: ReactNode     // botões do aplicador
}

// Moldura comum a todas as fases.
// Os botões do aplicador ficam no canto superior direito: longe da área
// onde o idoso toca (menos risco de encerrar uma fase sem querer) e sem
// ocupar uma faixa inteira no rodapé (sem rolagem no tablet).
export function TelaFase({ etapa, titulo, descricao, larga = false, children, acoes }: TelaFaseProps) {
  // Som de "tela nova" ao entrar. O ref evita tocar duas vezes no modo de
  // desenvolvimento (o StrictMode monta, desmonta e monta de novo os efeitos,
  // mas mantém os refs).
  const jaTocouRef = useRef(false)
  useEffect(() => {
    if (jaTocouRef.current) return
    jaTocouRef.current = true
    sons.novaTela()
  }, [])

  return (
    <main className={`${estilos.tela} ${larga ? estilos.larga : ''}`}>
      <header className={estilos.cabecalho}>
        <div>
          <p className={estilos.etapa} data-nao-imprimir>
            {etapa}
          </p>
          <h1 className={estilos.titulo}>{titulo}</h1>
        </div>
        {/* data-nao-imprimir: botões não aparecem no PDF (ver base.css) */}
        <div className={estilos.acoes} data-nao-imprimir>
          {acoes}
        </div>
      </header>
      <p className={estilos.descricao}>{descricao}</p>
      <div className={estilos.conteudo}>{children}</div>
    </main>
  )
}
