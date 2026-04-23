import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("public/images");
fs.mkdirSync(outDir, { recursive: true });

const SIZE = 600;
const CENTER = SIZE / 2;
const CRUST_R = 250;
const CHEESE_R = 225;

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function toppingDot(x, y, r, color) {
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}"/>`;
}

function toppingSlice(x, y, r, color) {
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}" stroke="${shade(color, -20)}" stroke-width="1.5"/>`;
}

function oliveSlice(x, y) {
  return `<g><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#2D1A40"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.5" fill="#8B6F47"/></g>`;
}

function basilLeaf(x, y, rot = 0) {
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot})">
    <ellipse cx="0" cy="0" rx="10" ry="5" fill="#2F7A3B"/>
    <line x1="-10" y1="0" x2="10" y2="0" stroke="#1F5A26" stroke-width="1"/>
  </g>`;
}

function shade(hex, percent) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + Math.round((percent / 100) * 255);
  let g = ((n >> 8) & 0xff) + Math.round((percent / 100) * 255);
  let b = (n & 0xff) + Math.round((percent / 100) * 255);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function randomInCircle(rand, radius) {
  const ang = rand() * Math.PI * 2;
  const dist = Math.sqrt(rand()) * radius;
  return [CENTER + Math.cos(ang) * dist, CENTER + Math.sin(ang) * dist];
}

function buildPizza({ name, seed, sauce, toppings }) {
  const rand = seededRand(seed);
  const parts = [];

  const count = toppings.count ?? 18;
  for (let i = 0; i < count; i++) {
    const [x, y] = randomInCircle(rand, CHEESE_R - 25);
    const t = toppings.list[Math.floor(rand() * toppings.list.length)];
    if (t.kind === "slice") parts.push(toppingSlice(x, y, t.r, t.color));
    else if (t.kind === "dot") parts.push(toppingDot(x, y, t.r, t.color));
    else if (t.kind === "olive") parts.push(oliveSlice(x, y));
    else if (t.kind === "basil")
      parts.push(basilLeaf(x, y, rand() * 360));
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <defs>
    <radialGradient id="bg-${seed}" cx="0.5" cy="0.5" r="0.7">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#F3F3F3"/>
    </radialGradient>
    <radialGradient id="crust-${seed}" cx="0.5" cy="0.5" r="0.55">
      <stop offset="0.6" stop-color="#E8B875"/>
      <stop offset="0.92" stop-color="#C98A3F"/>
      <stop offset="1" stop-color="#A06926"/>
    </radialGradient>
    <radialGradient id="cheese-${seed}" cx="0.5" cy="0.5" r="0.55">
      <stop offset="0" stop-color="${sauce.cheese}"/>
      <stop offset="1" stop-color="${shade(sauce.cheese, -10)}"/>
    </radialGradient>
    <filter id="shadow-${seed}" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
      <feOffset dx="0" dy="8" result="off"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bg-${seed})"/>
  <ellipse cx="${CENTER}" cy="${CENTER + 14}" rx="${CRUST_R}" ry="24" fill="#000" opacity="0.12"/>
  <g filter="url(#shadow-${seed})">
    <circle cx="${CENTER}" cy="${CENTER}" r="${CRUST_R}" fill="url(#crust-${seed})"/>
    <circle cx="${CENTER}" cy="${CENTER}" r="${CHEESE_R}" fill="${sauce.base}"/>
    <circle cx="${CENTER}" cy="${CENTER}" r="${CHEESE_R - 6}" fill="url(#cheese-${seed})" opacity="0.85"/>
    ${parts.join("\n    ")}
  </g>
</svg>`;
}

// Tomato sauce + mozzarella base
const classicBase = { base: "#C13E2A", cheese: "#F5E6B0" };
const whiteBase = { base: "#F3E6C8", cheese: "#F8EBC4" };
const pestoBase = { base: "#6E8F46", cheese: "#E5DFA6" };

