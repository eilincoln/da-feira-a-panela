/* =========================================
   VOZ — só síntese (texto → fala), nunca reconhecimento de fala.
   Funções que devolvem Promise: dá para usar `await falar(...)`
   e montar sequências (fala, espera, fala...) de forma legível.
   O AbortSignal permite interromper tudo (ex.: ao sair da tela).
   ========================================= */

const VELOCIDADE = 0.85 // um pouco mais devagar que o normal, pensando em idosos

export function vozDisponivel(): boolean {
  return 'speechSynthesis' in window
}

function escolherVoz(): SpeechSynthesisVoice | undefined {
  const vozesPtBr = speechSynthesis
    .getVoices()
    .filter((voz) => voz.lang.replace('_', '-').toLowerCase() === 'pt-br')
  // Prefere voz local (instalada no aparelho): funciona sem internet
  // e o texto não sai do navegador.
  return vozesPtBr.find((voz) => voz.localService) ?? vozesPtBr[0]
}

export function falar(texto: string, sinal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (!vozDisponivel() || sinal?.aborted) {
      resolve()
      return
    }

    const fala = new SpeechSynthesisUtterance(texto)
    fala.lang = 'pt-BR'
    fala.rate = VELOCIDADE
    const voz = escolherVoz()
    if (voz) fala.voice = voz

    // Rede de segurança: alguns navegadores às vezes não disparam `onend`.
    const limite = setTimeout(terminar, 3000 + texto.length * 150)

    function terminar() {
      clearTimeout(limite)
      sinal?.removeEventListener('abort', interromper)
      resolve()
    }

    function interromper() {
      speechSynthesis.cancel()
      terminar()
    }

    fala.onend = terminar
    fala.onerror = terminar
    sinal?.addEventListener('abort', interromper, { once: true })
    speechSynthesis.speak(fala)
  })
}

export function esperar(ms: number, sinal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (sinal?.aborted) {
      resolve()
      return
    }
    const id = setTimeout(resolve, ms)
    sinal?.addEventListener(
      'abort',
      () => {
        clearTimeout(id)
        resolve()
      },
      { once: true },
    )
  })
}
