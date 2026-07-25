import { describe, expect, it } from "vitest";
import {
  cityTerrain,
  generateTerrain,
  isBuildableTerrain,
  isFootprintBuildable,
} from "./terrain";

describe("procedurální terén", () => {
  it("je deterministický a obsahuje všechny přírodní biomy", () => {
    expect(generateTerrain(1847)).toEqual(cityTerrain);
    const types = new Set(cityTerrain.map((tile) => tile.type));
    expect(types).toEqual(
      new Set(["grass", "fertile", "forest", "rock", "water"]),
    );
  });

  it("povolí stavbu jen na travnatém terénu", () => {
    expect(isBuildableTerrain("grass")).toBe(true);
    expect(isBuildableTerrain("fertile")).toBe(true);
    expect(isBuildableTerrain("forest")).toBe(false);
    expect(isBuildableTerrain("rock")).toBe(false);
    expect(isBuildableTerrain("water")).toBe(false);
    expect(isFootprintBuildable(8, 7, 4, 4)).toBe(true);
  });
});
