# Pitch Deck

A vertically scrolling pitch deck built with Next.js, optimized for both desktop and mobile.

## Features

- **All devices**: Full-viewport vertical swipe/scroll with snap points
- **Desktop**: Side dot navigation + keyboard (↑ ↓ or arrow keys)
- **Mobile**: Bottom progress bar with touch-friendly swipe
- **Reusable blocks**: Every UI element is a composable component in `src/components/blocks/`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Next.js app router
├── components/
│   ├── blocks/           # Reusable slide building blocks
│   ├── deck/             # Scroll container & navigation
│   └── pitch/            # Composed slides & content
└── lib/                  # Utilities
```

## Customizing Content

Edit `src/components/pitch/PitchSlides.tsx` to update slide content. Each slide composes reusable blocks from `src/components/blocks/`.

## Build

```bash
npm run build
npm start
```
