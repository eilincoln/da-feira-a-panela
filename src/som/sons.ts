/* =========================================
   EFEITOS SONOROS — gerados na hora com a Web Audio API
   Por que sintetizar em vez de usar arquivos .mp3:
   - nenhum direito autoral de terceiros, nada para baixar;
   - cada som é só uma lista de notas: fácil de ajustar.
   Cuidados para idosos:
   - frequências entre ~200 e ~1000 Hz (a perda auditiva da idade
     atinge primeiro os agudos);
   - volume baixo e entrada suave (sem "estalo");
   - o "tente de novo" é um tom descendente calmo, nunca uma buzina.
   Regra de avaliação: nas fases que MEDEM memória (feira, panela,
   almoço), o som é NEUTRO — igual para item certo e errado.
   ========================================= */

const VOLUME_GERAL = 0.18

let contexto: AudioContext | null = null
let ligado = true

export function ligarSons(valor: boolean) {
  ligado = valor
}

// O navegador só libera o áudio depois de um toque do usuário. Criamos o
// contexto na primeira vez que um som é pedido (que sempre vem de um toque).
function obterContexto(): AudioContext | null {
  if (!ligado || typeof AudioContext === 'undefined') return null
  contexto ??= new AudioContext()
  if (contexto.state === 'suspended') void contexto.resume()
  return contexto
}

type Nota = {
  freq: number
  duracao: number // segundos
  inicio?: number // segundos depois do "agora"
  freqFinal?: number // se tiver, a nota "escorrega" até ela
  tipo?: OscillatorType
  volume?: number // multiplicador do volume geral
}

function tocar(notas: Nota[]) {
  const ctx = obterContexto()
  if (!ctx) return
  const agora = ctx.currentTime

  for (const nota of notas) {
    const oscilador = ctx.createOscillator()
    const ganho = ctx.createGain()
    const t0 = agora + (nota.inicio ?? 0)
    const fim = t0 + nota.duracao

    oscilador.type = nota.tipo ?? 'sine'
    oscilador.frequency.setValueAtTime(nota.freq, t0)
    if (nota.freqFinal) oscilador.frequency.exponentialRampToValueAtTime(nota.freqFinal, fim)

    // Envelope: sobe rápido (15 ms) e desce até quase zero.
    // Rampa exponencial não aceita 0, por isso 0.0001.
    const volume = VOLUME_GERAL * (nota.volume ?? 1)
    ganho.gain.setValueAtTime(0.0001, t0)
    ganho.gain.exponentialRampToValueAtTime(volume, t0 + 0.015)
    ganho.gain.exponentialRampToValueAtTime(0.0001, fim)

    oscilador.connect(ganho).connect(ctx.destination)
    oscilador.start(t0)
    oscilador.stop(fim + 0.05)
  }
}

export const sons = {
  // Feedback (só no treino e no intervalo, que não medem memória)
  certo: () =>
    tocar([
      { freq: 523, duracao: 0.15 }, // dó
      { freq: 784, duracao: 0.35, inicio: 0.1 }, // sol: subindo = "deu certo"
    ]),
  tenteDeNovo: () =>
    tocar([
      { freq: 392, duracao: 0.18, tipo: 'triangle', volume: 0.8 },
      { freq: 330, duracao: 0.3, inicio: 0.14, tipo: 'triangle', volume: 0.8 },
    ]),
  rodadaCompleta: () =>
    tocar([
      { freq: 523, duracao: 0.15 },
      { freq: 659, duracao: 0.15, inicio: 0.1 },
      { freq: 784, duracao: 0.15, inicio: 0.2 },
      { freq: 1047, duracao: 0.4, inicio: 0.3, volume: 0.8 },
    ]),

  // Neutros (fases de avaliação)
  toque: () => tocar([{ freq: 600, duracao: 0.07, tipo: 'triangle', volume: 0.6 }]),
  colocar: () => tocar([{ freq: 440, freqFinal: 740, duracao: 0.12, tipo: 'triangle' }]),
  tirar: () => tocar([{ freq: 700, freqFinal: 400, duracao: 0.12, tipo: 'triangle' }]),
  panela: () =>
    tocar([
      { freq: 200, freqFinal: 90, duracao: 0.25, volume: 1.3 }, // "plof"
      { freq: 600, freqFinal: 900, duracao: 0.08, inicio: 0.15, volume: 0.4 }, // bolha
      { freq: 700, freqFinal: 1000, duracao: 0.08, inicio: 0.27, volume: 0.3 }, // bolha
    ]),

  // Transições
  novaTela: () =>
    tocar([
      { freq: 392, duracao: 0.18, volume: 0.5 },
      { freq: 523, duracao: 0.3, inicio: 0.09, volume: 0.5 },
    ]),
  sumir: () => tocar([{ freq: 880, freqFinal: 220, duracao: 0.6, volume: 0.5 }]),
}
