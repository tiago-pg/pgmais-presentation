# PGMais Design System

The PGMais Design System is the single source of truth for the visual and verbal identity of **PGMais** — "o mais completo ecossistema de relacionamento digital para cobrança do Brasil." It packages the brand's logos, color palette, typography, motifs, imagery direction, and UI kits so that any designer or agent can assemble on-brand interfaces, decks, and assets without drifting from the new 2026 positioning.

> **Tech, but people first.** Every asset here serves the tension between proprietary AI-grade technology and the human experience that makes it matter.

---

## About PGMais

PGMais is the Brazilian leader in digital relationship services and technology solutions for the full credit-collection journey — from *adimplente* (paying on time) to *inadimplente* (overdue). Built over 15+ years, the ecosystem combines proprietary IA, hybrid digital agents, generative content, omnichannel integration, and white-label self-negotiation portals. The flagship **ONE Collect** is the only *phygital* collection system on the market. The operating philosophy — "tech, but people first" — means efficiency never overrides the customer experience.

**Differentiators:** 100% proprietary technology with end-to-end traceability, Smart Journey Collection, consultive co-creation model, modular *or* full-service delivery, +48% average lift in recovery rate, up to 37% cost reduction, 70% interaction rate with conversational AI.

**Scale:** 110+ specialized professionals, 15+ national awards for excellence, real client cases.

---

## Sources used to build this system

These are the raw materials the system was assembled from. Paths are relative to the project root.

| Source | Type | Location |
|---|---|---|
| Novo Posicionamento — Brand Guide Mini (2026) | PDF, 26 pages | `uploads/Cópia de Novo Posicionamento_Brand Guide_Mini.pdf` |
| Template de Apresentação Institucional PGMais | PDF, 53 pages | `uploads/Template de Apresentação.pdf` |
| Wordmark + Lettermark logos (horizontal, vertical, symbol, light/dark) | SVG + PNG | `uploads/Cópia de Novo Posicionamento_PGMais_Logo_*` |
| Brand elements (gradient, Brazil map, frame shapes, "tech, but people first" IG-card mockup) | SVG + PNG | `uploads/Cópia de Novo posicionamento_Elemento_*` |

All originals are preserved in `uploads/`. Clean-named, organized copies live in `assets/logos/` and `assets/elements/`.

> **Note for readers of this repo in the future:** the PDFs were provided by the client and may not be available to everyone viewing this system. The paths above are preserved in case a reader has the same bundle.

---

## Index

| File / Folder | What it contains |
|---|---|
| `README.md` | This file. High-level context, content fundamentals, visual foundations, iconography. |
| `SKILL.md` | Cross-compatible skill definition. Start here when using this system inside Claude Code. |
| `colors_and_type.css` | All design tokens as CSS custom properties: colors, gradients, typography, spacing, radii, shadows. |
| `fonts/` | Lato and Poppins, self-hosted via Google Fonts CSS import (see `colors_and_type.css`). |
| `assets/logos/` | PGMais wordmark and PG+ lettermark — horizontal, vertical, symbol, for light and dark backgrounds. |
| `assets/elements/` | Brand-owned graphic elements: gradient blob, Brazil map, frame shapes, IG-style card. |
| `preview/` | Design system preview cards (colors, type, logos, components). Surfaces in the Design System tab. |
| `ui_kits/marketing_site/` | PGMais public marketing website UI kit — `index.html` + Nav / Hero / EcosystemGrid / StatsBand / OneCollectFeature / CaseLogos / Footer. |
| `ui_kits/one_collect/` | ONE Collect product dashboard UI kit — `index.html` + Sidebar / TopBar / KpiRow / JourneyTable / AiPanel. |
| `slides/` | 16:9 slide templates (6) built from Template Institucional — `index.html` + 01 title / 02 section / 03 three-up / 04 quote / 05 stats / 06 thanks. |
| `temp/` | Parsed brand-guide text extracts (internal, safe to delete). |
| `uploads/` | Original files as delivered — do not edit. |

---

## Content Fundamentals

PGMais communicates in **Brazilian Portuguese** first. English appears only in proper nouns and the brand tagline (*"tech, but people first"*). The writing style is a deliberate hybrid: **technical authority softened by human warmth**.

### Voice & tone

- **Institutional, not casual.** "Provemos soluções…" not "A gente faz…". The brand speaks as a seasoned specialist — 15 years of practice behind every sentence.
- **Confident, never defensive.** Claims are stated as facts: "O mais completo ecossistema." "Líder em serviços e soluções." No hedging.
- **Human-centred even when technical.** Tech is always qualified by its effect on a person: "a tecnologia só é verdadeiramente eficiente quando respeita e facilita a experiência do usuário final."
- **Strategic, not salesy.** Copy reads like a white-paper thesis — it teaches a point of view before pitching.

