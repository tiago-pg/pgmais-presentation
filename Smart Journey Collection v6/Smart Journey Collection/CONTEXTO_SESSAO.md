# Contexto da Sessão — Smart Journey / PGMais

**Data:** 2026-06-16
**Leia este arquivo ao iniciar uma nova sessão antes de qualquer ação.**

---

## O que é esse projeto

Sistema de apresentação comercial da PGMais. O comercial configura e baixa um template visual (PDF/JPG/PNG) para mostrar ao cliente.

**Duas versões existem lado a lado:**

### Versão Original (HTML puro)
- `Smart Journey Collection/` — HTML5 + CSS3 + Vanilla JS
- `index.html` + 4 páginas de serviço
- `shared.js` — toda lógica JS
- `style.css` — 2000 linhas de estilos
- `colors_and_type.css` — design tokens
- `assets-b64.js` — assets em base64 para download

### Versão Next.js
- `pgmais-presentation/` — Next.js 16 (App Router) + Tailwind v4 + TypeScript
- 5 rotas: `/`, `/smart-journey`, `/gestao-acordo`, `/gestao-fatura`, `/jornada-cobranca`
- 18 componentes React em `src/components/`
- Lógica compartilhada em `src/lib/`
- Deploy estático no Netlify via CLI

---

## Decisões arquiteturais tomadas (definitivas)

1. **Arquivos separados por serviço** — cada serviço tem sua própria rota/página
2. **Layout responsivo** — telas ≥1280px em row única; telas <1280px quebram em 2 linhas com `flex-wrap`
3. **Wizard de triagem** — sessionStorage limpo ao voltar pro menu (`useEffect` na home limpa as 4 chaves)
4. **Deploy manual via CLI** — Netlify NÃO tem auto-deploy por Git. Usar `netlify deploy --prod` na raiz do projeto
5. **Apenas técnicos** editam os arquivos
6. **Nome correto:** "Jornada de Cobrança" (não "da")

---

## Status atual — PROJETO COMPLETO ✅

### Concluído

- ✅ Versão Original (HTML) — completa e funcional
- ✅ Versão Next.js — todas as 5 rotas funcionais
- ✅ Layout responsivo com wrap em telas <1280px
- ✅ Wizard reaparece ao voltar pro menu
- ✅ Design System documentado em `PGMais Design System/`
- ✅ Deploy manual configurado no Netlify

---

## Diferenças entre serviços

| Bloco                    | SJC | GA  | GF  | JC  |
|--------------------------|-----|-----|-----|-----|
| Sistema Origem           | ✅  | ✅  | ✅  | ✅  |
| PG Contact               | ✅  | ✅  | ✅  | ✅  |
| O.N.E.                   | 5 itens | 5 itens | 8 itens (2 col) | 8 itens (2 col) |
| PGChannels               | ✅  | 5 canais | 5 canais | 5 canais |
| PGFiles                  | —   | —   | ✅ Boleto+Fatura | ✅ Boleto+Fatura |
| Pessoa + badge           | ✅  | ✅  | ✅  | ✅  |
| IA Conversacional (SJC)  | ✅  | —   | —   | —   |
| Atendimento (+AI+Consul.) | —   | ✅  | —   | ✅  |
| Atendimento (Texto+Voz)  | —   | —   | ✅  | —   |
| Portal de Autoneg. (phone)| ✅ | ✅  | —   | —   |
| Portal de Negociação (carta+phone) | — | — | — | ✅ |
| PGFiles/Portal/Right col | Portal | Phone portal | — | Carta+phone |
| Insights bottom          | ✅  | ✅  | ✅  | ✅  |
| Service tabs bottom      | —   | —   | ✅ GA+GF+JC | ✅ GA+GF+JC |

---

## Hooks _onTriagemApplied por serviço

- **SJC**: não usa (shared.js cuida de tudo)
- **GA**: brandeia o phone screen (background + logo/nome do cliente)
- **GF**: não usa (sem elementos dinâmicos extras)
- **JC**: brandeia a carta mockup (header background + logo/nome + botão primário)

---

## CSS — classes específicas por serviço

### GA
- `.main-layout-ga`, `.pg-contact-bar`, `.ga-channels-card`, `.ga-channels-grid`
- `.person-area-ga`, `.interacao-badge`, `.interacao-title`, `.interacao-sub`
- `.ga-atend-card`, `.ga-atend-items`, `.ga-atend-item`, `.ga-atend-label`
- `.ga-portal-card`, `.phone-device`, `.phone-screen`, `.phone-topbar`, `.phone-action-item`

### GF (reutiliza GA + adiciona)
- `.main-layout-gf`, `.one-services-gf` (grid 2 col)
- `.gf-channels-card` (override narrower), `.gf-files-card`, `.gf-files-grid`
- `.service-tabs-block`, `.gf-tabs-divider`

### JC (reutiliza GA + GF + adiciona)
- `.main-layout-jc` (gap 8px), overrides `.ga-atend-card` max-width
- `.jc-portal-card`, `.jc-portal-content`
- `.jc-carta-mockup`, `.jc-carta-header`, `.jc-carta-name`, `.jc-carta-logo`
- `.jc-carta-body`, `.jc-carta-sub`, `.jc-carta-linha`, `.jc-carta-valor`
- `.jc-carta-acoes`, `.jc-carta-acao`, `.jc-carta-acao-sec`
- `.jc-portal-phones`, `.jc-portal-phone-img`

---

## Pendentes

### Versão Original (HTML)
- ⏳ `assets-b64.js` — novos assets (Pg contact.png, +AI.svg, CONSULTOR.png, PGFiles - Logo.png, BOLETO.png, FATURA.png, TEXTO.png, VOZ.png, Mock Smarthphone.png) precisam ser adicionados para download completo
- ⏳ `_cropImagem()` em `shared.js` — lógica de crop incompleta (cW, cH não definidos)

### Versão Next.js
- ⏳ API key de IA para `ai-suggestions.ts` — atualmente usa base local de perfis
- ⏳ `overflow-visible` no `page-wrapper` pode afetar captura do html2canvas no download

---

## Como retomar

1. Leia este arquivo
2. O projeto está completo — possíveis próximas tarefas:
   - Corrigir `assets-b64.js` com novos assets em base64
   - Corrigir `_cropImagem` em shared.js
   - Adicionar API key real para sugestões de IA
   - Ajustes visuais nos serviços
