import type { ReactNode } from "react";

export type IconName =
  | "city"
  | "tech"
  | "world"
  | "army"
  | "quests"
  | "settings"
  | "coins"
  | "supplies"
  | "wood"
  | "stone"
  | "research"
  | "population"
  | "happiness"
  | "townhall"
  | "hut"
  | "workshop"
  | "sawmill"
  | "quarry"
  | "barracks"
  | "square"
  | "statue"
  | "road"
  | "townhouse"
  | "market"
  | "guildhall"
  | "spear"
  | "archer"
  | "scout"
  | "lock"
  | "check"
  | "warning"
  | "compass"
  | "flag"
  | "battle"
  | "clock"
  | "heart"
  | "shield"
  | "move"
  | "spark"
  | "close";

const paths: Record<IconName, ReactNode> = {
  city: (
    <>
      <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-7h6v7" />
      <path d="M3 10l9-7 9 7" />
    </>
  ),
  tech: (
    <>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
      <path d="M8 16h8M9 13h6" />
    </>
  ),
  world: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  army: (
    <>
      <path d="M6 4l12 16M18 4L6 20M4 6l2-2 3 1M20 6l-2-2-3 1" />
      <path d="M5 19l2 2M19 19l-2 2" />
    </>
  ),
  quests: (
    <>
      <path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4" />
      <path d="M9 3V2h6v1" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 13.5v-3l-2-.7-.5-1.2.9-1.9-2.1-2.1-1.9.9-1.2-.5-.7-2h-3l-.7 2-1.2.5-1.9-.9-2.1 2.1.9 1.9-.5 1.2-2 .7v3l2 .7.5 1.2-.9 1.9 2.1 2.1 1.9-.9 1.2.5.7 2h3l.7-2 1.2-.5 1.9.9 2.1-2.1-.9-1.9.5-1.2z" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="7" rx="7" ry="3" />
      <path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
    </>
  ),
  supplies: (
    <>
      <path d="M4 8l8-4 8 4-8 4zM4 8v9l8 4 8-4V8M12 12v9" />
    </>
  ),
  wood: (
    <>
      <path d="M6 19L17 4l2 2L8 21zM4 17l3 3M12 7l5 4" />
    </>
  ),
  stone: <path d="M4 18l2-9 6-5 6 4 2 10-5 3H8zM6 9l6 3 6-4M12 12v9" />,
  research: (
    <>
      <path d="M12 2v3M4.9 4.9L7 7M19.1 4.9L17 7" />
      <path d="M8 14a6 6 0 1 1 8 0l-1.5 2.5h-5zM9 20h6" />
    </>
  ),
  population: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2" />
      <path d="M3 20c0-4 2-7 6-7s6 3 6 7M15 14c3 0 5 2 5 5" />
    </>
  ),
  happiness: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 10h.01M16 10h.01M8 15c2 2 6 2 8 0" />
    </>
  ),
  townhall: (
    <>
      <path d="M3 21h18M5 9h14v12H5zM3 9l9-6 9 6M9 21v-6h6v6" />
      <path d="M12 3v-2l4 1-4 1" />
    </>
  ),
  hut: (
    <>
      <path d="M4 11l8-7 8 7v9H4zM9 20v-6h6v6" />
      <path d="M3 11h18" />
    </>
  ),
  townhouse: (
    <>
      <path d="M4 21V7h7v14M11 21V3h9v18M7 11h1M7 15h1M14 7h2M14 11h2M14 15h2" />
    </>
  ),
  workshop: (
    <>
      <path d="M4 21V10l5 3V9l5 3V5h6v16zM7 17h2M12 17h2M17 17h2" />
      <path d="M16 5V2h3v3" />
    </>
  ),
  sawmill: (
    <>
      <circle cx="10" cy="13" r="7" />
      <path d="M10 6v14M3 13h14M5 8l10 10M15 8L5 18M18 4l3 3" />
    </>
  ),
  quarry: (
    <>
      <path d="M3 20l3-11 6-6 7 6 2 11zM6 9l6 4 7-4M12 13v7" />
      <path d="M4 16h16" />
    </>
  ),
  barracks: (
    <>
      <path d="M4 21V8h16v13M4 8l4-4 4 4 4-4 4 4M9 21v-6h6v6" />
      <path d="M8 11h2M14 11h2" />
    </>
  ),
  square: (
    <>
      <path d="M3 21h18M6 21v-8h12v8M8 13c0-3 2-5 4-5s4 2 4 5" />
      <path d="M12 8V3M9 5h6" />
    </>
  ),
  statue: (
    <>
      <path d="M8 21h8M7 18h10M9 18l1-7h4l1 7M10 8a2 2 0 1 1 4 0v3h-4z" />
      <circle cx="12" cy="4" r="2" />
    </>
  ),
  road: (
    <>
      <path d="M8 22L11 2M16 22L13 2" />
      <path d="M12 5v3M12 11v3M12 17v3" />
    </>
  ),
  market: (
    <>
      <path d="M3 9h18l-2-5H5zM5 9v11h14V9M8 20v-6h8v6" />
      <path d="M4 9c0 2 3 2 4 0 0 2 3 2 4 0 0 2 3 2 4 0 0 2 3 2 4 0" />
    </>
  ),
  guildhall: (
    <>
      <path d="M4 21V8l4-4 4 4 4-4 4 4v13M8 21v-5h8v5" />
      <path d="M7 11h3M14 11h3" />
    </>
  ),
  spear: (
    <>
      <path d="M18 3L6 21M15 3h3v3M5 16l3 2" />
      <path d="M10 6l8 8" />
    </>
  ),
  archer: (
    <>
      <path d="M7 3c8 5 8 13 0 18M7 3c4 6 4 12 0 18M7 12h13M17 9l3 3-3 3" />
    </>
  ),
  scout: (
    <>
      <path d="M5 20L18 3l2 2L7 22zM16 3l5 5M4 17l4 4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  warning: (
    <>
      <path d="M12 3L2 21h20z" />
      <path d="M12 9v5M12 18h.01" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 4-4 2 2-4z" />
    </>
  ),
  flag: (
    <>
      <path d="M6 22V3M6 4h11l-2 4 2 4H6" />
    </>
  ),
  battle: (
    <>
      <path d="M5 4l14 16M19 4L5 20" />
      <path d="M4 6l2-2M20 6l-2-2M4 18l2 2M20 18l-2 2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </>
  ),
  heart: (
    <path d="M12 21S3 16 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 7-9 12-9 12z" />
  ),
  shield: <path d="M12 2l8 3v6c0 5-3 9-8 11-5-2-8-6-8-11V5z" />,
  move: (
    <>
      <path d="M12 2v20M2 12h20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3" />
    </>
  ),
  spark: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
};

export function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <span className="tooltip" data-tooltip={label}>
      {children}
    </span>
  );
}
