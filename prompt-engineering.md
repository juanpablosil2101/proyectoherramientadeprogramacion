# Prompt Engineering — Premium Coffee Website with Cinematic Scroll Photography

> **Version 2.0 — "Innovation Leader" redesign**
>
> Reemplaza la versión inicial (Canvas sintético). Esta revisión abraza **fotografía real**, **navegación flotante con respiración generosa**, y un lenguaje visual editorial 2025 digno del portafolio de una consultora de innovación (R/GA, Wolff Olins, Instrument, Stink Studios).

---

## 0 · Manifiesto

> "Un sitio web premium no es un catálogo. Es **una obra**. Cada píxel debe sentirse intencional, cada transición coreografiada, cada imagen irreemplazable. Cuando el usuario aterriza, debe pausar. Cuando hace scroll, debe respirar. Cuando se va, debe recordarlo."

Este proyecto apuesta por:

- **Fotografía real** de café (granos, tazas, vapor, textiles, granos tostados) por encima de ilustraciones, emojis o gradientes sintéticos.
- **Cinemática en la transición vertical**: el héroe es una secuencia de fotografías que hacen crossfade y escalan con el scroll — emulando el rodaje de un reel de alta gama.
- **Respiración espacial** en la navegación: el logo y los enlaces nunca se tocan con el borde. Se separan con padding generoso y quedan dentro de un pill flotante con glassmorphism.
- **Tipografía editorial** con mezcla serif (Playfair Display) + grotesque moderna (Inter) y *kerning* amplio en uppercase.
- **Jerarquía brutalista selectiva** — títulos gigantes (hasta `text-9xl`) junto a metadatos diminutos (`tracking-[0.5em]`).

---

## 1 · ROLE

> Eres un **Director de Arte Digital Senior** en una agencia de innovación de clase mundial. Has lanzado sitios para marcas como Aesop, Blue Bottle, Stumptown y Apple. Tu estilo combina la disciplina minimalista japonesa con el maximalismo editorial europeo. Dominas Next.js 16, React 19, GSAP, Framer Motion, Tailwind CSS 4 y la dirección fotográfica.

---

## 2 · PROJECT CONTEXT

Construir el sitio público one-page de **OBSIDIAN COFFEE** — una marca ficticia de café de especialidad tostado en pequeños lotes. El sitio debe:

- Funcionar como un **showroom digital** (no e-commerce funcional).
- Demostrar **liderazgo de innovación** en UI/UX 2025.
- Servir de **portafolio pieza-a-pieza**: cada sección es un experimento de scroll distinto.
- Ser **100% responsive** (mobile 375px → desktop 1920px).

---

## 3 · BRAND IDENTITY

| Atributo | Valor |
|---|---|
| Nombre | **OBSIDIAN COFFEE** |
| Tono | Monástico, obsesivo, ceremonial |
| Audiencia | Entusiastas de café, early adopters, diseñadores |
| Paleta | Negro obsidiana `#0a0805`, crema `#f5e6c8`, dorado ceremonial `#c9a84c`, caoba `#4a2c1a` |
| Tipografía | **Playfair Display** (display, titulares, números) + **Inter** (body, UI, tags) |
| Voz | Afirmativa, sobria, poética sin ser cursi |
| Lema | *"Crafted with obsession."* |

---

## 4 · TECHNICAL REQUIREMENTS

- **Next.js 16** con App Router y Turbopack.
- **React 19**, TypeScript strict.
- **Tailwind CSS 4** con sintaxis `@import "tailwindcss"` y `@theme inline`.
- **GSAP 3 + ScrollTrigger** para pin, scrub horizontal y parallax.
- **Framer Motion 12** para micro-interacciones (hover, stagger, reveals).
- **Fotografía real vía Unsplash** (URLs estables `images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=...&q=80`).
- **Imágenes con `<img>` nativo** para evitar configurar `remotePatterns` en `next.config.ts`. Usar `loading="lazy"`, `decoding="async"` y `fetchPriority` apropiado.
- **Todos los componentes interactivos cargados con `next/dynamic({ ssr: false })`** desde un Client Component (`app/page.tsx` con `"use client"`). Esto elimina mismatches de hidratación.
- **`suppressHydrationWarning`** en `<html>` y `<body>` para tolerar atributos inyectados por extensiones.

---

## 5 · VISUAL DESIGN SPECIFICATIONS

### 5.1 Navegación — Floating Pill

**Regla de oro**: el navbar nunca se pega al borde. Flota con padding externo generoso.

