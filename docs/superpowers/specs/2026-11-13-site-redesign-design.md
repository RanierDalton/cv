# Redesign do site de portfólio (ranier.is-a.dev)

Data: 13/11/2026 · Status: rascunho para aprovação

## 1. Intenção

O site é a **vitrine do trabalho** do Ranier. Dois públicos:

- **Recrutador** (vindo do LinkedIn ou do CV): precisa entender em poucos segundos que ele é *consultor técnico SAP* (ABAP, BTP, CAP, RAP, Integration Suite) com IA agêntica, que tem 6 certificações SAP e 3 OCI e experiência real com clientes.
- **Potencial cliente de freela**: quer ver o que ele entrega e como falar com ele. Ele aceita freela de qualquer área (SAP, IA, dados, cyber...), mas **não quer seção de "Serviços"**: o cliente se baseia no perfil.

Hoje o site tem conteúdo desatualizado/errado em relação ao `curriculo-mestre.md` e um visual que gasta o espaço mais valioso (hero) com uma janela de terminal e um hobby.

## 2. Objetivos

1. **Conteúdo 100% alinhado ao `curriculo-mestre.md`** (pasta `curriculums`), em PT e EN.
2. **Redesign visual forte**, com dois temas (seção 5).
3. **Certificações completas e em destaque**, sem paginação.
4. **"Baixar CV" entrega um CV geral de 2 páginas** (novo), no idioma do site.

## 3. Não-objetivos

- Seção de Serviços / preços.
- Blog, CMS, formulário de contato com back-end.
- Mudar stack, hosting ou domínio.

## 4. Anti-objetivos (falha mesmo que "funcione")

- Citar **nome de cliente**, superlativos que identifiquem cliente, **produtos internos da Exed** ou a ferramenta open source da plataforma de conhecimento.
- Qualquer fato que não esteja no mestre ("nada inventado"); verbos devem refletir o papel real ("Participei" não vira "Liderei").
- Chamar o Ranier de "Desenvolvedor"/"Developer" como título, ou de "Arquiteto". Título é **Consultor técnico SAP / SAP Technical Consultant**. Usar **R&D**, nunca P&D.
- Visual com cara de template de IA (gradiente roxo, glow, cards genéricos).
- Contradizer o LinkedIn (cargos, datas, certificações).

## 5. Direção visual (decidida)

**Dois temas, um layout.** O botão de tema que já existe troca a personalidade.

| | Claro (padrão) — "papel" | Escuro — "terminal" |
|---|---|---|
| Fundo | papel `#f5f2ec`, texto `#171512` | quase preto `#0b0d0c` com grade sutil 32px, texto `#e8ede9` |
| Acento | azul `#0b5cad` | verde `#7ee2a8` |
| Títulos | serifa editorial, grandes, tracking negativo | mesma serifa |
| Detalhes técnicos | mono (legendas, tags, datas, kicker) | mono + prompt `ranier@s4h:~$ whoami` no kicker do hero |
| Botões | pílula preta / contorno | pílula verde / contorno |

- Tema padrão: **claro** na primeira visita (ignorar `prefers-color-scheme` para a primeira impressão do recrutador ser a sóbria); escolha do usuário persiste.
- Fontes: serifa de display a definir pelo builder (ex.: Instrument Serif / Fraunces / Newsreader via Google Fonts ou @fontsource), sans para corpo (pode manter Plus Jakarta Sans ou trocar), JetBrains Mono para o mono (já usado).
- Movimento: discreto (reveal no scroll já existe em `use-reveal.ts`), respeitar `prefers-reduced-motion`.
- Referência dos mockups aprovados: `.superpowers/brainstorm/*/content/hybrid-ab.html` (opção 1).

## 6. Estrutura da página

