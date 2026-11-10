import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Botao } from '../../componentes/Botao/Botao'
import { FalaDaVo } from '../../componentes/FalaDaVo/FalaDaVo'
import { TelaFase } from '../../componentes/TelaFase/TelaFase'
import { IconeIngrediente } from '../../icones/IconeIngrediente'
import type { IdBarraca } from '../../jogo/barracas'
import type { RespostaDeOnde, ResultadoDoAlmoco } from '../../jogo/indicadores'
import { INGREDIENTES, TODOS_OS_INGREDIENTES, type IdIngrediente } from '../../jogo/ingredientes'
import type { BarracaDaSessao } from '../../jogo/sessao'
import { embaralhar, msDesde } from '../../jogo/utilidades'
import { sons } from '../../som/sons'
import { FALAS, falaDaPista, falaDoIngrediente, type Fala } from '../../voz/falas'
import { useVo } from '../../voz/useVo'
import estilos from './Almoco.module.css'
import { PainelDoAplicador } from './PainelDoAplicador'

// Quantos itens entram na pergunta "onde você comprou?" (para não cansar)
const MAXIMO_DE_PERGUNTAS_ONDE = 5

// As 5 etapas vão do MENOS para o MAIS apoio. A ordem importa: se o
// reconhecimento viesse antes, ele "entregaria" as respostas da recordação.
type Etapa = 'livre' | 'pista' | 'reconhecimento' | 'onde' | 'quando' | 'fim'

const DESCRICAO: Record<Etapa, string> = {
  livre: 'Vamos lembrar da feira.',
  pista: 'Uma ajudinha para lembrar.',
  reconhecimento: 'Toque em tudo o que você comprou.',
  onde: 'Onde você comprou?',
  quando: 'O que veio primeiro?',
  fim: 'Fim do jogo!',
}

// Alfabética: o aplicador acha o nome rápido no painel
const EM_ORDEM_ALFABETICA = TODOS_OS_INGREDIENTES.toSorted((a, b) =>
  INGREDIENTES[a].nome.localeCompare(INGREDIENTES[b].nome, 'pt-BR'),
)

// "Quando": o primeiro comprado contra o do meio e o último.
function montarPerguntaQuando(comprados: readonly IdIngrediente[]) {
  if (comprados.length < 2) return null
  const primeiro = comprados[0]
  const ultimo = comprados[comprados.length - 1]
  const meio = comprados.length >= 3 ? [comprados[Math.floor(comprados.length / 2)]] : []
  return { opcoes: embaralhar([primeiro, ...meio, ultimo]), certa: primeiro }
}

function alternar<T>(lista: readonly T[], valor: T): T[] {
  return lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]
}

type AlmocoProps = {
  etapa: string
  comprados: readonly IdIngrediente[] // sacola final da feira, em ordem de compra
  barracas: readonly BarracaDaSessao[]
  aoConcluir: (resultado: ResultadoDoAlmoco) => void
}

