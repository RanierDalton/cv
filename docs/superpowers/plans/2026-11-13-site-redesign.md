# Redesign do site + CV geral — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Site `ranier.is-a.dev` redesenhado (dois temas, editorial/terminal) com conteúdo 100% do `curriculo-mestre.md`, credenciais completas e download de um CV geral de 2 páginas.

**Architecture:** Execução em **5 fases**; ao fim de cada uma, **parar e esperar a validação do Ranier** (checkpoint). Fase 1 mexe só na pasta `curriculums/` (sem git). Fases 2–4 no repo `cv/`, branch `redesign`. Fase 5 no LinkedIn via navegador, seção por seção com "ok".

**Tech Stack:** Python 3 (`content.py`), Node + `docx` (`build.js`), MS Word COM ou LibreOffice para PDF; TanStack Start, React 19, Tailwind 4, i18next, gh-pages.

**Spec:** `cv/docs/superpowers/specs/2026-11-13-site-redesign-design.md`

Caminhos: `CUR = C:\Users\Ranier Couto\Desktop\projects\personal\curriculums`, `CV = C:\Users\Ranier Couto\Desktop\projects\personal\cv`.

## Global Constraints

- Fatos só do `CUR/curriculo-mestre.md`; verbos do papel real ("Participei" não vira "Liderei").
- Título: **Consultor técnico SAP / SAP Technical Consultant**. Nunca "Desenvolvedor/Developer" como título do perfil, nunca "Arquiteto". **R&D**, nunca P&D.
- Sigilo: nenhum nome de cliente, superlativo identificador, produto interno da Exed ou ferramenta open source da plataforma. Lista de termos proibidos **só** em `CUR/ferramentas/sigilo-termos.txt` (nunca no repo `cv`, que é público).
- Certificações SAP = **6**: BAIP (10/2026), ABAP Cloud (05/2026), CAP (05/2026), Build (05/2026), Activate (06/2026), Fiori Application Developer (11/2026, expira 11/2027). OCI = 3. SAP BTP Solution Architect e Oracle Java Foundations **fora** do site e dos CVs.
- Idiomas: Português nativo · Inglês C1 (EF SET) · Espanhol básico.
- Datas: Exed 08/2025–atual (estágio 08/2025–03/2026, trainee 04/2026–atual); freelance 03/2024–06/2024; SPTech 07/2024–07/2028; ETEC 01/2021–12/2023; IBM 06/2025.
- Tema claro é o padrão na primeira visita; escolha persiste em `localStorage("theme")`.
- Nada de commit/push/deploy sem o Ranier pedir; commit sugerido ao fim de cada fase aprovada.

## Review Focus

1. Texto EN ausente → componente cai em PT silenciosamente; esperado: todo campo bilíngue tem `pt` **e** `en` (checado em `check-data.ts`, Task 6).
2. Primeira visita com `prefers-color-scheme: dark` → deve abrir **claro** (Task 7, verificação manual em janela anônima).
3. Tela de 360 px → sem scroll horizontal, títulos serifa quebram sem estourar (checkpoints 2 e 3).
4. Site em EN → "Baixar CV" baixa o **Resume** EN (Task 13).
5. Termo sigiloso vazando em `src/`, `public/` ou no PDF → `sigilo_scan.py` falha (Tasks 5 e 13).

---

## FASE 1 — CVs (pasta `CUR/ferramentas/gerador`)

### Task 1: Ferramentas do gerador funcionando no Windows

**Files:**
- Modify: `CUR/ferramentas/gerador/content.py` (última linha: caminho de saída)
- Create: `CUR/ferramentas/gerador/to_pdf.ps1`
- Modify: `CUR/ferramentas/gerador/LEIAME.md`