```
[nav]  Ranier Dalton      Trajetória · Cases · Credenciais · Sobre   PT/EN  ☀/☾
HERO   kicker (mono): Consultor técnico SAP · São Paulo   (escuro: + $ whoami)
       Título serifa: "SAP, BTP e IA agêntica para processos reais."
       Bio curta (2 linhas)
       Prova: 6× SAP Certified · 3× OCI Certified · 4 clientes · Inglês C1
       [Baixar CV]  [Falar comigo → mailto]   + ícones LinkedIn / GitHub
01 TRAJETÓRIA  lista vertical
       Exed Consulting (um bloco, 08/2025 – atual)
         Consultor Técnico SAP Trainee · 04/2026 – atual  (bullets)
         Estagiário SAP ABAP · 08/2025 – 03/2026          (bullets)
       Desenvolvedor Autônomo (RPA) · 03/2024 – 06/2024
       Formação: SPTech (07/2024 – 07/2028) · ETEC (01/2021 – 12/2023)
02 CASES       cards de trabalho real, anônimos (problema · o que fiz · stack)
       "Mais projetos" (recolhido): faculdade, pessoais e jogos, com link GitHub
03 CREDENCIAIS grade única, sem paginação
       Prêmio: Destaque em Excelência Técnica – Exed (08/2026) em destaque
       SAP (6) → Oracle (3) → IBM → EF SET C1 → cursos (Exed Academy, Datadog…)
       Idiomas: Português nativo · Inglês C1 · Espanhol básico
04 SOBRE       parágrafo de posicionamento + stack por área (grade)
       toque pessoal: produção musical (FL Studio) — curto
[rodapé] e-mail · LinkedIn · GitHub pessoal · GitHub acadêmico
```

Sai: janela de terminal com abas no hero, marquee de tecnologias, timeline dupla com setas, paginação das certificações, link do Linktree.

## 7. Conteúdo (fonte: `curriculums/curriculo-mestre.md`)

### 7.1 Hero / Sobre
- Título do perfil: *Consultor técnico SAP* / *SAP Technical Consultant*.
- Bio: derivada do "Sobre" aplicado no LinkedIn (13/11/2026): consultor na Exed, 4 clientes de segmentos diferentes + R&D; vai além da spec (processo, arquitetura, contribui para a definição da abordagem técnica, Clean Core); ABAP clássico/Cloud; R&D com SAP Joule Studio, SAP AI Core, Python, FastAPI, LangGraph, MCP; instrutor na Exed Academy. **Sem datas e sem detalhes de projeto** no "Sobre".
- Meta tags / JSON-LD (`routes/index.tsx` e `routes/cv.tsx`): atualizar `jobTitle`, título e descrição para "Consultor técnico SAP".

### 7.2 Trajetória
- **Sem duplicar os Cases:** na Trajetória, cada cargo mostra uma linha de resumo + 3–4 bullets curtos; o detalhe de cada trabalho fica nos Cases (seção 7.3). *Chamada minha.*
- Bullets da Exed: textos vigentes da seção 4.0 do mestre. Trainee: `joule_btp`, `ai_portal`, `transfer`, `avalara`, `lbn`, `monitor`, `golive`, `refactor`, `instructor`. Estágio: `pnld`, `hcm_pitch`, `hcm_build` (+ os de estágio da seção 4.2 que o builder julgar úteis). Mesmo conjunto que foi para o LinkedIn.
- **Proibido**: nome de produto interno, nome de clientes, nome da ferramenta open source (lista de termos fica fora do repositório público, em `curriculums/`).
- Freelance: `rpa` (03/2024 – 06/2024). Ainda não confirmados os números 89%/1% (mestre 4.3) — manter "cerca de", como no mestre.

### 7.3 Cases (novo)
Cada card: título curto, segmento do cliente (tabela de sigilo do mestre), problema, o que fez, stack. Candidatos, todos da seção 4.0:
1. Agente de IA de Contas a Pagar — SAP Joule Studio + API SAP CAP no Cloud Foundry, S/4HANA + SAP Ariba (multinacional norte-americana de alimentos e bebidas).
2. Agentes de IA em produção — LangGraph, Claude via AWS Bedrock, RAG, AI Gateway, MCP (plataforma interna de conhecimento; **sem nome**).
3. Transferência de material indireto — RAP + extensão BTP + SAP Build Process Automation, S/4HANA Cloud Public Edition.
4. Reforma Tributária na integração Avalara — SAP Integration Suite (CPI), debug de exit, BAdI de NF, IBS/CBS.
5. Integração SAP LBN — enhancements BOPF no SAP TM, POD para validação de imagens.
6. Portal de RH — protótipo Fiori + HCM apresentado a CEO/CTO; virou produto interno; React micro front-ends + Node.js + OData.
7. Apps PNLD — 2 apps Fiori/SAPUI5 com ABAP Cloud, SD ↔ EWM (grupo educacional de grande porte).
- O card atual "Integração SAP LBN × Transportadoras" (CAP/CPI/event-driven) **sai**.

