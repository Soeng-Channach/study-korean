# Korean TOPIK II Learning PWA

Frontend-only React PWA for TOPIK II grammar, reading, vocabulary quizzes, mock tests, progress tracking, bookmarks, dark/light mode, and offline study.

## Stack

- React + Vite
- React Router
- Context API + `useReducer`
- Tailwind CSS
- `vite-plugin-pwa`
- IndexedDB through `idb`
- Local storage for theme preference

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Architecture

- `src/app`: app shell, providers, routes
- `src/components`: reusable layout, UI, and learning components
- `src/context`: theme and learning state
- `src/data`: bundled offline mock learning data
- `src/features`: page-level feature modules
- `src/hooks`: reusable browser and page hooks
- `src/lib`: constants, SEO helpers, IndexedDB helpers

## PWA Notes

The production build generates a service worker and manifest. Run `npm run build` and `npm run preview` to test installability and offline behavior.
