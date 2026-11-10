# Da Feira à Panela — resumo do projeto para a parte escrita

> Documento de apoio para a ficha explicativa do **NeuroGame Lab** (Neurociência Cognitiva e Reabilitação).
> Atualizado em **09/11/2026** (as 4 fases estão prontas, com ícones próprios e efeitos sonoros). Apresentação: **23/11/2026**.
> Parte técnica (app): Lincoln. Parte escrita: estudante de Psicologia.

---

## 1. Em uma frase

Um jogo digital para tablet ou computador que **avalia e estimula a memória de trabalho e a memória episódica de adultos e idosos**, contado como uma história do dia a dia: a vó dita a receita da sopa, a pessoa vai à feira comprar os ingredientes, coloca tudo na panela na ordem certa e, mais tarde, no almoço, tenta lembrar como foi a ida à feira.

---

## 2. Onde estamos

| Parte | Situação |
|---|---|
| Base do app (cores, fonte, acessibilidade) | ✅ pronto |
| Navegação entre as fases | ✅ pronto |
| **Treino** (sem pontuação) | ✅ pronto |
| **Fase 1 — A receita** | ✅ pronto (aguardando a gravação da voz) |
| **Fase 2 — A feira** | ✅ pronto |
| Animações | ✅ pronto |
| **Fase 3 — A panela** | ✅ pronto |
| **Intervalo (distrator)** | ✅ pronto |
| **Sorteio a cada jogo + dificuldade maior** | ✅ pronto |
| **Fase 4 — O almoço** (memória episódica) | ✅ pronto |
| **Ícones próprios** dos 16 ingredientes | ✅ pronto (a vó, os animais e os itens do treino ainda usam emoji) |
| **Efeitos sonoros** | ✅ pronto |
| **Relatório da sessão + exportação em PDF** | ✅ pronto |
| Adaptação de dificuldade (3 → 7 itens) | ⏳ a fazer |
| Versão em papel/PDF (backup exigido pela professora) | ⏳ a fazer |

---

## 3. Objetivo e construtos avaliados

- **Memória de trabalho** (modelo de Baddeley & Hitch, 1974): manter a lista de ingredientes "na cabeça" (**manutenção**), modificá-la quando a vó pede uma troca (**atualização**) e lembrar a ordem (**componente sequencial**).
- **Memória episódica** (Tulving, 2002): lembrar o episódio vivido na feira, ou seja, **o quê** foi comprado, **onde** (qual barraca), **quem** vendeu (qual feirante) e **quando** (em que ordem).
- **Elo entre as fases:** o **buffer episódico** (Baddeley, 2000) é o componente que integra informações de várias fontes num episódio único. O jogo foi desenhado para que as mesmas informações passem pela memória de trabalho (fases 1 a 3) e depois sejam buscadas como episódio (fase 4).

### Lógica de interpretação (cruzando as fases)
| Padrão de desempenho | Interpretação provável |
|---|---|
| Erra já na feira (fase 2) | falha de **codificação** (a informação não chegou a ser bem registrada) |
| Acerta na feira, mas erra no almoço (fase 4) | falha de **armazenamento ou evocação** |
| …e melhora quando recebe uma pista | falha de **evocação**: a informação estava guardada, faltava o caminho para acessá-la (ideia de apoio ambiental, Craik, 1986) |
| Lembra os itens, mas não onde ou com quem os comprou | dificuldade de **associação** (hipótese do déficit associativo no envelhecimento, Naveh-Benjamin, 2000) |

---

## 4. Público e formato

- **Público:** adultos e idosos.
- **Quem opera o app é o aplicador.** O idoso só **toca ou aponta e fala**. Ele nunca digita, e as respostas faladas são registradas pelo aplicador.
- **Por que digital, e quais os cuidados:** testes computadorizados oferecem padronização e registro preciso de tempo e erros (Wild et al., 2008; Bauer et al., 2012), mas a familiaridade com tecnologia varia muito entre idosos (Czaja et al., 2006; Roque & Boot, 2018). Por isso existe o **treino** inicial, cujo resultado é registrado como **covariável**, e por isso a interação se limita ao toque simples (Kobayashi et al., 2011, sobre idosos e telas sensíveis ao toque).

---

## 5. As fases, uma por uma

