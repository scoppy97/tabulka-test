# Pokyny pro vývoj

## Stack a příkazy
- Vite, React, TypeScript (`strict`), Phaser 3, Zustand, Vitest, Playwright, ESLint a Prettier.
- Instalace: `npm install`; vývoj: `npm run dev`; build: `npm run build`.
- Kontroly: `npm run typecheck`, `npm run lint`, `npm test`, `npm run test:e2e`.

## Architektura a pravidla
- `src/domain` obsahuje čistou, deterministickou herní logiku bez Reactu a Phaseru.
- `src/data` je jediný zdroj definic obsahu; hodnoty se nesmějí duplikovat v UI.
- `src/store` spravuje verzovaný Zustand stav a perzistenci. Stav se mění pouze akcemi store; časování používá absolutní timestampy.
- `src/game` obsahuje Phaser scény a adaptér. `src/ui` pouze prezentuje stav a volá akce.
- TypeScript musí zůstat strict, bez `any`; preferuj malé čisté funkce a diskriminované union typy.
- UI text patří do centralizované české lokalizace.
- Nepoužívej neověřené ani cizí externí assety; grafiku a zvuky vytvářej lokálně/programově.
- Před dokončením vždy spusť testy, lint, typecheck a produkční build.
