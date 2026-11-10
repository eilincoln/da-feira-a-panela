import { useId } from 'react'
import { Botao } from '../../componentes/Botao/Botao'
import { INGREDIENTES, type IdIngrediente } from '../../jogo/ingredientes'
import { sons } from '../../som/sons'
import estilos from './PainelDoAplicador.module.css'

type PainelDoAplicadorProps = {
  titulo: string
  opcoes: readonly IdIngrediente[]
  marcados: readonly IdIngrediente[]
  aoAlternar: (id: IdIngrediente) => void
  // Contador de itens falados que nem existem na feira (ex.: "arroz")
  outros?: { quantidade: number; aoMudar: (quantidade: number) => void }
}

// Onde o aplicador registra as respostas FALADAS. O participante nunca
// digita; quem toca aqui é o aplicador.
export function PainelDoAplicador({ titulo, opcoes, marcados, aoAlternar, outros }: PainelDoAplicadorProps) {
  // useId: gera um id único e estável (para ligar o título à seção via aria)
  const idDoTitulo = useId()

  return (
    <section className={estilos.painel} aria-labelledby={idDoTitulo}>
      <div className={estilos.topo}>
        <h2 id={idDoTitulo} className={estilos.titulo}>📋 Aplicador · {titulo}</h2>
        {outros && (
          <div className={estilos.outros}>
            <span>Fora da feira: {outros.quantidade}</span>
            <Botao
              variante="secundario"
              onClick={() => outros.aoMudar(outros.quantidade - 1)}
              disabled={outros.quantidade === 0}
              aria-label="Diminuir itens fora da feira"
            >
              −
            </Botao>
            <Botao
              variante="secundario"
              onClick={() => outros.aoMudar(outros.quantidade + 1)}
              aria-label="Aumentar itens fora da feira"
            >
              +
            </Botao>
          </div>
        )}
      </div>

      <div className={estilos.opcoes}>
        {opcoes.map((id) => {
          const marcado = marcados.includes(id)
          return (
            <button
              key={id}
              type="button"
              className={`${estilos.opcao} ${marcado ? estilos.marcada : ''}`}
              aria-pressed={marcado}
              onClick={() => {
                sons.toque()
                aoAlternar(id)
              }}
            >
              {marcado && '✓ '}
              {INGREDIENTES[id].nome}
            </button>
          )
        })}
      </div>
    </section>
  )
}
