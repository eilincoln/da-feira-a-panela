/* =========================================
   FALAS DA VÓ — catálogo de tudo o que o jogo diz em voz alta.
   Cada fala tem:
   - arquivo: nome do áudio gravado em public/audio/<arquivo>.mp3
   - texto: o que aparece no balão (e o que a síntese de voz lê
     como reserva, se o áudio ainda não existir).
   O roteiro de gravação em docs/ deve ter exatamente estes arquivos.
   ========================================= */
import type { Barraca } from '../jogo/barracas'
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
  almocoOla: {
    arquivo: 'almoco-ola',
    texto: 'Que almoço gostoso! Agora vamos lembrar da ida à feira.',
  },
  almocoLivre: {
    arquivo: 'almoco-livre',
    texto: 'Me conte: o que você comprou na feira?',
  },
  almocoReconhecimento: {
    arquivo: 'almoco-reconhecimento',
    texto: 'Agora toque em tudo o que você comprou.',
  },
  almocoOnde: {
    arquivo: 'almoco-onde',
    texto: 'Em qual barraca você comprou isto?',
  },
  almocoQuando: {
    arquivo: 'almoco-quando',
    texto: 'Qual destes você comprou primeiro?',
  },
  almocoFim: {
    arquivo: 'almoco-fim',
    texto: 'Obrigada! Foi um almoço delicioso.',
  },
} as const satisfies Record<string, Fala>

export function falaDoIngrediente(id: IdIngrediente): Fala {
  return { arquivo: `ingrediente-${id}`, texto: INGREDIENTES[id].nome }
}

// A troca é sorteada entre 16 × 15 combinações: gravar uma frase para cada
// seria inviável. Então são DUAS gravações por ingrediente, que se encaixam:
// "Ah, esqueci! Troque a batata" + "por mandioca." (32 arquivos no total).
export function falasDaTroca({ sai, entra }: Troca): [Fala, Fala] {
  return [
    { arquivo: `feira-troca-${sai}`, texto: `Ah, esqueci! Troque ${INGREDIENTES[sai].artigo} ${nomeMinusculo(sai)}` },
    { arquivo: `feira-troca-por-${entra}`, texto: `por ${nomeMinusculo(entra)}.` },
  ]
}

export function textoDaTroca(troca: Troca): string {
  return falasDaTroca(troca)
    .map((fala) => fala.texto)
    .join(' ')
}

// Uma gravação por barraca: a pergunta junta as 3 pistas (feirante, símbolo e cor).
export function falaDaPista(barraca: Barraca): Fala {
  const nome = barraca.nome.replace('Barraca', 'barraca')
  return {
    arquivo: `almoco-pista-${barraca.id}`,
    texto: `E na ${nome}, ${barraca.descricaoDaPista}, o que você comprou?`,
  }
}
