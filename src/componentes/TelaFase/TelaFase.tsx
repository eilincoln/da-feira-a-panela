import type { ReactNode } from 'react'
import estilos from './TelaFase.module.css'

type TelaFaseProps = {
  etapa: string
  titulo: string
  descricao: string
  children?: ReactNode // conteúdo próprio de cada fase (Bloco 3+)
  acoes: ReactNode     // botões no rodapé
}

// Moldura comum a todas as fases: mesmo cabeçalho e mesmo lugar para os botões.
export function TelaFase({ etapa, titulo, descricao, children, acoes }: TelaFaseProps) {
  return (
    <main className={estilos.tela}>
      <header>
        <p className={estilos.etapa}>{etapa}</p>
        <h1 className={estilos.titulo}>{titulo}</h1>
      </header>
      <p className={estilos.descricao}>{descricao}</p>
      <div className={estilos.conteudo}>{children}</div>
      <div className={estilos.acoes}>{acoes}</div>
    </main>
  )
}
