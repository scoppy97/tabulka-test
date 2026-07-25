export type IllustratedBuildingType = "hut" | "workshop" | "townhall";

export interface BuildingVisualConfig {
  width: number;
  lift: number;
  label: string;
}

/** Purely presentational metadata; footprints and gameplay remain in data/content. */
export const BUILDING_VISUALS: Record<
  IllustratedBuildingType,
  BuildingVisualConfig
> = {
  hut: { width: 132, lift: 10, label: "Dům" },
  workshop: { width: 176, lift: 14, label: "Městská dílna" },
  townhall: { width: 224, lift: 22, label: "Radnice pokroku" },
};

export function hasBuildingVisual(
  type: string,
): type is IllustratedBuildingType {
  return type in BUILDING_VISUALS;
}
