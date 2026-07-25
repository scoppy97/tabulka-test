import { getBuilding, technologies } from "../data/content";
import type { Building, Cost, GameData, Resources, Unit } from "../types";
import { isFootprintBuildable } from "./terrain";
export const MAP_SIZE = 20;
export function occupied(buildings: Building[], ignore?: string) {
  const cells = new Set<string>();
  for (const b of buildings) {
    if (b.id === ignore) continue;
    const d = getBuilding(b.type);
    for (let x = b.x; x < b.x + d.w; x++)
      for (let y = b.y; y < b.y + d.h; y++) cells.add(`${x},${y}`);
  }
  return cells;
}
export function canPlace(
  buildings: Building[],
  type: string,
  x: number,
  y: number,
  ignore?: string,
) {
  const d = getBuilding(type);
  if (
    x < 0 ||
    y < 0 ||
    x + d.w > MAP_SIZE ||
    y + d.h > MAP_SIZE ||
    !isFootprintBuildable(x, y, d.w, d.h)
  )
    return false;
  const cells = occupied(buildings, ignore);
  for (let xx = x; xx < x + d.w; xx++)
    for (let yy = y; yy < y + d.h; yy++)
      if (cells.has(`${xx},${yy}`)) return false;
  return true;
}
export function roadConnected(building: Building, all: Building[]) {
  const d = getBuilding(building.type);
  if (!d.requiresRoad) return true;
  const roads = new Set(
    all.filter((b) => b.type === "road").map((b) => `${b.x},${b.y}`),
  );
  const hall = all.find((b) => b.type === "townhall");
  if (!hall) return false;
  const hd = getBuilding("townhall");
  const queue: string[] = [];
  for (const r of roads) {
    const [x, y] = r.split(",").map(Number);
    if (
      x >= hall.x - 1 &&
      x <= hall.x + hd.w &&
      y >= hall.y - 1 &&
      y <= hall.y + hd.h
    )
      queue.push(r);
  }
  const seen = new Set(queue);
  while (queue.length) {
    const p = queue.shift()!;
    const [x, y] = p.split(",").map(Number);
    if (
      x >= building.x - 1 &&
      x <= building.x + d.w &&
      y >= building.y - 1 &&
      y <= building.y + d.h
    )
      return true;
    for (const [nx, ny] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      const k = `${nx},${ny}`;
      if (roads.has(k) && !seen.has(k)) {
        seen.add(k);
        queue.push(k);
      }
    }
  }
  return false;
}
export const happinessMultiplier = (h: number) =>
  h < 50 ? 0.7 : h < 90 ? 1 : h < 120 ? 1.1 : 1.2;
export function demographics(buildings: Building[]) {
  let total = 0,
    used = 0,
    happy = 0;
  for (const b of buildings) {
    const d = getBuilding(b.type);
    total += d.population ?? 0;
    used += d.workers ?? 0;
    happy += d.happiness ?? 0;
  }
  const happiness = Math.round(Math.min(150, 100 + (happy - used * 2)));
  return { total, used, happiness, multiplier: happinessMultiplier(happiness) };
}
export const canAfford = (r: Resources, c: Cost) =>
  Object.entries(c).every(([k, v]) => r[k as keyof Resources] >= (v ?? 0));
export function applyCost(r: Resources, c: Cost, factor = -1) {
  const n = { ...r };
  for (const [k, v] of Object.entries(c))
    n[k as keyof Resources] += factor * (v ?? 0);
  return n;
}
export function calculateDamage(attack: number, defense: number, variance = 0) {
  return Math.max(
    1,
    Math.round(attack - defense * 0.5 + Math.max(-2, Math.min(2, variance))),
  );
}
export const battleWinner = (
  units: { side: "player" | "enemy"; hp: number }[],
) =>
  units.some((u) => u.side === "player" && u.hp > 0) &&
  units.some((u) => u.side === "enemy" && u.hp > 0)
    ? null
    : units.some((u) => u.side === "player" && u.hp > 0)
      ? "player"
      : "enemy";
export const productionReady = (endsAt: number, now = Date.now()) =>
  now >= endsAt;
export function techAvailable(
  id: string,
  state: Pick<GameData, "researched" | "epoch">,
) {
  const t = technologies.find((x) => x.id === id);
  return (
    !!t &&
    t.epoch <= state.epoch &&
    !state.researched.includes(id) &&
    t.requires.every((r) => state.researched.includes(r))
  );
}
export const eraReady = (researched: string[]) =>
  researched.includes("charter");
export function serialize(data: GameData) {
  return JSON.stringify(data);
}
export function deserialize(raw: string): GameData | null {
  try {
    const d = JSON.parse(raw) as Partial<GameData>;
    if (d.version !== 1 || !d.resources || !Array.isArray(d.buildings))
      return null;
    return d as GameData;
  } catch {
    return null;
  }
}
export function freshGame(name = "Nová naděje"): GameData {
  const now = Date.now();
  const starter: Building[] = [
    { id: "hall", type: "townhall", x: 8, y: 7, readyAt: now - 1 },
    { id: "home1", type: "hut", x: 5, y: 6, readyAt: now - 1 },
    { id: "home2", type: "hut", x: 5, y: 9, readyAt: now - 1 },
    { id: "work1", type: "workshop", x: 12, y: 6, readyAt: now - 1 },
    { id: "road1", type: "road", x: 8, y: 11 },
    { id: "road2", type: "road", x: 9, y: 11 },
    { id: "road3", type: "road", x: 10, y: 11 },
    { id: "road4", type: "road", x: 11, y: 11 },
    { id: "road5", type: "road", x: 12, y: 11 },
    { id: "statue1", type: "statue", x: 7, y: 5 },
    { id: "statue2", type: "statue", x: 12, y: 10 },
  ];
  return {
    version: 1,
    cityName: name,
    resources: {
      coins: 1000,
      supplies: 500,
      wood: 150,
      stone: 100,
      research: 3,
    },
    buildings: starter,
    researched: [],
    epoch: 1,
    units: [{ id: "starter-scout", type: "scout", hp: 34 }],
    questProgress: {},
    claimedQuests: [],
    conquered: [],
    tutorialStep: 0,
    tutorialDone: false,
    settings: { sound: true, speed: 1 },
    lastResearchAt: now,
  };
}
export function makeUnit(type: string, id = crypto.randomUUID()): Unit {
  const d = awaitUnit(type);
  return { id, type, hp: d.hp };
}
function awaitUnit(type: string) {
  return (
    (
      { spear: { hp: 42 }, archer: { hp: 28 }, scout: { hp: 34 } } as Record<
        string,
        { hp: number }
      >
    )[type] ?? { hp: 30 }
  );
}
