import type { Cost, Resource } from "../types";

export const resourceIds = ["wood", "stone", "food", "gold"] as const;
export type EconomyResource = (typeof resourceIds)[number];

export interface ResourceDefinition {
  id: EconomyResource;
  name: string;
  icon: string;
}

export const resourceDefinitions: readonly ResourceDefinition[] = [
  { id: "wood", name: "Dřevo", icon: "🪵" },
  { id: "stone", name: "Kámen", icon: "🪨" },
  { id: "food", name: "Jídlo", icon: "🌾" },
  { id: "gold", name: "Zlato", icon: "🪙" },
];

export const formatCost = (cost: Cost) =>
  resourceDefinitions
    .filter(({ id }) => (cost[id] ?? 0) > 0)
    .map(({ id, icon, name }) => `${icon} ${cost[id]} ${name}`)
    .join(" · ") || "Zdarma";

export const isEconomyResource = (value: Resource): value is EconomyResource =>
  resourceIds.some((id) => id === value);
