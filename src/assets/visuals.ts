import fir01 from "./trees/fir-01.svg";
import pine01 from "./trees/pine-01.svg";
import pine02 from "./trees/pine-02.svg";
import youngPine01 from "./trees/young-pine-01.svg";

/** Visual-only definitions. Nothing in this module affects placement or economy. */
export const TERRAIN_VARIANTS = [0, 1, 2, 3, 4, 5] as const;
export const TREE_VARIANTS = [
  {
    id: "pine-01",
    src: pine01,
    baseWidth: 72,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "pine-02",
    src: pine02,
    baseWidth: 78,
    scale: 0.96,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "fir-01",
    src: fir01,
    baseWidth: 82,
    scale: 1.04,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "young-pine-01",
    src: youngPine01,
    baseWidth: 58,
    scale: 0.88,
    offsetX: 0,
    offsetY: 0,
  },
] as const;
export type TreeVariant = (typeof TREE_VARIANTS)[number];
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