### Person & address

- First-person plural when the brand speaks: **"Nosso posicionamento"**, **"Nossas cores"**, **"Provemos soluções"**. PGMais is a collective ("nós"), never an "I".
- When addressing the client, prefer **"você / o cliente / o parceiro"** — respectful, not over-familiar. Avoid the casual "a gente".
- No emoji in institutional copy. The visual system carries the warmth; the words stay sober.

### Casing & typographic conventions

- **Sentence case is the default.** Headlines, body, CTAs — all in sentence case. Never All-Caps marketing shouting.
- **Eyebrows / small labels** (section tags like `BRAND DESIGN`, `INTRODUÇÃO`, `SUMÁRIO`) are the one place All-Caps appears — in Lato Medium, tracked out, used sparingly as navigation aids.
- **The tagline** is always lowercase: *tech, but people first.* with the trailing period. Do not capitalize.
- **Wordmark** is always written `PGMais` (or lower-case in the logo lockup itself) — never `PG Mais`, `Pg Mais`, or `pgmais`. Lettermark is `PG+`.

### Vocabulary the brand uses

Words that recur — use them, don't replace them with synonyms:

- **Ecossistema** — the platform-level framing. PGMais is not a product, it's an ecosystem.
- **Jornada** — the customer lifecycle, from *adimplente* to *inadimplente*.
- **Hiperpersonalização**, **automação inteligente**, **rastreabilidade**, **soberania tecnológica**, **sabedoria estratégica** — these are all load-bearing terms in the positioning.
- **Phygital** — reserved for ONE Collect.
- **Proprietária** — always paired with tecnologia / IA / infraestrutura. Emphasizes that nothing is rented from third parties.

### Example copy (taken from the guide)

- **Positioning statement:** "O mais completo ecossistema de relacionamento digital para cobrança do Brasil."
- **Value proposition:** "Provemos soluções de relacionamento digital para cobrança, do adimplente ao inadimplente, na vanguarda da tecnologia e serviços."
- **Attribute summary:** "Especialista, Integrador e Humano."
- **Differentiator headline:** "Tecnologia 100% proprietária com rastreabilidade total de ponta a ponta."
- **Strategic wisdom headline:** "Transformando a complexidade dos dados em clareza para a decisão."

### Do and don't

| ✅ Do | ❌ Don't |
|---|---|
| "Provemos soluções…" | "Oferecemos produtos…" (too generic) |
| "Ecossistema completo" | "Plataforma completa" (dilutes positioning) |
| "IA proprietária" | "IA" (strip of the modifier and it loses meaning) |
| "tech, but people first." | "TECH, BUT PEOPLE FIRST!" (wrong casing, no exclamation) |
| Sentence case headlines | Title Case Or ALL CAPS Headlines |

---

## Visual Foundations

PGMais's visual language is **minimalismo funcional** — every element has a job, nothing is decorative for its own sake. The look is clean, sober, and digitally-native, with strategic use of a single vibrant green to puncture deep navy fields.

### Colors (summary — full tokens in `colors_and_type.css`)

**Core palette (4 cores fundamentais — from the guide, section "Linguagem Visual"):**

- **Azul Escuro Profundo `#172c66`** — primary background fill on branded surfaces. Also the mandatory text color on light backgrounds.
- **Azul Vibrante `#0120eb`** — used in gradients (into green), and for low-emphasis interactive signals.
- **Verde `#40eb4f`** — the brand's signature accent. Used in gradients, and standalone for high-emphasis elements (CTAs, primary accents, the "+" in the lettermark).
- **Cinza Claro `#ededed`** — contrast/comfort color. Mandatory for text on deep-navy backgrounds; also used as breathing-room background fill.

**Extended palette (from the brand guide Cores page, supporting roles):**

- **Azul Claro `#3db7f4`** — secondary accent for diagrams, data, informational surfaces.
- **Amarelo `#f2f24b`** — tertiary accent for highlighting and emphasis.
- **Rosa `#f173ac`** — tertiary accent, typically for human/empathy-coded surfaces.

The gradient `#40eb4f → #0120eb` (green → blue) is the signature brand gradient — it appears softly blurred behind hero sections, and as a stroke on frame outlines.

### Typography

Two families, both sans-serif, one marketing-stylish and one neutral:

- **Lato** — primary. "Personalidade mais forte, marcante e estilizada." Headlines (Bold / Black), strategic subtitles (Medium), eyebrows.
- **Poppins** — secondary. "Neutra, simples, legível." Body text, paragraphs, captions, menus. **Bold in CTAs only.**

Both are loaded from Google Fonts (officially-endorsed in the template guide). No license issues, no substitution needed.