```
    ┌─────────────────────────────────────────────────┐
    │  OBSIDIAN •      Menu  Story  Journal  ORDER →  │   <- top-6 md:top-8
    └─────────────────────────────────────────────────┘
    ↑ mx-4 md:mx-8 lg:mx-12                          ↑
```

- **Posición**: `fixed top-6 md:top-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl`.
- **Background**: `rgba(10,8,5,0.55)` + `backdrop-filter: blur(20px) saturate(1.8)`.
- **Border**: `1px solid rgba(201,168,76,0.18)`.
- **Radius**: `rounded-full` en estado base.
- **Padding interno**: `px-6 py-3` (base) / `px-8 py-4` (scrolled).
- **CTA "Order"**: pill dorado sólido con hover shift.
- **Indicador de scroll**: barra dorada de 1px como progreso de lectura.

### 5.2 Tipografía Jerárquica

| Uso | Font | Size | Tracking | Weight |
|---|---|---|---|---|
| H1 héroe | Playfair Display | `clamp(4rem, 12vw, 12rem)` | `-0.04em` | 700 |
| H2 sección | Playfair Display | `clamp(2.5rem, 6vw, 6rem)` | `-0.02em` | 700 |
| Eyebrow label | Inter | `0.75rem` | `0.5em` uppercase | 500 |
| Body | Inter | `1rem` / `1.125rem` | normal | 400 |
| Metadato | Inter | `0.75rem` | `0.3em` uppercase | 400 |

### 5.3 Paleta Aplicada

- Fondo principal: `#0a0805` (obsidiana).
- Fondo alterno: `#1a0f08` (espresso).
- Texto primario: `#f5e6c8` (latte cream).
- Texto secundario: `#e8d5b7` (opacity 60-80%).
- Acento: `#c9a84c` (dorado ceremonial).
- Borde sutil: `rgba(201,168,76,0.12-0.2)`.

### 5.4 Espaciado

- Secciones: `py-24 md:py-32 lg:py-40`.
- Contenido: `px-8 md:px-16 lg:px-24`.
- Máximo ancho de lectura: `max-w-5xl mx-auto` para texto; `max-w-[1600px]` para composición.

---

## 6 · ANIMATION SPECIFICATIONS

### 6.1 HeroShowcase (reemplaza HeroCanvas)

Es el corazón del sitio. Reemplaza el Canvas sintético por una secuencia de fotografías reales que:

1. **3-4 imágenes de café apiladas** en `position: absolute`.
2. El contenedor padre mide `300vh` — genera pista de scroll.
3. El contenedor hijo es `sticky top-0 h-screen`.
4. Cada imagen tiene una ventana de `scrollYProgress` donde está visible (ej. imagen A: 0-0.40, B: 0.30-0.70, C: 0.60-1.0) con solapamiento para crossfade suave.
5. **Transformaciones por scroll**:
   - `scale`: `1.15 → 1.0 → 0.92` según su fase (entra expandida, se estabiliza, se reduce al salir).
   - `opacity`: curva triangular `0 → 1 → 0` con suavizado cosenoidal.
   - Tint `filter: brightness() saturate()` dinámico.
6. **Texto superpuesto**: Huge typographic overlay (`OBSIDIAN / COFFEE`) con `mix-blend-mode: difference` o contraste sólido que:
   - Se desvanece con `opacity = 1 - progress * 2.5`.
   - Sube con `translateY(-progress * 80px)`.
7. **Al final (progress > 0.85)**: revela el tagline *"Crafted with obsession"* con CTA "Explore Menu".

**Fórmula de opacidad por imagen** (triangular con overlap `o`):

```
start = i / N - o
end   = (i + 1) / N + o
t = (p - start) / (end - start)
opacity = smoothstep(0, 1, min(2t, 2(1-t)))
```

### 6.2 ProductShowcase (scroll horizontal)

GSAP ScrollTrigger con `pin: true`, scroll vertical mapeado a traducción horizontal. Panel de introducción + 4 tarjetas con imagen real de producto (cover 3:4).

### 6.3 OriginStory (text reveal)

Pin + reveal palabra por palabra con `stagger: 0.04`. Imagen lateral fotográfica real (sacos de yute / granos verdes) con parallax sutil.

### 6.4 MenuGrid

Grid 3x3 con Framer Motion `staggerChildren: 0.07`. Cards con foto de fondo al 30% opacidad, hover eleva y satura la imagen.

### 6.5 ParallaxBanner

Imagen real a pantalla completa, parallax con GSAP (`yPercent: 25, scrub: true`), overlay oscuro, cita superpuesta.

---

## 7 · SECTIONS TO IMPLEMENT

