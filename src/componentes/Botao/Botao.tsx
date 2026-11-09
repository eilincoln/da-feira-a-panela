import type { ComponentProps } from 'react'
import estilos from './Botao.module.css'

// Herda todas as props de um <button> nativo (onClick, disabled, aria-*...)
// e acrescenta só a `variante`.
type BotaoProps = ComponentProps<'button'> & {
  variante?: 'primario' | 'secundario'
}

export function Botao({ variante = 'primario', className, type = 'button', ...resto }: BotaoProps) {
  const classes = [estilos.botao, estilos[variante], className].filter(Boolean).join(' ')
  return <button type={type} className={classes} {...resto} />
}
