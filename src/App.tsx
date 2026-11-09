function App() {
  return (
    <main style={{ padding: 'var(--espaco-4)', maxWidth: '60rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--texto-titulo)' }}>Da Feira à Panela</h1>
      <p>Teste de leitura: Il1 O0 — letras que precisam ser fáceis de distinguir.</p>
      <p style={{ color: 'var(--cor-texto-suave)' }}>Texto secundário.</p>
      <p style={{ color: 'var(--cor-atencao)' }}>⚠ Mensagem de atenção (âmbar).</p>
      <button
        type="button"
        style={{
          background: 'var(--cor-primaria)',
          color: 'var(--cor-sobre-primaria)',
          border: 'none',
          borderRadius: 'var(--raio)',
          padding: '0 var(--espaco-4)',
        }}
      >
        Começar
      </button>
    </main>
  )
}

export default App