- [ ] **Step 1:** Backup: copiar `CUR/base/` para `CUR/arquivo/base-2026-11-13/`.
- [ ] **Step 2:** `content.py` grava `content.json` ao lado do script: `os.path.join(os.path.dirname(__file__), "content.json")` (hoje aponta para `/home/claude/cvbuild/`).
- [ ] **Step 3:** `cd CUR/ferramentas/gerador && npm init -y && npm install docx` (adicionar `node_modules/` ao `.gitignore` local se existir).
- [ ] **Step 4:** `to_pdf.ps1 -Dir <pasta>`: para cada `.docx`, abre via `Word.Application` COM, `ExportAsFixedFormat` para PDF, imprime `nome: N páginas` (`ComputeStatistics(2)`). Se Word não existir, imprimir erro pedindo LibreOffice e parar.
- [ ] **Step 5:** Verificar: `python content.py && node build.js out && powershell -File to_pdf.ps1 -Dir out`
  Expected: `ok [...]`, 12 `.docx` e 12 PDFs, todos `1 páginas`.
- [ ] **Step 6:** Atualizar `LEIAME.md` com os comandos do Windows.

### Task 2: Correções pendentes + Fiori em todas as versões

**Files:**
- Modify: `CUR/ferramentas/gerador/content.py` (`LANGS`, `C`, `ACADEMY`, listas `certs` das versões, resumos)
- Create: `CUR/ferramentas/gerador/test_content.py`

- [ ] **Step 1: Teste**

```python
# test_content.py — roda com: python test_content.py
import json, subprocess, sys
subprocess.run([sys.executable, "content.py"], check=True)
d = json.load(open("content.json", encoding="utf-8"))
for k, v in d.items():
    txt = json.dumps(v, ensure_ascii=False)
    assert "B1" not in txt and "intermediário" not in txt and "intermediate" not in txt, k
    assert "08/2026" not in txt, k                       # BAIP antiga
    assert "Academia SAP ABAP" not in txt and "SAP ABAP Academy" not in txt, k
    assert "P&D" not in txt, k
    assert "5 certificações SAP" not in txt and "5 SAP certifications" not in txt, k
    if any("ABAP Cloud" in c for c in v["certs"]):      # versões com bloco SAP
        assert any("SAP Fiori Application Developer (11/2026)" in c for c in v["certs"]), k
assert "Espanhol: básico" in d["cv-sap-pt"]["languages"]
assert "Spanish: basic" in d["cv-sap-en"]["languages"]
print("OK", len(d))
```

- [ ] **Step 2:** `python test_content.py` → FAIL (B1).
- [ ] **Step 3:** Em `content.py`:
  - `LANGS`: PT `"Inglês: avançado (C1, EF SET) · Espanhol: básico"`; EN `"Portuguese: native · English: advanced (C1, EF SET) · Spanish: basic"`.
  - `C`: `baip` → `"SAP Certified – Solution Architect – SAP Business AI Platform (10/2026)"`; `activate` → `(06/2026)`; `ibmai` → `(06/2025)`; novo `fiori: "SAP Certified – SAP Fiori Application Developer (11/2026)"`.
  - `ACADEMY`: PT `"Curso: SAP ABAP para Programadores, 92 horas – Exed Academy (09/2025)"`; EN `"Course: SAP ABAP for Programmers, 92 hours – Exed Academy (09/2025)"`.
  - Toda lista `certs` que tem `"abapc"` ganha `"fiori"` logo após `"abapc"`.
  - Resumos: "5 certificações SAP" → "6 certificações SAP" / "5 SAP certifications" → "6 SAP certifications"; qualquer "P&D" → "R&D".
- [ ] **Step 4:** `python test_content.py` → `OK 12`.
- [ ] **Step 5:** `node build.js out && powershell -File to_pdf.ps1 -Dir out` → todos `1 páginas` (se algum passar de 1, encurtar o item de cursos daquela versão, não os bullets).

### Task 3: Versão geral (`v_geral`), 2 páginas

**Files:**
- Modify: `CUR/ferramentas/gerador/content.py` (nova `v_geral`, loop final)
- Modify: `CUR/ferramentas/gerador/build.js` só se precisar de seção nova (prêmio/cursos) — preferir reaproveitar `certs` e `proj`
- Modify: `CUR/ferramentas/gerador/test_content.py`

**Interfaces:**
- Produces: chaves `cv-geral-pt`, `cv-geral-en` no `content.json`; PDFs `cv-geral-pt.pdf`, `cv-geral-en.pdf` (usados na Task 13).

