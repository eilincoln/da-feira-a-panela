import { useCallback, useEffect, useRef, useState } from 'react'
import type { Fala } from './falas'
import { falar } from './voz'

// Hook personalizado: junta num lugar só a lógica que as telas repetiam
// (AbortController + estado "falando" + cancelar ao sair da tela).
// Por convenção, hooks começam com "use" e podem usar outros hooks.
export function useVo() {
  const [falando, setFalando] = useState(false)
  const controleRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => controleRef.current?.abort()
  }, [])

  // useCallback: a função mantém a mesma identidade entre renders,
  // então pode ser usada em dependências de efeitos sem disparar de novo.
  const dizer = useCallback(async (...falas: Fala[]) => {
    controleRef.current?.abort() // uma fala nova interrompe a anterior
    const controle = new AbortController()
    controleRef.current = controle
    setFalando(true)
    for (const fala of falas) {
      await falar(fala, controle.signal)
      if (controle.signal.aborted) return
    }
    setFalando(false)
  }, [])

  return { falando, dizer }
}
