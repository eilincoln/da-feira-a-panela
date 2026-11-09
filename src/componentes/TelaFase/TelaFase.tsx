import type { ReactNode } from 'react'
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
  return (
    <main className={`${estilos.tela} ${larga ? estilos.larga : ''}`}>
      <header className={estilos.cabecalho}>
        <div>
          <p className={estilos.etapa}>{etapa}</p>
          <h1 className={estilos.titulo}>{titulo}</h1>
        </div>
        <div className={estilos.acoes}>{acoes}</div>
      </header>
      <p className={estilos.descricao}>{descricao}</p>
      <div className={estilos.conteudo}>{children}</div>
    </main>
  )
}
