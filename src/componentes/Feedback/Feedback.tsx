import estilos from './Feedback.module.css'

type FeedbackProps = {
  tipo: 'certo' | 'tentarDeNovo'
  mensagem: string
}

// Ícone diferente para cada tipo: a cor nunca é a única pista.
const ICONES = {
  certo: '✓',
  tentarDeNovo: '↻',
} as const

export function Feedback({ tipo, mensagem }: FeedbackProps) {
  return (
    <p className={`${estilos.feedback} ${estilos[tipo]}`}>
      <span className={estilos.icone} aria-hidden="true">{ICONES[tipo]}</span>
      {mensagem}
    </p>
  )
}
