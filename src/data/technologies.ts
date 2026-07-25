import type { Technology } from "../types";

/** Single source of truth for the research tree. Add future ages and nodes here. */
export const technologies: readonly Technology[] = [
  {
    id: "forestry",
    name: "Lesnictví",
    icon: "🌲",
    description:
      "Lepší nástroje a postupy zpřístupní dřevorubecký tábor 2. úrovně.",
    cost: { wood: 50, gold: 20 },
    seconds: 20,
    epoch: 1,
    requires: [],
    unlocks: ["Dřevorubecký tábor – úroveň 2"],
    x: 0,
    y: 0,
  },
  {
    id: "masonry",
    name: "Kamenictví",
    icon: "🧱",
    description: "Opracování kamene zpřístupní kamenolom 2. úrovně.",
    cost: { stone: 50, gold: 20 },
    seconds: 20,
    epoch: 1,
    requires: [],
    unlocks: ["Kamenolom – úroveň 2"],
    x: 1,
    y: 0,
  },
  {
    id: "agriculture",
    name: "Zemědělství",
    icon: "🌾",
    description: "Pěstování plodin zpřístupní základní farmu.",
    cost: { food: 40, gold: 20 },
    seconds: 20,
    epoch: 1,
    requires: [],
    unlocks: ["Farma (prozatímní)"],
    x: 2,
    y: 0,
  },
];

export const getTechnology = (id: string) =>
  technologies.find((technology) => technology.id === id);
