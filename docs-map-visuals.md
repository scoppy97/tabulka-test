# Vizuální systém mapy

## Struktura assetů

Do `src/assets/terrain`, `water`, `shorelines`, `trees`, `rocks`, `decorations` a `roads` patří budoucí lokální PNG/WebP. `src/assets/reference` je pouze místo pro interní, licenčně ověřené reference; dodaný koncept není součástí hry. Současné dočasné tvary jsou úsporně kreslené v CSS. Varianty terénu, stromů a kamenů, globální měřítko a jednotné jihovýchodní stíny definuje `src/assets/visuals.ts`.

## Deterministické dekorace

`src/domain/mapVisuals.ts` vybírá dekoraci hashem souřadnic, seedu a typu terénu. Dekorace se neukládají, nejsou interaktivní ani kolizní a po načtení se reprodukují. Herní zdrojové stromy a kameny zůstávají typy terénu, nikoli dekoracemi.

## Cesty a stavební režim

`roadConnectionAt` vytváří masku čtyř ortogonálních sousedů a vrací izolovanou cestu, konec, rovinu, roh, T nebo křižovatku. Renderer ji převede na CSS třídu; herní pravidla cest se nemění. `placementGridVisible` drží mřížku skrytou mimo aktivní stavební nástroj.

## Výměna za finální grafiku

Nové PNG nebo WebP vložte do příslušné složky, přidejte URL/klíč do definic ve `visuals.ts` a v CSS nahraďte pouze pozadí `.terrainTexture`, `.terrainDetail` či `.roadBuilding`. Souřadnice, footprinty, store ani ekonomiku není nutné měnit. Doporučené jsou malé atlasové textury a jedna animovaná vodní vrstva; zachovejte jednotný směr stínu z `SHADOWS`.