- [ ] **Step 1: Teste** (acrescentar)

```python
g = d["cv-geral-pt"]; ge = d["cv-geral-en"]
assert g["headline"].startswith("Consultor Técnico SAP"), g["headline"]
assert ge["headline"].startswith("SAP Technical Consultant")
assert "Desenvolvedor" not in g["headline"] and "Developer" not in ge["headline"]
assert len(g["certs"]) >= 10                     # 6 SAP + 3 OCI + IBM (+ cursos/prêmio)
assert any("Excelência Técnica" in c for c in g["certs"])
assert any("Technical Excellence" in c for c in ge["certs"])
assert len(g["exp"][0]["roles"][0]["bullets"]) == 9 and len(g["exp"][0]["roles"][1]["bullets"]) == 3
assert len(g["exp"]) == 2                        # Exed + freelance
```

- [ ] **Step 2:** `python test_content.py` → FAIL (`KeyError: cv-geral-pt`).
- [ ] **Step 3:** `v_geral(lang)`:
  - `headline`: PT `"Consultor Técnico SAP | ABAP · BTP · CAP · RAP · Integration Suite · IA Agêntica"`, EN `"SAP Technical Consultant | ABAP · BTP · CAP · RAP · Integration Suite · Agentic AI"`.
  - `github: True`; `order: ["summary","skills","exp","proj","certs","edu","lang"]`.
  - `summary`: texto do "Sobre" aplicado no LinkedIn (`CUR/referencias/linkedin-textos-finais.md` / perfil) **com "6x"** e sem datas.
  - `skills`: união das áreas da seção 6 do mestre (ABAP & S/4HANA · SAP BTP & Integração · IA · Back-end · Front-end · Dados · Cloud & DevOps), sem itens "confirmar".
  - `exp`: `exed(lang, ["joule_btp","ai_portal","transfer","avalara","lbn","monitor","golive","refactor","instructor"], ["pnld","hcm_pitch","hcm_build"])` + `freelance(lang)`.
  - `proj`: CS2 Stats Bot, SolarWay, InfraWatch (textos P6–P8 do mestre, com link) no mesmo formato de `v_ai`/`v_swe`.
  - `certs`: `C[...]` de baip, abapc, fiori, cap, build, activate, oagentic, oai, ocloud, ibmai + `ACADEMY` + prêmio (`"Destaque em Excelência Técnica – Exed Consulting (08/2026)"` / `"Technical Excellence Award – Exed Consulting (08/2026)"`) + `"EF SET English Certificate – C1 Advanced (09/2025)"`.
  - `edu: edu(lang, detailed=True, etec=True)`.
  - Registrar `("geral", v_geral)` no loop.
- [ ] **Step 4:** `python test_content.py` → OK.
- [ ] **Step 5:** `node build.js out && powershell -File to_pdf.ps1 -Dir out` → `cv-geral-pt: 2 páginas`, `cv-geral-en: 2 páginas`; demais 1.

### Task 4: Publicar na `base/` e registrar no mestre

**Files:**
- Modify: `CUR/base/*/` (regenerados), Create: `CUR/base/geral/`
- Modify: `CUR/curriculo-mestre.md` (seções 0, 2, 3, 6/7 resumos 5→6, 12)
- Modify: `CUR/README.md` (mapa: `geral/`; pendências)

- [ ] **Step 1:** Copiar `out/cv-<v>-<lang>.{docx,pdf}` para `CUR/base/<v>/` (geral → `CUR/base/geral/`). Metadados neutros (título "Ranier Dalton do Couto – Currículo/Resume").
- [ ] **Step 2:** Mestre: tag `[GERAL]` na tabela da seção 0 (`cv-geral`, 2 páginas, para o site); título na seção 2; resumo na seção 3; "5 certificações SAP" → "6" nos resumos; linha na seção 12 (13/11/2026: Fiori, espanhol básico, datas BAIP/Activate/IBM/curso, versão geral).
- [ ] **Step 3:** `grep -rn "B1\|intermediário\|5 certificações SAP" CUR/base CUR/curriculo-mestre.md` → só ocorrências históricas na seção 12.

