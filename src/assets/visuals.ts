/** Visual-only definitions. Nothing in this module affects placement or economy. */
export const TERRAIN_VARIANTS = [0, 1, 2, 3, 4, 5] as const;
export const TREE_VARIANTS = [
  { crown: "round", scale: 0.92, tone: "pine" },
  { crown: "wide", scale: 1.04, tone: "moss" },
  { crown: "tall", scale: 1.1, tone: "fir" },
  { crown: "split", scale: 0.96, tone: "fern" },
  { crown: "young", scale: 0.84, tone: "sage" },
] as const;
export const ROCK_VARIANTS = [
  { scale: 0.78, rotation: -8, tone: "warm" },
  { scale: 0.95, rotation: 5, tone: "slate" },
  { scale: 1.08, rotation: -3, tone: "moss" },
  { scale: 0.86, rotation: 11, tone: "pale" },
  { scale: 1, rotation: -12, tone: "granite" },
] as const;
export const DECORATION_TYPES = [
  "tuft",
  "flowers",
  "pebbles",
  "dry-patch",
  "bush",
  "branch",
  "reeds",
  "driftwood",
] as const;
export type DecorationType = (typeof DECORATION_TYPES)[number];
export const VISUAL_SCALE = { tileWidth: 64, tileHeight: 32 } as const;
export const SHADOWS = {
  direction: "south-east",
  offsetX: 8,
  offsetY: 10,
  color: "rgba(24, 31, 18, .32)",
} as const;