### Treino (sem pontuação) — ✅ pronto
- **O que acontece:** três rodadas de *"Toque no chapéu / na cesta / na carteira"*. Errou, aparece *"Quase! Tente outra vez."*. Acertou, aparece *"Isso mesmo!"*. Depois de 2 erros seguidos na mesma rodada, o item certo é destacado com o texto *"Este aqui"*, para a pessoa não ficar errando várias vezes.
- **O que é registrado:** o **número total de tentativas** (mínimo 3). É a **covariável de familiaridade digital**: ajuda a separar "dificuldade de memória" de "dificuldade com a tela".
- **Detalhe metodológico:** os itens do treino (cesta, chapéu, carteira) **não são ingredientes** de propósito. Se fossem, ficariam pré-ativados na memória e contaminariam as fases seguintes (**interferência proativa**).

### Fase 1 — A receita — ✅ pronto
- **O que acontece:** a vó diz *"Para a sopa, vamos precisar de:"* e os ingredientes aparecem **um por um**, com imagem, nome escrito e voz, cada um por no mínimo 2 segundos. A lista completa fica 3 segundos na tela e depois **some**.
- **O que mede:** a **codificação** e a **retenção** na memória de trabalho.
- **Receita:** **5 itens**, sorteados a cada jogo novo e apresentados em ordem de preparo, que é a ordem que a panela vai pedir. O tamanho começou em 3, mas no teste piloto ficou fácil demais e passou para 5. Isso é um pouco acima do limite de cerca de 4 itens proposto por Cowan (2001), então exige esforço sem ser impossível. A adaptação de dificuldade (planejada) vai variar de 3 a 7 itens.
- **Apresentação multimodal:** imagem, palavra escrita e voz ao mesmo tempo. Isso reduz o peso de déficits sensoriais (auditivos ou visuais), comuns no envelhecimento.
- **O que é registrado:** quantas vezes a receita foi ouvida. O aplicador pode repetir se a pessoa se distraiu, mas repetir também é ensaiar, então o número fica registrado como **variável de controle**.

### Fase 2 — A feira — ✅ pronto
- **O que acontece:** a tela mostra **4 barracas com 4 itens cada (16 opções)**. Cada barraca tem **feirante, cor e símbolo**:

  | Barraca | Cor | Símbolo |
  |---|---|---|
  | Seu Zé | azul | ★ estrela |
  | Dona Rosa | âmbar | ● círculo |
  | Seu Tião | roxo | ▲ triângulo |
  | Dona Cida | petróleo | ■ quadrado |

  **O que cada barraca vende e em que posição ela aparece na tela são sorteados a cada jogo** (ver a seção "Sorteio a cada jogo", logo abaixo).

  A pessoa toca nos itens para colocá-los na sacola (e pode tocar de novo para tirar). O aplicador encerra as compras e então a vó pede **uma troca, sorteada entre três**:
  - *"Ah, esqueci! Troque a batata por mandioca."*
  - *"Ah, esqueci! Troque a cenoura por abóbora."*
  - *"Ah, esqueci! Troque o tomate por pimentão."*

  A pessoa faz a troca e o aplicador encerra a fase.
- **Por que as barracas têm 3 pistas visuais:** elas criam o **contexto** do episódio. No almoço (fase 4), essas pistas viram as perguntas *onde?* e *com quem?*.
- **Por que há itens que não estão na receita:** são **distratores**, legumes plausíveis numa sopa (berinjela, pepino, brócolis, cogumelo, pimenta, feijão, além dos itens de troca que não foram sorteados). Eles permitem medir **intrusões**. Com 16 opções e 5 itens certos, sobram 11 itens "tentadores".
- **O item novo da troca sempre fica numa barraca diferente do antigo:** assim, a troca exige buscar em outro lugar, e não apenas tocar no item ao lado.
- **Sem feedback de certo/errado:** nesta fase, que é de avaliação, o jogo **não** diz se a pessoa acertou. Um feedback ensinaria a resposta e alteraria a medida.

**Indicadores (definições operacionais):**

| Indicador | Definição |
|---|---|
| **Acertos** | itens da receita que foram colocados na sacola |
| **Omissões** | itens da receita que **não** foram colocados na sacola |
| **Intrusões** | itens colocados na sacola que **não** estão na receita |
| **Manutenção** | acertos, omissões e intrusões **antes** do aviso de troca, comparados com a receita original |
| **Atualização** | acertos, omissões e intrusões **depois** da troca, comparados com a receita já trocada (o item novo no lugar do antigo) |
| **Troca feita** | sim, se o item novo entrou **e** o antigo saiu |
| **Perseveração** | sim, se o item antigo continuou na sacola depois do aviso (erro típico de atualização) |
| **Tempo** | duração das compras e da troca, em milissegundos. Nunca aparece na tela, é só um indicador secundário |
| **Sequência de toques** | cada toque fica registrado (item, colocou ou tirou, momento). Isso permite reconstruir o *quando* para a fase 4 |

