# Contexto da Sessão — Smart Journey / PGMais

**Data:** 2026-03-29
**Leia este arquivo ao iniciar uma nova sessão antes de qualquer ação.**

---

## O que é esse projeto

Sistema de apresentação comercial da PGMais. O comercial configura e baixa um template visual (PDF/JPG/PNG) para mostrar ao cliente.

Estrutura atual:
- `index.html` — Menu de seleção de serviço (4 cards, todos disponíveis)
- `smart-journey.html` — Smart Journey Collection (fluxo completo)
- `gestao-acordo.html` — Gestão de Acordo (fluxo completo)
- `gestao-fatura.html` — Gestão de Fatura (fluxo completo)
- `jornada-cobranca.html` — Jornada de Cobrança (fluxo completo)
- `shared.js` — Toda a lógica JS compartilhada entre os serviços
- `style.css` — Estilos compartilhados (inclui menu, SJC, GA, GF, JC)
- `assets-b64.js` — Assets em base64 (usados para download)
- `Figma/assets/` — Imagens dos logos e ícones

---

## Decisões arquiteturais tomadas (definitivas)

1. **Arquivos separados por serviço** — cada serviço tem seu próprio `.html`
2. **`index.html` = menu de seleção** — 4 cards, todos disponíveis
3. **`shared.js`** — todo JS comum extraído (triagem, download, remoção, utilitários)
4. **Cada serviço define antes do `shared.js`:**
   - `SERVICE_CONFIG` — nome, filename, storageKey, columns, tagline
   - `blockServices` — mapeamento bloco → [ids serviços filhos]
   - `window._onTriagemApplied` (opcional) — hook pós-triagem por serviço
5. **Apenas técnicos** editam os HTMLs
6. **Nome correto:** "Jornada de Cobrança" (não "da")

---

## Status atual — PROJETO COMPLETO ✅

### Concluído

- ✅ `index.html` — menu de seleção (4 cards, todos DISPONÍVEL)
- ✅ `smart-journey.html` — Smart Journey Collection
- ✅ `gestao-acordo.html` — Gestão de Acordo
- ✅ `gestao-fatura.html` — Gestão de Fatura
- ✅ `jornada-cobranca.html` — Jornada de Cobrança
- ✅ `shared.js` — lógica compartilhada
- ✅ `style.css` — estilos de todos os serviços

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

## Pendente

- ⏳ `assets-b64.js` — novos assets (Pg contact.png, +AI.svg, CONSULTOR.png, PGFiles - Logo.png, BOLETO.png, FATURA.png, TEXTO.png, VOZ.png, Mock Smarthphone.png) precisam ser adicionados para que o download funcione com todos os ícones novos

---

## Como retomar

1. Leia este arquivo
2. Projeto está completo em 4 serviços — possíveis próximas tarefas:
   - Atualizar `assets-b64.js` com novos assets
   - Ajustes visuais pontuais nos serviços
   - Novos serviços (se houver)
