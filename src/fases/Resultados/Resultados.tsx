import { Fragment, useId, useRef, useState } from 'react'
import { Botao } from '../../componentes/Botao/Botao'
import { Feedback } from '../../componentes/Feedback/Feedback'
import { TelaFase } from '../../componentes/TelaFase/TelaFase'
import type { EstadoDoJogo } from '../../jogo/estadoDoJogo'
import {
  calcularIndicadoresDaFeira,
  calcularIndicadoresDoAlmoco,
  calcularIndicadoresDaPanela,
  type Comparacao,
} from '../../jogo/indicadores'
import { INGREDIENTES, type IdIngrediente } from '../../jogo/ingredientes'
import estilos from './Resultados.module.css'

type ResultadosProps = {
  etapa: string
  estado: EstadoDoJogo
  aoReiniciar: () => void
}

// Só código (P01, AB12...): letras + números, sem espaço. Um nome como
// "Maria" não passa, e isso evita que um dado pessoal vá parar no PDF (LGPD).
const FORMATO_DO_CODIGO = /^[A-Z]{1,3}\d{1,4}$/

function dataPorExtenso(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })
}

// AAAA-MM-DD (bom para nome de arquivo: fica em ordem cronológica na pasta)
function dataParaArquivo(iso: string) {
  return iso.slice(0, 10)
}

function nomes(ids: readonly IdIngrediente[]) {
  return ids.length === 0 ? 'nenhum' : ids.map((id) => INGREDIENTES[id].nome).join(', ')
}

function segundos(ms: number) {
  return `${(ms / 1000).toFixed(1).replace('.', ',')} s`
}

function minutos(ms: number) {
  const total = Math.round(ms / 1000)
  return `${Math.floor(total / 60)} min ${String(total % 60).padStart(2, '0')} s`
}

// Mostra acertos/omissões/intrusões com a contagem e os nomes.
function LinhasDaComparacao({ comparacao }: { comparacao: Comparacao }) {
  return (
    <>
      <dt>Acertos</dt>
      <dd>{comparacao.acertos.length} ({nomes(comparacao.acertos)})</dd>
      <dt>Omissões</dt>
      <dd>{comparacao.omissoes.length} ({nomes(comparacao.omissoes)})</dd>
      <dt>Intrusões</dt>
      <dd>{comparacao.intrusoes.length} ({nomes(comparacao.intrusoes)})</dd>
    </>
  )
}