> *Span*: será calculado quando a adaptação de dificuldade (3 → 7 itens) estiver pronta. **Fica para vocês definirem juntos**: o maior tamanho de receita lembrado sem erros, ou outro critério?

### Sorteio a cada jogo — ✅ pronto
Cada vez que um jogo novo começa, o app sorteia:

| O que é sorteado | Como | Restrição |
|---|---|---|
| **A troca** | 1 entre 3 possíveis (batata→mandioca, cenoura→abóbora, tomate→pimentão) | São só 3 porque cada uma precisa de uma gravação de voz própria |
| **A receita** | 5 itens entre 7 possíveis (cebola, alho, tomate, batata, cenoura, milho, couve) | O item que sai na troca está sempre na receita |
| **O que cada barraca vende** | os 16 itens são embaralhados e divididos em 4 grupos de 4 | O item novo da troca nunca fica na mesma barraca do antigo |
| **A posição das barracas** | as 4 barracas aparecem em ordem embaralhada | — |

Isso dá 21 receitas diferentes × 3 trocas × milhares de arranjos de barracas. O sorteio de cada jogo fica **registrado nos resultados** (receita, troca e o que cada barraca vendia), porque o almoço precisa saber como era *aquela* feira.

**Por quê:** se o jogo fosse sempre igual, quem repetisse (por exemplo, numa reavaliação ou no uso como treino de reabilitação) poderia simplesmente decorar as respostas, e o jogo deixaria de medir memória de trabalho.

> ⚠️ **Ponto metodológico para a ficha:** com o sorteio, **participantes diferentes recebem versões diferentes** do jogo, e algumas podem ser um pouco mais fáceis que outras (por exemplo, se dois itens da receita caem na mesma barraca). Para uma **pesquisa** que compare pessoas, o mais rigoroso seria criar algumas **formas paralelas fixas** (Forma A, B, C…) e sortear entre elas, ou usar a mesma forma para todos na primeira aplicação. **Vale vocês decidirem e citarem como limitação ou escolha consciente.** Se decidirem por formas fixas, a mudança no app é pequena.

### Fase 3 — A panela — ✅ pronto
- **O que acontece:** a vó diz *"Agora vamos cozinhar! Coloque na panela na ordem que eu falei."* Aparecem os itens que a pessoa **comprou na feira**, embaralhados, e uma panela com lugares numerados (1º, 2º, 3º…). Cada toque coloca o item no próximo lugar da panela. O aplicador pode **desfazer o último** se a pessoa mudar de ideia. Quando a panela fica completa, a vó diz *"Hum, que cheiro bom!"* e o aplicador encerra a fase.
- **O que mede:** a memória de trabalho **sequencial**, ou seja, a ordem de preparo que a vó falou na fase 1, já com a troca da feira.
- **Decisão metodológica:** aparecem **os itens que a pessoa comprou**, incluindo os erros dela, e não a receita correta. É mais ecológico: ela cozinha o que levou para casa. Por isso, **a ordem só é avaliada entre os itens da receita**. Um item fora da receita (o pepino, por exemplo) vai para a panela, mas não tem posição "certa", porque a vó nunca falou dele. Ele é listado à parte e não entra na conta.
- **Por que embaralhar:** se os itens aparecessem na ordem da compra, a própria tela daria uma dica da sequência.
- **O item antigo e o novo da troca ocupam o mesmo lugar** na ordem de preparo (por exemplo, a mandioca substitui a batata). Se a pessoa não fez a troca e colocou o item antigo, a posição dele também é avaliada.

**Indicadores:**

| Indicador | Definição |
|---|---|
| **Itens avaliados** | itens colocados na panela que pertencem à receita (original ou trocada) |
| **Posições corretas** | itens avaliados que estão no lugar certo da ordem de preparo |
| **Erros de ordem** | itens avaliados fora do lugar certo (avaliados − posições corretas) |
| **Pares invertidos** | quantos pares de itens estão trocados entre si (0 = ordem perfeita). É mais sensível que os erros de ordem: trocar só dois vizinhos vale 1, inverter a lista toda vale o máximo |
| **Fora da receita** | itens na panela que não são da receita (listados, mas não entram na conta de ordem) |
| **Desfeitos** | quantas vezes o aplicador desfez o último item (pode indicar incerteza) |
| **Tempo** | duração da fase (só registrado, nunca exibido) |

