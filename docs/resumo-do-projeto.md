# Da Feira à Panela — resumo do projeto para a parte escrita

> Documento de apoio para a ficha explicativa do **NeuroGame Lab** (Neurociência Cognitiva e Reabilitação).
> Atualizado em **09/11/2026** (inclui a fase da panela). Apresentação: **23/11/2026**.
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
| Distrator (intervalo de 5 a 10 min) | ⏳ próximo passo |
| Fase 4 — O almoço (memória episódica) | ⏳ a fazer |
| Painel de resultados completo + exportação | ⏳ a fazer (já existe uma versão provisória) |
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
- **Receita atual:** 3 itens (cebola, batata, cenoura), em ordem de preparo. O tamanho poderá crescer até 7. O ponto de partida em 3 fica abaixo do limite de cerca de 4 itens proposto por Cowan (2001), para começar com uma tarefa fácil.
- **Apresentação multimodal:** imagem, palavra escrita e voz ao mesmo tempo. Isso reduz o peso de déficits sensoriais (auditivos ou visuais), comuns no envelhecimento.
- **O que é registrado:** quantas vezes a receita foi ouvida. O aplicador pode repetir se a pessoa se distraiu, mas repetir também é ensaiar, então o número fica registrado como **variável de controle**.

### Fase 2 — A feira — ✅ pronto
- **O que acontece:** a tela mostra 4 barracas. Cada uma tem **feirante, cor, símbolo e nome** e vende 3 itens:

  | Barraca | Cor | Símbolo | Itens |
  |---|---|---|---|
  | Seu Zé | azul | ★ estrela | cebola, pimentão, batata |
  | Dona Rosa | âmbar | ● círculo | cenoura, berinjela, alho |
  | Seu Tião | roxo | ▲ triângulo | tomate, mandioca, pepino |
  | Dona Cida | petróleo | ■ quadrado | milho, brócolis, couve |

  A pessoa toca nos itens para colocá-los na sacola (e pode tocar de novo para tirar). O aplicador encerra as compras e então a vó diz: ***"Ah, esqueci! Troque a batata por mandioca."*** A pessoa faz a troca e o aplicador encerra a fase.
- **Por que as barracas têm 4 pistas:** elas criam o **contexto** do episódio. No almoço (fase 4), essas pistas viram as perguntas *onde?* e *com quem?*.
- **Por que há itens que não estão na receita (pimentão, berinjela, pepino, brócolis):** são **distratores**, legumes plausíveis numa sopa. Eles permitem medir **intrusões**.
- **Por que a mandioca fica numa barraca diferente da batata:** para que a troca exija buscar em outro lugar, e não apenas tocar no item ao lado.
- **Sem feedback de certo/errado:** nesta fase, que é de avaliação, o jogo **não** diz se a pessoa acertou. Um feedback ensinaria a resposta e alteraria a medida.

**Indicadores (definições operacionais):**

| Indicador | Definição |
|---|---|
| **Acertos** | itens da receita que foram colocados na sacola |
| **Omissões** | itens da receita que **não** foram colocados na sacola |
| **Intrusões** | itens colocados na sacola que **não** estão na receita |
| **Manutenção** | acertos, omissões e intrusões **antes** do aviso de troca, comparados com a receita original |
| **Atualização** | acertos, omissões e intrusões **depois** da troca, comparados com a receita já trocada (mandioca no lugar da batata) |
| **Troca feita** | sim, se a mandioca entrou **e** a batata saiu |
| **Perseveração** | sim, se a batata continuou na sacola depois do aviso (erro típico de atualização) |
| **Tempo** | duração das compras e da troca, em milissegundos. Nunca aparece na tela, é só um indicador secundário |
| **Sequência de toques** | cada toque fica registrado (item, colocou ou tirou, momento). Isso permite reconstruir o *quando* para a fase 4 |

> *Span*: será calculado quando a adaptação de dificuldade (3 → 7 itens) estiver pronta. **Fica para vocês definirem juntos**: o maior tamanho de receita lembrado sem erros, ou outro critério?

### Fase 3 — A panela — ✅ pronto
- **O que acontece:** a vó diz *"Agora vamos cozinhar! Coloque na panela na ordem que eu falei."* Aparecem os itens que a pessoa **comprou na feira**, embaralhados, e uma panela com lugares numerados (1º, 2º, 3º…). Cada toque coloca o item no próximo lugar da panela. O aplicador pode **desfazer o último** se a pessoa mudar de ideia. Quando a panela fica completa, a vó diz *"Hum, que cheiro bom!"* e o aplicador encerra a fase.
- **O que mede:** a memória de trabalho **sequencial**, ou seja, a ordem de preparo que a vó falou na fase 1, já com a troca da feira.
- **Decisão metodológica:** aparecem **os itens que a pessoa comprou**, incluindo os erros dela, e não a receita correta. É mais ecológico: ela cozinha o que levou para casa. Por isso, **a ordem só é avaliada entre os itens da receita**. Um item fora da receita (o pepino, por exemplo) vai para a panela, mas não tem posição "certa", porque a vó nunca falou dele. Ele é listado à parte e não entra na conta.
- **Por que embaralhar:** se os itens aparecessem na ordem da compra, a própria tela daria uma dica da sequência.
- **A batata e a mandioca ocupam o mesmo lugar** na ordem de preparo (a mandioca substituiu a batata). Se a pessoa não fez a troca e colocou a batata, a posição dela também é avaliada.

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