| # | Sección | Técnica principal | Imagen clave |
|---|---|---|---|
| 1 | `Navbar` | `fixed`, glassmorphism, scroll-reactive | — |
| 2 | `HeroShowcase` | Crossfade de 3 fotos + scale-on-scroll | Vertido / granos / sacos |
| 3 | `ProductShowcase` | Horizontal scroll pinned (GSAP) | 4 tazas reales |
| 4 | `OriginStory` | Pin + stagger text reveal | Sacos de yute con granos |
| 5 | `ParallaxBanner` | Parallax background | Taza negra sobre granos |
| 6 | `MenuGrid` | Framer Motion stagger grid | 9 tarjetas con fondo foto |
| 7 | `Footer` | Newsletter + links | — |

---

## 8 · PHOTOGRAPHY DIRECTION

**Briefing (o selección Unsplash):**

- Iluminación cálida, low-key (luz lateral rasante).
- Tonos ámbar/caoba/crema dominantes.
- Texturas: granos tostados, vapor, leche vertida, yute, madera, cerámica mate.
- **Evitar**: cafés con sirope comerciales, latte art genérico, tazas blancas estándar de stock.
- Proporciones: vertical 3:4 para lateral, 16:9 para banners, 1:1 para cards.

**Formato URL**: `https://images.unsplash.com/{photo-id}?auto=format&fit=crop&w=1920&q=80`

---

## 9 · DELIVERABLES

1. **Código fuente Next.js** en la rama `claude/coffee-scroll-animation-t3NGh`.
2. **`prompt-engineering.md`** (este documento).
3. **Build exitoso** con `npm run build`.
4. **Responsive verificado** en 375px, 768px, 1440px.
5. **60fps durante scroll** en hardware moderno.

---

## 10 · CONSTRAINTS

- ❌ **No emojis** en la UI final.
- ❌ **No gradientes sintéticos** reemplazando imágenes en secciones clave.
- ❌ **No animaciones decorativas** sin propósito narrativo.
- ❌ **No mostrar loaders**: las imágenes críticas hacen preload.
- ✅ **Sí fotografía real** en cada bloque visual principal.
- ✅ **Sí whitespace generoso**: la respiración es parte del lujo.
- ✅ **Sí accesibilidad**: `alt` descriptivo, foco visible, `prefers-reduced-motion` respetado.

---

## 11 · PROMPT LISTO PARA USAR (copia y pega en Cursor / v0 / Claude Code)

```
ROLE: Senior Digital Art Director at a world-class innovation agency.

TASK: Build a premium one-page website for OBSIDIAN COFFEE — a fictional specialty coffee brand — using Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, GSAP 3, and Framer Motion 12.

SECTIONS (in order):
1. Floating glassmorphic Navbar (top-8, centered pill, backdrop-blur-xl, rounded-full, Order CTA pill).
2. HeroShowcase — sticky 300vh section with 3 real coffee photos that crossfade and scale with scroll. Huge typographic overlay "OBSIDIAN / COFFEE" that fades out. Reveals tagline + CTA at scroll end.
3. ProductShowcase — GSAP horizontal pin-scroll with 4 product cards, each with a real Unsplash photo (cover, 3:4).
4. OriginStory — pinned section with word-by-word text reveal (stagger 0.04) and a lateral 3:4 real photo of burlap coffee sacks.
5. ParallaxBanner — full-bleed real photo with GSAP parallax (yPercent: 25), brand quote overlaid.
6. MenuGrid — 9 cards grid with real product photography as soft backdrop, Framer Motion staggerChildren 0.07.
7. Footer — newsletter + links + social.

DESIGN RULES:
- Palette: obsidian #0a0805, cream #f5e6c8, gold #c9a84c, mahogany #4a2c1a.
- Fonts: Playfair Display (display) + Inter (body), loaded via next/font.
- Massive whitespace. Eyebrow labels with tracking-[0.5em] uppercase.
- Navbar NEVER touches the viewport edges — padding outside the pill and inside it.
- No emojis, no synthetic gradients in place of photos, no random blur.

TECHNICAL RULES:
- All interactive sections loaded via next/dynamic({ ssr: false }) from a "use client" page.
- suppressHydrationWarning on <html> and <body>.
- Use native <img> tags with Unsplash URLs (photo-XXXX?auto=format&fit=crop&w=1920&q=80) to avoid next/image remotePatterns config.
- Register GSAP plugins only on the client; clean up ScrollTriggers in useEffect return.
- Respect prefers-reduced-motion.

DELIVERABLE: the full codebase, ready to run with `npm run dev`.
```

---

**Fin del documento.** Ver `components/` para la implementación real de cada sección.