> Exemplo: receita *cebola → mandioca → cenoura*; a pessoa coloca *cenoura → mandioca → cebola*. Resultado: 1 posição correta (mandioca), 2 erros de ordem, 3 pares invertidos.

### Intervalo (distrator) — ✅ pronto
- **O que acontece:** um joguinho de **busca visual com animais**: *"Toque em todos os gatos"*, com 12 cartas, das quais 3 são o alvo. Quando a pessoa acha os três, aparece *"Muito bem!"* e começa outra rodada com outro animal. As rodadas se repetem até o aplicador encerrar.
- **Duração:** o botão do aplicador (*"Ir para o almoço"*) só aparece depois de **5 minutos**. Não há relógio na tela.
- **Por que animais:** o intervalo precisa **ocupar a atenção** (para a pessoa não ficar repetindo a lista mentalmente) **sem interferir** no que será perguntado no almoço. Por isso, de propósito, ele **não tem comida, nem as cores e símbolos das barracas (★●▲■), nem pessoas**.
- **O que é registrado** (só para controle, não é indicador de memória): duração real do intervalo, rodadas completas e toques errados.
- **Sem voz**, por enquanto: o aplicador lê a instrução, que também aparece escrita.

### Fase 4 — O almoço — ✅ pronto
A vó abre: *"Que almoço gostoso! Agora vamos lembrar da ida à feira."* Em seguida vêm **5 etapas, sempre do menor para o maior apoio**. A ordem importa: se o reconhecimento viesse antes, ele "entregaria" as respostas da recordação.

**Referência de correção:** o que a pessoa **realmente comprou** (a sacola final da feira), e não a receita. A memória episódica é do episódio vivido, inclusive com os erros dela.

| Etapa | O que acontece | Dimensão | Quem responde |
|---|---|---|---|
| 1. **Recordação livre** | *"Me conte: o que você comprou na feira?"* | o quê | a pessoa **fala**; o aplicador marca |
| 2. **Recordação com pista** | para cada barraca onde ela comprou algo que **não** lembrou sozinha: *"E na barraca do Seu Zé, a da estrela azul, o que você comprou?"*, mostrando a barraca (cor, símbolo e feirante) **sem os itens** | o quê, com pista de onde/quem | a pessoa **fala**; o aplicador marca |
| 3. **Reconhecimento** | *"Agora toque em tudo o que você comprou."* Os 16 itens aparecem **misturados, sem as barracas** (para não dar pista de lugar) | o quê | a pessoa **toca** |
| 4. **Onde / com quem** | um item por vez (até 5): *"Em qual barraca você comprou isto?"* e as 4 barracas como resposta | onde + quem (associação) | a pessoa **toca** |
| 5. **Quando** | *"Qual destes você comprou primeiro?"*, com o 1º comprado, um do meio e o último | quando (ordem temporal) | a pessoa **toca** |

**Painel do aplicador (etapas 1 e 2):** a pessoa responde **falando** e o aplicador marca os nomes num painel com a lista de ingredientes, só em texto e em ordem alfabética. Como a tela é compartilhada, o painel **só abre depois que a pessoa terminou de responder** (botão "Registrar respostas"). Assim a lista não serve de "cola". Itens falados que nem existem na feira (por exemplo, "arroz") entram num contador próprio. Nas etapas de toque (3 a 5), o som é **neutro** e não há feedback de certo ou errado.

**Indicadores (definições operacionais):**

| Indicador | Definição |
|---|---|
| **Recordação livre** | itens comprados que a pessoa citou sem ajuda |
| **Intrusões (livre)** | itens citados que ela **não** comprou, mais os itens que nem existem na feira |
| **Recuperados com pista** | itens comprados que ela **não** citou na livre, mas citou com a pista |
| **Ganho com pista** | número de itens recuperados com pista. Se for alto, sugere **falha de evocação** (a informação estava guardada, faltava o acesso) |
| **Total evocado** | livre + recuperados com pista |
| **Reconhecimento** | itens comprados que ela tocou |
| **Falsos alarmes** | itens tocados no reconhecimento que ela **não** comprou |
| **Onde / quem** | quantas vezes acertou a barraca (e, junto, o feirante) do item |
| **Quando** | acertou ou não qual item comprou primeiro |
| **Item × associação** | % de itens reconhecidos × % de barracas lembradas. A hipótese do déficit associativo (Naveh-Benjamin, 2000) prevê que, no envelhecimento, a associação cai mais que o item |
| **Tempo** | duração do almoço (só registrado) |

