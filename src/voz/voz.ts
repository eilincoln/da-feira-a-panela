/* =========================================
   VOZ — toca o áudio gravado; se ele não existir, usa a síntese
   de voz do navegador como reserva. Nunca reconhecimento de fala.
   Funções que devolvem Promise: dá para usar `await falar(...)`
   e montar sequências (fala, espera, fala...) de forma legível.
   O AbortSignal permite interromper tudo (ex.: ao sair da tela).
   ========================================= */
import type { Fala } from './falas'

const VELOCIDADE_DA_SINTESE = 0.9

// UM único elemento de áudio para o jogo inteiro. No Safari do iPad,
// o áudio só é liberado depois que um elemento toca dentro de um toque
// do usuário; reaproveitando o mesmo elemento, ele continua liberado.
const player = typeof Audio === 'undefined' ? null : new Audio()

export function falar(fala: Fala, sinal?: AbortSignal): Promise<void> {
  return tocarGravacao(fala.arquivo, sinal).catch((erro: unknown) => {
    if (import.meta.env.DEV) {
      console.warn(`Áudio "${fala.arquivo}.mp3" não tocou; usando síntese de voz.`, erro)
    }
    return sintetizar(fala.texto, sinal)
  })
}

function tocarGravacao(arquivo: string, sinal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!player) {
      reject(new Error('Navegador sem suporte a áudio'))
      return
    }
    if (sinal?.aborted) {
      resolve()
      return
    }

    function limpar() {
      player!.onended = null
      player!.onerror = null
      sinal?.removeEventListener('abort', interromper)
    }

    function interromper() {
      player!.pause()
      limpar()
      resolve()
    }

    player.onended = () => {
      limpar()
      resolve()
    }
    // Arquivo inexistente (404) ou formato inválido cai aqui → reserva
    player.onerror = () => {
      limpar()
      reject(new Error(`Falha ao carregar ${arquivo}.mp3`))
    }
    sinal?.addEventListener('abort', interromper, { once: true })

    // BASE_URL: funciona mesmo se o site for publicado numa subpasta
    player.src = `${import.meta.env.BASE_URL}audio/${arquivo}.mp3`
    player.play().catch((erro: unknown) => {
      limpar()
      reject(erro)
    })
  })
}

function escolherVoz(): SpeechSynthesisVoice | undefined {
  const vozesPtBr = speechSynthesis
    .getVoices()
    .filter((voz) => voz.lang.replace('_', '-').toLowerCase() === 'pt-br')
  // Prefere voz local (instalada no aparelho): funciona sem internet
  // e o texto não sai do navegador.
  return vozesPtBr.find((voz) => voz.localService) ?? vozesPtBr[0]
}

function sintetizar(texto: string, sinal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window) || sinal?.aborted) {
      resolve()
      return
    }

    const fala = new SpeechSynthesisUtterance(texto)
    fala.lang = 'pt-BR'
    fala.rate = VELOCIDADE_DA_SINTESE
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
