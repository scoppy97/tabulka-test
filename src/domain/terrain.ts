export const MAP_SIZE = 20;

export type TerrainType = "grass" | "fertile" | "forest" | "rock" | "lake";

export interface TerrainTile {
  x: number;
  y: number;
  type: TerrainType;
  variant: number;
}

const hash = (x: number, y: number, seed: number) => {
  let value = Math.imul(x + seed, 374761393) + Math.imul(y - seed, 668265263);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
};

const distance = (x: number, y: number, cx: number, cy: number) =>
  Math.hypot(x - cx, y - cy);

/** Deterministic map generation: clustered biomes with a buildable starting clearing. */
export function generateTerrain(seed = 417): TerrainTile[] {
  const tiles: TerrainTile[] = [];
  for (let y = 0; y < MAP_SIZE; y += 1) {
    for (let x = 0; x < MAP_SIZE; x += 1) {
      const variation = hash(x, y, seed);
      const forest = Math.min(distance(x, y, 3, 14), distance(x, y, 16, 3));
      const rock = Math.min(distance(x, y, 2, 5), distance(x, y, 17, 14));
      const lake = distance(x, y, 15, 8 + Math.sin(x * 0.8));
      const protectedStart = x <= 2 && y <= 2;
      const cityClearing = x >= 4 && x <= 15 && y >= 4 && y <= 13;
      const roadClearing = y === 11 && x >= 7 && x <= 13;

      let type: TerrainType = variation > 0.67 ? "fertile" : "grass";
      if (!protectedStart && !cityClearing && lake < 2.15 + variation * 0.45)
        type = "lake";
      else if (
        !protectedStart &&
        !cityClearing &&
        rock < 2.25 + variation * 0.8
      )
        type = "rock";
      else if (
        !protectedStart &&
        !cityClearing &&
        forest < 3.2 + variation * 0.9
      )
        type = "forest";
      else if (cityClearing && !roadClearing && variation > 0.76)
        type = "fertile";

      // Six visual variants break up repetition without changing biome rules.
      tiles.push({ x, y, type, variant: Math.floor(variation * 6) });
    }
  }
  return tiles;
}

export const terrain = generateTerrain();

export const terrainAt = (tiles: TerrainTile[], x: number, y: number) =>
  tiles[y * MAP_SIZE + x];

export const isBuildableTerrain = (type: TerrainType) =>
  type === "grass" || type === "fertile";