### ✅ CHECKPOINT 1 — Ranier abre os PDFs de `CUR/base/` (sobretudo `geral/`) e aprova. Ajustes voltam para Task 3.

---

## FASE 2 — Base visual do site (repo `CV`)

### Task 5: Branch, gitignore e scanner de sigilo

**Files:**
- Modify: `CV/.gitignore` (+ `.superpowers/`)
- Create: `CUR/ferramentas/sigilo_scan.py`, `CUR/ferramentas/sigilo-termos.txt`

- [ ] **Step 1:** `cd CV && git switch -c redesign`.
- [ ] **Step 2:** `sigilo-termos.txt`: um termo por linha, case-insensitive; semear com os nomes internos que aparecem no mestre (chaves de bullets de produto interno) e pedir ao Ranier que acrescente nomes reais de clientes e da ferramenta open source. **Nunca copiar este arquivo para `CV`.**
- [ ] **Step 3:** `sigilo_scan.py <dir|arquivo.pdf>...`: varre texto de `.ts/.tsx/.json/.html/.md/.txt` e de PDFs (via `pypdf` se instalado; senão avisa e pula); imprime `arquivo:linha: termo` e sai com código 1 se achar algo.
- [ ] **Step 4:** `python CUR/ferramentas/sigilo_scan.py CV/src CV/public CV/docs` → registra o estado atual (esperado hoje: pode acusar; vira 0 na Task 6).

### Task 6: Camada de dados bilíngue (conteúdo do mestre)

**Files:**
- Modify: `CV/src/lib/portfolio-data.ts` (reescrita)
- Create: `CV/src/lib/use-l.ts`, `CV/scripts/check-data.ts`

**Interfaces:**
- Produces (todas exportadas de `portfolio-data.ts`):
  - `type L = { pt: string; en: string }`
  - `profile: { name: string; title: L; location: L; bio: L; stats: { value: string; label: L }[]; contacts: {...mesmo de hoje} }`
  - `type Role = { title: L; period: L; summary: L; bullets: L[] }`
  - `experience: { org: string; period: L; location: L; roles: Role[] }[]` (Exed com 2 roles; Freelance com 1)
  - `education: { title: L; org: string; period: L; description: L }[]`
  - `type Case = { id: string; title: L; segment: L; problem: L; did: L; stack: string[] }` · `cases: Case[]` (7, na ordem da spec 7.3)
  - `type Project = { id: string; title: string; description: L; stack: string[]; period: L; link: string; group: "uni" | "pessoal" | "jogos" }` · `projects: Project[]`
  - `type Credential = { id: string; name: string; issuer: "SAP" | "Oracle" | "IBM" | "EF SET"; issued: string /* "MM/AAAA" */; expires?: string; link: string; skills: string[] }` · `credentials: Credential[]` (ordem da spec 7.5)
  - `courses: { name: L; org: string; date: string }[]` · `award: { name: L; org: string; date: string }` · `languages: { name: L; level: L }[]`
  - `stack: { area: L; items: string[] }[]`
  - `use-l.ts`: `export function useL(): (v: L) => string` (usa `i18n.language`, fallback `pt`).
- [ ] **Step 1: Teste** `CV/scripts/check-data.ts` (rodar com `npx tsx scripts/check-data.ts`): percorre recursivamente todos os exports e falha se algum `L` tiver `pt` ou `en` vazio; asserta `credentials.filter(c=>c.issuer==="SAP").length===6`, `...==="Oracle"===3`, nenhum `name` contém `"SAP BTP"` + `"Solution Architect"` juntos, `experience[0].roles.length===2`, `cases.length===7`, nenhum texto contém `"P&D"`, `"Desenvolvedor SAP"` ou `"Developer"` em `profile.title`.
- [ ] **Step 2:** `npx tsx scripts/check-data.ts` → FAIL (tipos antigos).
- [ ] **Step 3:** Reescrever `portfolio-data.ts` com os textos do mestre (spec seção 7; bullets da seção 4.0 do mestre, PT e EN), links de credenciais já existentes + BAIP (pegar no LinkedIn/Credly; se indisponível, perguntar) + Fiori `https://www.credly.com/badges/ce6ee021-7a26-41e7-ad4c-167e23b707d5`. Componentes antigos podem quebrar o build até a Task 8–12 — por isso, nesta task, apenas `check-data` precisa passar.
- [ ] **Step 4:** `npx tsx scripts/check-data.ts` → `OK`; `python CUR/ferramentas/sigilo_scan.py CV/src/lib` → 0 achados.