> Exemplo: comprou cebola, mandioca, cenoura e pepino. Na livre, lembrou só a cebola (e disse "tomate" e "arroz"). Com pista, lembrou a cenoura. No reconhecimento, tocou cebola, mandioca, cenoura e milho. Acertou 2 de 3 barracas.
> Resultado: livre 1/4; intrusões 1 + 1 fora da feira; ganho com pista +1 (total evocado 2/4); reconhecimento 3/4 com 1 falso alarme; onde 2/3; **item 75% × associação 67%**.

---

### Relatório da sessão (PDF) — ✅ pronto
Ao final do jogo, aparece o **relatório da sessão**. O aplicador digita o **código do participante** e toca em **"📄 Exportar PDF"**. Na janela de impressão, é só escolher **"Salvar como PDF"** (no iPad: Compartilhar → Imprimir → Compartilhar o PDF).

**O que vai no PDF:**
- **Identificação:** código do participante, data e hora de início.
- **Sessão sorteada:** receita, troca e o que cada barraca vendia, na ordem em que apareceram, com os itens da receita marcados com \*.
- **Todos os indicadores** de cada fase: treino, receita, feira (manutenção e atualização), panela, intervalo e almoço.
- **Rodapé:** *"Protótipo acadêmico, sem estudo de validade nem normas: não é um instrumento diagnóstico."*

**Privacidade:** o campo de código **só aceita letras seguidas de números** (P01, AB12…). Um nome como "Maria" não passa, então nenhum dado pessoal vai parar no PDF por engano. O PDF é gerado no próprio aparelho, sem enviar nada a servidores. O nome do arquivo já sai pronto: `da-feira-a-panela_P01_2026-11-23.pdf`.

> **Para a análise:** cada PDF é uma sessão. Para comparar várias pessoas, será preciso passar os números para uma planilha. Se for útil, dá para gerar também um arquivo **CSV**, que abre direto no Excel ou no Google Planilhas.

---

## 6. Componente de reabilitação — ⏳ planejado

| Estratégia | No jogo | Referência |
|---|---|---|
| Dificuldade adaptativa | a receita varia de 3 a 7 itens conforme o desempenho (hoje fixa em 5) | — |
| Dicas que vão diminuindo | a ajuda vai sendo retirada aos poucos (já existe uma versão simples no treino) | Glisky, Schacter & Tulving (1986) |
| Aprendizagem sem erro | evitar que a pessoa erre repetidamente (o treino já destaca o item certo depois de 2 erros) | Baddeley & Wilson (1994); Clare & Woods (2004) |
| Recordação espaçada | relembrar em intervalos crescentes | Camp et al. (1996) |
| Prática de evocação | buscar a informação na memória, não apenas revê-la | Karpicke & Roediger (2008) |
| Agrupar por categoria | estratégia de organização (temperos, legumes, folhas) | — |

**Limite importante para a ficha:** a literatura mostra que treinos cognitivos costumam melhorar a tarefa treinada, mas a **transferência** para outras tarefas e para o dia a dia é limitada ou controversa (Melby-Lervåg & Hulme, 2013; Simons et al., 2016; Lampit et al., 2014). O jogo **não** deve prometer "melhorar a memória em geral".

Para fundamentar o envelhecimento cognitivo em geral, dá para usar Park et al. (2002) e Nyberg et al. (2012, manutenção cerebral). Para reabilitação, Wilson (2009).

---

## 7. Decisões de design e o porquê de cada uma

### Acessibilidade (baseada nas WCAG 2.2, W3C, 2023, nível AAA, o mais exigente)
- **Contraste de 7:1 ou mais** em todos os textos. Todas as cores foram calculadas.
- **Fonte de 24 px ou mais**, da família **Atkinson Hyperlegible**, criada para pessoas com baixa visão (diferencia bem letras como I, l e 1).
- **Alvos de toque de 64 px ou mais** (a recomendação AAA é 44 px).
- **Só toque simples:** sem arrastar, sem toque duplo, sem rolar a tela, sem menus escondidos.
- **Sem cronômetro visível**, para evitar ansiedade de desempenho. O tempo é registrado em segundo plano.
- **Botões do aplicador no canto superior direito**, longe da área onde o idoso toca. Isso diminui o risco de ele encerrar uma fase sem querer.
- **Tudo cabe na tela sem rolar**, inclusive a feira com 16 itens. Isso foi conferido em tamanhos de tablet (iPad deitado e em pé), descontando a barra do navegador.

