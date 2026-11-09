import { Botao } from '../../componentes/Botao/Botao'
import { TelaFase } from '../../componentes/TelaFase/TelaFase'
import type { EstadoDoJogo } from '../../jogo/estadoDoJogo'
import {
  calcularIndicadoresDaFeira,
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

// Tela provisória para o aplicador conferir os dados.
// O painel completo (e a exportação) vem num bloco próprio.
export function Resultados({ etapa, estado, aoReiniciar }: ResultadosProps) {
  const { sessao } = estado
  const { troca } = sessao
  // Indicadores CALCULADOS aqui, a partir dos dados brutos do estado.
  const feira = estado.feira && calcularIndicadoresDaFeira(sessao.receita, sessao.troca, estado.feira)
  const panela = estado.panela && calcularIndicadoresDaPanela(sessao.receita, sessao.troca, estado.panela)

  return (
    <TelaFase
      etapa={etapa}
      titulo="Resultados"
      descricao="Resumo do desempenho para o aplicador."
      acoes={<Botao onClick={aoReiniciar}>Começar de novo</Botao>}
    >
      <section className={estilos.secao}>
        <h2>Treino e receita</h2>
        <dl className={estilos.dados}>
          <dt>Tentativas no treino</dt>
          <dd>{estado.tentativasNoTreino ?? '—'}</dd>
          <dt>Receita sorteada</dt>
          <dd>{nomes(sessao.receita)}</dd>
          <dt>Troca sorteada</dt>
          <dd>{INGREDIENTES[troca.sai].nome} → {INGREDIENTES[troca.entra].nome}</dd>
          <dt>Vezes que ouviu</dt>
          <dd>{estado.apresentacoesDaReceita ?? '—'}</dd>
        </dl>
      </section>

      {feira && estado.feira && (
        <>
          <section className={estilos.secao}>
            <h2>Feira — manutenção (antes da troca)</h2>
            <dl className={estilos.dados}>
              <LinhasDaComparacao comparacao={feira.manutencao} />
              <dt>Tempo</dt>
              <dd>{segundos(estado.feira.duracaoComprasMs)}</dd>
            </dl>
          </section>

          <section className={estilos.secao}>
            <h2>Feira — atualização (depois da troca)</h2>
            <dl className={estilos.dados}>
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
    </TelaFase>
  )
}
