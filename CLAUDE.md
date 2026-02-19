# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

tgif.sh is the **landing page** for the Friday AI assistant (similar to OpenClaw). It's a pure frontend project built with React + TypeScript + Vite + Chakra UI v3, showcasing Friday's features and capabilities.

## Build & Dev

```bash
# Install dependencies
npm install

# Dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build**: Vite 7
- **UI Library**: Chakra UI v3 (`@chakra-ui/react`)
- **Styling**: Emotion (via Chakra UI)
- **Color Mode**: next-themes (via Chakra UI provider)

## Project Structure

```
src/
  main.tsx           # App entry, wraps with Chakra Provider
  App.tsx            # Root component
  components/
    ui/              # Chakra UI snippets (auto-generated via @chakra-ui/cli)
```

## Coding Conventions

- Use `@/` path alias for imports from `src/` (e.g., `import { Provider } from '@/components/ui/provider'`).
- Chakra UI snippets in `src/components/ui/` are auto-generated — do not manually edit them. Regenerate with `npx @chakra-ui/cli snippet add --all --force`.
- Use Chakra UI components and style props for all layout and styling. Do not use raw CSS files.
- Functional components only; no class components.

## Related Projects

- **friday** — The AI assistant backend that this landing page promotes.
- **friday-sandbox** — Sandbox execution environment for friday's tool calls.
