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
      <ellipse
        className="buildingAssetShadow"
        cx="110"
        cy="139"
        rx="96"
        ry="18"
      />
      <path
        d="m27 82 83-46 87 45-87 50Z"
        fill="url(#hall-stone)"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m27 82 83 45v38l-83-45Z"
        fill="#d2b682"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m110 127 87-46v38l-87 47Z"
        fill="#a78761"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m17 80 91-52 100 51-13 13-87-45-80 46Z"
        fill="url(#hall-roof)"
        stroke={outline}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M83 46V18l27-15 29 15v58"
        fill="#c8aa78"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m74 18 36-20 38 19-10 10-28-14-27 15Z"
        fill="#3b5261"
        stroke={outline}
        strokeWidth="3"
      />
      <path d="M108-1v-12" stroke="#57402c" strokeWidth="3" />
      <path
        d="M110-13q18 2 29 10l-14 5-15-5Z"
        fill="#366b8b"
        stroke="#d5a844"
        strokeWidth="2"
      />
      <path
        d="m96 32 13-7 14 7v24l-27 15Z"
        fill="#568b9d"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m91 110 19-11 20 10v51l-39-21Z"
        fill="#5c3928"
        stroke={outline}
        strokeWidth="3"
      />
      <path
        d="m45 98 18 10v20l-18-10Zm109 2 20-10v20l-20 11Z"
        fill="#73aeb4"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m74 121 13 7v23l-13-7Zm61 5 14-8v24l-14 7Z"
        fill="#6fa3aa"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m98 90 12-14 13 1 8 14-21 12Z"
        fill="#d3a643"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m105 153 14 7-9 13-15-8Z"
        fill="#b5a17e"
        stroke={outline}
        strokeWidth="2"
      />
      <path
        d="m119 158 13 7-9 13-13-7Z"
        fill="#8f8069"
        stroke={outline}
        strokeWidth="2"
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
      viewBox={type === "townhall" ? "0 -16 220 198" : "0 0 180 150"}
      role="img"
      aria-label={config.label}
    >
      {type === "hut" && <House />}
      {type === "workshop" && <Workshop />}
      {type === "townhall" && <TownHall />}
    </svg>
  );
}