export function Almoco({ etapa, comprados, barracas, aoConcluir }: AlmocoProps) {
  const { falando, dizer } = useVo()
  const [etapaAtual, setEtapaAtual] = useState<Etapa>('livre')
  const [fala, setFala] = useState<Fala>(FALAS.almocoLivre)
  const [painelAberto, setPainelAberto] = useState(false)

  // Respostas de cada etapa
  const [livre, setLivre] = useState<IdIngrediente[]>([])
  const [outros, setOutros] = useState(0)
  const [barracasDaPista, setBarracasDaPista] = useState<BarracaDaSessao[]>([])
  const [indiceDaPista, setIndiceDaPista] = useState(0)
  const [pista, setPista] = useState<Partial<Record<IdBarraca, IdIngrediente[]>>>({})
  const [reconhecidos, setReconhecidos] = useState<IdIngrediente[]>([])
  const [onde, setOnde] = useState<RespostaDeOnde[]>([])
  const [quando, setQuando] = useState<ResultadoDoAlmoco['quando']>(null)

  // Sorteados UMA vez, quando a tela nasce
  const [gradeDoReconhecimento] = useState(() => embaralhar(TODOS_OS_INGREDIENTES))
  const [perguntasOnde] = useState(() => embaralhar(comprados).slice(0, MAXIMO_DE_PERGUNTAS_ONDE))
  const [perguntaQuando] = useState(() => montarPerguntaQuando(comprados))

  const inicioRef = useRef(0)

  useEffect(() => {
    inicioRef.current = performance.now()
    // A vó abre o almoço sozinha (a pessoa acabou de tocar num botão,
    // então o navegador libera o áudio).
    dizer(FALAS.almocoOla, FALAS.almocoLivre)
  }, [dizer])

  // Muda de etapa e já faz a vó dizer a pergunta nova
  function irPara(nova: Etapa, ...falas: Fala[]) {
    setEtapaAtual(nova)
    setPainelAberto(false)
    setFala(falas[0])
    dizer(...falas)
  }

  function perguntarOnde(item: IdIngrediente) {
    // Duas falas gravadas separadas ("Em qual barraca você comprou isto?" + "Cebola.")
    setFala({ ...FALAS.almocoOnde, texto: `${FALAS.almocoOnde.texto} (${INGREDIENTES[item].nome})` })
    dizer(FALAS.almocoOnde, falaDoIngrediente(item))
  }

  // ---------- transições ----------

  function terminarLivre() {
    // Pista só para barracas onde a pessoa comprou algo que NÃO lembrou sozinha
    const precisamDePista = barracas.filter((b) =>
      b.itens.some((id) => comprados.includes(id) && !livre.includes(id)),
    )
    if (precisamDePista.length > 0) {
      setBarracasDaPista(precisamDePista)
      setIndiceDaPista(0)
      irPara('pista', falaDaPista(precisamDePista[0]))
    } else {
      irParaReconhecimento()
    }
  }

  function proximaPista() {
    const proximo = indiceDaPista + 1
    if (proximo < barracasDaPista.length) {
      setIndiceDaPista(proximo)
      setPainelAberto(false)
      const novaFala = falaDaPista(barracasDaPista[proximo])
      setFala(novaFala)
      dizer(novaFala)
    } else {
      irParaReconhecimento()
    }
  }

  function irParaReconhecimento() {
    irPara('reconhecimento', FALAS.almocoReconhecimento)
  }

  function terminarReconhecimento() {
    if (perguntasOnde.length > 0) {
      setEtapaAtual('onde')
      perguntarOnde(perguntasOnde[0])
    } else {
      irParaQuando()
    }
  }

  function responderOnde(barraca: IdBarraca) {
    sons.toque() // neutro: não revela se acertou
    const item = perguntasOnde[onde.length]
    const certa = barracas.find((b) => b.itens.includes(item))!.id
    const novas = [...onde, { item, resposta: barraca, certa }]
    setOnde(novas)
    if (novas.length < perguntasOnde.length) perguntarOnde(perguntasOnde[novas.length])
    else irParaQuando()
  }

  function irParaQuando() {
    if (perguntaQuando) irPara('quando', FALAS.almocoQuando)
    else finalizar()
  }

  function responderQuando(id: IdIngrediente) {
    sons.toque()
    if (perguntaQuando) setQuando({ ...perguntaQuando, resposta: id })
    finalizar()
  }

  function finalizar() {
    sons.rodadaCompleta() // comemora o FIM do jogo, não um acerto
    irPara('fim', FALAS.almocoFim)
  }

  function concluir() {
    aoConcluir({
      comprados,
      livre: { lembrados: livre, outros },
      pista: barracasDaPista.map((b) => ({ barraca: b.id, lembrados: pista[b.id] ?? [] })),
      reconhecimento: reconhecidos,
      onde,
      quando,
      duracaoMs: msDesde(inicioRef.current),
    })
  }

  // ---------- telas ----------

  const ouvirDeNovo = (
    <Botao variante="secundario" onClick={() => dizer(fala)} disabled={falando}>
      🔊 Ouvir de novo
    </Botao>
  )

  // Livre e pista: o aplicador só abre o painel DEPOIS que a pessoa terminou
  // de falar, para a lista de nomes não servir de "cola".
  // `key` diferente em cada botão: sem ela, o React reaproveitaria o MESMO
  // <button> (só trocando texto e classe), e a transição de cor deixaria o
  // texto branco sobre fundo branco por um instante.
  const acoesDeRegistro = (aoTerminar: () => void) => (
    <>
      {ouvirDeNovo}
      {painelAberto ? (
        <Botao key="proximo" onClick={aoTerminar}>Próximo →</Botao>
      ) : (
        <Botao key="registrar" variante="secundario" onClick={() => setPainelAberto(true)}>
          📋 Registrar respostas
        </Botao>
      )}
    </>
  )

  const orientacao = (
    <p className={estilos.orientacao}>
      Aplicador: deixe a pessoa responder com calma. Quando ela terminar, toque em “Registrar respostas”.
    </p>
  )

  let conteudo: ReactNode = null
  let acoes: ReactNode = null

  switch (etapaAtual) {
    case 'livre':
      acoes = acoesDeRegistro(terminarLivre)
      conteudo = painelAberto ? (
        <PainelDoAplicador
          titulo="Recordação livre"
          opcoes={EM_ORDEM_ALFABETICA}
          marcados={livre}
          aoAlternar={(id) => setLivre((l) => alternar(l, id))}
          outros={{ quantidade: outros, aoMudar: setOutros }}
        />
      ) : (
        orientacao
      )
      break

    case 'pista': {
      const barraca = barracasDaPista[indiceDaPista]
      acoes = acoesDeRegistro(proximaPista)
      conteudo = (
        <>
          {/* A pista: as mesmas 3 marcas da barraca (cor, símbolo, feirante), sem os itens.
              Some quando o painel abre (a pessoa já respondeu) para caber sem rolagem. */}
          {!painelAberto && (
            <div
              key={barraca.id}
              className={`${estilos.barraca} ${estilos.cartaoDaPista}`}
              style={{ '--cor-barraca': barraca.cor } as CSSProperties}
            >
              <span className={estilos.simbolo} aria-hidden="true">{barraca.simbolo}</span>
              {barraca.nome}
            </div>
          )}
          {painelAberto ? (
            <PainelDoAplicador
              titulo={`Com pista (${barraca.feirante})`}
              opcoes={EM_ORDEM_ALFABETICA}
              marcados={pista[barraca.id] ?? []}
              aoAlternar={(id) =>
                setPista((p) => ({ ...p, [barraca.id]: alternar(p[barraca.id] ?? [], id) }))
              }
            />
          ) : (
            orientacao
          )}
        </>
      )
      break
    }

    case 'reconhecimento':
      acoes = (
        <>
          {ouvirDeNovo}
          <Botao onClick={terminarReconhecimento}>Pronto →</Botao>
        </>
      )
      conteudo = (
        <div className={estilos.grade}>
          {gradeDoReconhecimento.map((id) => {
            const escolhido = reconhecidos.includes(id)
            return (
              <button
                key={id}
                type="button"
                className={`${estilos.item} ${escolhido ? estilos.escolhido : ''}`}
                aria-pressed={escolhido}
                onClick={() => {
                  if (escolhido) sons.tirar()
                  else sons.colocar()
                  setReconhecidos((r) => alternar(r, id))
                }}
              >
                {escolhido && <span className={estilos.selo} aria-hidden="true">✓</span>}
                <IconeIngrediente id={id} className={estilos.icone} />
                {INGREDIENTES[id].nome}
              </button>
            )
          })}
        </div>
      )
      break

    case 'onde': {
      const item = perguntasOnde[onde.length]
      acoes = ouvirDeNovo
      conteudo = (
        <div className={estilos.perguntaOnde}>
          {/* key={item}: cada item novo "estoura" na tela */}
          <p key={item} className={estilos.itemEmDestaque}>
            <IconeIngrediente id={item} className={estilos.iconeGrande} />
            {INGREDIENTES[item].nome}
          </p>
          <div key={`barracas-${item}`} className={estilos.opcoesDeBarraca}>
            {barracas.map((barraca, indice) => (
              <button
                key={barraca.id}
                type="button"
                className={`${estilos.barraca} ${estilos.botaoBarraca}`}
                style={{ '--cor-barraca': barraca.cor, '--ordem': indice } as CSSProperties}
                onClick={() => responderOnde(barraca.id)}
                aria-label={`${barraca.nome} (símbolo: ${barraca.nomeDoSimbolo})`}
              >
                <span className={estilos.simbolo} aria-hidden="true">{barraca.simbolo}</span>
                {barraca.feirante}
              </button>
            ))}
          </div>
        </div>
      )
      break
    }

    case 'quando':
      acoes = ouvirDeNovo
      conteudo = (
        <div className={estilos.opcoesQuando}>
          {perguntaQuando?.opcoes.map((id) => (
            <button
              key={id}
              type="button"
              className={`${estilos.item} ${estilos.opcaoQuando}`}
              onClick={() => responderQuando(id)}
            >
              <IconeIngrediente id={id} className={estilos.icone} />
              {INGREDIENTES[id].nome}
            </button>
          ))}
        </div>
      )
      break

    case 'fim':
      acoes = <Botao onClick={concluir}>Ver resultados →</Botao>
      break
  }

  return (
    <TelaFase etapa={etapa} titulo="O almoço" descricao={DESCRICAO[etapaAtual]} larga acoes={acoes}>
      <div className={estilos.fala}>
        <FalaDaVo fala={fala.texto} falando={falando} compacta />
      </div>
      {conteudo}
    </TelaFase>
  )
}
