# Friday Landing Page Design

## Overview

Single-page scrolling landing page for the Friday AI assistant, built with React + Vite + Chakra UI v3. Inspired by openclaw.ai's structure and developer-oriented aesthetic.

## Tech Stack

- React 19 + TypeScript + Vite 7
- Chakra UI v3 (dark/light dual mode)
- react-router-dom (reserved for future sub-pages)
- react-i18next (en/zh)
- normalize.css

## Page Structure

```
Navbar (fixed top, blur on scroll)
  → Hero
  → Features (6 cards grid)
  → Quick Start (tabbed code blocks)
  → Integrations (channel + provider logos)
  → Footer
```

## Sections

### Navbar
- Fixed top, transparent → backdrop blur on scroll
- Left: Friday logo
- Center: Features / Docs / GitHub anchor links
- Right: dark/light toggle + language switcher (EN/中文)
- Mobile: hamburger menu

### Hero
- Centered layout
- Title: "Thank God It's Friday"
- Subtitle: "Your Personal AI Assistant"
- CTAs: "Get Started" (scroll to Quick Start) + "GitHub" (external link)

### Features (6 cards)

| Card | Title | Description |
|------|-------|-------------|
| 1 | Multi-Channel | Telegram, Lark, HTTP API |
| 2 | Multi-LLM + Fallback | OpenAI, Anthropic, Gemini, Ollama, Qwen |
| 3 | Single Binary | One binary, cross-compile linux/darwin/windows |
| 4 | Sandbox Security | Tool call sandbox isolation |
| 5 | Skills System | Extensible behavior plugins |
| 6 | Easy Deploy | Docker / Go install, minutes to deploy |

- Desktop: 3x2 grid, Tablet: 2x3, Mobile: 1x6

### Quick Start
- Tabs: "Go Install" | "Docker"
- Code blocks with copy button
- Go: `go install github.com/tgifai/friday@latest && friday serve -c config.yaml`
- Docker: `docker run -v ./config.yaml:/app/config.yaml tgifai/friday`

### Integrations
- Two rows of logos
- Channels: Telegram, Lark, HTTP
- Providers: OpenAI, Anthropic, Gemini, Ollama, Qwen

### Footer
- Three columns: Product / Community / Project
- Bottom: Copyright + "Built by TGIF AI"

## File Structure

```
src/
  pages/
    Landing/
      index.tsx
      components/
        Hero.tsx
        Features.tsx
        QuickStart.tsx
        Integrations.tsx
  components/
    Navbar.tsx
    Footer.tsx
    LanguageSwitcher.tsx
    ui/
  i18n/
    locales/en.json
    locales/zh.json
```

## Design Decisions

- **Single-page scroll**: All sections on one page with anchor navigation. react-router reserved for future sub-pages (/docs, /blog).
- **Dual color mode**: Both dark and light modes carefully designed, user toggle via Chakra useColorMode.
- **Page-scoped components**: Landing-specific sections live under `pages/Landing/components/`. Only globally shared components (Navbar, Footer, LanguageSwitcher) in top-level `components/`.
- **i18n from day one**: All copy through `t()` function, en/zh JSON files.
- **Anchor scroll**: Native `id` + `scrollIntoView({ behavior: 'smooth' })`.
- **Responsive**: Follow Chakra UI default breakpoints.
