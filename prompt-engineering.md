# Prompt de Ingeniería — Sitio Web de Café Premium con Animaciones de Scroll

> **Propósito:** Este documento es un prompt listo para usar en Cursor, Lovable, v0, Claude u otras herramientas de IA generativa. Describe con precisión profesional cómo reproducir una landing page de café premium con animaciones de scroll modernas.

---

## INSTRUCCIÓN PRINCIPAL

```
Eres un senior front-end engineer y creative director especializado en experiencias
interactivas de nivel Awwwards. Tu dominio incluye GSAP ScrollTrigger, animaciones
scroll-driven con Canvas API, y diseño web premium para marcas de lujo.

Construye una landing page completa para "OBSIDIAN COFFEE", una marca de café
specialty premium. La experiencia debe reproducir el nivel de polishment visual
de Apple.com, Onyx Coffee Lab, o Blue Bottle Coffee.
```

---

## ROL Y EXPERIENCIA REQUERIDA

```
ROLE: Senior Front-End Engineer + Creative Director
EXPERTISE:
- Next.js 14 (App Router) con TypeScript
- GSAP 3 + ScrollTrigger (scroll-driven animations)
- Canvas API (animación frame-by-frame estilo Apple)
- Framer Motion (micro-interacciones de UI)
- Tailwind CSS (sistema de diseño)
- Diseño premium dark-mode con paleta cálida

STANDARD: Producción real, sin placeholders, sin TODOs.
           Zero layout shift, 60fps en animaciones.
```

---

## IDENTIDAD DE MARCA

```
MARCA: OBSIDIAN COFFEE
TAGLINE: "Crafted with obsession."
PERSONALIDAD:
  - Sofisticado, minimalista, editorial — NO rústico ni acogedor
  - Dark premium: casi-negro con acentos dorados cálidos
  - Lenguaje visual: alto contraste, whitespace generoso, tipografía serif
  - Referencias: Onyx Coffee Lab, La Colombe, Blue Bottle (tier web)

AUDIENCIA OBJETIVO:
  - Edad 28-45, amantes del café specialty
  - Profesionales urbanos design-conscious
  - Juzgan una marca por la calidad de su web antes de probar el producto

PALETA DE COLORES:
  --bg-primary:    #0a0805   (casi-negro con subtono cálido)
  --bg-secondary:  #1a0f08   (superficies elevadas)
  --text-primary:  #f5e6c8   (crema cálido)
  --text-secondary:#e8d5b7   (texto secundario)
  --text-muted:    #8b5e3c   (captions, labels)
  --accent:        #c9a84c   (oro — CTA y highlights)
  --accent-hover:  #e8c76a   (hover states)
  --border:        rgba(201,168,76,0.2) (bordes sutiles)

TIPOGRAFÍA:
  - Display/Headings: Playfair Display (Google Fonts) — variantes italic para énfasis
  - Body/UI: Inter (Google Fonts) — weight 300 (body), 400 (UI), 500 (labels)

PRINCIPIO VISUAL: Cada píxel comunica exclusividad.
```

---

## STACK TECNOLÓGICO

```
FRAMEWORK: Next.js 14 con App Router
LENGUAJE: TypeScript estricto
ESTILOS: Tailwind CSS v4 + CSS custom properties en globals.css
ANIMACIONES:
  - GSAP 3 + ScrollTrigger: scroll horizontal, pin-scroll, parallax
  - Canvas API (vanilla): animación frame-by-frame en el hero
  - Framer Motion: micro-interacciones, hover effects, stagger reveals
FUENTES: Google Fonts (Playfair Display + Inter) via next/font

REGLAS DE RENDIMIENTO:
  - Solo animar transform y opacity (NUNCA width/height/top/left)
  - will-change: transform en elementos con GPU animation
  - Components con GSAP: "use client" + dynamic import con ssr: false
  - ease: "none" OBLIGATORIO en scrub animations (linear = fidelidad al scroll)
  - invalidateOnRefresh: true en todos los ScrollTrigger con valores dinámicos
```

---

## ESPECIFICACIONES POR SECCIÓN