### Daltonismo
- **A cor nunca é a única pista.** Certo e errado usam o eixo **azul/âmbar** (seguro para os tipos mais comuns de daltonismo), **nunca vermelho/verde**, e sempre vêm com **ícone** (✓ ou ↻), **texto** e **tipo de borda** (contínua ou tracejada).
- As barracas se diferenciam por cor, **símbolo e nome** ao mesmo tempo.

### Voz
- A voz da vó será **gravada por uma pessoa real**. A voz sintética do navegador soou robótica nos testes. A gravação tem duas vantagens: é mais calorosa e garante **o mesmo estímulo para todos os participantes** (padronização), já que vozes sintéticas mudam de aparelho para aparelho.
- Todo texto falado também aparece escrito no balão, para quem ouve mal.
- **O jogo fala, mas não escuta:** não usamos reconhecimento de voz, porque no Chrome o áudio seria enviado a servidores do Google, e dados de saúde são **dados sensíveis pela LGPD (art. 11)**.

### Ícones próprios
- Os 16 ingredientes ganharam **desenhos próprios (SVG)** no lugar dos emojis.
- **Por quê:** emojis mudam de aparência entre aparelhos (Apple, Android, Windows), e num instrumento de avaliação **o estímulo precisa ser o mesmo para todos**. Além disso, alguns ingredientes não existiam em emoji: a mandioca era uma batata-doce e a abóbora tinha cara de Halloween.
- **Cuidados de reconhecimento:** cores típicas de cada alimento, formas simples e **contorno escuro** (a WCAG pede contraste de 3:1 para elementos gráficos). A mandioca tem casca marrom e ponta cortada branca, para não ser confundida com a batata. O cogumelo é marrom e sem pintas, para não parecer venenoso.

### Efeitos sonoros
- Sons curtos, **gerados pelo próprio app** (sem arquivos e sem direitos autorais de terceiros).
- **Frequências médias (≈200 a 1000 Hz)**, porque a perda auditiva da idade atinge primeiro os agudos. Volume baixo e sem estalos.
- O **"tente de novo" é um tom descendente calmo, nunca uma buzina**, para não soar como punição.
- **Regra de avaliação:** nas fases que **medem** memória (feira, panela e almoço), o som é **neutro**: o mesmo para item certo e errado. Sons de "certo" só aparecem no treino e no intervalo, que não são medidas.
- Na receita, **não há som enquanto os itens aparecem**, para não competir com a voz no momento de memorizar. Há só um som quando a lista some.

### Animações
- Elas aparecem nos momentos certos e são curtas: tela nova entrando, ingrediente "caindo" na receita, lista sumindo, item pulando para a sacola, vó balançando enquanto fala, aviso de certo ou "quase".
- **Função:** guiar a atenção para o que importa em cada momento e deixar claro o que mudou na tela.
- **Cuidados:** nada pisca mais de 3 vezes por segundo (WCAG). Animações contínuas só acontecem enquanto algo está acontecendo (a vó falando, a dica). Quem configurou *"reduzir movimento"* no aparelho vê tudo sem animação.

### Privacidade (LGPD)
- **Sem nome do participante**, apenas um código (P01, P02…).
- **Nenhum dado sai do aparelho:** não há servidor nem banco de dados externo.

### Originalidade
- O jogo **não copia** testes comerciais (RAVLT, Blocos de Corsi, subtestes Wechsler etc.). Ele apenas usa **conceitos** da literatura, como listas de palavras, intrusões e reconhecimento, numa tarefa nova e ecológica (uma situação do cotidiano).

---

## 8. Limitações (sugestão para a ficha)

- É um **protótipo acadêmico**: não tem estudo de validade, fidedignidade nem normas. **Não é um instrumento diagnóstico.**
- Os ícones dos ingredientes foram desenhados para o jogo, mas **não foram testados quanto a reconhecimento com idosos** (seria um bom estudo piloto: pedir para nomearem cada desenho). A vó, os animais do intervalo e os itens do treino ainda são emojis, que mudam conforme o aparelho.
- No almoço, a tela é compartilhada: o painel do aplicador só abre depois da resposta, mas um participante atento ainda poderia vê-lo. Um segundo aparelho para o aplicador resolveria isso numa versão futura.
- A familiaridade com tecnologia pode influenciar o desempenho. Isso é parcialmente controlado pelo treino, mas não eliminado.
- O **sorteio** faz com que participantes diferentes recebam versões diferentes do jogo (ver o ponto metodológico na seção 5).
- A receita usa ingredientes conhecidos no Brasil. Hábitos alimentares regionais podem tornar alguns itens mais familiares que outros.