const pepperoniT = { kind: "slice", r: 14, color: "#B93228" };
const mushroomT = { kind: "slice", r: 10, color: "#D8C49A" };
const greenPepperT = { kind: "slice", r: 8, color: "#4FA55A" };
const redPepperT = { kind: "slice", r: 8, color: "#E24A3A" };
const yellowPepperT = { kind: "slice", r: 8, color: "#F3C83A" };
const oliveT = { kind: "olive" };
const basilT = { kind: "basil" };
const tomatoCherryT = { kind: "slice", r: 11, color: "#E4482A" };
const hamT = { kind: "slice", r: 12, color: "#F6B8A8" };
const pineappleT = { kind: "slice", r: 10, color: "#F5D84A" };
const baconT = { kind: "slice", r: 11, color: "#C06639" };
const chickenT = { kind: "dot", r: 7, color: "#E8C88A" };
const cornT = { kind: "dot", r: 5, color: "#F3C832" };
const onionT = { kind: "slice", r: 7, color: "#E8E0D1" };
const shrimpT = { kind: "slice", r: 10, color: "#F08B74" };

const PIZZAS = {
  margarita: { sauce: classicBase, list: [tomatoCherryT, basilT, mushroomT] },
  pepperoni: { sauce: classicBase, list: [pepperoniT, oliveT] },
  "four-cheese": { sauce: whiteBase, list: [basilT, mushroomT, onionT] },
  diavola: { sauce: classicBase, list: [pepperoniT, redPepperT, oliveT] },
  hawaiian: { sauce: classicBase, list: [hamT, pineappleT] },
  "bbq-chicken": { sauce: classicBase, list: [chickenT, redPepperT, onionT, cornT] },
  "veggie-garden": {
    sauce: classicBase,
    list: [greenPepperT, redPepperT, yellowPepperT, mushroomT, oliveT, basilT],
  },
  carbonara: { sauce: whiteBase, list: [baconT, onionT, basilT] },
  prosciutto: { sauce: classicBase, list: [hamT, basilT, tomatoCherryT] },
  "mushroom-truffle": { sauce: whiteBase, list: [mushroomT, basilT, onionT] },
  "seafood-delight": { sauce: whiteBase, list: [shrimpT, tomatoCherryT, basilT] },
  "pesto-verde": { sauce: pestoBase, list: [tomatoCherryT, mushroomT, basilT] },
  "spicy-sausage": { sauce: classicBase, list: [pepperoniT, redPepperT, yellowPepperT] },
  "meat-feast": { sauce: classicBase, list: [pepperoniT, hamT, baconT, oliveT] },
  "cheese-lovers": { sauce: whiteBase, list: [onionT, basilT, mushroomT] },
  capricciosa: { sauce: classicBase, list: [hamT, mushroomT, oliveT, basilT] },
  "calabrese": { sauce: classicBase, list: [pepperoniT, oliveT, redPepperT] },
  "formaggio-bianco": { sauce: whiteBase, list: [basilT, mushroomT] },
  "tomato-basil": { sauce: classicBase, list: [tomatoCherryT, basilT, basilT] },
  "chicken-ranch": { sauce: whiteBase, list: [chickenT, baconT, cornT] },
  "vegetariana-deluxe": {
    sauce: classicBase,
    list: [greenPepperT, redPepperT, yellowPepperT, mushroomT, onionT],
  },
  "hot-siciliana": { sauce: classicBase, list: [pepperoniT, redPepperT, oliveT] },
  "napoli-classic": { sauce: classicBase, list: [tomatoCherryT, basilT, oliveT] },
  "mediterranea": { sauce: classicBase, list: [oliveT, tomatoCherryT, onionT, basilT] },
  "roma-speciale": { sauce: classicBase, list: [hamT, mushroomT, oliveT] },
  "milano-gourmet": { sauce: whiteBase, list: [chickenT, basilT, redPepperT] },
  "firenze-funghi": { sauce: whiteBase, list: [mushroomT, onionT, basilT] },
  "verona-verde": { sauce: pestoBase, list: [basilT, mushroomT, onionT] },
  "torino-carne": { sauce: classicBase, list: [baconT, pepperoniT, onionT] },
  "genova-gusto": { sauce: pestoBase, list: [tomatoCherryT, basilT] },
  "palermo-piccante": { sauce: classicBase, list: [pepperoniT, redPepperT] },
  "bologna-rich": { sauce: classicBase, list: [baconT, mushroomT, onionT, oliveT] },
};