### Task 7: Tokens dos dois temas, fontes, padrão claro

**Files:**
- Modify: `CV/src/style.css` (`:root` e `.dark`), `CV/src/hooks/use-theme.ts`, `CV/src/routes/__root.tsx` (`themeInitScript`, `<html className>`, `theme-color`)
- Modify: `CV/package.json` (+ `@fontsource-variable/fraunces` ou fonte serifa escolhida)

- [ ] **Step 1:** Tokens: claro = `--background:#f5f2ec; --foreground:#171512; --muted-foreground:#4a453d; --border:#d9d2c5; --primary:#0b5cad;` escuro = `--background:#0b0d0c; --foreground:#e8ede9; --muted-foreground:#9aa59e; --border:#222a25; --primary:#7ee2a8;` + `--font-serif` (display), mantém `--font-mono` JetBrains Mono. Grade 32 px só no `.dark body` (background-image).
- [ ] **Step 2:** `getInitialTheme()` e `themeInitScript`: sem valor salvo → `"light"` (remover leitura de `prefers-color-scheme` e o listener). `<html className="light">`.
- [ ] **Step 3:** `npm run dev`; em janela anônima com SO em modo escuro, abrir `http://localhost:<porta>/` → fundo `#f5f2ec`; alternar tema → `#0b0d0c` e persiste após reload.

### Task 8: Nav + Hero

**Files:**
- Modify: `CV/src/components/portfolio/Nav.tsx`, `Hero.tsx` (reescrita), `ThemeToggle.tsx`
- Modify: `CV/src/lib/i18n/locales/{pt,en}.json` (chaves `nav.*`, `hero.*`; remover `terminal.*`)

**Interfaces:**
- Consumes: `profile`, `useL()` (Task 6).
- [ ] **Step 1:** Nav: nome à esquerda; links `Trajetória · Cases · Credenciais · Sobre` (âncoras `#trajetoria #cases #credenciais #sobre`); PT/EN; ☀/☾. Menu compacto < 768 px.
- [ ] **Step 2:** Hero conforme mockup aprovado (`.superpowers/brainstorm/*/content/hybrid-ab.html`, opção 1): kicker mono (`Consultor técnico SAP · São Paulo`; no escuro prefixo `ranier@s4h:~$ whoami`), título serifa `"SAP, BTP e IA agêntica para processos reais."` / `"SAP, BTP and agentic AI for real business processes."` com "IA agêntica" no acento, bio, linha de prova `profile.stats` (`6× SAP Certified`, `3× OCI Certified`, `4 clientes`, `Inglês C1`), botões `Baixar CV` (href provisório `./cv.pdf`, trocado na Task 13) e `Falar comigo` (`mailto:`), ícones LinkedIn/GitHub. Sem janela de terminal, sem marquee, sem player de música.
- [ ] **Step 3:** Seções seguintes podem continuar antigas; garantir `npm run build` OK (adaptar os componentes antigos ao novo `portfolio-data` só o mínimo para compilar, ou comentar a seção na página até sua task).
- [ ] **Step 4:** `npm run dev` → conferir claro/escuro, PT/EN, 360 px e 1440 px.

### ✅ CHECKPOINT 2 — Ranier valida Hero + Nav nos dois temas, PT/EN, celular e desktop. Commit sugerido: `feat(redesign): base visual dos dois temas, nav e hero`.

---

## FASE 3 — Seções

### Task 9: Trajetória (lista vertical)

**Files:** Modify: `CV/src/components/portfolio/Timeline.tsx` (reescrita; manter export `SectionHeader` com nova assinatura `SectionHeader({ index, title, description }: { index: string; title: string; description?: string })`), locales.
- [ ] **Step 1:** Seção `#trajetoria`, índice mono `01`. Exed como um bloco (org + período + local) com os 2 cargos aninhados: título, período mono, `summary`, 3–4 bullets (os primeiros de `bullets`). Depois Freelance; depois Formação (SPTech, ETEC). Sem setas/carrossel.
- [ ] **Step 2:** `npm run build` OK; conferir 360 px.

