export type Resource = "gold" | "food" | "wood" | "stone" | "research";
export type Cost = Partial<Record<Resource, number>>;
export type Category =
  | "residential"
  | "production"
  | "goods"
  | "military"
  | "culture"
  | "road"
  | "decoration";
export interface BuildingDef {
  id: string;
  name: string;
  icon: string;
  category: Category;
  w: number;
  h: number;
  cost: Cost;
  population?: number;
  workers?: number;
  happiness?: number;
  requiresRoad?: boolean;
  epoch: 1 | 2;
  output?: { resource: Resource; amount: number; seconds: number };
  color: string;
  description: string;
}
export interface Building {
  id: string;
  type: string;
  x: number;
  y: number;
  readyAt?: number;
  production?: {
    startedAt: number;
    endsAt: number;
    resource: Resource;
    amount: number;
  };
}
export interface Resources {
  gold: number;
  food: number;
  wood: number;
  stone: number;
  research: number;
}
export interface UnitDef {
  id: string;
  name: string;
  icon: string;
  hp: number;
  attack: number;
  defense: number;
  range: number;
  move: number;
  cost: Cost;
  seconds: number;
  epoch: 1 | 2;
}
export interface Unit {
  id: string;
  type: string;
  hp: number;
}
export interface Technology {
  id: string;
  name: string;
  description: string;
  cost: number;
  epoch: 1 | 2;
  requires: string[];
  unlocks: string[];
  x: number;
  y: number;
  final?: boolean;
}
export interface Province {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  enemy: string[];
  reward: Cost;
  requires?: string;
}
export interface Quest {
  id: string;
  name: string;
  description: string;
  event: string;
  target: number;
  reward: Cost;
}
export type View = "city" | "tech" | "world" | "army" | "quests";
export interface GameData {
  version: 2;
  cityName: string;
  resources: Resources;
  buildings: Building[];
  researched: string[];
  epoch: 1 | 2;
  units: Unit[];
  training?: { type: string; endsAt: number };
  questProgress: Record<string, number>;
  claimedQuests: string[];
  conquered: string[];
  tutorialStep: number;
  tutorialDone: boolean;
  settings: { sound: boolean; speed: number };
  lastResearchAt: number;
  lastResourceAt: number;
}