### 7.4 Mais projetos
Públicos com link: CS2 Stats Bot, SolarWay, InfraWatch, FeatUp (descrição de **modelagem de dados**, não Kafka/RAG), Sinal Verde, Monocromo, RedDead 2 Wiki, Broken Control. Sentinel/Capivara/Freeza **não** entram. O card "RPA · NF-e 2021" sai (vira a experiência freelance de 2024).

### 7.5 Credenciais
| Credencial | Emissor | Data | Link |
|---|---|---|---|
| SAP Certified – Solution Architect – SAP Business AI Platform | SAP | 10/2026 | https://www.credly.com/badges/920fb0f6-6252-4dc3-bcc4-11eca51e9c9f |
| SAP Certified – SAP Fiori Application Developer | SAP | 11/2026 (expira 11/2027) | https://www.credly.com/badges/ce6ee021-7a26-41e7-ad4c-167e23b707d5 |
| SAP Certified – Back-End Developer – ABAP Cloud | SAP | 05/2026 | já no site |
| SAP Certified – Back-End Developer – SAP CAP | SAP | 05/2026 | já no site |
| SAP Certified – SAP Build Developer | SAP | 05/2026 | já no site |
| SAP Certified – Project Manager – SAP Activate | SAP | 06/2026 | já no site |
| OCI Agentic AI Foundations Associate | Oracle | 07/2026 | já no site |
| Oracle Cloud AI Foundations | Oracle | 05/2026 | já no site |
| OCI Foundations Associate | Oracle | 04/2026 | já no site |
| IBM Artificial Intelligence Fundamentals | IBM | 06/2025 | já no site |
| EF SET English C1 | EF SET | 09/2025 | já no site |

Cursos (seção secundária): SAP ABAP para Programadores, 92 h – Exed Academy (09/2025); Datadog Foundation (04/2025); Inglês Avançado 2 – Senac (12/2024); Comunicação para Líderes – Impacta (12/2023); CC50 – Fundação Estudar (07/2023).
Prêmio: Destaque em Excelência Técnica – Exed Consulting (08/2026).
- **SAP BTP Solution Architect sai do site** (decisão: 6× SAP no hero precisa bater com a lista; no LinkedIn ela continua). *Chamada minha — ver seção 10.*
- Oracle Java Foundations **fora** (decisão do usuário no LinkedIn).
- Datas de validade: manter o campo "expira em" só onde o site já tinha (SAP 1 ano, Oracle 2 anos), recalculando a partir da nova data de emissão quando a data mudou.

### 7.6 Stack por área (seção Sobre)
União das competências do mestre (seção 6): ABAP & S/4HANA · SAP BTP & Integração · IA · Back-end · Front-end · Dados · Cloud & DevOps. Nada que esteja marcado como "confirmar" no mestre.

## 8. CV geral para download (novo, na pasta `curriculums`)

- Nova versão `v_geral` em `ferramentas/gerador/content.py`, PT e EN, **2 páginas**.
- Conteúdo: título "Consultor técnico SAP · ABAP · BTP · IA agêntica" (exato a definir no mestre), resumo geral (base: "Sobre" do LinkedIn), **todos** os bullets vigentes de trainee e estágio usados no LinkedIn, freelance, projetos públicos (CS2, SolarWay, InfraWatch), todas as certificações da tabela 7.5, cursos, prêmio, formação (SPTech + ETEC), idiomas, competências completas por área.
- Registrar a versão no mestre (tags/seção 0, título na seção 2, resumo na seção 3, composição) e no `README.md`.
- Na mesma passada, corrigir no `content.py` o que está pendente para **todas** as versões: espanhol "básico", BAIP 10/2026, Activate 06/2026, curso "SAP ABAP para Programadores, 92 horas – Exed Academy (09/2025)", IBM 06/2025. Regenerar `base/`.
- No site: `public/` recebe `Ranier-Dalton-do-Couto-Curriculo.pdf` e `Ranier-Dalton-do-Couto-Resume.pdf`; o botão baixa conforme o idioma ativo. Metadados neutros (regra do README dos currículos). O `cv.pdf` antigo sai.