### Task 10: Cases + Mais projetos

**Files:** Create: `CV/src/components/portfolio/Cases.tsx`; Modify: `Projects.tsx` (vira "Mais projetos"), locales.
- [ ] **Step 1:** `#cases`, índice `02`: grade de 7 cards (2 colunas ≥ 1024 px, 1 abaixo): segmento em mono, título serifa, "Problema" / "O que fiz", stack em tags mono.
- [ ] **Step 2:** "Mais projetos": recolhido por padrão (`<details>` ou botão), agrupado por `group`, cada item com link GitHub. Sem filtro por categoria.
- [ ] **Step 3:** `npm run build` OK.

### Task 11: Credenciais

**Files:** Modify: `CV/src/components/portfolio/Certifications.tsx` (reescrita, sem paginação/busca/evento `search-certs`), locales.
- [ ] **Step 1:** `#credenciais`, índice `03`: faixa do prêmio no topo; grade de todas as credenciais agrupadas por emissor (SAP 6 → Oracle 3 → IBM → EF SET), cada uma com logo (assets existentes), nome, `issued`, `expires` se houver, link "Validar credencial"; abaixo, cursos e idiomas.
- [ ] **Step 2:** `npm run build` OK; contar 6 cards SAP na página.

### Task 12: Sobre + Rodapé + limpeza da página

**Files:** Create: `CV/src/components/portfolio/About.tsx`; Modify: `Footer.tsx`, `CV/src/routes/cv.tsx` (ordem: Nav, Hero, Timeline, Cases, Projects, Certifications, About, Footer, BackToTop), locales.
- [ ] **Step 1:** `#sobre`, índice `04`: parágrafo de posicionamento (`profile.bio` longo), grade `stack` por área, bloco curto de música (FL Studio) — texto atual de `terminal.music.desc` encurtado para 2 frases.
- [ ] **Step 2:** Rodapé: e-mail, LinkedIn, GitHub pessoal e acadêmico; **sem Linktree**.
- [ ] **Step 3:** Remover chaves i18n e assets não usados; `npm run build` OK; `npm run lint` sem erros novos; `python CUR/ferramentas/sigilo_scan.py CV/src` → 0.

### ✅ CHECKPOINT 3 — Ranier navega a página inteira (dev server), dois temas, PT/EN, celular. Commit sugerido: `feat(redesign): seções trajetória, cases, credenciais e sobre`.

---

## FASE 4 — CV para download, SEO e publicação

### Task 13: PDFs, metadados e build de produção

**Files:**
- Create: `CV/public/Ranier-Dalton-do-Couto-Curriculo.pdf`, `CV/public/Ranier-Dalton-do-Couto-Resume.pdf` (de `CUR/base/geral/`); Delete: `CV/public/cv.pdf`
- Modify: `Hero.tsx` (href do botão), `CV/src/routes/index.tsx`, `CV/src/routes/cv.tsx` (meta + JSON-LD), `__root.tsx` (`theme-color`)
- [ ] **Step 1:** Botão: `i18n.language === "en"` → `./Ranier-Dalton-do-Couto-Resume.pdf`, senão `./Ranier-Dalton-do-Couto-Curriculo.pdf`, com `download` no mesmo nome.
- [ ] **Step 2:** Meta/JSON-LD: título `"Ranier Dalton do Couto — Consultor técnico SAP · ABAP, BTP e IA agêntica"`, `jobTitle: "Consultor técnico SAP"`, `knowsAbout` com SAP ABAP, SAP BTP, SAP CAP, SAP RAP, SAP Integration Suite, SAP Fiori, Agentic AI, Python.
- [ ] **Step 2b (SEO, auditoria do site no ar em 13/11/2026):** `canonical` e `og:url` absolutos (`https://ranier.is-a.dev/`); `og:image` 1200×630 em `public/` (+ `twitter:image`); `sitemap.xml` hoje dá 404 — gerar estático em `public/` e apontar em `robots.txt` (`Sitemap: https://ranier.is-a.dev/sitemap.xml`); deploy usa `build:dev` e vaza `data-tsd-source` no HTML — trocar `predeploy` para `vite build` de produção (conferir que o prerender continua funcionando); HTML pré-renderizado precisa conter todas as seções (hoje só 1 `<h2>`); toda `<img>` com `alt`; `<html lang>` acompanha o idioma; `theme-color` por tema. Verificar com `curl -s https://… | grep` após o deploy e, se possível, novo teste no Seobility.
- [ ] **Step 3:** `npm run predeploy` sem erro; `python CUR/ferramentas/sigilo_scan.py CV/src CV/public CV/dist/client` → 0.
- [ ] **Step 4:** `npm run preview`: clicar "Baixar CV" em PT e em EN → arquivos certos.
- [ ] **Step 5 (opcional, se o Ranier quiser):** remover componentes `src/components/ui/*` e dependências não importados; repetir Step 3.

