/* =========================================
   ÍCONES DOS INGREDIENTES — SVG próprio (substitui os emojis)
   Por que SVG próprio:
   - aparece IGUAL em qualquer aparelho (emoji muda entre Apple, Android, Windows);
     num instrumento de avaliação, o estímulo precisa ser o mesmo para todos;
   - permite desenhar o que não existe em emoji (mandioca, abóbora sem rosto);
   - escala sem perder qualidade e pesa quase nada.
   Estilo: formas simples, cores de referência do alimento e contorno escuro
   (contraste ≥ 3:1 com o fundo, exigido pela WCAG para elementos gráficos).
   O tamanho vem do font-size do CSS (width/height = 1em).
   ========================================= */
import type { ReactNode } from 'react'
import type { IdIngrediente } from '../jogo/ingredientes'

const CONTORNO = '#2b2b2b'

// Atributos comuns do contorno (espalhados com {...} nos desenhos)
const linha = { stroke: CONTORNO, strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round' } as const

const DESENHOS: Record<IdIngrediente, ReactNode> = {
  cebola: (
    <>
      <path d="M30 12c0-4 1-7 2-8 1 1 2 4 2 8" fill="#7aa548" {...linha} />
      <path d="M32 12c2 6 4 8 10 12 9 6 12 14 10 22-3 9-11 13-20 13s-17-4-20-13c-2-8 1-16 10-22 6-4 8-6 10-12z" fill="#a0529b" {...linha} />
      <path d="M32 22c-7 7-9 17-6 31M32 22c7 7 9 17 6 31M32 22v31" fill="none" stroke="#6d2f6a" strokeWidth={2} />
      <path d="M28 59l-2 3M32 59v3M36 59l2 3" {...linha} fill="none" />
    </>
  ),
  alho: (
    <>
      <path d="M29 14l1-8h4l1 8" fill="#d9cdb5" {...linha} />
      <path d="M32 14c3 6 6 8 12 12 8 6 10 13 8 20-3 9-11 13-20 13s-17-4-20-13c-2-7 0-14 8-20 6-4 9-6 12-12z" fill="#f6f1e7" {...linha} />
      <path d="M32 26c-8 6-9 18-4 32M32 26c8 6 9 18 4 32M24 30c-6 6-7 16-3 25M40 30c6 6 7 16 3 25" fill="none" stroke="#b9ab90" strokeWidth={2} />
    </>
  ),
  tomate: (
    <>
      <circle cx="32" cy="37" r="22" fill="#d7312b" {...linha} />
      <ellipse cx="23" cy="30" rx="5" ry="3" fill="#f2877c" />
      <polygon points="32,13 35,20 43,17 38,23 45,27 36,26 32,32 28,26 19,27 26,23 21,17 29,20" fill="#3f8a3a" {...linha} />
    </>
  ),
  pimentao: (
    <>
      <path d="M32 19c0-5 2-9 6-12" fill="none" stroke="#2f6b2a" strokeWidth={4} strokeLinecap="round" />
      <path d="M13 28c0-7 5-11 11-10 3-3 13-3 16 0 6-1 11 3 11 10 0 10-2 21-8 27-3 3-6 2-8 0-2 2-4 2-6 0-2 2-5 3-8 0-6-6-8-17-8-27z" fill="#3f9b3a" {...linha} />
      <path d="M26 21c-2 12-1 23 2 33M38 21c2 12 1 23-2 33" fill="none" stroke="#2b6d27" strokeWidth={2} />
      <ellipse cx="20" cy="30" rx="3" ry="6" fill="#7cc46f" />
    </>
  ),
  batata: (
    <>
      <path d="M10 37c0-13 11-23 25-23 11 0 19 7 19 18 0 12-11 21-25 21-12 0-19-6-19-16z" fill="#c8955a" {...linha} />
      <g fill="#7d4f22">
        <ellipse cx="24" cy="30" rx="2" ry="1.5" />
        <ellipse cx="39" cy="25" rx="2" ry="1.5" />
        <ellipse cx="30" cy="43" rx="2" ry="1.5" />
        <ellipse cx="45" cy="38" rx="2" ry="1.5" />
        <ellipse cx="18" cy="40" rx="1.5" ry="1" />
      </g>
    </>
  ),
  mandioca: (
    <>
      {/* raiz comprida com casca marrom e ponta cortada branca (diferente da batata) */}
      <path d="M6 56c8-12 22-28 38-38l8 9C40 38 22 50 8 58c-2 1-3 0-2-2z" fill="#7a4a26" {...linha} />
      <path d="M18 46l4 2M26 39l4 2M34 32l4 2M13 51l3 2" fill="none" stroke="#4e2d14" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx="48" cy="22" rx="7" ry="9" transform="rotate(45 48 22)" fill="#f7f0dc" {...linha} />
      <ellipse cx="48" cy="22" rx="3" ry="4" transform="rotate(45 48 22)" fill="#e6d7b0" />
    </>
  ),
  cenoura: (
    <>
      <path d="M32 19c-2-8-8-12-14-12 3 5 7 9 14 12z" fill="#4f9a3c" {...linha} />
      <path d="M32 19c0-9 2-14 6-16 1 7-1 12-6 16z" fill="#4f9a3c" {...linha} />
      <path d="M32 19c4-6 10-9 16-8-3 5-9 8-16 8z" fill="#4f9a3c" {...linha} />
      <path d="M20 24c0-3 3-5 6-5h12c3 0 6 2 6 5L34 58c-1 2-3 2-4 0z" fill="#ef8a1c" {...linha} />
      <path d="M24 31h6M33 38h6M27 46h5" fill="none" stroke="#b9620a" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  abobora: (
    <>
      <path d="M30 21c0-6 1-10 5-13l3 2c-3 3-4 7-4 11z" fill="#5d7a2c" {...linha} />
      <ellipse cx="32" cy="39" rx="27" ry="20" fill="#e9862b" {...linha} />
      <path d="M32 19c-8 6-8 34 0 40M32 19c8 6 8 34 0 40M19 22c-10 8-10 27 0 35M45 22c10 8 10 27 0 35" fill="none" stroke="#b05a10" strokeWidth={2.5} />
    </>
  ),
  milho: (
    <>
      <ellipse cx="32" cy="30" rx="11" ry="23" fill="#f4c430" {...linha} />
      <path d="M22 18h20M21 26h22M21 34h22M22 42h20M32 8v44M26 10v40M38 10v40" fill="none" stroke="#c9960a" strokeWidth={1.5} />
      <path d="M21 26c-7 12-6 25 8 34 0-10-1-21-8-34z" fill="#6aa84f" {...linha} />
      <path d="M43 26c7 12 6 25-8 34 0-10 1-21 8-34z" fill="#5a9a42" {...linha} />
    </>
  ),
  couve: (
    <>
      <path d="M32 60c-2-10-15-12-21-23-6-10 0-24 10-28 6-3 14-2 20 2 10 6 14 18 8 28-5 9-14 11-17 21z" fill="#2f7d32" {...linha} />
      <path d="M32 60C30 42 28 28 25 10" fill="none" stroke="#bfe3b8" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M29 42l-12-8M28 32l-10-8M30 48l12-9M28 26l12-10" fill="none" stroke="#bfe3b8" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  berinjela: (
    <>
      <path d="M20 20l-6-9" fill="none" stroke="#3d7a2f" strokeWidth={4} strokeLinecap="round" />
      <path d="M21 24c7-4 15-2 19 4 8 10 16 17 14 26-2 8-12 9-21 2C24 50 15 40 15 32c0-3 2-6 6-8z" fill="#5b2a6e" {...linha} />
      <ellipse cx="38" cy="40" rx="3" ry="8" transform="rotate(-40 38 40)" fill="#8f5aa3" />
      <path d="M15 27c2-7 9-11 16-8-2 4-1 8 3 10-6 3-13 2-19-2z" fill="#4a8a3a" {...linha} />
    </>
  ),
  pepino: (
    <>
      <rect x="6" y="24" width="52" height="17" rx="8.5" transform="rotate(-28 32 32)" fill="#3e8e41" {...linha} />
      <path d="M14 44L48 26" fill="none" stroke="#86c98a" strokeWidth={2.5} strokeLinecap="round" />
      <g fill="#215c24">
        <circle cx="22" cy="36" r="1.3" />
        <circle cx="30" cy="34" r="1.3" />
        <circle cx="38" cy="28" r="1.3" />
        <circle cx="44" cy="30" r="1.3" />
        <circle cx="26" cy="41" r="1.3" />
      </g>
    </>
  ),
  brocolis: (
    <>
      <path d="M26 36h12l-2 22h-8z" fill="#9ccc65" {...linha} />
      <g fill="#2e7d32" {...linha}>
        <circle cx="20" cy="30" r="10" />
        <circle cx="44" cy="30" r="10" />
        <circle cx="32" cy="21" r="12" />
        <circle cx="32" cy="34" r="9" />
      </g>
      <g fill="#1b5e20">
        <circle cx="28" cy="18" r="2" />
        <circle cx="37" cy="23" r="2" />
        <circle cx="17" cy="29" r="2" />
        <circle cx="46" cy="28" r="2" />
        <circle cx="31" cy="35" r="2" />
      </g>
    </>
  ),
  cogumelo: (
    <>
      <path d="M24 38h16l-2 18c0 2-2 3-4 3h-4c-2 0-4-1-4-3z" fill="#f1e6d2" {...linha} />
      <path d="M7 35c0-14 11-25 25-25s25 11 25 25c0 3-2 4-5 4H12c-3 0-5-1-5-4z" fill="#a8703f" {...linha} />
      <ellipse cx="24" cy="21" rx="6" ry="3" fill="#c99464" />
    </>
  ),
  pimenta: (
    <>
      <path d="M44 15c4 2 6 7 4 12C44 41 30 52 13 57c-3 1-4-2-2-3 14-8 22-21 24-34 1-4 5-6 9-5z" fill="#d62828" {...linha} />
      <path d="M45 15c1-5 4-8 9-9" fill="none" stroke="#3f7d2a" strokeWidth={4} strokeLinecap="round" />
      <path d="M38 17c4-4 9-4 12 0-3 4-8 5-12 0z" fill="#4f9a3c" {...linha} />
      <path d="M40 24c-2 10-8 19-16 25" fill="none" stroke="#f08080" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  feijao: (
    <>
      <g fill="#7b2d26" {...linha}>
        <path d="M8 26c0-6 6-10 12-9 7 1 11 7 9 13-1 5-7 7-11 5-2-1-3-3-6-3-3 0-4-3-4-6z" />
        <path d="M30 22c0-6 6-10 12-9 7 1 11 7 9 13-1 5-7 7-11 5-2-1-3-3-6-3-3 0-4-3-4-6z" />
        <path d="M18 44c0-6 6-10 12-9 7 1 11 7 9 13-1 5-7 7-11 5-2-1-3-3-6-3-3 0-4-3-4-6z" />
      </g>
      <g fill="#b5544a">
        <ellipse cx="16" cy="22" rx="3" ry="1.5" />
        <ellipse cx="38" cy="18" rx="3" ry="1.5" />
        <ellipse cx="26" cy="40" rx="3" ry="1.5" />
      </g>
    </>
  ),
}

type IconeIngredienteProps = {
  id: IdIngrediente
  className?: string
}

// aria-hidden: o nome do ingrediente sempre aparece escrito ao lado,
// então o leitor de tela não precisa "ler" o desenho.
export function IconeIngrediente({ id, className }: IconeIngredienteProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {DESENHOS[id]}
    </svg>
  )
}