## 9. Abordagem técnica

### Alternativas consideradas
1. **Refazer a camada visual no projeto atual** — mantém TanStack Start, Tailwind 4, i18next, deploy gh-pages e domínio; troca tokens e reescreve `components/portfolio/*`. **Escolhida** (usuário confirmou): redesign completo sem risco de infraestrutura, preserva histórico.
2. Recomeçar em Astro estático — mais leve, mas refaz i18n/tema/deploy e perde histórico; custo alto para ganho invisível ao recrutador.
3. Só trocar cores e conteúdo — barato, mas mantém hero-terminal, timeline com setas e paginação; não atinge o "melhorar MUITO".

### Decidido
- Stack, hosting (GitHub Pages via `npm run deploy`), domínio `ranier.is-a.dev` (CNAME em `public/`) **não mudam**.
- Dados em `src/lib/portfolio-data.ts`; textos de UI em `src/lib/i18n/locales/{pt,en}.json`. Hoje a parte de dados é só PT; passa a ter **PT e EN** (o builder escolhe: campos `{pt, en}` no data ou mover para os JSON).
- Tema via classe `.dark` (`@custom-variant dark` já existe) + `use-theme.ts`.

### Deixado para o builder
- Fonte serifa exata; escala tipográfica; espaçamentos.
- Componentização interna, nome de arquivos.
- Remover componentes shadcn/deps não usados (opcional, no fim).
- Adicionar `.superpowers/` ao `.gitignore`.

## 10. Chamadas minhas (para o usuário revisar)
- Tema claro como padrão na primeira visita.
- Seção "Cases" com 7 cards anônimos tirados dos bullets.
- SAP BTP Solution Architect fora do site (só BAIP), para bater com "6×".
- Hobby musical mantido, mas curto, dentro de "Sobre".
- Link do Linktree removido do rodapé.
- Trajetória enxuta (resumo + 3–4 bullets por cargo) para não repetir os Cases.
- Link Credly da BAIP: pego no LinkedIn/Credly durante a implementação.
- `.superpowers/` vai para o `.gitignore`; o spec fica em `docs/` (commit só quando você pedir).

## 11. Verificação
- `npm run build` e `node prerender.js` sem erro; revisar no navegador os dois temas, PT/EN, mobile (≥ 360 px) e desktop.
- Varredura de sigilo: grep por nomes de clientes/produtos internos da tabela de sigilo e da lista interna (fazer a partir do mestre) no `src/` e no CV gerado.
- Conferir que cada fato do site existe no mestre.
- Deploy **só com aprovação do usuário**.

## 12. Adendo (13/11/2026): o "molho" — hero A + C e Roadmap

Brainstorm com referências (Cyera, A24/Ravi Klaassens, ZRK). Decidido pelo Ranier:

- **Hero A + C:** na metade direita do hero (só ≥ 1024 px), objetos de sistema em traço de tinta (cubo, nó hexagonal, card de app, cristal de IA) flutuando, ligados por fios tracejados animados; por baixo, campo de pontos (meio-tom) em `<canvas>` com máscara elíptica, que acende em volta do cursor. Grão leve (≈ 6–7% de opacidade) **só no hero**. O resto do site fica sem textura.
- **Roadmap:** um fio tracejado percorre a calha dos índices (coluna de 8rem à esquerda) por todo o site, desenhando-se com o scroll; em cada seção há um marco (cubo = Trajetória, card = Cases, cristal = Credenciais, nó = Sobre, seta = Contato) que acende ao ser alcançado. Só ≥ 768 px.
- **Regra dura: nada se sobrepõe.** Objetos do hero ficam em coluna própria (nunca atrás do texto); o fio e os marcos ficam dentro da calha de 8rem, sem invadir o conteúdo; abaixo dos breakpoints os elementos somem em vez de se espremer.
- Dois temas: tinta + azul no papel; verde fósforo no escuro (cores vêm dos tokens).
- `prefers-reduced-motion`: fio já desenhado, objetos parados, pontos estáticos. O canvas pausa fora da tela.