### Distrator — ⏳ a fazer
- **Planejado:** uma atividade diferente de **5 a 10 minutos** entre a panela e o almoço, para que a fase 4 avalie a **memória episódica** de longo prazo, e não o que ainda está "fresco" na memória de trabalho.

### Fase 4 — O almoço — ⏳ a fazer
- **Planejado:** perguntas em três níveis de apoio, sempre do menos para o mais fácil:
  1. **Recordação livre:** *"O que você comprou na feira?"*
  2. **Recordação com pista:** por exemplo, *"Na barraca da estrela, o que você comprou?"*
  3. **Reconhecimento:** escolher entre opções.
- **Dimensões:** o quê / onde / quando / quem.
- **Indicadores:** memória de **item** × memória de **associação** (lembra a cenoura, mas lembra de quem comprou?) e **ganho com pista** (quanto o desempenho melhora do nível 1 para o 2 e o 3).

---

## 6. Componente de reabilitação — ⏳ planejado

| Estratégia | No jogo | Referência |
|---|---|---|
| Dificuldade adaptativa | a receita cresce de 3 até 7 itens conforme o desempenho | — |
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

### Daltonismo
- **A cor nunca é a única pista.** Certo e errado usam o eixo **azul/âmbar** (seguro para os tipos mais comuns de daltonismo), **nunca vermelho/verde**, e sempre vêm com **ícone** (✓ ou ↻), **texto** e **tipo de borda** (contínua ou tracejada).
- As barracas se diferenciam por cor, **símbolo e nome** ao mesmo tempo.

### Voz
- A voz da vó será **gravada por uma pessoa real**. A voz sintética do navegador soou robótica nos testes. A gravação tem duas vantagens: é mais calorosa e garante **o mesmo estímulo para todos os participantes** (padronização), já que vozes sintéticas mudam de aparelho para aparelho.
- Todo texto falado também aparece escrito no balão, para quem ouve mal.
- **O jogo fala, mas não escuta:** não usamos reconhecimento de voz, porque no Chrome o áudio seria enviado a servidores do Google, e dados de saúde são **dados sensíveis pela LGPD (art. 11)**.

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
- As imagens dos ingredientes ainda são provisórias (emojis), e o desenho muda conforme o aparelho. A mandioca, por exemplo, ainda usa o desenho de uma batata-doce.
- A familiaridade com tecnologia pode influenciar o desempenho. Isso é parcialmente controlado pelo treino, mas não eliminado.
- A receita usa ingredientes conhecidos no Brasil. Hábitos alimentares regionais podem tornar alguns itens mais familiares que outros.

---

## 9. O que fica com você (checklist)

- [ ] **Conferir todas as referências no Google Scholar** (autores, ano, título, revista). A lista abaixo foi montada como ponto de partida e **precisa ser verificada**.
- [ ] Escrever a ficha explicativa (sugestão de estrutura na seção 11).
- [ ] **Gravar a voz da vó** (roteiro na seção 10), ou combinar quem grava.
- [ ] **Termo de consentimento de uso de voz** para quem gravar. O código do projeto fica público no GitHub (portfólio do Lincoln), então a voz também ficaria pública.
- [ ] Decidir com o Lincoln a **definição de *span***.
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

**Falas atuais (18 arquivos):**

| Arquivo | O que dizer |
|---|---|
| `receita-ola.mp3` | Olá! Vou contar a receita da minha sopa. |
| `receita-para-sopa.mp3` | Para a sopa, vamos precisar de: |
| `receita-terminou.mp3` | Agora vamos à feira comprar tudo! |
| `feira-troca.mp3` | Ah, esqueci! Troque a batata por mandioca. |
| `panela-instrucao.mp3` | Agora vamos cozinhar! Coloque na panela na ordem que eu falei. |
| `panela-terminou.mp3` | Hum, que cheiro bom! Agora vamos descansar um pouco. |
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

> Os ingredientes que não estão na receita (pimentão, berinjela, pepino, brócolis) já entram na gravação porque vão aparecer nas perguntas de reconhecimento do almoço.
>
> **As falas do intervalo e do almoço** ainda serão definidas. Elas virão numa segunda lista curta, assim que essas fases forem desenhadas.
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
