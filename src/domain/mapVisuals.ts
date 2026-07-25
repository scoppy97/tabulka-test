import { DECORATION_TYPES, type DecorationType } from "../assets/visuals";
import type { Building } from "../types";
import type { TerrainType } from "./terrain";

const hash = (x: number, y: number, seed: number, salt = 0) => {
  let value =
    Math.imul(x + seed + salt, 374761393) + Math.imul(y - seed, 668265263);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return (value ^ (value >>> 16)) >>> 0;
};

/** Stable visual-only ground dressing, regenerated rather than persisted. */
export function decorationAt(
  x: number,
  y: number,
  terrain: TerrainType,
  seed = 417,
): DecorationType | undefined {
  const value = hash(x, y, seed);
  if (value % 100 > (terrain === "forest" || terrain === "rock" ? 72 : 38))
    return undefined;
  if (terrain === "lake")
    return value % 4 === 0
      ? "reeds"
      : value % 9 === 0
        ? "driftwood"
        : undefined;
  if (terrain === "forest")
    return (["bush", "branch", "dry-patch", "pebbles"] as const)[value % 4];
  if (terrain === "rock") return value % 3 === 0 ? "dry-patch" : "pebbles";
  return DECORATION_TYPES[value % 4];
}

export type RoadConnection =
  | "isolated"
  | "end-n"
  | "end-e"
  | "end-s"
  | "end-w"
  | "straight-h"
  | "straight-v"
  | "corner-ne"
  | "corner-es"
  | "corner-sw"
  | "corner-wn"
  | "t-n"
  | "t-e"
  | "t-s"
  | "t-w"
  | "cross";

export function roadConnectionAt(
  x: number,
  y: number,
  buildings: Building[],
): RoadConnection {
  const roads = new Set(
    buildings.filter((b) => b.type === "road").map((b) => `${b.x},${b.y}`),
  );
  const n = roads.has(`${x},${y - 1}`),
    e = roads.has(`${x + 1},${y}`),
    s = roads.has(`${x},${y + 1}`),
    w = roads.has(`${x - 1},${y}`);
  const count = Number(n) + Number(e) + Number(s) + Number(w);
  if (count === 4) return "cross";
  if (count === 3) return !n ? "t-s" : !e ? "t-w" : !s ? "t-n" : "t-e";
  if (count === 2) {
    if (e && w) return "straight-h";
    if (n && s) return "straight-v";
    if (n && e) return "corner-ne";
    if (e && s) return "corner-es";
    if (s && w) return "corner-sw";
    return "corner-wn";
  }
  if (count === 1) return n ? "end-n" : e ? "end-e" : s ? "end-s" : "end-w";
  return "isolated";
}

export const placementGridVisible = (placing?: string) => placing !== undefined;
