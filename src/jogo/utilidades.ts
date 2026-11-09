/* =========================================
   UTILIDADES — funções pequenas usadas em mais de uma fase
   ========================================= */

// Milissegundos desde `inicio`. Fica fora dos componentes: ler o relógio
// é "impuro" (cada chamada dá um valor diferente), e o React exige que o
// render seja puro. Só chame dentro de eventos (toques), nunca no render.
export function msDesde(inicio: number) {
  return Math.round(performance.now() - inicio)
}

// Embaralhamento de Fisher–Yates: cada ordem possível tem a mesma chance.
// (O truque `sort(() => Math.random() - 0.5)` parece funcionar, mas é enviesado.)
export function embaralhar<T>(lista: readonly T[]): T[] {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}