### ✅ CHECKPOINT 4 — Ranier aprova o preview. Com o "ok" explícito: merge `redesign` → branch principal e `npm run deploy`. Conferir `https://ranier.is-a.dev`.

---

## FASE 5 — LinkedIn e fechamento (cada save só com "ok")

### Task 14: LinkedIn

- [ ] **Step 1:** Conferir se a "SAP Certified – SAP Fiori Application Developer" está em Licenças e certificados (11/2026–11/2027, link Credly); se não, propor e aplicar com "ok".
- [ ] **Step 2:** Título PT/EN: `5x SAP Certified` → `6x SAP Certified` (mostrar texto final, esperar "ok").
- [ ] **Step 3:** "Sobre" PT/EN: incluir Fiori na lista de certificações (mostrar, "ok").
- [ ] **Step 4:** Seções pendentes 7 (Em destaque: trocar Linktree do Ponto Final por CS2 Stats Bot; SolarWay opcional; incluir o site novo) e 8 (inglês → "Proficiência profissional completa"), com "ok".
- [ ] **Step 5:** Pular todo prompt de "compartilhar" (nenhum post).

### Task 15: Registros finais

**Files:** `CUR/referencias/linkedin-textos-finais.md` (seção 2 e título com textos aplicados), `CUR/README.md` (marcar LinkedIn e site como feitos; pendências restantes), `CUR/curriculo-mestre.md` seção 12.
- [ ] **Step 1:** Atualizar os três arquivos.
- [ ] **Step 2:** Listar pendências ao Ranier: títulos "Desenvolvedor" nos CVs de recorte (revisar para "Consultor"?), nomes oficiais no Credly, números 89%/1% do RPA, Open to Work só para recrutadores.

---

## FASE 3b — "Molho" (adendo do spec, seção 12)

### Task 16: Formas de tinta + hero A + C
**Files:** Create `src/components/portfolio/ink-shapes.tsx` (`Cube`, `Hex`, `AppCard`, `Crystal`, `Node`, `Arrow`: SVG `<g>` centrados em (0,0), cores por tokens), `src/components/portfolio/HeroArt.tsx` (SVG + `DotField`), `src/components/portfolio/DotField.tsx`; Modify `Hero.tsx` (grid texto | arte, arte `hidden lg:block`), `style.css` (grão do hero, flutuação, fio animado).
- [ ] Verificar: em 1280 e 1440 px, nenhum retângulo dos objetos intersecta o bloco de texto (`getBoundingClientRect`); em < 1024 px a arte não renderiza; reduce-motion sem animação.

### Task 17: Roadmap
**Files:** Create `src/components/portfolio/Roadmap.tsx`; Modify `Timeline.tsx` (`SectionHeader` recebe `mark` e expõe `data-road`), `Footer.tsx` (calha de 8rem com marco "→"), `cv.tsx` (wrapper `relative` + `<Roadmap />`).
- [ ] Verificar: em ≥ 768 px o caminho e os marcos ficam com `x` dentro da calha (≤ 8rem a partir da borda do container) e não intersectam texto; fio acompanha o scroll; marcos acendem; build, check-data e sigilo ok.
