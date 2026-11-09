import estilos from './FalaDaVo.module.css'

type FalaDaVoProps = {
  fala: string
  falando?: boolean
  compacta?: boolean
}

// A vó + balão de fala. O texto do balão é o mesmo que a voz diz,
// assim quem não ouve bem também acompanha.
export function FalaDaVo({ fala, falando = false, compacta = false }: FalaDaVoProps) {
  const classesDaVo = `${estilos.vo} ${falando ? estilos.falando : ''}`
  return (
    <div className={`${estilos.cena} ${compacta ? estilos.compacta : ''}`}>
      <div className={classesDaVo} aria-hidden="true">
        👵
        {falando && <span className={estilos.ondas} />}
      </div>
      {/* A região aria-live fica fixa; só o <p> de dentro troca.
          `key={fala}` recria o <p> quando o texto muda → a animação roda de novo. */}
      <div className={estilos.areaDoBalao} aria-live="polite">
        <p key={fala} className={estilos.balao}>{fala}</p>
      </div>
    </div>
  )
}