Object.entries(PIZZAS).forEach(([name, cfg], idx) => {
  const svg = buildPizza({
    name,
    seed: 1000 + idx,
    sauce: cfg.sauce,
    toppings: { count: 22, list: cfg.list },
  });
  fs.writeFileSync(path.join(outDir, `${name}.svg`), svg);
});

// Hero banners (slices & fibo pasta bar blocks)
const heroSlice = (color, label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 312" width="540" height="312">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${color}"/>
      <stop offset="1" stop-color="${shade(color, -12)}"/>
    </linearGradient>
  </defs>
  <rect width="540" height="312" rx="24" fill="url(#bg)"/>
  <g transform="translate(330,80) rotate(25)">
    <path d="M 0 0 L 180 40 L 100 180 Z" fill="#F5E6B0" stroke="#E0B250" stroke-width="3"/>
    <circle cx="55" cy="55" r="10" fill="#B93228"/>
    <circle cx="110" cy="80" r="10" fill="#B93228"/>
    <circle cx="80" cy="110" r="10" fill="#B93228"/>
    <circle cx="130" cy="120" r="8" fill="#2D1A40"/>
    <ellipse cx="90" cy="140" rx="10" ry="5" fill="#2F7A3B"/>
  </g>
  <text x="40" y="110" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="52" fill="#2B1A0A">${label}</text>
  <text x="40" y="170" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="68" fill="#2B1A0A">за 149₽</text>
</svg>`;

const heroFibo = (bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 312" width="540" height="312">
  <rect width="540" height="312" rx="24" fill="${bg}"/>
  <g transform="translate(60,110)">
    <text font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="96" fill="#FFD23F" letter-spacing="-4">fibo</text>
    <text y="52" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="26" fill="#FFFFFF" letter-spacing="6">PASTA BAR</text>
  </g>
  <g transform="translate(360,60)">
    <circle cx="60" cy="80" r="60" fill="#F5E6B0"/>
    <circle cx="60" cy="80" r="55" fill="#E8B875"/>
    <circle cx="60" cy="80" r="46" fill="#F5E6B0"/>
    <circle cx="40" cy="70" r="10" fill="#B93228"/>
    <circle cx="80" cy="80" r="10" fill="#B93228"/>
    <circle cx="60" cy="100" r="8" fill="#2D1A40"/>
    <ellipse cx="72" cy="66" rx="10" ry="5" fill="#2F7A3B"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(outDir, "hero-slice-left.svg"), heroSlice("#F4B400", "СЛАЙС"));
fs.writeFileSync(path.join(outDir, "hero-slice-right.svg"), heroSlice("#F4B400", "СЛАЙС"));
fs.writeFileSync(path.join(outDir, "hero-fibo-black.svg"), heroFibo("#1A1A1A"));
fs.writeFileSync(path.join(outDir, "hero-fibo-dark.svg"), heroFibo("#2B2B2B"));

// Promo banner (акция "Торты")
const promoBanner = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1110 322" width="1110" height="322">
  <defs>
    <linearGradient id="cake-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFF4D6"/>
      <stop offset="1" stop-color="#FCE7A6"/>
    </linearGradient>
  </defs>
  <rect width="1110" height="322" rx="24" fill="url(#cake-bg)"/>
  <g transform="translate(60,60)">
    <circle cx="90" cy="110" r="100" fill="#F5D8B5"/>
    <circle cx="90" cy="110" r="88" fill="#FFFFFF"/>
    <rect x="10" y="108" width="160" height="70" fill="#F5D8B5"/>
    <rect x="10" y="108" width="160" height="8" fill="#D96E6E"/>
    <circle cx="90" cy="90" r="6" fill="#D96E6E"/>
    <circle cx="65" cy="105" r="4" fill="#D96E6E"/>
    <circle cx="115" cy="105" r="4" fill="#D96E6E"/>
  </g>
  <text x="280" y="100" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="28" fill="#2B2B2B">Торты</text>
  <text x="280" y="150" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="56" fill="#2B2B2B">ЛЮБОЙ СЛОЖНОСТИ</text>
  <text x="280" y="200" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="56" fill="#D94C4C">НА ЗАКАЗ</text>
  <text x="280" y="240" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#6B6B6B">от авторских кондитеров</text>
  <g transform="translate(900,60)">
    <circle cx="90" cy="110" r="100" fill="#FFFFFF" opacity="0.6"/>
    <text x="62" y="90" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="48" fill="#D94C4C">750</text>
    <text x="55" y="120" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="#2B2B2B">РУБ/КГ</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(outDir, "promo-cakes.svg"), promoBanner());

// Category circle thumbnails for "Новинки"
const circleThumb = (label, color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142 142" width="142" height="142">
  <circle cx="71" cy="71" r="71" fill="${color}"/>
  <circle cx="71" cy="71" r="58" fill="#F5E6B0"/>
  <circle cx="50" cy="60" r="8" fill="#B93228"/>
  <circle cx="85" cy="70" r="8" fill="#B93228"/>
  <circle cx="68" cy="90" r="6" fill="#2D1A40"/>
  <ellipse cx="80" cy="55" rx="8" ry="4" fill="#2F7A3B"/>
</svg>`;

["carbonara-thumb", "pepperoni-thumb", "margarita-thumb", "diavola-thumb"].forEach((n, i) => {
  fs.writeFileSync(path.join(outDir, `${n}.svg`), circleThumb(n, ["#C98A3F", "#E8B875", "#F4B400", "#C98A3F"][i]));
});

// Yandex eda logo placeholder
fs.writeFileSync(path.join(outDir, "yandex-eda.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="12" fill="#FFD23F"/>
  <text x="12" y="16" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="14" fill="#000" text-anchor="middle">Я</text>
</svg>`);

// Delivery map placeholder
fs.writeFileSync(path.join(outDir, "delivery-map.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1110 400" width="1110" height="400">
  <rect width="1110" height="400" fill="#E6EEF4"/>
  <g stroke="#CCD9E3" stroke-width="2" fill="none">
    <path d="M 0 100 Q 300 60 600 120 T 1110 100"/>
    <path d="M 0 200 Q 300 180 600 220 T 1110 200"/>
    <path d="M 0 300 Q 300 260 600 320 T 1110 300"/>
    <path d="M 200 0 L 230 400"/>
    <path d="M 500 0 L 520 400"/>
    <path d="M 800 0 L 820 400"/>
  </g>
  <g transform="translate(400,150)">
    <path d="M 0 0 C -30 -40 -30 -80 0 -80 C 30 -80 30 -40 0 0 Z" fill="#D94C4C"/>
    <circle cx="0" cy="-55" r="10" fill="#FFFFFF"/>
  </g>
  <g transform="translate(700,220)">
    <path d="M 0 0 C -30 -40 -30 -80 0 -80 C 30 -80 30 -40 0 0 Z" fill="#FFD23F"/>
    <circle cx="0" cy="-55" r="10" fill="#FFFFFF"/>
  </g>
  <text x="555" y="380" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#8A9AA8" text-anchor="middle">Москва — зона доставки</text>
</svg>`);

console.log(`Generated ${Object.keys(PIZZAS).length} pizzas + hero/promo/map assets`);