// Relatório da sessão: na tela, para o aplicador conferir; no PDF, para guardar.
export function Resultados({ etapa, estado, aoReiniciar }: ResultadosProps) {
  const [codigo, setCodigo] = useState('')
  const [codigoInvalido, setCodigoInvalido] = useState(false)
  const campoRef = useRef<HTMLInputElement>(null)
  const idDoCampo = useId()
  const idDaAjuda = useId()

  const { sessao } = estado
  const { troca } = sessao
  // Indicadores CALCULADOS aqui, a partir dos dados brutos do estado.
  const feira = estado.feira && calcularIndicadoresDaFeira(sessao.receita, sessao.troca, estado.feira)
  const panela = estado.panela && calcularIndicadoresDaPanela(sessao.receita, sessao.troca, estado.panela)
  const almoco = estado.almoco && calcularIndicadoresDoAlmoco(estado.almoco)

  function exportarPdf() {
    if (!FORMATO_DO_CODIGO.test(codigo)) {
      setCodigoInvalido(true)
      campoRef.current?.focus()
      return
    }
    // O navegador usa o título da página como nome sugerido do PDF.
    const tituloOriginal = document.title
    document.title = `da-feira-a-panela_${codigo}_${dataParaArquivo(sessao.iniciadaEm)}`
    window.addEventListener('afterprint', () => (document.title = tituloOriginal), { once: true })
    window.print()
  }

  return (
    <TelaFase
      etapa={etapa}
      titulo="Relatório da sessão"
      descricao="Da Feira à Panela · resumo do desempenho para o aplicador."
      acoes={
        <>
          <Botao variante="secundario" onClick={aoReiniciar}>Começar de novo</Botao>
          <Botao onClick={exportarPdf}>📄 Exportar PDF</Botao>
        </>
      }
    >
      <section className={estilos.secao}>
        <h2>Identificação</h2>
        <dl className={estilos.dados}>
          <dt>
            <label htmlFor={idDoCampo}>Código do participante</label>
          </dt>
          <dd>
            {/* Na tela: campo para o APLICADOR digitar. No PDF: só o texto. */}
            <div className="so-na-tela">
              <input
                ref={campoRef}
                id={idDoCampo}
                className={estilos.campo}
                value={codigo}
                onChange={(e) => {
                  // Maiúsculas e sem espaços enquanto digita
                  setCodigo(e.target.value.toUpperCase().replace(/\s/g, ''))
                  setCodigoInvalido(false)
                }}
                maxLength={7}
                placeholder="P01"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                aria-describedby={idDaAjuda}
                aria-invalid={codigoInvalido}
              />
              <p id={idDaAjuda} className={estilos.ajuda}>
                Só o código (ex.: P01). Nunca o nome da pessoa.
              </p>
              <div aria-live="polite">
                {codigoInvalido && (
                  <Feedback tipo="tentarDeNovo" mensagem="Use letras e números, como P01." />
                )}
              </div>
            </div>
            <span className="so-na-impressao">{codigo}</span>
          </dd>
          <dt>Início da sessão</dt>
          <dd>{dataPorExtenso(sessao.iniciadaEm)}</dd>
        </dl>
      </section>

      <section className={estilos.secao}>
        <h2>Sessão sorteada</h2>
        <dl className={estilos.dados}>
          <dt>Receita ({sessao.receita.length} itens)</dt>
          <dd>{nomes(sessao.receita)}</dd>
          <dt>Troca pedida</dt>
          <dd>{INGREDIENTES[troca.sai].nome} → {INGREDIENTES[troca.entra].nome}</dd>
          {sessao.barracas.map((barraca) => (
            <Fragment key={barraca.id}>
              <dt>
                {barraca.simbolo} {barraca.feirante}
              </dt>
              <dd>
                {barraca.itens
                  .map((id) => INGREDIENTES[id].nome + (sessao.receita.includes(id) ? '*' : ''))
                  .join(', ')}
              </dd>
            </Fragment>
          ))}
        </dl>
        <p className={estilos.nota}>* item da receita. Barracas na ordem em que apareceram na tela.</p>
      </section>

      <section className={estilos.secao}>
        <h2>Treino e receita</h2>
        <dl className={estilos.dados}>
          <dt>Tentativas no treino</dt>
          <dd>{estado.tentativasNoTreino ?? '—'}</dd>
          <dt>Vezes que ouviu</dt>
          <dd>{estado.apresentacoesDaReceita ?? '—'}</dd>
        </dl>
      </section>

      {feira && estado.feira && (
        <>
          <section className={estilos.secao}>
            <h2>Feira — manutenção (antes da troca)</h2>
            <dl className={estilos.dados}>
              <dt>Sacola</dt>
              <dd>{nomes(estado.feira.sacolaAntesDaTroca)}</dd>
              <LinhasDaComparacao comparacao={feira.manutencao} />
              <dt>Tempo</dt>
              <dd>{segundos(estado.feira.duracaoComprasMs)}</dd>
            </dl>
          </section>

          <section className={estilos.secao}>
            <h2>Feira — atualização (depois da troca)</h2>
            <dl className={estilos.dados}>
              <dt>Sacola</dt>
              <dd>{nomes(estado.feira.sacolaFinal)}</dd>
              <LinhasDaComparacao comparacao={feira.atualizacao} />
              <dt>Troca feita</dt>
              <dd>{feira.trocaFeita ? 'sim' : 'não'}</dd>
              <dt>Perseveração</dt>
              <dd>
                {feira.perseveracao
                  ? `sim (manteve ${INGREDIENTES[troca.sai].artigo} ${INGREDIENTES[troca.sai].nome.toLowerCase()})`
                  : 'não'}
              </dd>
              <dt>Tempo</dt>
              <dd>{segundos(estado.feira.duracaoTrocaMs)}</dd>
              <dt>Toques no total</dt>
              <dd>{estado.feira.toques.length}</dd>
            </dl>
          </section>
        </>
      )}

      {panela && estado.panela && (
        <section className={estilos.secao}>
          <h2>Panela — ordem</h2>
          <dl className={estilos.dados}>
            <dt>Ordem colocada</dt>
            <dd>{nomes(estado.panela.sequencia)}</dd>
            <dt>Avaliados</dt>
            <dd>{panela.avaliados.length} (só itens da receita)</dd>
            <dt>Posições corretas</dt>
            <dd>{panela.posicoesCorretas.length} ({nomes(panela.posicoesCorretas)})</dd>
            <dt>Erros de ordem</dt>
            <dd>{panela.errosDeOrdem}</dd>
            <dt>Pares invertidos</dt>
            <dd>{panela.paresInvertidos}</dd>
            <dt>Fora da receita</dt>
            <dd>{nomes(panela.foraDaReceita)} (não entram na conta)</dd>
            <dt>Desfeitos</dt>
            <dd>{estado.panela.desfeitos}</dd>
            <dt>Tempo</dt>
            <dd>{segundos(estado.panela.duracaoMs)}</dd>
          </dl>
        </section>
      )}

      {estado.distrator && (
        <section className={estilos.secao}>
          <h2>Intervalo (distrator)</h2>
          <dl className={estilos.dados}>
            <dt>Duração</dt>
            <dd>{minutos(estado.distrator.duracaoMs)}</dd>
            <dt>Rodadas completas</dt>
            <dd>{estado.distrator.rodadasCompletas}</dd>
            <dt>Toques errados</dt>
            <dd>{estado.distrator.toquesErrados}</dd>
          </dl>
        </section>
      )}

      {almoco && estado.almoco && (
        <section className={estilos.secao}>
          <h2>Almoço — memória episódica</h2>
          <dl className={estilos.dados}>
            <dt>Comprados (referência)</dt>
            <dd>{almoco.total} ({nomes(estado.almoco.comprados)})</dd>
            <dt>Recordação livre</dt>
            <dd>{almoco.livre.acertos.length} de {almoco.total} ({nomes(almoco.livre.acertos)})</dd>
            <dt>Intrusões (livre)</dt>
            <dd>
              {almoco.livre.intrusoes.length} ({nomes(almoco.livre.intrusoes)}) + {almoco.intrusoesLivresForaDaFeira} fora da feira
            </dd>
            <dt>Recuperados com pista</dt>
            <dd>{almoco.recuperadosComPista.length} ({nomes(almoco.recuperadosComPista)})</dd>
            <dt>Intrusões (pista)</dt>
            <dd>{almoco.intrusoesComPista.length} ({nomes(almoco.intrusoesComPista)})</dd>
            <dt>Ganho com pista</dt>
            <dd>+{almoco.ganhoComPista} (total evocado: {almoco.evocadosNoTotal} de {almoco.total})</dd>
            <dt>Reconhecimento</dt>
            <dd>{almoco.reconhecimento.acertos.length} de {almoco.total} ({nomes(almoco.reconhecimento.acertos)})</dd>
            <dt>Falsos alarmes</dt>
            <dd>{almoco.reconhecimento.intrusoes.length} ({nomes(almoco.reconhecimento.intrusoes)})</dd>
            <dt>Onde / quem</dt>
            <dd>{almoco.ondeCertos} de {almoco.ondePerguntas}</dd>
            <dt>Quando</dt>
            <dd>{almoco.quandoCerto === null ? '—' : almoco.quandoCerto ? 'acertou' : 'errou'}</dd>
            <dt>Item × associação</dt>
            <dd>
              {almoco.porcentagemItem ?? '—'}% reconheceu × {almoco.porcentagemAssociacao ?? '—'}% lembrou onde
            </dd>
            <dt>Tempo</dt>
            <dd>{minutos(estado.almoco.duracaoMs)}</dd>
          </dl>
        </section>
      )}

      <p className={estilos.rodape}>
        Protótipo acadêmico (NeuroGame Lab), sem estudo de validade nem normas: não é um
        instrumento diagnóstico. Relatório gerado no próprio navegador; nenhum dado foi
        enviado a servidores.
      </p>
    </TelaFase>
  )
}
