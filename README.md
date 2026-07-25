# Chronicles of Progress

Původní český vertikální prototyp strategické městské hry. Hráč spravuje izometrické město, rozvíjí ekonomiku, objevuje technologie, cvičí hlídku a dobývá pět provincií v tahových bitvách. Vizuály jsou programové (CSS/DOM a vlastní symbolika), bez převzatých komerčních assetů.

## Funkce

- Deterministická procedurální izometrická mapa 20×20 s loukami, úrodnou půdou, lesy, skalami a jezery.
- Plynulá kamera s tažením, WASD, posunem u okrajů obrazovky, zoomem a barevným náhledem celého půdorysu stavby.
- Dvanáct datově definovaných budov, skutečné vyhledání cesty k radnici, populace a čtyři stupně spokojenosti.
- Ruční časovaná produkce, tři směny dílny, absolutní timestampy a offline dokončení.
- Deset technologií ve dvou epochách, automatická obnova výzkumných bodů a slavnostní postup.
- Tři jednotky, časovaný výcvik a hratelná 8×6 tahová bitva s jednoduchou AI.
- Pět navazujících provincií, osm úkolů s ručními odměnami a šestikrokový český tutorial.
- Verzované automatické ukládání v `localStorage`, validovaný import, export, reset, zvuky Web Audio a vývojový panel F2.
- Česká lokalizace, klávesové zkratky, responzivní panely a React Error Boundary.
- Moderní desktopové rozhraní s jednotnou fantasy paletou, vlastní sadou SVG ikon, profesionálními tooltipy a jemnými přechody.

## Stack a požadavky

Vite, React, TypeScript strict, Phaser 3 (scénový adaptér), Zustand, Vitest, Playwright, ESLint a Prettier. Je potřeba Node.js 20+ a npm.

## Instalace a spuštění

```bash
npm install
npm run dev
```

V prohlížeči otevřete adresu vypsanou Vitem (standardně `http://localhost:5173`).

## Kontroly

```bash
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

## Ovládání

Myší táhněte prázdnou plochu, kolečkem měňte zoom. Kliknutí vybírá budovu či pole. Pravé tlačítko a `Escape` ruší stavbu. `B` otevře stavění, `T` technologie, `M` mapu, `Q` úkoly a `Delete` po potvrzení bourá. Ve vývojovém režimu otevře `F2` debug panel.

## Struktura projektu

- `src/data` – neměnný obsah budov, technologií, jednotek, provincií a úkolů.
- `src/domain` – čistá pravidla mřížky, procedurálního terénu, cest, ekonomiky, postupu, boje a serializace.
- `src/store` – Zustand akce, časovače a verzovaná perzistence.
- `src/game` – Phaser adaptéry scén města a bitvy.
- `src/ui` – React obrazovky, herní interakce a vlastní SVG komponenty.
- `src/styles` – návrhové tokeny a oddělené styly shellu, města, obrazovek a překryvů; `src/styles.css` je jejich vstupní bod.
- `tests` – Playwright hlavní tok; doménové testy leží u pravidel.

## Ukládání

Hra ukládá důležité akce, každých deset sekund a před zavřením. Data pod klíčem `chronicles-progress-save-v1` mají verzi 1. Neplatný import je odmítnut českým oznámením. Formát je oddělen od úložiště, takže lze později přidat serverový adaptér.

## Známá omezení prototypu

Phaser scény slouží jako připravený adaptér, zatímco úsporné město a bojiště vykresluje DOM/CSS. Výcvik má jednu frontu, bojová AI používá přímočaré přiblížení a mapa nemá diplomacii. Zvuk tvoří krátký syntetický efekt bez hudební kulisy. Mobilní ovládání není cílové.

## Jak pokračovat ve vývoji

Doplnit backend a účty se synchronizací uložené hry, obchodování a cechy, asynchronní PvP, více epoch a rozvětvené technologie, pokročilejší terén a taktiku bitev, profesionální původní assety, plnou zvukovou kulisu a dotykové mobilní ovládání.