### SECCIÓN 1: Hero Canvas (Animación Principal)
```
TÉCNICA: Canvas API — animación frame-by-frame (estilo Apple iPhone scroll)

COMPORTAMIENTO:
  - Canvas full-screen con position: sticky dentro de un contenedor 2× viewport height
  - Al hacer scroll dentro del hero zone (0–100vh scrollTop), el canvas dibuja
    progresivamente frames animados: index = Math.round(progress × (totalFrames-1))
  - El dibujo usa Canvas 2D API para renderizar:
    * Fondo oscuro con gradiente que evoluciona de negro puro a sepia cálido
    * Silueta de una taza de espresso que crece en tamaño y detalle
    * Vapor que sube (5 curvas bezier ondulantes)
    * Granos de café flotando hacia arriba
    * Resplandor ambiental radial desde la taza
  - Frame 0: pantalla completamente oscura con taza invisible
  - Frame 89 (final): taza completa, vapor visible, glow dorado

OVERLAYS:
  - Headline inicial ("Obsidian / Coffee") se desvanece al comenzar el scroll
  - Tagline final ("Crafted with / obsession.") aparece cuando progress > 0.75
  - Progress bar dorada en la parte inferior (width = scrollProgress × 100%)
  - Nav bar fija con logo y enlaces de navegación

HOOK: useCanvasScroll(canvasRef, totalFrames = 90)
  - useEffect con scroll listener (passive: true)
  - requestAnimationFrame para renderizado
  - Cleanup correcto de event listeners
```

### SECCIÓN 2: Product Showcase (Scroll Horizontal)
```
TÉCNICA: GSAP ScrollTrigger con pin: true

COMPORTAMIENTO:
  - Sección se ancla (pin) mientras el usuario hace scroll
  - El track flex se desliza horizontalmente: gsap.to(track, { x: -totalScroll })
  - scrub: 1.2 (lag suave y cinematográfico)
  - end: () => '+=' + totalScroll (dinámico para resize)
  - Primer panel: Panel introductorio con headline editorial y hint de dirección
  - Paneles 2-5: Tarjetas de producto con borde dorado sutil

CONTENIDO DE CADA TARJETA:
  - Número de índice (01, 02...) gigante en background con opacity: 0.05
  - Emoji del tipo de café (☕🥛🧊🫖)
  - Origen (ej: "Ethiopia · Yirgacheffe")
  - Nombre del producto
  - Descripción 2 líneas
  - Notas de cata como chips/tags
  - Precio en Playfair Display + botón "Order"

PRODUCTOS: Signature Espresso, Velvet Latte, Cold Brew Noir, Batch Ceremony
```

### SECCIÓN 3: Origin Story (Pin-Scroll con Text Reveal)
```
TÉCNICA: GSAP ScrollTrigger pin + word-by-word color animation

COMPORTAMIENTO:
  - Sección anclada mientras el texto se revela
  - 27 palabras del párrafo principal, cada una como <span class="word">
  - Al hacer scroll, cada palabra transiciona de:
    color: rgba(139,94,60,0.4) → color: var(--text-primary)
    opacity: 0.1 → opacity: 1
  - stagger: 0.04 aplicado con scrub: 0.8
  - Panel izquierdo: decoración visual (imagen sintética con CSS gradients)
  - Panel derecho: texto animado + párrafo de soporte

ESTADÍSTICAS (con animación scroll-reveal):
  - 12 Origin Countries
  - 48h Max Roast-to-Cup
  - 94° Brew Temperature
  - 28s Espresso Pull
  (Grid 2×2 en la parte inferior, borde dorado entre celdas)
```

### SECCIÓN 4: Parallax Banner (Separador Visual)
```
TÉCNICA: GSAP ScrollTrigger parallax + quote reveal

COMPORTAMIENTO:
  - Sección 70vh de altura
  - Background: div oversize (140% width/height) con CSS gradient premium
    que incluye anillos decorativos de café (circles con opacity: 0.04-0.06)
  - Background se mueve a 25% de la velocidad del scroll (yPercent: 25)
  - Cita de marca con fade-in + translateY al entrar al viewport

CONTENIDO:
  - Comilla decorativa gigante en Playfair Display (opacity: 0.2)
  - Quote: "Coffee is not a drink. It is a state of mind."
  - Atribución: "— Obsidian Coffee, Since 2019"
```

### SECCIÓN 5: Menu Grid (Framer Motion Stagger)
```
TÉCNICA: Framer Motion whileInView + staggerChildren

COMPORTAMIENTO:
  - Grid CSS: 1 col mobile, 2 col tablet, 3 col desktop
  - containerVariants: staggerChildren: 0.07
  - cardVariants: hidden { opacity: 0, y: 40 } → visible { opacity: 1, y: 0 }
  - duration: 0.6, ease: [0.22, 1, 0.36, 1] (exponential out)
  - Hover: whileHover scale 1.02 + gold underline que crece desde la izquierda
  - Cada card tiene una barra dorada bottom que se anima con scaleX: 0→1 en hover

ITEMS (9 en total, 3 categorías):
  Espresso: Ristretto, Lungo
  Milk: Flat White, Cortado
  Filter: V60 Pour-Over, AeroPress
  Cold: Nitro Cold Brew, Shakerato
  Seasonal: Honey Latte

  Cada item: category tag, nombre, descripción 1 línea, precio, "→ Add"
```

