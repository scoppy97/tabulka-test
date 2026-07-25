export type TerrainType = "grass" | "fertile" | "forest" | "rock" | "water";

export interface TerrainTile {
  x: number;
  y: number;
  type: TerrainType;
  variant: number;
}

export const TERRAIN_SIZE = 20;

function hash(x: number, y: number, seed: number) {
  let value = Math.imul(x + seed, 374761393) + Math.imul(y - seed, 668265263);
  value = (value ^ (value >>> 13)) * 1274126177;
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
}

function noise(x: number, y: number, seed: number) {
  let total = hash(x, y, seed) * 0.5;
  total += hash(Math.floor(x / 2), Math.floor(y / 2), seed + 17) * 0.32;
  total += hash(Math.floor(x / 4), Math.floor(y / 4), seed + 41) * 0.18;
  return total;
}

function terrainAt(x: number, y: number, seed: number): TerrainType {
  // The established settlement and the E2E construction corner remain buildable.
  if ((x >= 4 && x <= 15 && y >= 4 && y <= 12) || (x <= 3 && y <= 3)) {
    return noise(x, y, seed + 5) > 0.66 ? "fertile" : "grass";
  }

  const elevation = noise(x, y, seed);
  const moisture = noise(x + 31, y - 19, seed + 97);
  if (elevation < 0.27 && moisture > 0.48) return "water";
  if (elevation > 0.76) return "rock";
  if (moisture > 0.67 && elevation < 0.7) return "forest";
  if (moisture > 0.48) return "fertile";
  return "grass";
}

export function generateTerrain(
  seed = 1847,
  size = TERRAIN_SIZE,
): TerrainTile[] {
  return Array.from({ length: size * size }, (_, index) => {
    const x = index % size;
    const y = Math.floor(index / size);
    return {
      x,
      y,
      type: terrainAt(x, y, seed),
      variant: Math.floor(hash(x, y, seed + 211) * 4),
    };
  });
}

export const cityTerrain = generateTerrain();

export function getTerrain(x: number, y: number) {
  return cityTerrain[y * TERRAIN_SIZE + x];
}

export function isBuildableTerrain(type: TerrainType) {
  return type === "grass" || type === "fertile";
}

export function isFootprintBuildable(
  x: number,
  y: number,
  width: number,
  height: number,
) {
  for (let tileX = x; tileX < x + width; tileX += 1) {
    for (let tileY = y; tileY < y + height; tileY += 1) {
      const tile = getTerrain(tileX, tileY);
      if (!tile || !isBuildableTerrain(tile.type)) return false;
    }
  }
  return true;
}
