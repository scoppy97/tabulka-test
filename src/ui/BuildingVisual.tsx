import type { CSSProperties } from "react";
import {
  BUILDING_VISUALS,
  type IllustratedBuildingType,
} from "./buildingVisualConfig";

const outline = "#3b342c";

function SharedDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-lightWall`} x1="0" y1="0" x2="0.8" y2="1">
        <stop stopColor="#f1d29b" />
        <stop offset="1" stopColor="#b97c49" />
      </linearGradient>
      <linearGradient id={`${id}-stone`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#d9c69e" />
        <stop offset="1" stopColor="#8f806a" />
      </linearGradient>
      <linearGradient id={`${id}-roof`} x1="0" y1="0" x2="0.9" y2="1">
        <stop stopColor="#5d7180" />
        <stop offset="1" stopColor="#263b49" />
      </linearGradient>
      <filter id={`${id}-shadow`} x="-30%" y="-30%" width="170%" height="180%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  );
}

function House() {
  return (
    <>
      <SharedDefs id="house" />
      <ellipse
        className="buildingAssetShadow"
        cx="83"
        cy="111"
        rx="55"
        ry="13"
      />
      <path
        d="M31 72 78 46l49 25-47 27Z"
        fill="#a96a3c"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m78 46 49 25v35l-49 27V97Z"
        fill="#a96f42"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m31 72 47 25v36l-47-26Z"
        fill="url(#house-lightWall)"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m23 70 53-31 58 30-10 10-47-24-45 26Z"
        fill="#d75e3f"
        stroke={outline}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="m76 39 58 30-10 10-48-24Z" fill="#b94736" />
      <path
        d="M44 83 59 91v23l-15-8Z"
        fill="#5c3928"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m65 83 12 6v13l-12-6Z"
        fill="#76b9b5"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m89 95 22-12v20l-22 12Z"
        fill="#70462d"
        stroke={outline}
        strokeWidth="2"
      />
      <circle cx="105" cy="99" r="1.8" fill="#efc45c" />
      <path
        d="M105 42V24h12v24"
        fill="#9e6541"
        stroke={outline}
        strokeWidth="3"
      />
      <path d="m101 24 18 9" stroke="#f2d7af" strokeWidth="2" opacity=".55" />
      <path
        d="M34 109 76 132l53-29"
        fill="none"
        stroke="#7e704f"
        strokeWidth="5"
      />
      <path d="m22 107 13 7-8 8-13-7Z" fill="#467542" />
    </>
  );
}

function Workshop() {
  return (
    <>
      <SharedDefs id="workshop" />
      <ellipse
        className="buildingAssetShadow"
        cx="93"
        cy="116"
        rx="76"
        ry="15"
      />
      <path
        d="m29 71 61-34 67 34-65 37Z"
        fill="#81533a"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m29 71 63 34v31l-63-34Z"
        fill="#a8734d"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m92 105 65-34v31l-65 35Z"
        fill="#795039"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m19 69 69-40 79 40-12 12-66-34-59 34Z"
        fill="url(#workshop-roof)"
        stroke={outline}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="m89 29 78 40-12 12-66-34Z" fill="#314756" opacity=".85" />
      <g stroke="#8296a0" strokeWidth="2" opacity=".65">
        <path d="m43 57 63 32M59 48l63 32M76 39l63 32" />
      </g>
      <path
        d="M119 48V16h18v43"
        fill="#8c5740"
        stroke={outline}
        strokeWidth="3"
      />
      <path d="m116 16 22 11" stroke="#d4ad7d" strokeWidth="3" />
      <path
        d="M137 14c11-9 18-1 13-12 12 8 5 19-5 20Z"
        fill="#c9c2aa"
        opacity=".75"
      />
      <path
        d="m42 83 25 13v22l-25-13Z"
        fill="#477680"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m100 104 29-15v31l-29 16Z"
        fill="#4a3528"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m133 112 16-8v12l-16 9Z"
        fill="#e5ae49"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m23 106 14 7-7 15-15-8Z"
        fill="#a37e43"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="M17 103 5 93m12 10 10-5"
        stroke="#493a30"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function TownHall() {
  return (
    <>
      <SharedDefs id="hall" />
      <defs>
        <linearGradient id="hall-warmStone" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f5e4bd" />
          <stop offset=".52" stopColor="#d8bd8d" />
          <stop offset="1" stopColor="#a98259" />
        </linearGradient>
        <linearGradient id="hall-deepRoof" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#718695" />
          <stop offset=".42" stopColor="#425968" />
          <stop offset="1" stopColor="#233744" />
        </linearGradient>
      </defs>
      <ellipse
        className="buildingAssetShadow"
        cx="125"
        cy="218"
        rx="110"
        ry="15"
      />
      {/* Lower civic wings form a wide base beneath the dominant tower. */}
      <path
        d="M13 137 66 105l51 27-55 33Z"
        fill="url(#hall-deepRoof)"
        stroke={outline}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="m62 165 55-33v62l-55 32Z"
        fill="#ad895f"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m15 138 47 27v61l-47-27Z"
        fill="url(#hall-warmStone)"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m133 132 51-29 54 29-56 33Z"
        fill="url(#hall-deepRoof)"
        stroke={outline}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="m133 132 49 27v67l-49-28Z"
        fill="url(#hall-warmStone)"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m182 159 56-27v62l-56 32Z"
        fill="#a37e56"
        stroke={outline}
        strokeWidth="3"
      />
      {/* Tall central tower, deliberately rising far above both roof lines. */}
      <path
        d="m82 69 43-25 44 23-44 27Z"
        fill="url(#hall-deepRoof)"
        stroke={outline}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="m125 94 44-27v126l-44 27Z"
        fill="#a47c54"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m82 69 43 25v126l-43-25Z"
        fill="url(#hall-warmStone)"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m87 76 33 19v111"
        fill="none"
        stroke="#fff4d5"
        strokeWidth="3"
        opacity=".45"
      />
      <path
        d="m164 77-34 21v112"
        fill="none"
        stroke="#76583e"
        strokeWidth="4"
        opacity=".45"
      />
      <path
        d="m76 67 49-32 51 29-8 12-43-23-41 26Z"
        fill="url(#hall-deepRoof)"
        stroke={outline}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="m125 35 51 29-8 12-43-23Z" fill="#2c414f" opacity=".85" />
      <path
        d="M125 36V11"
        stroke="#59442f"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M127 12q20 1 32 10l-16 6-16-6Z"
        fill="#355e83"
        stroke="#d2a83e"
        strokeWidth="2"
      />
      {/* Clock, windows, and restrained ceremonial banners. */}
      <circle
        cx="125"
        cy="89"
        r="13"
        fill="#f1ddb1"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="M125 89v-7m0 7 6 3"
        stroke="#496171"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="m96 115 12 7v22l-12-7Zm0 38 12 7v22l-12-7Z"
        fill="#557d91"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m142 116 12-7v22l-12 8Zm0 38 12-8v22l-12 8Z"
        fill="#456b80"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m31 160 13 7v19l-13-7Zm46 5 13-8v20l-13 8Zm72-4 13 7v20l-13-8Zm48 3 14-7v20l-14 8Z"
        fill="#60899a"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m68 130 10 5v28l-5 5-5-10Zm104 5 10-6v29l-5 11-5-6Z"
        fill="#355f88"
        stroke="#d4aa45"
        strokeWidth="1.5"
      />
      {/* Recessed entrance and broad stone stair descending toward the viewer. */}
      <path
        d="m106 177 19-11 19 10v40l-38-21Z"
        fill="#44382e"
        stroke={outline}
        strokeWidth="3"
      />
      <path d="m111 178 14-8 14 8-14 8Z" fill="#d6ad50" opacity=".75" />
      <path
        d="m96 199 29 16 29-16 8 5-37 22-38-21Z"
        fill="#d8c39c"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m87 205 38 21 37-22 9 5-46 28-47-26Z"
        fill="#b49a75"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m21 145 38 22m80-26 38 21"
        stroke="#fff1cc"
        strokeWidth="2"
        opacity=".32"
      />
      <path
        d="m184 166 48-24v44"
        fill="none"
        stroke="#75563c"
        strokeWidth="3"
        opacity=".35"
      />
    </>
  );
}

export function BuildingVisual({ type }: { type: IllustratedBuildingType }) {
  const config = BUILDING_VISUALS[type];
  const style = {
    "--building-art-width": `${config.width}px`,
  } as CSSProperties;
  return (
    <svg
      className="buildingAsset"
      style={style}
      viewBox={type === "townhall" ? "0 0 250 242" : "0 0 180 150"}
      role="img"
      aria-label={config.label}
    >
      {type === "hut" && <House />}
      {type === "workshop" && <Workshop />}
      {type === "townhall" && <TownHall />}
    </svg>
  );
}
