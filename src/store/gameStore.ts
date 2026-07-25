import { create } from "zustand";
import {
  buildings as defs,
  getBuilding,
  getUnit,
  quests,
} from "../data/content";
import { technologies } from "../data/technologies";
import {
  applyCost,
  assignWorkforce,
  canAfford,
  canPlace,
  demographics,
  deserialize,
  eraReady,
  freshGame,
  hasRequiredWorkers,
  productionReady,
  produceResources,
  roadConnected,
  serialize,
  techAvailable,
} from "../domain/rules";
import type { Building, GameData, Resource, View } from "../types";
const KEY = "chronicles-progress-save-v1";
const loaded =
  typeof localStorage === "undefined"
    ? null
    : deserialize(localStorage.getItem(KEY) ?? "");
interface Store extends GameData {
  view: View;
  selected?: string;
  placing?: string;
  notice: string;
  settingsOpen: boolean;
  epochCelebration: boolean;
  battleProvince?: string;
  actions: {
    save: () => void;
    newGame: (n: string) => void;
    setView: (v: View) => void;
    select: (id?: string) => void;
    placeMode: (type?: string) => void;
    place: (type: string, x: number, y: number) => boolean;
    move: (id: string, x: number, y: number) => boolean;
    demolish: (id: string) => void;
    startProduction: (id: string, seconds?: number) => void;
    collect: (id: string) => void;
    research: (id: string) => void;
    cancelResearch: () => void;
    advanceEra: () => void;
    train: (type: string) => void;
    tick: () => void;
    event: (name: string) => void;
    claimQuest: (id: string) => void;
    setSettingsOpen: (v: boolean) => void;
    setSound: (v: boolean) => void;
    setSpeed: (v: number) => void;
    skipTutorial: () => void;
    nextTutorial: () => void;
    importSave: (raw: string) => boolean;
    reset: () => void;
    startBattle: (id: string) => void;
    winBattle: (id: string) => void;
    closeBattle: () => void;
    debug: () => void;
  };
}
const persist = (s: Store) => localStorage.setItem(KEY, serialize(s));
const base = loaded ?? freshGame();
export const useGame = create<Store>((set, get) => ({
  ...base,
  view: "city",
  notice: "",
  settingsOpen: false,
  epochCelebration: false,
  actions: {
    save: () => {
      persist(get());
      set({ notice: "Hra byla uložena." });
    },
    newGame: (n) => set({ ...freshGame(n), notice: "Vítej, správce města!" }),
    setView: (view) => set({ view, placing: undefined, selected: undefined }),
    select: (selected) => set({ selected }),
    placeMode: (placing) => set({ placing, view: "city" }),
    place: (type, x, y) => {
      const s = get(),
        d = getBuilding(type);
      if (type === "townhall" && s.buildings.some((b) => b.type === type)) {
        set({ notice: "Radnice je zdarma pouze jako počáteční budova." });
        return false;
      }
      if (!canPlace(s.buildings, type, x, y)) {
        set({ notice: "Na tomto místě nelze stavět." });
        return false;
      }
      if (d.epoch > s.epoch || !canAfford(s.resources, d.cost)) {
        set({ notice: "Nedostatek zdrojů." });
        return false;
      }
      if (
        d.requiredTechnology &&
        !s.researched.includes(d.requiredTechnology)
      ) {
        set({ notice: "Budovu musí nejprve odemknout výzkum." });
        return false;
      }
      const b: Building = {
        id: crypto.randomUUID(),
        type,
        x,
        y,
        readyAt: Date.now() + 1500,
      };
      const buildings = [...s.buildings, b];
      set({
        resources: applyCost(s.resources, d.cost),
        buildings,
        population: assignWorkforce(buildings),
        selected: b.id,
        placing: undefined,
        notice: `${d.name}: stavba zahájena.`,
      });
      get().actions.event(
        d.category === "residential"
          ? "buildResidential"
          : type === "workshop"
            ? "buildWorkshop"
            : type === "road"
              ? "buildRoad"
              : "build",
      );
      persist(get());
      return true;
    },
    move: (id, x, y) => {
      const s = get(),
        b = s.buildings.find((v) => v.id === id);
      if (!b || !canPlace(s.buildings, b.type, x, y, id)) return false;
      set({
        buildings: s.buildings.map((v) => (v.id === id ? { ...v, x, y } : v)),
        notice: "Budova přesunuta.",
      });
      persist(get());
      return true;
    },
    demolish: (id) => {
      const s = get(),
        b = s.buildings.find((v) => v.id === id);
      if (!b || b.type === "townhall") {
        set({ notice: "Radnici nelze zbourat." });
        return;
      }
      const buildings = s.buildings.filter((v) => v.id !== id);
      const population = assignWorkforce(buildings);
      set({
        buildings: buildings.map((building) =>
          hasRequiredWorkers(building, population)
            ? building
            : { ...building, production: undefined },
        ),
        population,
        selected: undefined,
        notice: "Budova zbourána.",
      });
      persist(get());
    },
    startProduction: (id, seconds = 30) => {
      const s = get(),
        b = s.buildings.find((v) => v.id === id);
      if (!b) return;
      const d = getBuilding(b.type);
      if (!hasRequiredWorkers(b, s.population)) {
        set({ notice: "Nedostatek pracovníků." });
        return;
      }
      if (d.requiresRoad && !roadConnected(b, s.buildings)) {
        set({ notice: "Budova není spojena s radnicí." });
        return;
      }
      const resource: Resource =
        b.type === "workshop" ? "food" : (d.output?.resource ?? "gold");
      const baseAmount =
        b.type === "workshop"
          ? seconds === 30
            ? 30
            : seconds === 120
              ? 105
              : 230
          : (d.output?.amount ?? 20);
      set({
        buildings: s.buildings.map((v) =>
          v.id === id
            ? {
                ...v,
                production: {
                  startedAt: Date.now(),
                  endsAt: Date.now() + seconds * 1000,
                  resource,
                  amount: baseAmount,
                },
              }
            : v,
        ),
        notice: "Výroba zahájena.",
      });
      persist(get());
    },
    collect: (id) => {
      const s = get(),
        b = s.buildings.find((v) => v.id === id);
      if (b && !hasRequiredWorkers(b, s.population)) {
        set({ notice: "Nedostatek pracovníků." });
        return;
      }
      if (!b?.production || !productionReady(b.production.endsAt)) {
        set({ notice: "Produkce ještě není dokončena." });
        return;
      }
      const { resource, amount } = b.production,
        demo = demographics(s.buildings),
        gain = Math.round(amount * demo.multiplier);
      set({
        resources: { ...s.resources, [resource]: s.resources[resource] + gain },
        buildings: s.buildings.map((v) =>
          v.id === id ? { ...v, production: undefined } : v,
        ),
        notice: `Vybráno: ${gain}.`,
      });
      get().actions.event(
        resource === "gold"
          ? "collectCoins"
          : resource === "food"
            ? "collectSupplies"
            : "collect",
      );
      persist(get());
    },
    research: (id) => {
      const s = get(),
        t = technologies.find((v) => v.id === id);
      if (
        !t ||
        s.activeResearch ||
        !techAvailable(id, s) ||
        !canAfford(s.resources, t.cost)
      ) {
        set({ notice: "Technologie zatím není dostupná." });
        return;
      }
      const startedAt = Date.now();
      set({
        activeResearch: {
          technologyId: id,
          startedAt,
          endsAt: startedAt + t.seconds * 1000,
        },
        resources: applyCost(s.resources, t.cost),
        notice: `${t.name}: výzkum zahájen.`,
      });
      persist(get());
    },
    cancelResearch: () => {
      const s = get(),
        active = s.activeResearch;
      if (!active) return;
      const technology = technologies.find(
        (item) => item.id === active.technologyId,
      );
      set({
        activeResearch: undefined,
        resources: technology
          ? applyCost(s.resources, technology.cost, 1)
          : s.resources,
        notice: "Výzkum zrušen a zdroje vráceny.",
      });
      persist(get());
    },
    advanceEra: () => {
      const s = get();
      if (s.epoch === 1 && eraReady(s.researched)) {
        set({
          epoch: 2,
          resources: {
            ...s.resources,
            gold: s.resources.gold + 300,
            research: Math.min(10, s.resources.research + 2),
          },
          epochCelebration: true,
          notice: "Vítej v epoše prvních měst!",
        });
        persist(get());
      }
    },
    train: (type) => {
      const s = get(),
        d = getUnit(type);
      if (s.training || d.epoch > s.epoch || !canAfford(s.resources, d.cost)) {
        set({ notice: "Jednotku nyní nelze vycvičit." });
        return;
      }
      set({
        resources: applyCost(s.resources, d.cost),
        training: { type, endsAt: Date.now() + d.seconds * 1000 },
        notice: "Výcvik zahájen.",
      });
      persist(get());
    },
    tick: () => {
      const s = get(),
        now = Date.now(),
        elapsed = Math.floor((now - s.lastResourceAt) / 1000);
      let patch: Partial<Store> = {};
      if (elapsed > 0) {
        patch = {
          ...patch,
          resources: produceResources(
            s.resources,
            s.buildings,
            elapsed,
            now,
            s.population,
          ),
          lastResourceAt: s.lastResourceAt + elapsed * 1000,
        };
      }
      if (now - s.lastResearchAt >= 60000 && s.resources.research < 10) {
        const current = patch.resources ?? s.resources,
          n = Math.min(
            10,
            current.research + Math.floor((now - s.lastResearchAt) / 60000),
          );
        patch = {
          ...patch,
          resources: { ...current, research: n },
          lastResearchAt: now,
        };
      }
      if (s.training && now >= s.training.endsAt) {
        const d = getUnit(s.training.type);
        patch = {
          ...patch,
          training: undefined,
          units: [
            ...s.units,
            { id: crypto.randomUUID(), type: d.id, hp: d.hp },
          ],
          notice: "Výcvik jednotky dokončen.",
        };
        set(patch);
        get().actions.event("train");
        persist(get());
        return;
      }
      if (s.activeResearch && now >= s.activeResearch.endsAt) {
        const technologyId = s.activeResearch.technologyId;
        patch = {
          ...patch,
          activeResearch: undefined,
          researched: s.researched.includes(technologyId)
            ? s.researched
            : [...s.researched, technologyId],
          notice: "Výzkum dokončen — nové možnosti jsou odemčeny!",
        };
        set(patch);
        get().actions.event("research");
        persist(get());
        return;
      }
      if (Object.keys(patch).length) {
        set(patch);
        persist(get());
      }
    },
    event: (name) =>
      set((s) => ({
        questProgress: {
          ...s.questProgress,
          [name]: (s.questProgress[name] ?? 0) + 1,
        },
      })),
    claimQuest: (id) => {
      const s = get(),
        q = quests.find((v) => v.id === id);
      if (
        !q ||
        (s.questProgress[q.event] ?? 0) < q.target ||
        s.claimedQuests.includes(id)
      )
        return;
      set({
        resources: applyCost(s.resources, q.reward, 1),
        claimedQuests: [...s.claimedQuests, id],
        notice: "Odměna za úkol převzata!",
      });
      persist(get());
    },
    setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
    setSound: (sound) => set((s) => ({ settings: { ...s.settings, sound } })),
    setSpeed: (speed) => set((s) => ({ settings: { ...s.settings, speed } })),
    skipTutorial: () => set({ tutorialDone: true, tutorialStep: 6 }),
    nextTutorial: () =>
      set((s) =>
        s.tutorialStep >= 5
          ? { tutorialDone: true, tutorialStep: 6 }
          : { tutorialStep: s.tutorialStep + 1 },
      ),
    importSave: (raw) => {
      const d = deserialize(raw);
      if (!d) {
        set({ notice: "Importovaný soubor není platná hra." });
        return false;
      }
      set({ ...d, notice: "Hra úspěšně importována." });
      persist(get());
      return true;
    },
    reset: () => {
      localStorage.removeItem(KEY);
      set({
        ...freshGame(),
        view: "city",
        selected: undefined,
        notice: "Město bylo obnoveno.",
      });
    },
    startBattle: (battleProvince) => set({ battleProvince }),
    winBattle: (id) => {
      const s = get();
      if (s.conquered.includes(id)) return;
      set({
        conquered: [...s.conquered, id],
        battleProvince: undefined,
        notice: "Provincie dobyta!",
      });
      get().actions.event("victory");
      persist(get());
    },
    closeBattle: () => set({ battleProvince: undefined }),
    debug: () =>
      set((s) => ({
        resources: {
          gold: s.resources.gold + 1000,
          food: s.resources.food + 500,
          wood: s.resources.wood + 100,
          stone: s.resources.stone + 100,
          research: 10,
        },
        researched: defs.length ? technologies.map((t) => t.id) : s.researched,
        units: [...s.units, { id: crypto.randomUUID(), type: "spear", hp: 42 }],
        notice: "Debug bonus přidán.",
      })),
  },
}));
