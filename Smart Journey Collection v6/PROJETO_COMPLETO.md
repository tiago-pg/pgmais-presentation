# DOCUMENTO DE ESPECIFICAÇÃO COMPLETA — Smart Journey Collection v6

> **Data:** 2026-06-15  
> **Produto:** PGMais Commercial Presentation Tool  
> **Propósito:** Documento único contendo TODAS as informações para recriar este projeto do zero com um único prompt.

---

## SUMÁRIO

1. [VISÃO GERAL DO PROJETO](#1-visão-geral-do-projeto)
2. [ESTRUTURA DE ARQUIVOS](#2-estrutura-de-arquivos)
3. [PÚBLICO-ALVO E CONTEXTO DE NEGÓCIO](#3-público-alvo-e-contexto-de-negócio)
4. [ARQUITETURA TÉCNICA](#4-arquitetura-técnica)
5. [DESIGN SYSTEM — PGMais](#5-design-system--pgmais)
6. [SERVIÇOS (4 PÁGINAS)](#6-serviços-4-páginas)
7. [COMPONENTES E FUNCIONALIDADES](#7-componentes-e-funcionalidades)
8. [FLUXO DE TRIAGEM (WIZARD)](#8-fluxo-de-triagem-wizard)
9. [MECANISMO DE DOWNLOAD](#9-mecanismo-de-download)
10. [COMPORTAMENTO E REGRAS DE NEGÓCIO](#10-comportamento-e-regras-de-negócio)
11. [ASSETS E ÍCONES](#11-assets-e-ícones)
12. [DEPENDÊNCIAS EXTERNAS](#12-dependências-externas)
13. [PENDÊNCIAS CONHECIDAS](#13-pendências-conhecidas)
14. [PADRÕES DE CÓDIGO E CONVENÇÕES](#14-padrões-de-código-e-convenções)

---

## 1. VISÃO GERAL DO PROJETO

### 1.1 O que é

Sistema de apresentação comercial **offline-first** (HTML puro) da empresa **PGMais** — "o mais completo ecossistema de relacionamento digital para cobrança do Brasil". O comercial (vendedor) configura uma apresentação visual personalizada para mostrar ao cliente potencial, podendo baixar o resultado como PDF, JPG ou PNG.

### 1.2 Marca e Posicionamento

- **Marca:** PGMais (PG+), escrita sempre `PGMais` (nunca `PG Mais`, `Pg Mais`, `pgmais`)
- **Tagline:** `tech, but people first.` (sempre minúscula, com ponto final)
- **Idioma:** Português brasileiro (inglês apenas em nomes próprios e tagline)
- **Posicionamento:** "O mais completo ecossistema de relacionamento digital para cobrança do Brasil"
- **Voz da marca:** Institucional, confiante, autoridade técnica com calor humano — "Provemos soluções…" (nunca "A gente faz…")
- **Tom:** Especialista, Integrador e Humano

### 1.3 Diferenciadores de Negócio

- Tecnologia 100% proprietária com rastreabilidade total
- Smart Journey Collection — coleção de jornadas digitais
- Modelo de cocriação consultiva
- +48% lift médio em taxa de recuperação
- Até 37% de redução de custo
- 70% de taxa de interação com IA conversacional
- 110+ profissionais especializados, 15+ prêmios nacionais
- Único sistema **phygital** de cobrança no mercado (ONE Collect)

### 1.4 Status do Projeto

**COMPLETO ✅** — Duas versões disponíveis:

| Versão | Localização | Stack |
|--------|------------|-------|
| **Original (HTML)** | `Smart Journey Collection v6/` | HTML5 + CSS3 + Vanilla JS |
| **Next.js** | `pgmais-presentation/` | Next.js 16 (App Router) + Tailwind v4 + TypeScript |

**Pendências conhecidas:**
- ⏳ `assets-b64.js` (versão original) precisa de novos assets para download funcionar com 100% dos ícones
- ⏳ API key do provedor de IA para o módulo `ai-suggestions.ts` funcionar com LLM real (atualmente usa base local)

---

## 2. ESTRUTURA DE ARQUIVOS

```
Smart Journey Collection v6/
│
├── Smart Journey Collection/          ← APP PRINCIPAL
│   ├── index.html                     ← Menu de seleção (4 cards)
│   ├── smart-journey.html             ← Smart Journey Collection (SJC)
│   ├── gestao-acordo.html             ← Gestão de Acordo (GA)
│   ├── gestao-fatura.html             ← Gestão de Fatura (GF)
│   ├── jornada-cobranca.html          ← Jornada de Cobrança (JC)
│   ├── shared.js                      ← Lógica JS compartilhada (TODOS os serviços)
│   ├── style.css                      ← TODOS os estilos (2000 linhas)
│   ├── colors_and_type.css            ← Design tokens (572 linhas)
│   ├── assets-b64.js                  ← Assets em base64 (p/ download)
│   ├── CONTEXTO_SESSAO.md             ← Documento de contexto p/ agentes
│   │
│   ├── fonts/                         ← Fonte Lato (10 arquivos .ttf)
│   │   ├── Lato-Thin.ttf
│   │   ├── Lato-ThinItalic.ttf
│   │   ├── Lato-Light.ttf
│   │   ├── Lato-LightItalic.ttf
│   │   ├── Lato-Regular.ttf
│   │   ├── Lato-Italic.ttf
│   │   ├── Lato-Bold.ttf
│   │   ├── Lato-BoldItalic.ttf
│   │   ├── Lato-Black.ttf
│   │   └── Lato-BlackItalic.ttf
│   │
│   └── Figma/assets/                  ← Imagens (~90 arquivos)
│       ├── PGMais - Logo.png
│       ├── PGMais_Logo_Vertical_Reduzida 23.svg
│       ├── O.N.E - Logo.svg | .png
│       ├── PGChannels - Logo.svg | .png
│       ├── PGFiles - Logo.svg | .png
│       ├── Insights - Logo.svg | .png
│       ├── Pg contact.svg | .png
│       ├── SMS.svg | .png
│       ├── EMAIL.svg | .png
│       ├── RCS.svg | .png
│       ├── WHATS.svg | .png
│       ├── URA.svg | .png
│       ├── CARTA.svg | .png
│       ├── ADS.svg | .png
│       ├── BOLETO.svg | .png
│       ├── CARNE.svg | .png
│       ├── FATURA.svg | .png
│       ├── CHATBOT.svg | .png + CHATBOT-blue.svg
│       ├── VOICEBOT.svg | .png + VOICEBOT-blue.svg
│       ├── PREDICTION.svg | .png + PREDICTION-blue.svg
│       ├── INTENTION.svg | .png + INTENTION-blue.svg
│       ├── TEXTO.svg | .png
│       ├── VOZ.svg | .png
│       ├── +AI.svg | .png
│       ├── CONSULTOR.svg | .png
│       ├── +PORTAL.svg | .png
│       ├── REPORT.svg | .png
│       ├── DASHBOARDS.svg | .png
│       ├── DISCOVERY.svg | .png
│       ├── ANALYTICS.svg | .png
│       ├── Imagem da pessoa.png
│       ├── Mock Smarthphone.png
│       └── ... (demais variações)
│
├── icones/                            ← Ícones secundários SVG (~30)
│   ├── +.svg                          ← Ícone "+" (bolinha)
│   ├── ONE.svg
│   ├── PG+Contact.svg
│   ├── PG+Channels.svg
│   ├── PG+Files.svg
│   ├── PG+Insights.svg
│   ├── PG+System.svg
│   ├── Consultor.svg
│   ├── +SMS.svg, +Email.svg, +RCS.svg, +Whats.svg, +URA.svg
│   ├── +Carta.svg, +Boleto.svg, +Carnê.svg, +Fatura.svg
│   ├── +ChatBot.svg, +VoiceBot.svg, +IA.svg
│   ├── +Prediction.svg, +Intention.svg
│   ├── +Texto.svg, +Voz.svg, +ADS.svg
│   ├── +Discovery.svg, +Dashboards.svg, +Anlytics.svg, +Report.svg
│   ├── +Portal.svg, +Voz - Smart Journey.svg
│   └── Prancheta 6.svg
│
├── PGMais Design System/              ← Design System completo
│   ├── SKILL.md                       ← Skill para Claude Code
│   ├── README.md                      ← Documentação do Design System
│   ├── colors_and_type.css            ← Mesmo arquivo de tokens
│   │
│   ├── fonts/                         ← Mesma fonte Lato
│   │   ├── Lato-*.ttf (10 arquivos)
│   │   └── README.md
│   │
│   ├── preview/                       ← Páginas de preview do DS
│   │   ├── colors-core.html
│   │   ├── colors-navy-scale.html
│   │   ├── colors-gradients.html
│   │   ├── colors-extended.html
│   │   ├── colors-semantic.html
│   │   ├── brand-logos.html
│   │   ├── brand-portfolio.html
│   │   ├── brand-iconography.html
│   │   ├── brand-elements.html
│   │   └── component-badges.html
│   │
│   ├── slides/                        ← 12 templates de slides
│   │   ├── index.html
│   │   ├── 01-title.html
│   │   ├── 02-section.html
│   │   ├── 03-content-three-up.html
│   │   ├── 04-quote.html
│   │   ├── 05-stats.html
│   │   ├── 06-thanks.html
│   │   ├── 07-ig-quote.html
│   │   ├── 08-vertical-title.html
│   │   ├── 09-outline-hero.html
│   │   ├── 10-split-body.html
│   │   ├── 11-split-light.html
│   │   └── 12-rounded-panel.html
│   │
│   ├── _standalone/                   ← Páginas standalone (bundled)
│   │   ├── 00-Index.html
│   │   ├── 01-Cobranca-Humanizada.html
│   │   ├── 02-Jornada-Completa.html
│   │   └── 03-Cobranca-Multicanal.html
│   │
│   ├── PGMais Forms & Inputs.html     ← Componente: formulários
│   ├── PGMais Slides Standalone.html  ← Slides completos
│   ├── PGMais Help & Tutorial.html    ← Ajuda e tutorial
│   └── PGMais Social Templates.html   ← Templates redes sociais
│
└── .claude/                           ← Config Claude Code
    ├── settings.local.json
    ├── serve.ps1
    └── launch.json
```

### 2.2 Projeto Next.js (nova versão)

```
pgmais-presentation/                     ← Next.js 16 (App Router)
│
├── src/
│   ├── app/                             ← 5 rotas (App Router)
│   │   ├── layout.tsx                   ← Layout raiz (Lato + Poppins via <link>)
│   │   ├── page.tsx                     ← / (Menu de seleção)
│   │   ├── globals.css                  ← Tokens CSS do PGMais + Tailwind
│   │   ├── layout-improvements.css      ← Responsividade, linhas conectoras, fixes
│   │   ├── smart-journey/page.tsx       ← /smart-journey (SJC)
│   │   ├── gestao-acordo/page.tsx       ← /gestao-acordo (GA)
│   │   ├── gestao-fatura/page.tsx       ← /gestao-fatura (GF)
│   │   └── jornada-cobranca/page.tsx    ← /jornada-cobranca (JC)
│   │
│   ├── components/                      ← 18 componentes React
│   │   ├── ActionButtons.tsx            ← Barra superior (hamburger p/ mobile)
│   │   ├── Card.tsx                     ← Card reutilizável (white/gradient, responsivo)
│   │   ├── Header.tsx                   ← Título + linha + logo (responsive)
│   │   ├── ServiceItem.tsx              ← Ícone com hover-excluir (responsive)
│   │   ├── ServiceAddMenu.tsx           ← Botão "+" p/ restaurar serviços
│   │   ├── SistemaOrigem.tsx            ← Barra vertical (horizontal no mobile)
│   │   ├── OneBlock.tsx                 ← Bloco O.N.E. (5 itens)
│   │   ├── PGChannelsBlock.tsx          ← Bloco PGChannels
│   │   ├── PGFilesBlock.tsx             ← Bloco PGFiles
│   │   ├── PersonArea.tsx               ← Foto + badge "INTERAÇÃO CLIENTE"
│   │   ├── IAConversacionalBlock.tsx    ← IA Conversacional (SJC)
│   │   ├── AtendimentoBlock.tsx         ← Atendimento (+AI/Consultor ou Texto/Voz)
│   │   ├── ReceptivoBlock.tsx           ← Receptivo Multicanal (SJC)
│   │   ├── PortalAutoBlock.tsx          ← Portal Autonegociação + PhoneMockup
│   │   ├── PortalNegociacaoBlock.tsx    ← Portal Negociação + Carta (JC)
│   │   ├── InsightsBlock.tsx            ← Rodapé Insights
│   │   ├── TriagemWizard.tsx            ← Wizard 4 etapas (com busca IA)
│   │   ├── ConnectorLines.tsx           ← Linhas de conexão SVG entre blocos
│   │   ├── PhoneMockup.tsx              ← Simulação de smartphone
│   │   └── ServiceTabs.tsx              ← Abas de serviço (GF/JC)
│   │
│   └── lib/                             ← Lógica compartilhada
│       ├── types.ts                     ← Tipos TypeScript
│       ├── constants.ts                 ← Configs de serviço + blocos + ícones
│       ├── triagem-storage.ts           ← sessionStorage + upload + resize
│       ├── download.ts                  ← PDF/JPG/PNG (html2canvas + jsPDF)
│       ├── ai-suggestions.ts            ← IA: sugestão de cor/serviços por empresa
│       └── use-service-state.ts         ← Gerenciamento de estado global
│
├── public/                              ← Assets estáticos
│   ├── assets/                          ← ~90 SVGs/PNGs (logos, ícones)
│   ├── icones/                          ← ~30 SVGs secundários
│   └── fonts/                           ← Lato (10 .ttf)
│
├── netlify.toml                         ← Config de deploy Netlify
├── next.config.ts                       ← output: 'export' (static site)
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## 3. PÚBLICO-ALVO E CONTEXTO DE NEGÓCIO

### 3.1 Quem usa

**Comerciais/Executivos de Contas da PGMais** — profissionais que visitam clientes (bancos, fintechs, varejo, telecom) e precisam demonstrar visualmente as soluções de cobrança digital.

### 3.2 Clientes finais (dos comerciais)

Empresas brasileiras que terceirizam cobrança: bancos (Itaú, etc.), operadoras (Claro, Vivo), varejo (Magazine Luiza), fintechs.

### 3.3 Contexto de uso

- O comercial acessa a ferramenta no navegador (Chrome/Edge)
- Antes da reunião, configura a apresentação com dados do cliente
- Durante a reunião, mostra os blocos de serviço no monitor/projetor
- Ao final, baixa a apresentação em PDF para enviar ao cliente
- Tudo funciona 100% offline (sem build, sem servidor, sem API)

---

## 4. ARQUITETURA TÉCNICA

### 4.1 Stack

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| HTML | HTML5 | — |
| CSS | CSS3 + Variáveis CSS | — |
| JS | Vanilla JavaScript (ES6+) | — |
| Fonte | Lato (self-hosted) + Poppins (Google Fonts) | — |
| Ícones | Bootstrap Icons CDN | 1.13.1 |
| Canvas | html2canvas CDN | 1.4.1 |
| PDF | jsPDF CDN | 2.5.1 |
| Servidor | Qualquer servidor HTTP estático (ou file://) | — |

### 4.2 Versão Next.js

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js (App Router) | 16.2.9 |
| CSS | Tailwind CSS v4 + CSS Variables | — |
| JS/TS | TypeScript (strict) | ES2017 |
| Fonte | Lato (self-hosted) + Poppins (Google Fonts) | — |
| Ícones | Lucide React + SVGs | — |
| Canvas | html2canvas | 1.4.1 |
| PDF | jsPDF | 4.2.1 |
| Deploy | Netlify (static export) | — |
| Build | `output: 'export'` → HTML estático na pasta `out/` | — |

### 4.3 Zero Dependências de Build (Original)

**Não há:** npm, webpack, vite, react, vue, angular, sass, less, typescript, babel, gulp, grunt, docker, node_modules, package.json, lockfile, bundler, transpilador, task runner.

### 4.3 Arquitetura de Código

```
INDEX.HTML ──→ (seleciona serviço via link)
    │
    ├── smart-journey.html     ──→ carrega shared.js
    ├── gestao-acordo.html     ──→ carrega shared.js
    ├── gestao-fatura.html     ──→ carrega shared.js
    └── jornada-cobranca.html  ──→ carrega shared.js
         │
         ├── colors_and_type.css     ← Design tokens CSS
         ├── style.css               ← Todos os estilos
         ├── Bootstrap Icons CDN     ← Ícones
         ├── html2canvas CDN         ← Captura de tela
         ├── jsPDF CDN               ← Geração de PDF
         └── assets-b64.js           ← Assets base64 (condicional)
```

**Regra de carregamento dos assets-b64:**
```html
<script>if(window===window.top){document.write('<scr'+'ipt src="assets-b64.js"><\/scr'+'ipt>');}</script>
```
Só carrega quando **não** está dentro de um iframe (preview do menu).

### 4.4 Inicialização (shared.js)

```javascript
(function _init() {
  const run = () => {
    if (window !== window.top) {
      document.body.classList.add("iframe-preview");
      const overlay = document.getElementById("triagem-overlay");
      if (overlay) overlay.style.display = "none";
      return;
    }
    _popularMenuServicos();
    _initAddButtons();
    _initBlockDeleteHover();
    const saved = sessionStorage.getItem(SERVICE_CONFIG.storageKey);
    if (!saved) return;
    try {
      const data = JSON.parse(saved);
      const overlay = document.getElementById("triagem-overlay");
      if (overlay) overlay.style.display = "none";
      window.addEventListener("load", () => _aplicarTriagem(data), { once: true });
    } catch {
      sessionStorage.removeItem(SERVICE_CONFIG.storageKey);
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
```

---

## 5. DESIGN SYSTEM — PGMais

### 5.1 Núcleo de Cores (4 fundamentais)

| Cor | Hex | Uso |
|-----|-----|-----|
| Azul Escuro Profundo (Navy) | `#172c66` | Fundo de superfícies branded; texto obrigatório em fundo claro |
| Azul Vibrante | `#0120eb` | Gradientes, sinais interativos de baixa ênfase |
| Verde (Assinatura) | `#40eb4f` | CTAs primários, acentos de alto impacto, destaque de stats |
| Cinza Claro | `#ededed` | Texto sobre navy; respiro/fundo de conforto |

### 5.2 Paleta Estendida

| Cor | Hex | Função |
|-----|-----|--------|
| Azul Claro (Sky) | `#3db7f4` | Dados, diagramas, info |
| Amarelo | `#f2f24b` | Destaque/ênfase terciário |
| Rosa | `#f173ac` | Superfícies humanas/empatia |

### 5.3 Gradiente de Assinatura

```
Verde (#40eb4f) → Azul Vibrante (#0120eb)
```
- Usado em: barras de acento (3-6px), underlines finos, hero blob
- **Nunca** como fundo de cards ou grandes superfícies
- Em cards: `linear-gradient(175deg, var(--color-green) 0%, var(--color-blue) 100%)`

### 5.4 Tipografia

| Papel | Fonte/Peso | Tamanho | Line-height |
|-------|-----------|---------|-------------|
| Display | Lato Black 900 | 72px | 1.05 |
| H1 | Lato Bold 700 | 56px | 1.10 |
| H2 | Lato Bold 700 | 40px | 1.15 |
| H3 | Lato Medium 500 | 28px | 1.20 |
| H4 | Lato Medium 500 | 22px | 1.30 |
| Subtítulo | Lato Medium 500 | 20px | 1.40 |
| Body | Poppins Regular 400 | 16px | 1.60 |
| Body small | Poppins Regular 400 | 14px | 1.55 |
| Caption | Poppins Regular 400 | 12px | 1.50 |
| Eyebrow | Lato Medium 500 +0.12em | 12px | 1.40 |
| CTA | Poppins Bold 700 | 16px | 1.00 |

### 5.5 Ramps de Cor Completas

13 ramps × 10 stops cada: primary-blue, secondary-blue, tertiary-blue, brand-email, secondary-pink, cyan, green, purple, coral, orange, success, warning, error + gray scale (10 stops de gray-0 a gray-900).

### 5.6 Espaçamento

Base 4px/8px. Tokens: `--space-1` (4px) até `--space-32` (128px).

### 5.7 Raio de Bordas

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | 6px | Chips, pills |
| `--radius-md` | 12px | Botões, inputs |
| `--radius-lg` | 20px | Cards |
| `--radius-xl` | 32px | Hero frames |
| `--radius-2xl` | 48px | — |
| `--radius-full` | 9999px | Pills, avatares |

### 5.8 Sombras

| Token | Valor |
|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(23,44,102,0.06)` |
| `--shadow-md` | `0 4px 16px rgba(23,44,102,0.08), 0 1px 3px rgba(23,44,102,0.06)` |
| `--shadow-lg` | `0 16px 48px rgba(23,44,102,0.12), 0 4px 12px rgba(23,44,102,0.08)` |
| `--shadow-xl` | `0 32px 96px rgba(23,44,102,0.16), 0 8px 24px rgba(23,44,102,0.10)` |

### 5.9 Elevação (Foundation)

8 níveis: `--elevation-0` (none) a `--elevation-7`.

### 5.10 Motion

- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` — ease-out refinado
- **Durações:** 150ms (micro), 240ms (UI), 400ms (seções/páginas)
- **Entrada padrão:** Fade + translate Y (8-12px)
- **Sem:** bounce, spring, parallax, scroll-jacking

---

## 6. SERVIÇOS (4 PÁGINAS)

### 6.1 Configuração de Serviço (SERVICE_CONFIG)

Cada página HTML define ANTES de carregar `shared.js`:

```javascript
const SERVICE_CONFIG = {
  name:       "Nome do Serviço",
  filename:   "Nome-do-Arquivo",      // para download
  storageKey: "sigla_triagem",         // chave sessionStorage
  columns:    ["col-middle", "col-right"],  // IDs de colunas auto-hide
  tagline: {
    palavras:  ["Palavras", "da", "tagline"],
    destaques: new Set(["destaques"]),
  },
};

const blockServices = {
  "block-channels": ["svc-sms", "svc-email", ...],
  ...
};
```

### 6.2 Smart Journey Collection (SJC)

**Arquivo:** `smart-journey.html` (530 linhas)
**SERVICE_CONFIG.name:** "Smart Journey Collection"
**SERVICE_CONFIG.columns:** `["col-middle", "col-right"]`

**Blocos:**
| Bloco | ID | Serviços filhos |
|-------|----|-----------------|
| Sistema Origem | `.sistema-origem` | Texto editável |
| O.N.E. | `block-one` | 5 itens: Segmentação, Estratégia, Next Best Action, Rastreabilidade, Resultados |
| PGChannels | `block-channels` | SMS, Email, RCS, Whats, URA, Carta, ADS |
| PGFiles | `block-files` | Boleto, Carnê, Fatura |
| Pessoa | `.person-area` | Imagem decorativa |
| IA Conversacional | `block-ia` | Chatbot, VoiceBot, Prediction, Intention |
| Receptivo Multicanal | `block-receptivo` | Texto, Voz |
| Portal de Autonegociação | `block-portal-auto` | +Portal (SVG) |
| Insights | `block-insights` | Report, Dashboards, Discovery, Analytics |

**Layout:** 3 colunas (middle-column + coluna direita) + O.N.E. à esquerda + pessoa no centro.

### 6.3 Gestão de Acordo (GA)

**Arquivo:** `gestao-acordo.html` (587 linhas)
**SERVICE_CONFIG.name:** "Gestão de Acordo"
**SERVICE_CONFIG.columns:** `[]`
**Hook:** `window._onTriagemApplied` — brandeia o phone screen (background + logo/nome do cliente)

**Blocos:**
| Bloco | ID | Serviços |
|-------|----|----------|
| Sistema Origem | `.sistema-origem` | Texto editável |
| PG Contact | `block-pg-contact` | Logo vertical rotacionado (-90deg) |
| O.N.E. | `block-one` | 5 itens (mesmo do SJC) |
| PGChannels | `block-channels` | SMS, Email, RCS, Whats, URA |
| Pessoa + badge | `.person-area-ga` | Imagem + badge "INTERAÇÃO CLIENTE" |
| Atendimento | `block-atendimento` | +AI (IA Conversacional), Consultor |
| Portal de Autonegociação | `block-portal-ga` | Phone mockup completo (5 ações) |
| Insights | `block-insights` | Report, Dashboards, Discovery, Analytics |

**Layout:** Flex horizontal com gap 10px. Phone mockup é uma simulação de celular com:
- Topbar (logo ou nome do cliente)
- Saudação "Olá, Paulo"
- CPF placeholder
- Dívida atualizada com desconto
- 5 caixas de ação: Copiar código de barras, Pix copie e cole, Portal de negociação, WhatsApp, Central de atendimento

### 6.4 Gestão de Fatura (GF)

**Arquivo:** `gestao-fatura.html` (485 linhas)
**SERVICE_CONFIG.name:** "Gestão de Fatura"
**SERVICE_CONFIG.columns:** `[]`
**Reusa classes GA:** `.main-layout-gf`, `.ga-channels-card`, `.gf-channels-card`, `.person-area-ga`

**Blocos:**
| Bloco | ID | Serviços |
|-------|----|----------|
| Sistema Origem | `.sistema-origem` | Texto editável |
| PG Contact | `block-pg-contact` | Logo vertical |
| O.N.E. | `block-one` | 5 itens |
| PGChannels | `block-channels` | SMS, Email, RCS, Whats, URA (só 5) |
| PGFiles | `block-files` | Boleto, Fatura |
| Pessoa + badge | `.person-area-ga` | "INTERAÇÃO CLIENTE · Texto ou voz" |
| Atendimento | `block-atendimento` | Texto, Voz (ícones grandes 88px) |
| Insights | `block-insights` | Report, Dashboards, Discovery, Analytics |

### 6.5 Jornada de Cobrança (JC)

**Arquivo:** `jornada-cobranca.html` (641 linhas)
**SERVICE_CONFIG.name:** "Jornada de Cobrança"
**SERVICE_CONFIG.columns:** `[]`
**Hook:** `window._onTriagemApplied` — brandeia phone + carta mockup

**Blocos:**
| Bloco | ID | Serviços |
|-------|----|----------|
| Sistema Origem | `.sistema-origem` | Texto editável |
| PG Contact | `block-pg-contact` | Logo vertical |
| O.N.E. | `block-one` | 5 itens |
| PGChannels | `block-channels` | SMS, Email, RCS, Whats, ADS (5) |
| PGFiles | `block-files` | Boleto, Fatura |
| Pessoa + badge | `.person-area-ga` | "INTERAÇÃO CLIENTE · Texto ou voz" |
| Atendimento | `block-atendimento` | +AI, Consultor |
| Portal de Negociação | `block-portal-ga` | Carta mockup + phone mockup |
| Insights | `block-insights` | Report, Dashboards, Discovery, Analytics |

**Layout:** `main-layout-jc` com gap 8px (mais compacto). Carta mockup tem cabeçalho brandável com cor do cliente, corpo com linhas de valor, e botões de ação.

### 6.6 Diferenças entre Serviços (Tabela Comparativa)

| Bloco | SJC | GA | GF | JC |
|-------|-----|-----|-----|-----|
| Sistema Origem | ✅ | ✅ | ✅ | ✅ |
| PG Contact | — | ✅ | ✅ | ✅ |
| O.N.E. | 5 itens | 5 itens | 5 itens | 5 itens |
| PGChannels | 7 canais | 5 canais | 5 canais | 5 canais (ADS no lugar de URA) |
| PGFiles | Boleto+Carnê+Fatura | — | Boleto+Fatura | Boleto+Fatura |
| Pessoa + badge | ✅ (sem badge) | ✅ | ✅ | ✅ |
| IA Conversacional | ✅ (4 itens) | — | — | — |
| Atendimento (+AI+Consultor) | — | ✅ | — | ✅ |
| Atendimento (Texto+Voz) | Receptivo | — | ✅ | — |
| Portal de Autonegociação (phone) | ✅ | ✅ | — | — |
| Portal de Negociação (carta+phone) | — | — | — | ✅ |
| Insights | ✅ | ✅ | ✅ | ✅ |
| Tabs de serviço | — | — | ✅ | ✅ |

---

## 7. COMPONENTES E FUNCIONALIDADES

### 7.1 Action Buttons (Compartilhado)

Topo direito de cada serviço, dentro de `.action-buttons`:

| Botão | Função |
|-------|--------|
| `Solução ▾` | Dropdown para navegar entre os 4 serviços |
| `↩ Desfazer` | Undo (desabilita quando histórico vazio) |
| `↺ Resetar` | Restaura todos os blocos removidos |
| `＋ Blocos ▾` | Menu para restaurar blocos removidos (desabilita se nenhum removido) |
| `↓ Baixar ▾` | Dropdown: PDF, JPG, PNG |

### 7.2 Header

```
┌──────────────────────────────────────────────────┐
│ Título do Serviço  ───────────────────  [Logo PG] │
└──────────────────────────────────────────────────┘
```
- Título em Lato, 36px, italic 300 (bold 700 na palavra-chave)
- Linha com gradiente `var(--color-navy-20) → transparent`
- Logo PGMais à direita (42px height)

### 7.3 Sistema Origem

Barra vertical rotacionada à esquerda:
- `writing-mode: vertical-lr; transform: rotate(180deg)`
- Fundo navy, texto branco
- `contenteditable="true"` — editável pelo usuário
- No modo personalizado: vira horizontal (`writing-mode: horizontal-tb`), recebe logo rotacionada do cliente

### 7.4 Cards

Dois tipos:
- **`card-white`**: Fundo branco, borda 2px navy-20, border-radius 26px
- **`card-gradient`**: Gradiente 175deg verde→azul, texto branco

### 7.5 Service Items (Ícones)

- Altura do ícone: 70px (padrão), 60px (atendimento GA), 88px (atendimento GF), 64px (consultor)
- Hover: overlay com lixeira (SVG) + texto "Excluir"
- Click: oculta o serviço (adiciona classe `hidden`)
- Transição com opacidade e background avermelhado

### 7.6 Block Delete Mode

- Hover no título do bloco → overlay cobre o card com fundo + lixeira
- Click no overlay → remove o bloco inteiro (e todos os serviços filhos)
- Gradiente preservado com lixeira branca

### 7.7 Add/Restore Button ("+" Button)

- Botão "+" aparece automaticamente quando algum serviço do bloco está oculto
- Ao clicar, abre menu popup com ícones dos serviços removidos
- Ícones em fundo gradiente recebem `-blue.svg` (variante azul) + fallback com filtro CSS
- Multi-column layout quando 3+ itens no menu

### 7.8 Auto-Collapse

- Quando todos os serviços de um bloco são removidos, o bloco inteiro some
- Colunas configuradas em `SERVICE_CONFIG.columns` somem quando vazias

### 7.9 Insights (Rodapé)

Barra horizontal na base da página com:
- Logo "pg+ Insights" (35px height)
- 4 ícones: Report, Dashboards, Discovery, Analytics
- Mesmo comportamento de hover/exclusão

### 7.10 Service Tabs (GF e JC apenas)

Grupo de abas à direita do Insights, com ícones dos outros serviços:
- GF mostra: GA, GF, JC
- JC mostra: GA, GF, JC
- Separador clicável (divider) que remove o bloco inteiro

---

## 8. FLUXO DE TRIAGEM (WIZARD)

### 8.1 Visão Geral

Overlay modal de 4 etapas que aparece ao abrir qualquer serviço:

```
Step 1 ──→ Step 2 ──→ Step 3 ──→ Step 4 ──→ Fim
Escolha     Form      Confirma    Intro
```

### 8.2 Step 1 — Escolha do Tipo

Duas opções lado a lado (grid 2 colunas):

| Opção | Badge | Descrição |
|-------|-------|-----------|
| Apresentação Imersiva | ✅ RECOMENDADO | Logo, cor da marca, foto do cliente |
| Apresentação Ágil | — | Apenas nome do cliente, rápido |

### 8.3 Step 2-A — Ágil (Padrão)

Formulário simples:
- Nome da empresa (obrigatório, validação com `input-error`)
- Nome do cliente (opcional)
- Botão "Iniciar Apresentação"

### 8.4 Step 2-B — Personalizada (Imersiva)

Formulário completo:
- Nome da empresa (obrigatório)
- Nome do cliente (opcional)
- **Cor da marca:** Seletor de cor visual + input hex (#172c66 default)
- **Logo da marca:** Upload drag-and-drop ou clique (PNG, JPG, WEBP, 600x400px max, mantém transparência)
- **Foto do cliente:** Upload drag-and-drop ou clique (PNG, JPG, WEBP, 900x720px max)
- Botão "Iniciar Apresentação"

### 8.5 Step 3 — Confirmação (Full-screen)

Tela escura com gradiente navy:
- Pergunta: "Vamos personalizar a [Nome do Serviço]?"
- Botão "Iniciar Jornada" (glassmorphism: fundo branco 12% opacidade, border, backdrop-filter)
- Link "← Alterar configurações"

### 8.6 Step 4 — Intro Cinematográfica (Full-screen)

Animação com timing:
- 250ms: Logo PGMais aparece (fade-in + translate)
- 700ms: Logo/nome do cliente aparece
- 1600ms + 350ms/palavra: Palavras da tagline reveladas uma a uma (efeito fade+translate)
- 6000ms total → fecha overlay automaticamente
- Botão "Pular" disponível

### 8.7 Armazenamento (sessionStorage)

```javascript
sessionStorage.setItem(SERVICE_CONFIG.storageKey, JSON.stringify(data));
```

Dados salvos:
```javascript
{
  type: "padrao" | "personalizada",
  nome: "Empresa",
  nomeEmpresa: "Empresa",
  nomeCliente: "João",
  cor: "#172c66",                    // só personalizada
  logo: "data:image/png;base64,...", // só personalizada
  imagem: "data:image/jpeg;base64,..." // só personalizada
}
```

### 8.8 Aplicação dos Dados no Layout

Função `_aplicarTriagem(data)` em `shared.js`:

**Modo Padrão:**
- Sistema Origem ← nome da empresa (editável desligado)

**Modo Personalizado:**
- Sistema Origem ← cor de fundo + logo rotacionada -90deg
- Foto do cliente (pessoa-img) ← substituída pela foto enviada (com crop proporcional)
- Phone mockup (GA/JC): saudação ← nome do cliente

**Hook `_onTriagemApplied`:**
- GA: brandeia phone (background, logo/nome, ícones escurecidos)
- GF: não usa
- JC: brandeia phone + carta (header, logo/nome, botão primário)

### 8.9 Transições Visuais

- Overlay fade-in: 0.3s
- Card slide-in: 0.38s cubic-bezier(0.22, 0.68, 0, 1.12)
- Overlay fade-out: 0.4s
- Orbs decorativos: 3 círculos blur(90px) com drift animation 10-15s

---

## 9. MECANISMO DE DOWNLOAD

### 9.1 Fluxo

```
Usuário clica "↓ Baixar ▾" → escolhe PDF/JPG/PNG
  → Oculta botões de ação
  → Renderiza .sistema-origem em canvas próprio
  → html2canvas captura #page-wrapper
  → No clone: substitui sistema-origem pelo canvas, oculta action buttons, substitui src das imagens por base64
  → Gera arquivo e dispara download
  → Restaura visibilidade dos botões
```

### 9.2 Renderização Especial do Sistema Origem

Devido ao `writing-mode: vertical-lr` não ser bem suportado pelo html2canvas, o sistema origina é renderizado num canvas separado:

**Modo texto:** Letras desenhadas uma a uma com letter-spacing manual, rotacionadas -90deg
**Modo logo (personalizado):** Logo desenhada rotacionada -90deg, centralizada, escalada proporcionalmente

### 9.3 Substituição de Imagens (base64)

Para evitar canvas tainted (protocolo file://), todas as imagens no clone do html2canvas têm seus `src` substituídos por base64 via função `getBase64()` que busca no objeto global `IMG` (definido em `assets-b64.js`).

### 9.4 Formatos

| Formato | Mime | Qualidade |
|---------|------|-----------|
| PNG | `image/png` | Lossless |
| JPG | `image/jpeg` | 0.92 |
| PDF | `image/jpeg` → jsPDF | 0.95, landscape, dimensões do canvas |

### 9.5 assets-b64.js

Objeto global:
```javascript
const IMG = {};
IMG['PGMais - Logo.png'] = 'data:image/png;base64,...';
IMG['SMS.png'] = 'data:image/png;base64,...';
// ... todos os assets necessários para download
```

**Pendente:** Novos assets precisam ser adicionados (veja seção 13).

---

## 10. COMPORTAMENTO E REGRAS DE NEGÓCIO

### 10.1 Histórico (Undo)

```javascript
const history = [];
// Cada ação push: { type: "service"|"block", id, children?: string[] }
// undo(): pop + restaura + atualiza estado
// resetAll(): limpa tudo
```

### 10.2 Navegação entre Serviços

```javascript
const SERVICES_ALL = [
  { name: "Smart Journey Collection", html: "smart-journey.html",    key: "sjc_triagem" },
  { name: "Gestão de Acordo",         html: "gestao-acordo.html",    key: "ga_triagem"  },
  { name: "Gestão de Fatura",         html: "gestao-fatura.html",    key: "gf_triagem"  },
  { name: "Jornada de Cobrança",      html: "jornada-cobranca.html", key: "jc_triagem"  },
];
```

Ao trocar de serviço, os dados do serviço atual são copiados para o destino via sessionStorage.

### 10.3 Preview no Menu (index.html)

Cada card do menu contém um iframe apontando para o próprio serviço. O iframe é escalado via `transform: scale()` para caber como preview.

Regras:
- Largura do iframe: 1280px, altura 720px
- Escala: `(wrapWidth * 0.50) / 1280`
- Dentro do iframe: `body.iframe-preview` oculta action buttons e triagem

### 10.4 Menu Index

4 cards em grid 2×2:
- Cada card tem: badge "DISPONÍVEL", iframe preview (50% scale), título, descrição, footer "Iniciar →"
- Hover: translateY(-5px) + shadow
- Fundo com orbs decorativos

### 10.5 Nomes Corretos

- "Jornada de **Cobrança**" (não "da Cobrança")
- "Smart Journey Collection" (inglês mantido)
- "PGMais" (nunca "PG Mais", "Pg Mais", "pgmais")
- "PG+" para o lettermark

---

## 11. ASSETS E ÍCONES

### 11.1 Localização

- **App:** `Smart Journey Collection/Figma/assets/` (~90 arquivos)
- **Design System:** Referencia os mesmos
- **Ícones secundários:** `icones/` (~30 SVGs)

### 11.2 Convenção de Nomenclatura

- Logos produto: `Nome - Logo.svg` ou `.png` (ex: `O.N.E - Logo.svg`)
- Ícones de serviço: `NOME.svg` ou `NOME.png` (ex: `SMS.svg`, `CHATBOT.svg`)
- Variante azul (p/ menus sobre gradiente): `NOME-blue.svg` (ex: `CHATBOT-blue.svg`)
- Ícones com "+": `+NOME.svg` (ex: `+.svg`, `+Portal.svg`)

### 11.3 Assets Pendentes

Necessários para download completo:
- `Pg contact.png`
- `+AI.svg`
- `CONSULTOR.png`
- `PGFiles - Logo.png`
- `BOLETO.png`
- `FATURA.png`
- `TEXTO.png`
- `VOZ.png`
- `Mock Smarthphone.png`

---

## 12. DEPENDÊNCIAS EXTERNAS

| Recurso | URL/CDN | Versão | Uso |
|---------|---------|--------|-----|
| Bootstrap Icons | `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css` | 1.13.1 | Ícones na UI |
| Poppins (Google Fonts) | `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap')` | — | Fonte secundária |
| Lato (self-hosted) | `fonts/Lato-*.ttf` (10 arquivos) | — | Fonte principal |
| html2canvas | `https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js` | 1.4.1 | Captura de tela p/ download |
| jsPDF | `https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js` | 2.5.1 | Geração de PDF |

---

## 13. PENDÊNCIAS CONHECIDAS

- ⏳ `assets-b64.js` (versão original) incompleto — faltam ~9 assets em base64 para download
- ⏳ `_cropImagem()` em `shared.js` (linhas 918-939) lógica incompleta — `cW` e `cH` não definidos
- ⏳ API key de LLM para `ai-suggestions.ts` — atualmente usa base local de perfis

---

## 14. IMPLEMENTAÇÕES RECENTES (Next.js)

### 14.1 Responsividade Desktop

**Arquivo:** `src/app/layout-improvements.css`

Classes CSS específicas para layout fluido:
- `.main-layout-row-parent` — flex container que faz os blocos expandirem quando um irmão é removido
- `.service-layout-row` — ajusta gap dinamicamente conforme viewport (6px em 1024px, 14px em 1280px, 18px em 1440px+)
- `.service-flex-block` — `flex: 1 1 0%` garante que todos os blocos tenham tamanho flexível para preencher espaço

**Breakpoints:**
| Viewport | Gap | Comportamento |
|----------|-----|---------------|
| < 1024px | — | Flex column (empilhado) |
| 1024–1100px | 6px | Flex row compacto |
| 1100–1280px | 10px | Flex row normal |
| 1280–1440px | 14px | Flex row espaçado |
| > 1440px | 18px | Flex row confortável |

### 14.2 Preenchimento de Espaço ao Remover Blocos

Antes: blocos com `max-width` fixo e `flex: 1 1 [px]` que impediam expansão.

Agora:
- `flex: 1 1 0%` em todos os blocos
- `min-width: 120px` no desktop para evitar encolhimento excessivo
- `max-width: 350px` na área da pessoa
- `flex: 0 0 auto` no Sistema Origem e PG Contact (nunca crescem)
- Uso de `style={{ display: "none" }}` em vez de classe `hidden` para remover do fluxo

### 14.3 Linhas de Conexão (CSS-only)

**Arquivos:** `src/app/layout-improvements.css` + classe `.connector-dot`

Implementação CSS pura (sem JS/SVG de cálculo):
- Cada bloco ganha classe `.connector-dot`
- `::before` → bolinha de 8px à esquerda do card
- Tracejado horizontal conecta as bolinhas entre blocos adjacentes
- Visível apenas em desktop (`>= 1024px`), oculto no mobile
- Se um bloco é removido (`display: none`), a linha de conexão desaparece junto

### 14.4 Correção do Botão Download

Problema: `overflow-hidden` estava como `overflow-visible` para acomodar as linhas de conexão, mas o html2canvas capturava área excessiva.

Solução:
- `#page-wrapper` mantém `overflow-hidden` para captura correta
- Linhas de conexão são desenhadas via `::before` pseudo-elemento, não sobrepõem o fluxo
- CSS de `.connector-overlay` isolado em `layout-improvements.css`

### 14.5 Triagem Inteligente com IA

**Arquivo:** `src/lib/ai-suggestions.ts`

Base de conhecimento local com perfis de empresas:
| Empresa | Cor Sugerida | Canais Recomendados |
|---------|-------------|-------------------|
| Itaú | `#003d6b` | SMS, Email, Whats, Carta, URA, Chatbot, VoiceBot |
| Claro | `#ed1c24` | SMS, Email, Whats, URA, Chatbot |
| Magalu | `#e20134` | SMS, Email, Whats, RCS, Chatbot |
| Vivo | `#660099` | SMS, Email, URA, Carta, VoiceBot |

Funcionalidades:
- Sugestão por setor (banco, telecom, varejo, saúde, educação) → cor + serviços
- Botão **IA ✨** no formulário de triagem que aplica sugestão automaticamente
- Função `suggestFromCompanyName()` — busca textual por nome
- Função `suggestFromSegment()` — busca por segmento de mercado
- Arquitetura preparada para substituir por LLM real (OpenAI, Anthropic, etc.)

### 14.6 Busca e Personalização Dinâmica

- Campo "Nome da empresa" com autocomplete enquanto digita
- Sugestões da base de conhecimento aparecem após 2 caracteres
- Dropdown estilizado com mesma identidade visual do wizard
- Clique na sugestão → preenche o campo automaticamente
- Integrado nos formulários Padrão e Personalizado

### 14.7 Deploy Netlify

**Arquivo:** `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- `output: "export"` no `next.config.ts` → gera site 100% estático
- Pasta `out/` publicada no Netlify
- Redirects SPA para todas as rotas funcionarem (/* → /index.html)
- **URL:** https://pgmais-presentation.netlify.app
- **GitHub:** https://github.com/tiago-pg/pgmais-presentation

**⚠️ Importante — Deploy manual via CLI:**
O Netlify NÃO está configurado para deploy automático via Git. Push no GitHub não dispara build. Para publicar:

```bash
cd pgmais-presentation
netlify deploy --prod
```

Isso faz build + upload para a URL de produção. O comando `netlify deploy` (sem `--prod`) faz preview em URL única temporária.

**Pré-requisitos:**
- Netlify CLI instalado (`npm i -g netlify-cli`)
- Autenticado via `netlify login`
- Projeto vinculado: `netlify link` já configurado

---

## 15. PADRÕES DE CÓDIGO E CONVENÇÕES

### 15.1 HTML

- `<!doctype html>` (minúsculo)
- `lang="pt-BR"`
- Bootstrap Icons via CDN no `<head>`
- `<script>` com assets-b64.js condicional (só se window===window.top)
- SERVICE_CONFIG + blockServices definidos antes do `<script src="shared.js">`
- Classes: BEM simplificado (ex: `.menu-card`, `.block-title`, `.service-item`)

### 15.2 CSS

- Design tokens em `colors_and_type.css`
- Estilos específicos em `style.css` com seções comentadas: `/* ── HEADER ── */`
- `var(--color-navy)` em vez de hex direto
- Box model: `box-sizing: border-box` global
- Transições: 0.15s a 0.3s, `ease` na maioria
- Sem media queries (design fixo para apresentação em desktop)

### 15.3 JavaScript

- ES6+ (const, let, arrow functions, template strings, Sets)
- `window._onTriagemApplied` como hook opcional
- Objeto global `IMG` para base64
- Objeto `history` (array) para undo
- Nenhum módulo ES6 (arquivo único)
- Nenhum framework
- `sessionStorage` para persistência de configuração
- Event listeners com closures e `stopPropagation()`

### 15.4 Regras de Estilo (Design System)

1. Português brasileiro obrigatório (inglês só em nomes próprios e tagline)
2. Navy (`#172c66`) em fundos e texto corpo sobre superfícies claras
3. Verde (`#40eb4f`) reservado para CTAs e acentos — nunca texto corpo
4. Azul vibrante (`#0120eb`) é sinal de baixa ênfase
5. Gradiente é motivo decorativo, não fundo de cards
6. Fotografia: pessoas brasileiras reais, espontâneas
7. Motion: calmo e funcional (200-300ms, ease-out)
8. Sentence case em headlines (nunca ALL CAPS)
9. Nenhum emoji em cópia institucional

---

## APÊNDICE A: CÓDIGO MÍNIMO PARA RECRIAÇÃO

Para recriar este projeto do zero com um único prompt, o seguinte deve ser especificado:

1. 5 páginas HTML (index + 4 serviços) seguindo a arquitetura SERVICE_CONFIG
2. shared.js com toda a lógica (triagem, download, undo, restore, add buttons)
3. style.css com todos os estilos (2000 linhas)
4. colors_and_type.css com todos os tokens (572 linhas)
5. assets-b64.js com ~90 imagens em base64
6. Arquivos de fonte Lato (10 ttfs)
7. ~120 imagens SVG/PNG em Figma/assets/ e icones/
8. PGMais Design System (documentação, slides, previews, templates)
9. .claude/ config

## APÊNDICE B: ESTRUTURA DE CADA HTML DE SERVIÇO

```
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Título — PGMais</title>
  <link rel="stylesheet" href="colors_and_type.css" />
  <link rel="stylesheet" href="style.css" />
  <script>if(window===window.top){document.write('<scr'+'ipt src="assets-b64.js"><\/scr'+'ipt>');}</script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css" />
</head>
<body>
  <div class="page-wrapper" id="page-wrapper">
    <!-- Action Buttons (barra superior) -->
    <!-- Header -->
    <!-- Layout Frame > Main Layout (blocos de serviço) -->
    <!-- Bottom Layout (Insights + Tabs) -->
  </div>
  
  <!-- Triagem Overlay (4 steps) -->
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script>
    const SERVICE_CONFIG = { ... };
    const blockServices = { ... };
  </script>
  <script src="shared.js"></script>
</body>
</html>
```