---

## 9. O que fica com você (checklist)

- [ ] **Conferir todas as referências no Google Scholar** (autores, ano, título, revista). A lista abaixo foi montada como ponto de partida e **precisa ser verificada**.
- [ ] Escrever a ficha explicativa (sugestão de estrutura na seção 11).
- [ ] **Gravar a voz da vó** (roteiro na seção 10), ou combinar quem grava.
- [ ] **Termo de consentimento de uso de voz** para quem gravar. O código do projeto fica público no GitHub (portfólio do Lincoln), então a voz também ficaria pública.
- [ ] Decidir com o Lincoln a **definição de *span***.
- [ ] Decidir: **sorteio livre ou formas paralelas fixas** (ver a seção 5).
- [ ] Pensar na **versão em papel/PDF** de backup para a apresentação.
- [ ] Se o jogo for aplicado em **pessoas reais** fora da sala de aula: TCLE e, para pesquisa, aprovação de um Comitê de Ética (CEP/Plataforma Brasil). Vale ao menos citar na ficha.

---

## 10. Roteiro de gravação da voz da vó

**Como gravar:**
- Lugar silencioso, sem eco (um quarto com cortinas e roupas absorve bem o som). Celular a uns 20 cm da boca, sempre na mesma distância.
- **Voz calma, calorosa e um pouco mais lenta que o normal**, como uma avó explicando uma receita. Mantenha o mesmo ritmo e volume em todas as falas.
- **Grave cada fala como um arquivo separado**, ou grave tudo de uma vez e depois recorte, por exemplo no Audacity, que é gratuito.
- Corte o silêncio do começo e do fim (deixe só uns 0,2 s).
- **Formato: MP3**, com o nome do arquivo **exatamente** como está na tabela (sem acentos, tudo minúsculo).
- Os ingredientes devem ser ditos **cada um como se fosse o fim de uma frase** (entonação descendo: *"Cebola."*), e não como pergunta nem como lista emendada.

**Falas atuais (34 arquivos):**

| Arquivo | O que dizer |
|---|---|
| `receita-ola.mp3` | Olá! Vou contar a receita da minha sopa. |
| `receita-para-sopa.mp3` | Para a sopa, vamos precisar de: |
| `receita-terminou.mp3` | Agora vamos à feira comprar tudo! |
| `feira-troca-batata-mandioca.mp3` | Ah, esqueci! Troque a batata por mandioca. |
| `feira-troca-cenoura-abobora.mp3` | Ah, esqueci! Troque a cenoura por abóbora. |
| `feira-troca-tomate-pimentao.mp3` | Ah, esqueci! Troque o tomate por pimentão. |
| `panela-instrucao.mp3` | Agora vamos cozinhar! Coloque na panela na ordem que eu falei. |
| `panela-terminou.mp3` | Hum, que cheiro bom! Agora vamos descansar um pouco. |
| `almoco-ola.mp3` | Que almoço gostoso! Agora vamos lembrar da ida à feira. |
| `almoco-livre.mp3` | Me conte: o que você comprou na feira? |
| `almoco-pista-ze.mp3` | E na barraca do Seu Zé, a da estrela azul, o que você comprou? |
| `almoco-pista-rosa.mp3` | E na barraca da Dona Rosa, a do círculo marrom, o que você comprou? |
| `almoco-pista-tiao.mp3` | E na barraca do Seu Tião, a do triângulo roxo, o que você comprou? |
| `almoco-pista-cida.mp3` | E na barraca da Dona Cida, a do quadrado verde-escuro, o que você comprou? |
| `almoco-reconhecimento.mp3` | Agora toque em tudo o que você comprou. |
| `almoco-onde.mp3` | Em qual barraca você comprou isto? |
| `almoco-quando.mp3` | Qual destes você comprou primeiro? |
| `almoco-fim.mp3` | Obrigada! Foi um almoço delicioso. |
| `ingrediente-cebola.mp3` | Cebola. |
| `ingrediente-alho.mp3` | Alho. |
| `ingrediente-tomate.mp3` | Tomate. |
| `ingrediente-batata.mp3` | Batata. |
| `ingrediente-cenoura.mp3` | Cenoura. |
| `ingrediente-milho.mp3` | Milho. |
| `ingrediente-couve.mp3` | Couve. |
| `ingrediente-mandioca.mp3` | Mandioca. |
| `ingrediente-pimentao.mp3` | Pimentão. |
| `ingrediente-berinjela.mp3` | Berinjela. |
| `ingrediente-pepino.mp3` | Pepino. |
| `ingrediente-brocolis.mp3` | Brócolis. |
| `ingrediente-abobora.mp3` | Abóbora. |
| `ingrediente-cogumelo.mp3` | Cogumelo. |
| `ingrediente-pimenta.mp3` | Pimenta. |
| `ingrediente-feijao.mp3` | Feijão. |

