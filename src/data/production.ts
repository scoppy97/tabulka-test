import type { EconomyResource } from "./resources";

export type ProductionRates = Partial<Record<EconomyResource, number>>;

/** Production per completed second, kept independent of every renderer. */
export const buildingProduction: Readonly<Record<string, ProductionRates>> = {
  townhall: { gold: 2, food: 1 },
  sawmill: { wood: 3 },
  quarry: { stone: 3 },
};
