# Implementační plán

- [x] Etapa 1 – základ projektu, dokumentace a nástroje
- [x] Etapa 2 – datový model, konfigurace, Zustand, ukládání a migrace
- [x] Etapa 3 – izometrické město, kamera, stavění, přesun, bourání a cesty
- [x] Etapa 4 – ekonomika, populace, spokojenost a absolutní časování
- [x] Etapa 5 – české herní UI, panely, dialogy, oznámení a přístupnost
- [x] Etapa 6 – technologie, výzkumné body a dvě epochy
- [x] Etapa 7 – osm úkolů a interaktivní tutorial
- [x] Etapa 8 – výcvik, tahový souboj a jednoduchá AI
- [x] Etapa 9 – mapa pěti provincií a odměny
- [x] Etapa 10 – zvuky, debug nástroje, testy, responzivita a build

## Datový model
Verzovaný `GameState` obsahuje zdroje, instance budov s produkčními timestampy, technologie, epochu, armádu a frontu výcviku, úkoly, provincie, tutorial a nastavení. Neměnný herní obsah je definovaný samostatně a instance na něj odkazují ID.
