/* =========================================
   FALAS DA VÓ — catálogo de tudo o que o jogo diz em voz alta.
   Cada fala tem:
   - arquivo: nome do áudio gravado em public/audio/<arquivo>.mp3
   - texto: o que aparece no balão (e o que a síntese de voz lê
     como reserva, se o áudio ainda não existir).
   O roteiro de gravação em docs/ deve ter exatamente estes arquivos.
   ========================================= */
import { INGREDIENTES, type IdIngrediente, type Troca } from '../jogo/ingredientes'

export type Fala = {
  arquivo: string
  texto: string
}

const nomeMinusculo = (id: IdIngrediente) => INGREDIENTES[id].nome.toLowerCase()

export const FALAS = {
  receitaOla: {
    arquivo: 'receita-ola',
    texto: 'Olá! Vou contar a receita da minha sopa.',
  },
  receitaParaSopa: {
    arquivo: 'receita-para-sopa',
    texto: 'Para a sopa, vamos precisar de:',
  },
  receitaTerminou: {
    arquivo: 'receita-terminou',
    texto: 'Agora vamos à feira comprar tudo!',
  },
  panelaInstrucao: {
    arquivo: 'panela-instrucao',
    texto: 'Agora vamos cozinhar! Coloque na panela na ordem que eu falei.',
  },
  panelaTerminou: {
    arquivo: 'panela-terminou',
    texto: 'Hum, que cheiro bom! Agora vamos descansar um pouco.',
  },
} as const satisfies Record<string, Fala>

export function falaDoIngrediente(id: IdIngrediente): Fala {
  return { arquivo: `ingrediente-${id}`, texto: INGREDIENTES[id].nome }
}

// Uma gravação para cada troca possível (ver TROCAS_POSSIVEIS).
export function falaDaTroca({ sai, entra }: Troca): Fala {
  return {
    arquivo: `feira-troca-${sai}-${entra}`,
    texto: `Ah, esqueci! Troque ${INGREDIENTES[sai].artigo} ${nomeMinusculo(sai)} por ${nomeMinusculo(entra)}.`,
  }
}
