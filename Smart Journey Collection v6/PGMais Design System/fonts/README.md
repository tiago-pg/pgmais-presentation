# /fonts

The PGMais design system now **self-hosts Lato** from this folder. The official `.ttf` files for all 10 weight + italic variants live here:

| File | Weight | Style |
|---|---|---|
| Lato-Thin.ttf | 100 | normal |
| Lato-ThinItalic.ttf | 100 | italic |
| Lato-Light.ttf | 300 | normal |
| Lato-LightItalic.ttf | 300 | italic |
| Lato-Regular.ttf | 400 | normal |
| Lato-Italic.ttf | 400 | italic |
| Lato-Bold.ttf | 700 | normal |
| Lato-BoldItalic.ttf | 700 | italic |
| Lato-Black.ttf | 900 | normal |
| Lato-BlackItalic.ttf | 900 | italic |

`colors_and_type.css` includes one `@font-face` rule per file — no Google Fonts import for Lato. Offline-capable.

## Poppins

**Poppins is still loaded from Google Fonts** via `@import` at the top of `colors_and_type.css`. To self-host Poppins too:

1. Download from https://fonts.google.com/specimen/Poppins (weights 300/400/500/600/700).
2. Drop the `.ttf` files into this folder.
3. Add matching `@font-face` rules to `colors_and_type.css` and remove the `@import` line.