### SECCIÓN 6: Footer
```
ESTRUCTURA:
  - Newsletter CTA: headline 2 líneas + email input + botón "Subscribe"
  - Links grid: Brand description + 3 columnas (Coffee, Visit, Connect)
  - Social: botones IG/TW/YT como text-only con borde dorado sutil
  - Bottom bar: copyright + privacy/terms links

ANIMACIONES:
  - Newsletter section: fade-in stagger con Framer Motion whileInView
  - Hover en links: opacity 50% → 100%
  - Hover en social icons: border color → accent, text color → accent
```

---

## ARQUITECTURA DE ARCHIVOS

```
app/
├── layout.tsx          # Playfair Display + Inter via next/font, metadata SEO
├── page.tsx            # Composición: dynamic imports para HeroCanvas y ProductShowcase
└── globals.css         # CSS variables + Tailwind @theme inline

components/
├── HeroCanvas/
│   ├── index.tsx       # Canvas sticky + overlays + progress bar
│   └── useCanvasScroll.ts  # Hook: scroll listener → frame index → drawFrame()
├── ProductShowcase/
│   └── index.tsx       # GSAP horizontal scroll con pin
├── OriginStory/
│   └── index.tsx       # GSAP pin + word color animation
├── MenuGrid/
│   └── index.tsx       # Framer Motion stagger grid
├── ParallaxBanner/
│   └── index.tsx       # GSAP parallax + quote
└── Footer/
    └── index.tsx       # Newsletter + links + bottom bar

lib/
└── gsap.ts             # Registro seguro de plugins (singleton, solo client)
```

---

## REGLAS CRÍTICAS DE IMPLEMENTACIÓN

```
SCROLL ANIMATIONS:
  1. ease: "none" SIEMPRE en animaciones con scrub (no-negociable)
  2. invalidateOnRefresh: true en todos los ScrollTrigger con end dinámico
  3. GSAP solo en "use client" components, registrar plugins en singleton
  4. dynamic import con ssr: false para componentes con GSAP o Canvas

CANVAS:
  5. Canvas debe redimensionarse en window resize con listener passive
  6. Usar requestAnimationFrame para renderizado (nunca draw sync)
  7. drawFrame() debe ser pura: recibe ctx + frame data, no accede a state

PERFORMANCE:
  8. No animar width/height/top/left — SOLO transform y opacity
  9. will-change: transform en Canvas y elementos de scroll horizontal
  10. Cleanup completo en useEffect return: removeEventListener + cancelAnimationFrame

NEXT.JS:
  11. Componentes con GSAP: "use client" + dynamic(() => import(...), { ssr: false })
  12. Fuentes: next/font/google, no @import en CSS
  13. Metadata completa en layout.tsx (title, description, openGraph)
```

---

## TESTING Y VERIFICACIÓN

```bash
# Desarrollo
npm run dev           # Servidor en localhost:3000

# Verificación de build
npm run build         # No debe haber errores TypeScript ni de build

# Checklist manual:
□ Canvas: al hacer scroll lentamente en el hero, los frames se animan suavemente
□ Canvas: al hacer scroll hacia arriba, los frames se revierten
□ Horizontal: las tarjetas de producto se desplazan al hacer scroll en esa sección
□ Horizontal: el pin se libera cuando el último panel está completamente visible
□ OriginStory: las palabras cambian de color una a una al hacer scroll
□ Parallax: el fondo del banner se mueve más lento que el scroll
□ MenuGrid: las cards aparecen con stagger al entrar al viewport
□ Footer: el newsletter y los links se revelan con fade-in
□ Responsive: funciona correctamente en 375px (mobile) y 1440px (desktop)
□ No hay console errors en ninguna sección
```

---

## NOTAS DE EXTENSIÓN

Para añadir video real en lugar del Canvas generativo:

```
Reemplaza HeroCanvas con una versión que usa <video>:
  - <video muted playsinline preload="auto"> con src de tu video
  - En useCanvasScroll, cambia el canvas por scrubbing de video:
    video.currentTime = progress * video.duration
  - FFmpeg para encoding óptimo de scrubbing:
    ffmpeg -i input.mp4 -vf scale=1920:-1 -movflags faststart
           -vcodec libx264 -profile:v baseline -crf 22 -g 2
           -pix_fmt yuv420p -an hero-scrub.mp4
  - iOS Safari fallback: video.play().then(() => video.pause())
    antes del scroll listener para "desbloquear" el decoder
```

---

*Generado con Claude Code — Anthropic. Branch: claude/coffee-scroll-animation-t3NGh*