**Hierarchy (codified in `colors_and_type.css`):**

| Role | Family / Weight | Size / Line-height |
|---|---|---|
| Display | Lato Black 900 | 72 / 1.05 |
| H1 | Lato Bold 700 | 56 / 1.1 |
| H2 | Lato Bold 700 | 40 / 1.15 |
| H3 | Lato Medium 500 | 28 / 1.2 |
| Subtitle / Strategic lede | Lato Medium 500 | 22 / 1.35 |
| Body | Poppins Regular 400 | 16 / 1.6 |
| Body small | Poppins Regular 400 | 14 / 1.55 |
| Caption | Poppins Regular 400 | 12 / 1.5 |
| Eyebrow | Lato Medium 500, uppercase, tracked +0.12em | 12 / 1.4 |
| CTA | Poppins Bold 700 | 16 / 1 |

### Backgrounds

PGMais surfaces are overwhelmingly **flat** — either deep-navy or near-white (`#ededed`, never pure white as a full-bleed field). Visual interest comes from three *optional* moves, layered sparingly:

1. **The signature gradient** (`gradient.svg`) — soft, abstract green-to-blue blob, blurred and placed as a hero background or section divider. Always low-saturation relative to foreground content.
2. **Frame outlines** (`frame-square.svg`, `frame-horizontal.svg`, `frame-vertical.svg`, `frame-tech-people-first.svg`) — thin 2-3px strokes running the green→blue gradient, used as device/IG-card/content frames. They suggest "this is a digital interface" without drawing a literal phone.
3. **Brazil map outline** (`brasil-map.svg`) — the same gradient stroke, used once per deck or page as a statement of national scale.

No repeating patterns, no textures, no grain, no photo filters. The cleanness is the point.

### Imagery

Photography is a pillar of the identity — see `README.md#imagery-direction` below. Short version:

- Real Brazilian people, spontaneous moments, **eye contact with the lens**.
- Warm natural light, no filter. Integrated tech (a phone, a laptop) woven into everyday life.
- **Anti-stock.** Avoid genéric business handshakes, slick agency-shot tableaux, overly composed scenes.
- Source: Freepik is approved per the template guide, but prefer custom photography when available.

### Motion / animation

The guide doesn't prescribe motion, so the system defaults to **restrained, functional motion** that matches the minimalist visual voice:

- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` — a refined ease-out. No bounces, no overshoots.
- **Durations:** 150ms for micro-feedback (hover, press), 240ms for UI transitions, 400ms for page / section changes. Anything slower reads as sluggish for a "vanguard tech" brand.
- **Fade + subtle translate** is the default entrance: 8–12px of upward translate plus opacity 0→1.
- The gradient blob can **drift slowly** (8–12s loop) when used as a hero backdrop — very low amplitude, never distracting.
- No parallax, no scroll-jacking, no decorative autoplay animations.

### Interaction states

- **Hover (buttons, links):** for green CTAs, darken to `oklch(from var(--green) calc(l - 0.06) c h)`; for ghost/secondary, fill with `rgba(23,44,102,0.06)`. Text links underline on hover.
- **Press:** 1–2px downward translate + slight opacity drop (0.92). No scale-down.
- **Focus:** 2px solid ring in `#0120eb` (azul vibrante) with 2px offset. High-contrast, accessible.
- **Disabled:** opacity 0.4, cursor `not-allowed`. Do not desaturate the green — keep it recognizable.

### Borders

- **Hairlines:** 1px, `#e5e7eb` or `rgba(23,44,102,0.12)` — for card separations and table rows.
- **Accent borders:** 2px, `#40eb4f` — for active/selected states or high-emphasis callouts.
- **Gradient borders:** 2–3px, using the brand gradient — reserved for hero frames and decorative asset containers (matches the provided element SVGs).

### Shadows / elevation

The brand is flat — shadows are subtle and functional, never dramatic:

- `--shadow-sm`: `0 1px 2px rgba(23,44,102,0.06)` — default resting card.
- `--shadow-md`: `0 4px 16px rgba(23,44,102,0.08), 0 1px 3px rgba(23,44,102,0.06)` — lifted cards, dropdowns.
- `--shadow-lg`: `0 16px 48px rgba(23,44,102,0.12), 0 4px 12px rgba(23,44,102,0.08)` — modals, overlays.
- `--shadow-glow-green`: `0 0 0 6px rgba(64,235,79,0.18)` — focus halo on primary CTAs (optional).

No inner shadows except on input fields (`inset 0 1px 0 rgba(23,44,102,0.04)`).

### Corner radii

The brand elements (frame-square, frame-horizontal) show **large, generous radii** — roughly 5–7% of the shortest edge. Tokens:

- `--radius-sm`: 6px (chips, small pills)
- `--radius-md`: 12px (buttons, inputs)
- `--radius-lg`: 20px (cards)
- `--radius-xl`: 32px (hero frames, IG-style cards matching the provided SVG)
- `--radius-full`: 9999px (pills, avatars)

### Cards

Cards are the primary content container. The PGMais card style, abstracted from the provided frame SVGs:

- **Surface:** white `#ffffff` on light theme, `#172c66` on dark.
- **Border:** 1px `rgba(23,44,102,0.08)` (light) / `rgba(237,237,237,0.08)` (dark). Optional: 2px brand-gradient border on hero cards.
- **Radius:** `--radius-lg` (20px) for standard, `--radius-xl` (32px) for hero cards.
- **Shadow:** `--shadow-sm` resting, `--shadow-md` on hover.
- **Padding:** 24px (md), 32px (lg), 48px (hero).

### Transparency & blur

Transparency is used for **layered depth on hero sections only**. Typical uses:

- Glass-morphism for floating nav on scrolled hero: `background: rgba(23,44,102,0.72); backdrop-filter: blur(24px) saturate(140%)`.
- Gradient blob at 60–80% opacity behind hero text.
- Frame element outlines at 100% opacity (they're already thin strokes).

Avoid blur/transparency on data-dense surfaces — it hurts legibility.

### Layout rules

- **12-column grid** for marketing pages, **8px base unit** for product surfaces.
- **Max content width** 1280px on marketing, 1440px on product.
- **Breathing room is non-negotiable.** The guide repeats "minimalismo funcional" — when in doubt, add 50% more whitespace.
- **Eyebrows above headlines**, always left-aligned on marketing sections, centered only for standalone hero.
- **Fixed elements:** the top navigation on marketing is sticky and becomes glass-morphic on scroll. Product dashboards have a fixed left sidebar and sticky top bar.

### Color vibe of imagery

Photography trends **cool to neutral with warm skin tones** — the brand's navy + green palette harmonises with daylight-balanced photos. Avoid heavy grading, sepia, black & white, or high-contrast filters. Keep it **real, bright, and honest**.

---

## Iconography

PGMais does not ship its own icon font or sprite. The template-de-apresentação PDF explicitly calls out **Flaticon** as an approved source for editable icon sets ("Negócios, Trabalho em Equipe, Educação, Criatividade, Ajuda e Suporte"). This means icons are treated as **swappable graphic assets**, not as a tight system.

**This design system substitutes Lucide Icons** as the default icon library for all UI work:

- **Why Lucide:** open-source, consistent 2px stroke, rounded join, CDN-available, matches the brand's minimalismo funcional aesthetic, and is close in feel to the Flaticon outlined sets used in the official template.
- **How to load:** `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>` then `lucide.createIcons()`.
- **Stroke:** 1.75 – 2px, rounded caps, rounded joins.
- **Sizes:** 16, 20, 24, 32px. 20px is the default in UI.
- **Color:** inherit from `currentColor`. On brand dark surfaces, set color to `#ededed`; on light, use `#172c66`. The green `#40eb4f` is reserved for active / selected state icons.

> 🚩 **Substitution flag:** The official template uses Flaticon sets. If a user downloads the PGMais Flaticon kit, it should be copied into `assets/icons/` and re-exported as a custom sprite. Until then, Lucide is the stand-in.

**Emoji:** not used anywhere in the brand system. The tagline is the only piece of English-language glyph work the brand commits to, and it stays typographic.

**Unicode as icon:** not used. The `+` in PG+ is the closest the brand comes, and it's hand-drawn inside a circle in the lettermark, not a glyph.

**Brand elements as "giant icons":** the frame SVGs (`frame-square.svg`, `frame-horizontal.svg`, `frame-vertical.svg`, `frame-tech-people-first.svg`) and `brasil-map.svg` function as oversized decorative iconography for hero and section surfaces. They're too large to be inline icons but serve the same "graphic shorthand" role.

---

## How to use this system

1. **Read `SKILL.md`** — it's the entry point when this system is used as a Claude skill.
2. **Import `colors_and_type.css`** into any HTML you build: `<link rel="stylesheet" href="colors_and_type.css">`. Use the CSS variables (`var(--color-navy)`, `var(--text-h1)`, etc.) rather than hard-coding.
3. **Copy assets** out of `assets/logos/` and `assets/elements/` into your working file — do not hotlink across projects.
4. **Reference UI kits** in `ui_kits/` when building product surfaces. Components are modular JSX you can lift into a new page.
5. **Use the slide templates** in `slides/` for any deck — they match the Template Institucional PGMais layouts.

---

*Version 1.0 · PGMais 2026 Novo Posicionamento · Based on the official Brand Guide (Mini) and Template Institucional.*