> Todos os 16 ingredientes entram na gravação, inclusive os que nunca vão para a receita, porque vão aparecer nas perguntas de reconhecimento do almoço.
>
> Na pergunta “onde”, o jogo toca `almoco-onde.mp3` e, logo depois, o nome do ingrediente (`ingrediente-*.mp3`). Por isso cada ingrediente deve ser gravado como uma palavra solta.
>
> Enquanto os arquivos não existem, o jogo usa a voz sintética do navegador no lugar. Assim, dá para ir testando tudo antes da gravação.

---

## 11. Sugestão de estrutura para a ficha explicativa

1. **Identificação:** nome do jogo, público-alvo, construtos, tempo estimado de aplicação.
2. **Fundamentação teórica:** memória de trabalho (Baddeley & Hitch; Cowan), buffer episódico (Baddeley, 2000), memória episódica (Tulving), envelhecimento cognitivo (Park; Craik; Naveh-Benjamin; Nyberg).
3. **Descrição das fases:** o que acontece, o que mede e os indicadores (seção 5 deste documento).
4. **Lógica de interpretação:** a tabela da seção 3 (codificação × evocação, item × associação).
5. **Componente de reabilitação** e seus limites (seção 6).
6. **Decisões de acessibilidade e ética:** WCAG, daltonismo, LGPD, voz gravada (seção 7).
7. **Limitações e próximos passos** (seção 8).
8. **Referências.**

---

## 12. Referências (⚠️ conferir todas no Google Scholar)

- Baddeley, A. D. (2000). O buffer episódico: um novo componente da memória de trabalho.
- Baddeley, A. D., & Hitch, G. (1974). Modelo de memória de trabalho.
- Baddeley, A. D., & Wilson, B. A. (1994). Aprendizagem sem erro em pessoas com amnésia.
- Bauer, R. M., et al. (2012). Dispositivos de avaliação neuropsicológica computadorizada.
- Camp, C. J., et al. (1996). Recordação espaçada.
- Clare, L., & Woods, R. T. (2004). Treino e reabilitação cognitiva em demência.
- Cowan, N. (2001). O "número mágico 4" da memória de curto prazo.
- Craik, F. I. M. (1986). Apoio ambiental e processamento autoiniciado no envelhecimento.
- Czaja, S. J., et al. (2006). Fatores que preveem o uso de tecnologia por idosos.
- Czaja, S. J., et al. (2019). *Designing for Older Adults* (livro).
- Glisky, E. L., Schacter, D. L., & Tulving, E. (1986). Método das pistas que desaparecem (*vanishing cues*).
- Karpicke, J. D., & Roediger, H. L. (2008). Importância da evocação para a aprendizagem.
- Kobayashi, M., et al. (2011). Idosos e dispositivos de tela sensível ao toque.
- Lampit, A., et al. (2014). Metanálise de treino cognitivo computadorizado em idosos saudáveis.
- Malloy-Diniz, L. F., et al. *Avaliação Neuropsicológica*. Artmed.
- Melby-Lervåg, M., & Hulme, C. (2013). Metanálise de treino de memória de trabalho.
- Naveh-Benjamin, M. (2000). Hipótese do déficit associativo no envelhecimento.
- Nyberg, L., et al. (2012). Manutenção cerebral e envelhecimento da memória.
- Park, D. C., et al. (2002). Modelos de cognição visuoespacial e verbal ao longo da vida.
- Roque, N. A., & Boot, W. R. (2018). Uso de tecnologia por idosos e barreiras.
- Simons, D. J., et al. (2016). Os programas de *brain training* funcionam?
- Tulving, E. (2002). Memória episódica: da mente ao cérebro.
- W3C (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*.
- Wild, K., et al. (2008). Situação da avaliação cognitiva computadorizada no envelhecimento.
- Wilson, B. A. (2009). *Memory Rehabilitation: Integrating Theory and Practice*.

> As descrições acima são só lembretes do tema de cada obra, **não são os títulos oficiais**. Os títulos e dados completos devem vir da busca no Google Scholar.
