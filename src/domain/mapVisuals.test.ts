import { describe, expect, it } from "vitest";
import { freshGame, serialize } from "./rules";
import { treeVisualsAt } from "./mapVisuals";

describe("deterministic forest tree visuals", () => {
  it("returns exactly the same descriptors for the same map position and seed", () => {
    expect(treeVisualsAt(3, 14, 2, 417)).toEqual(treeVisualsAt(3, 14, 2, 417));
  });

  it("varies sprites, scale, or placement across coordinates", () => {
    const descriptors = Array.from({ length: 12 }, (_, x) =>
      treeVisualsAt(x, 14, x % 6, 417),
    );
    expect(
      new Set(descriptors.map((trees) => JSON.stringify(trees))).size,
    ).toBeGreaterThan(1);
  });

  it("always provides a main tree with bounded natural variation", () => {
    for (let x = 0; x < 20; x += 1) {
      const trees = treeVisualsAt(x, 3, x % 6, 417);
      const main = trees.find((tree) => tree.order === 1);
      expect(trees.length).toBeGreaterThanOrEqual(1);
      expect(main).toBeDefined();
      expect(main!.scale).toBeGreaterThanOrEqual(0.85);
      expect(main!.scale).toBeLessThanOrEqual(1.12);
      expect(main!.offsetX).toBeGreaterThanOrEqual(-8);
      expect(main!.offsetX).toBeLessThanOrEqual(8);
    }
  });

  it("does not add generated tree descriptors to saved game state", () => {
    treeVisualsAt(3, 14, 2, 417);
    expect(serialize(freshGame())).not.toMatch(/tree|sprite|visual/i);
  });
});
