---
name: pgmais-design
description: Use this skill to generate well-branded interfaces and assets for PGMais ("o mais completo ecossistema de relacionamento digital para cobrança do Brasil"), either for production or throwaway prototypes/mocks/decks/slides. Contains essential design guidelines, colors, type, fonts, real brand assets, and UI kit components for prototyping against the 2026 Novo Posicionamento.
user-invocable: true
---

Read the `README.md` file within this skill first — it captures the company context, the brand content fundamentals (tone, casing, voice in Portuguese), the visual foundations (palette, type, motion, imagery direction), and the iconography approach.

Then explore the other files available:

- `colors_and_type.css` — every design token as CSS custom properties (colors, semantic roles, fonts, scale, radii, shadows, gradients, signature Lato & Poppins utilities). Link this into any HTML you build and use `var(--color-navy)`, `var(--text-h1)`, etc. rather than hard-coding.
- `fonts/` — Lato + Poppins loaded via Google Fonts CSS `@import` inside `colors_and_type.css`.
- `assets/logos/` — official PGMais wordmark and PG+ lettermark. Horizontal / vertical / symbol variants for light and dark backgrounds. Always pick the version that matches the background.
- `assets/elements/` — brand-owned graphic elements (gradient blob, Brazil map, frame shapes, IG-style card).
- `preview/` — individual preview cards for colors, type, components. Useful as visual reference.
- `ui_kits/marketing_site/` — public marketing website components and full `index.html` demo.
- `ui_kits/one_collect/` — ONE Collect product dashboard components and full `index.html` demo.
- `slides/` — 6 slide templates based on the Template Institucional (title, section, three-up, quote, stats, thanks).

If creating visual artifacts (slides, mocks, throwaway prototypes, decks), copy the needed assets out of `assets/` into your working file and build static HTML that imports `colors_and_type.css`. If working on production code, copy tokens and read the rules here to become an expert in designing with this brand.

Non-negotiable rules baked into the system:
1. **Language is Brazilian Portuguese.** English only for proper nouns and the tagline *"tech, but people first."*.
2. **Navy (`#172c66`) on backgrounds and on body copy over light surfaces.** Dark gray (`#ededed`) on body copy over navy surfaces.
3. **Verde (`#40eb4f`) is reserved** — primary CTAs, single high-impact accents, stat highlights. Never for body text, never for large navy/verde blocks side by side.
4. **Azul vibrante (`#0120eb`) is a low-emphasis signal** — secondary links, icon accents, one leg of the signature gradient. Not a hero color.
5. **Type:** Lato Black/Bold for headlines (display 48–128 px), Lato Medium for strategic subtitles. Poppins Regular for body / paragraphs / menus / legendas. Poppins Bold *strictly* for CTAs. No other weight mixes.
6. **Photography direction:** real Brazilian people, spontaneous, looking into the lens, technology integrated into the everyday. Never generic stock photography. If no real photo is available, leave a placeholder and flag it.
7. **Iconography:** the brand does not ship an icon set. Default to **Lucide** (1.75 px stroke) via CDN, or a consistent Flaticon kit. Never emoji. Never hand-rolled SVG pictograms beyond geometric shapes.
8. **Gradient is a motif, not a background.** The signature green→blue gradient belongs on accent bars (3–6 px), narrow underlines, and the hero blob. It is not a fill for cards or large surfaces.
9. **Motion:** calm and functional — 200–300 ms ease-out for most transitions. No springs, no bounces, no novelty animations.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a couple of clarifying questions (audience, surface, language tone variant formal/conversational, whether it is a deck / marketing page / product screen / slide), and then act as an expert designer who outputs HTML artifacts **or** production code, depending on the need.
