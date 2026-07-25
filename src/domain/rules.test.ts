import { describe, expect, it } from "vitest";
import {
  battleWinner,
  assignWorkforce,
  calculateDamage,
  canPlace,
  deserialize,
  eraReady,
  freshGame,
  happinessMultiplier,
  hasRequiredWorkers,
  occupied,
  produceResources,
  productionReady,
  roadConnected,
  serialize,
  techAvailable,
} from "./rules";
import { generateTerrain, terrainAt } from "./terrain";
describe("pravidla města", () => {
  const game = freshGame();
  it("eviduje obsazená pole", () =>
    expect(occupied(game.buildings).has("8,7")).toBe(true));
  it("odmítne překrytí a okraj", () => {
    expect(canPlace(game.buildings, "hut", 8, 7)).toBe(false);
    expect(canPlace(game.buildings, "hut", 19, 19)).toBe(false);
    expect(canPlace(game.buildings, "hut", 0, 0)).toBe(true);
  });
  it("projde souvislou síť cest", () =>
    expect(
      roadConnected(
        game.buildings.find((b) => b.id === "work1")!,
        game.buildings,
      ),
    ).toBe(true));
});
describe("ekonomika a čas", () => {
  it("vyrábí každou sekundu podle typu dokončené budovy", () => {
    const game = freshGame();
    expect(
      produceResources(game.resources, game.buildings, 2, Date.now()),
    ).toMatchObject({
      gold: game.resources.gold + 4,
      food: game.resources.food + 2,
      wood: game.resources.wood,
      stone: game.resources.stone,
    });
  });
  it("počítá stupně spokojenosti", () => {
    expect(happinessMultiplier(40)).toBe(0.7);
    expect(happinessMultiplier(95)).toBe(1.1);
    expect(happinessMultiplier(130)).toBe(1.2);
  });
  it("dokončí produkci podle absolutního času", () =>
    expect(productionReady(100, 101)).toBe(true));
});
describe("populace a pracovní síla", () => {
  it("přiděluje pracovníky automaticky v pořadí staveb", () => {
    const buildings = [
      { id: "home", type: "hut", x: 0, y: 0 },
      { id: "lumber", type: "sawmill", x: 3, y: 0 },
      { id: "quarry", type: "quarry", x: 6, y: 0 },
      { id: "farm", type: "farm", x: 9, y: 0 },
    ];
    const population = assignWorkforce(buildings);
    expect(population).toMatchObject({
      total: 5,
      employedWorkers: 5,
      availableWorkers: 0,
      workerAssignments: { lumber: 2, quarry: 2, farm: 1 },
    });
    expect(hasRequiredWorkers(buildings[1], population)).toBe(true);
    expect(hasRequiredWorkers(buildings[3], population)).toBe(false);
  });
  it("zastaví výrobu budovy bez potřebných pracovníků", () => {
    const game = freshGame();
    const buildings = [{ id: "lumber", type: "sawmill", x: 0, y: 0 }];
    const population = assignWorkforce(buildings);
    expect(
      produceResources(game.resources, buildings, 2, Date.now(), population)
        .wood,
    ).toBe(game.resources.wood);
  });
});
describe("postup a boj", () => {
  it("ověří technologii a epochu", () => {
    expect(techAvailable("tools", { researched: [], epoch: 1 })).toBe(true);
    expect(eraReady(["charter"])).toBe(true);
  });
  it("počítá kontrolovatelné poškození", () =>
    expect(calculateDamage(12, 10, 0)).toBe(7));
  it("určí vítěze", () =>
    expect(
      battleWinner([
        { side: "player", hp: 5 },
        { side: "enemy", hp: 0 },
      ]),
    ).toBe("player"));
});
it("serializuje a bezpečně načte hru", () => {
  const g = freshGame();
  expect(deserialize(serialize(g))?.cityName).toBe(g.cityName);
  expect(deserialize(serialize(g))?.resources).toEqual(g.resources);
  expect(deserialize(serialize(g))?.population).toEqual(g.population);
  expect(deserialize("{bad")).toBeNull();
});
describe("procedurální terén", () => {
  it("je deterministický a obsahuje všechny biomy", () => {
    const first = generateTerrain(42),
      second = generateTerrain(42);
    expect(first).toEqual(second);
    expect(new Set(first.map((tile) => tile.type))).toEqual(
      new Set(["grass", "fertile", "forest", "rock", "lake"]),
    );
  });
  it("zakáže stavbu na vodě i obsazeném poli", () => {
    const game = freshGame(),
      tiles = generateTerrain();
    const water = tiles.find((tile) => tile.type === "lake")!;
    expect(canPlace([], "road", water.x, water.y, undefined, tiles)).toBe(
      false,
    );
    expect(canPlace(game.buildings, "road", 8, 7, undefined, tiles)).toBe(
      false,
    );
    expect(terrainAt(tiles, 0, 0)?.type).toMatch(/grass|fertile/);
  });
});
