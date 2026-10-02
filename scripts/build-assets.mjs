// Generates the hand-made SVGs in assets/. Edit the data below, then run:
//   node scripts/build-assets.mjs
// Everything here is static SVG with CSS/SMIL animation, so it renders through
// GitHub's image proxy with no JavaScript and no external fonts.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const C = {
  bg: '#0D1117',
  panel: '#161B22',
  chip: '#21262D',
  line: '#30363D',
  text: '#E6EDF3',
  soft: '#C9D1D9',
  muted: '#8B949E',
  red: '#E23636',
  deep: '#9B111E',
  gold: '#F5B700',
  amber: '#FFD866',
  arc: '#5CE1E6',
  green: '#3FB950',
};

const MONO = "ui-monospace, SFMono-Regular, 'JetBrains Mono', 'Cascadia Code', 'Fira Code', Consolas, 'Liberation Mono', Menlo, monospace";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function write(rel, svg) {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.trim() + '\n');
  console.log('wrote', rel);
}

// ---------------------------------------------------------------- divider

function divider() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="18" viewBox="0 0 1000 18" role="img" aria-label="divider">
  <defs>
    <linearGradient id="base" x1="0" x2="1">
      <stop offset="0" stop-color="${C.red}" stop-opacity="0"/>
      <stop offset="0.18" stop-color="${C.red}"/>
      <stop offset="0.5" stop-color="${C.gold}"/>
      <stop offset="0.82" stop-color="${C.red}"/>
      <stop offset="1" stop-color="${C.red}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0" stop-color="${C.arc}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${C.arc}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="bar"><rect x="0" y="7" width="1000" height="4" rx="2"/></clipPath>
  </defs>
  <rect x="0" y="7" width="1000" height="4" rx="2" fill="url(#base)"/>
  <g clip-path="url(#bar)">
    <rect x="-220" y="0" width="220" height="18" fill="url(#shine)">
      <animate attributeName="x" from="-220" to="1000" dur="3.2s" repeatCount="indefinite"/>
    </rect>
  </g>
  <circle cx="500" cy="9" r="9" fill="url(#glow)">
    <animate attributeName="r" values="6;9;6" dur="2.4s" repeatCount="indefinite"/>
  </circle>
  <rect x="495" y="4" width="10" height="10" fill="${C.bg}" stroke="${C.gold}" stroke-width="2" transform="rotate(45 500 9)"/>
  <circle cx="500" cy="9" r="2" fill="${C.arc}"/>
</svg>`;
}

// ---------------------------------------------------------------- terminal

const INFO = [
  ['OS', 'B.Tech IT', ' · IIIT Allahabad (final year)'],
  ['Host', 'Prayagraj, India', ''],
  ['Kernel', 'TypeScript · Python · C++', ' · SQL'],
  ['Shell', 'React · Next.js · Node.js', ' · FastAPI'],
  ['Cloud', 'AWS · Firebase · Vercel', ' · PostgreSQL'],
  ['Uptime', 'shipping code since 2023', ''],
  ['Last job', 'SDE Intern', ' @ Aplus Technology Solutions'],
  ['Process', 'OffGrid', ' — offline-first emergency navigation'],
  ['Rank', 'CodeChef 1771 peak', ' · Global #17, Starters 235'],
  ['Motto', 'instrument before theorising', ''],
];

function compass(cx, cy) {
  // An 8-point rose: two-tone triangles give each point a bevelled look.
  const point = (len, half, light, dark, angle) => `
      <g transform="rotate(${angle})">
        <polygon points="0,${-len} ${half},0 0,0" fill="${light}"/>
        <polygon points="0,${-len} ${-half},0 0,0" fill="${dark}"/>
      </g>`;
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const long = i % 9 === 0;
    return `<line x1="0" y1="${long ? -84 : -88}" x2="0" y2="-93" stroke="${long ? C.gold : C.line}" stroke-width="${long ? 2 : 1}" transform="rotate(${i * 5})"/>`;
  }).join('');
  const letter = (t, x, y, fill) =>
    `<text x="${x}" y="${y}" fill="${fill}" font-family="${MONO}" font-size="15" font-weight="700" text-anchor="middle" dominant-baseline="central">${t}</text>`;

  return `
  <g class="fade" style="animation-delay:.9s" transform="translate(${cx} ${cy})">
    <circle r="112" fill="url(#halo)"/>
    <circle r="104" fill="none" stroke="${C.line}" stroke-width="1.5"/>
    <g>
      <circle r="98" fill="none" stroke="${C.red}" stroke-width="2" stroke-dasharray="3 7" opacity=".8"/>
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite"/>
    </g>
    ${ticks}
    <g>
      ${[45, 135, 225, 315].map((a) => point(52, 7, C.amber, '#B38600', a)).join('')}
      ${[90, 180, 270].map((a) => point(78, 10, C.gold, '#9E7600', a)).join('')}
      ${point(80, 10, C.red, C.deep, 0)}
      <animateTransform attributeName="transform" type="rotate" values="0;-18;12;-7;3;0" keyTimes="0;.25;.5;.7;.85;1" dur="2.6s" begin="1.1s" fill="freeze"/>
    </g>
    <circle r="22" fill="url(#arc)">
      <animate attributeName="r" values="18;24;18" dur="2.8s" repeatCount="indefinite"/>
    </circle>
    <circle r="12" fill="${C.bg}" stroke="${C.arc}" stroke-width="2.5"/>
    <circle r="5" fill="#E6FFFF"/>
    ${letter('N', 0, -120, C.red)}
    ${letter('E', 120, 0, C.muted)}
    ${letter('S', 0, 120, C.muted)}
    ${letter('W', -120, 0, C.muted)}
  </g>`;
}

function terminal() {
  const W = 900;
  const H = 450;
  const keyX = 318;
  const valX = 418;
  const rowY0 = 156;
  const rowStep = 23;

  const rows = INFO.map(([k, v, rest], i) => {
    const y = rowY0 + i * rowStep;
    return `
    <g class="row" style="animation-delay:${(1.5 + i * 0.13).toFixed(2)}s">
      <text x="${keyX}" y="${y}" class="key">${esc(k)}</text>
      <text x="${valX}" y="${y}" class="val">${esc(v)}<tspan class="dim">${esc(rest)}</tspan></text>
    </g>`;
  }).join('');

  const swatches = [C.red, C.deep, '#E8590C', C.gold, C.amber, C.arc, '#2F81F7', C.text]
    .map((c, i) => `<rect x="${keyX + i * 30}" y="${rowY0 + INFO.length * rowStep - 6}" width="26" height="16" rx="3" fill="${c}"/>`)
    .join('');

  // "neofetch" types itself one character at a time. Each character is a
  // hidden tspan in the same text run as the prompt, so it sits flush after
  // the "$ " whatever monospace font the viewer's machine substitutes.
  const typed = [...'neofetch']
    .map((ch, i) => `<tspan visibility="hidden">${ch}<set attributeName="visibility" to="visible" begin="${(0.35 + i * 0.1).toFixed(2)}s" fill="freeze"/></tspan>`)
    .join('');
  const prompt = `<tspan fill="${C.red}" font-weight="700">sameer@stark2028</tspan><tspan fill="${C.text}">:</tspan><tspan fill="${C.gold}">~</tspan><tspan fill="${C.text}">$ </tspan>`;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
  <title id="t">sameer@stark2028 — neofetch</title>
  <desc id="d">A terminal running neofetch: B.Tech IT at IIIT Allahabad, based in Prayagraj; TypeScript, Python and C++; React, Next.js, Node.js and FastAPI; AWS, Firebase and Vercel; building OffGrid, offline-first emergency navigation; CodeChef peak 1771.</desc>
  <defs>
    <radialGradient id="arc">
      <stop offset="0" stop-color="${C.arc}" stop-opacity=".95"/>
      <stop offset=".55" stop-color="${C.arc}" stop-opacity=".35"/>
      <stop offset="1" stop-color="${C.arc}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="halo">
      <stop offset=".6" stop-color="${C.red}" stop-opacity="0"/>
      <stop offset=".9" stop-color="${C.red}" stop-opacity=".10"/>
      <stop offset="1" stop-color="${C.red}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="edge" x1="0" x2="1">
      <stop offset="0" stop-color="${C.red}"/>
      <stop offset="1" stop-color="${C.gold}"/>
    </linearGradient>
  </defs>
  <style>
    text { font-family: ${MONO}; font-size: 15px; }
    .key { fill: ${C.gold}; font-weight: 700; }
    .val { fill: ${C.text}; }
    .dim { fill: ${C.muted}; }
    .fade, .row { opacity: 0; animation: in .5s ease-out forwards; }
    .row { animation-name: slide; }
    @keyframes in { to { opacity: 1; } }
    @keyframes slide { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }
  </style>

  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="${C.bg}" stroke="${C.line}" stroke-width="1.5"/>
  <path d="M1 15 a14 14 0 0 1 14 -14 H${W - 15} a14 14 0 0 1 14 14 V38 H1 Z" fill="${C.panel}"/>
  <rect x="1" y="38" width="${W - 2}" height="2" fill="url(#edge)"/>
  <circle cx="24" cy="20" r="6.5" fill="#FF5F56"/>
  <circle cx="45" cy="20" r="6.5" fill="#FFBD2E"/>
  <circle cx="66" cy="20" r="6.5" fill="#27C93F"/>
  <text x="${W / 2}" y="25" fill="${C.muted}" font-size="13" text-anchor="middle">sameer@stark2028: ~</text>

  <text x="24" y="70" xml:space="preserve">${prompt}<tspan fill="${C.text}">${typed}</tspan></text>

  ${compass(160, 268)}

  <g class="fade" style="animation-delay:1.3s">
    <text x="${keyX}" y="112" font-size="17"><tspan fill="${C.red}" font-weight="700">sameer</tspan><tspan fill="${C.text}">@</tspan><tspan fill="${C.gold}" font-weight="700">stark2028</tspan></text>
    <rect x="${keyX}" y="122" width="190" height="2" rx="1" fill="url(#edge)"/>
  </g>
  ${rows}
  <g class="fade" style="animation-delay:${(1.5 + INFO.length * 0.13).toFixed(2)}s">${swatches}</g>

  <g class="fade" style="animation-delay:${(1.8 + INFO.length * 0.13).toFixed(2)}s">
    <text x="${keyX}" y="${H - 22}" xml:space="preserve">${prompt}<tspan fill="${C.arc}">█<animate attributeName="fill-opacity" values="1;0" dur="1.1s" calcMode="discrete" repeatCount="indefinite"/></tspan></text>
  </g>
</svg>`;
}

// ---------------------------------------------------------------- project cards

const PROJECTS = [
  {
    file: 'offgrid',
    num: '01',
    title: 'OffGrid',
    status: { label: 'BUILDING', color: C.gold },
    tagline: 'Emergency navigation with zero internet.',
    desc: [
      'On-device bidirectional A* over a road graph compiled',
      'from OpenStreetMap. Runs in airplane mode on Android.',
    ],
    chips: ['no backend', 'fuzzed vs Dijkstra oracle'],
    tags: ['TypeScript', 'Python', 'React', 'Capacitor', 'MapLibre'],
  },
  {
    file: 'gather',
    num: '02',
    title: 'Gather',
    status: { label: 'LIVE', color: C.green },
    tagline: 'Fair, explainable meetups for small groups.',
    desc: [
      'Checks every venue and 15-min slot against each',
      "person's free time, walking limit and budget.",
    ],
    chips: ['367 tests', '9 REST APIs', '3 ranked plans'],
    tags: ['TypeScript', 'React', 'AWS Lambda', 'DynamoDB'],
  },
  {
    file: 'aplus',
    num: '03',
    title: 'Aplus Tech',
    status: { label: 'LIVE', color: C.green },
    tagline: 'Production B2B product catalog platform.',
    desc: [
      'Next.js 16 + React 19, 200+ statically generated pages,',
      'real-time Firestore chat with per-conversation auth.',
    ],
    chips: ['4,100+ tests', '72 suites', '427 commits'],
    tags: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Zod'],
  },
  {
    file: 'assetvault',
    num: '04',
    title: 'AssetVault',
    status: { label: 'CLI · WEB', color: C.arc },
    tagline: 'Deduplicated binary asset sync for game dev.',
    desc: [
      'FastCDC chunking + Merkle trees sync big binaries;',
      'pessimistic file locks stop merge-proof conflicts.',
    ],
    chips: ['FastCDC', 'Merkle trees', 'file locking'],
    tags: ['TypeScript', 'Node.js', 'Express', 'WebSocket', 'S3'],
  },
];

// Monospace advance is ~0.6em in every common coding font, which makes pill
// widths predictable without measuring text.
const pillWidth = (label, size) => Math.ceil(label.length * size * 0.6) + 18;

function pills(labels, { x, y, size, fill, stroke, color, gap = 7 }) {
  let cx = x;
  return labels
    .map((label) => {
      const w = pillWidth(label, size);
      const out = `<rect x="${cx}" y="${y}" width="${w}" height="${size + 12}" rx="${(size + 12) / 2}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="1.2"` : ''}/>
    <text x="${cx + w / 2}" y="${y + (size + 12) / 2 + 0.5}" fill="${color}" font-family="${MONO}" font-size="${size}" text-anchor="middle" dominant-baseline="central">${esc(label)}</text>`;
      cx += w + gap;
      return out;
    })
    .join('\n    ');
}

function card(p) {
  const W = 440;
  const H = 250;
  const sw = pillWidth(p.status.label, 11) + 14;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
  <title id="t">${esc(p.title)} — ${esc(p.tagline)}</title>
  <desc id="d">${esc(p.desc.join(' '))} ${esc(p.chips.join(', '))}. Built with ${esc(p.tags.join(', '))}.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.panel}"/>
      <stop offset="1" stop-color="${C.bg}"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" x2="1">
      <stop offset="0" stop-color="${C.red}"/>
      <stop offset="1" stop-color="${C.gold}"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="card"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14"/></clipPath>
  </defs>
  <style>
    .title { font-family: ${SANS}; font-size: 22px; font-weight: 700; fill: ${C.text}; }
    .tag { font-family: ${SANS}; font-size: 14px; font-weight: 600; fill: ${C.soft}; }
    .desc { font-family: ${SANS}; font-size: 13px; fill: ${C.muted}; }
    .pulse { animation: pulse 1.6s ease-in-out infinite; }
    @keyframes pulse { 50% { opacity: .25; } }
  </style>

  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="url(#bg)" stroke="${C.line}" stroke-width="1.5"/>
  <g clip-path="url(#card)">
    <rect x="0" y="0" width="${W}" height="4" fill="url(#edge)"/>
    <rect x="-140" y="0" width="140" height="4" fill="url(#shine)">
      <animate attributeName="x" from="-140" to="${W}" dur="3.5s" repeatCount="indefinite"/>
    </rect>
    <text x="${W - 12}" y="${H + 22}" fill="${C.text}" opacity=".04" font-family="${MONO}" font-size="120" font-weight="800" text-anchor="end">${p.num}</text>
  </g>

  <text x="24" y="50" fill="${C.gold}" font-family="${MONO}" font-size="15" font-weight="700">${p.num}</text>
  <rect x="48" y="37" width="2" height="18" fill="${C.red}"/>
  <text x="60" y="53" class="title">${esc(p.title)}</text>

  <rect x="${W - 22 - sw}" y="33" width="${sw}" height="24" rx="12" fill="${C.bg}" stroke="${p.status.color}" stroke-opacity=".55" stroke-width="1.2"/>
  <circle class="pulse" cx="${W - 22 - sw + 13}" cy="45" r="4" fill="${p.status.color}"/>
  <text x="${W - 22 - sw + 23}" y="45.5" fill="${p.status.color}" font-family="${MONO}" font-size="11" font-weight="700" dominant-baseline="central">${esc(p.status.label)}</text>

  <text x="24" y="86" class="tag">${esc(p.tagline)}</text>
  <text x="24" y="112" class="desc">${esc(p.desc[0])}</text>
  <text x="24" y="130" class="desc">${esc(p.desc[1])}</text>

  ${pills(p.chips, { x: 24, y: 150, size: 12, fill: 'none', stroke: C.red, color: C.gold })}

  <line x1="24" y1="194" x2="${W - 24}" y2="194" stroke="${C.line}" stroke-dasharray="2 4"/>
    ${pills(p.tags, { x: 24, y: 206, size: 11, fill: C.chip, color: C.soft, gap: 6 })}
</svg>`;
}

// ---------------------------------------------------------------- main

write('assets/divider.svg', divider());
write('assets/terminal.svg', terminal());
for (const p of PROJECTS) {
  const w = (labels, size, gap) => labels.reduce((sum, l) => sum + pillWidth(l, size) + gap, -gap);
  const widest = Math.max(w(p.chips, 12, 7), w(p.tags, 11, 6));
  if (widest > 392) throw new Error(`${p.title}: pills are ${widest}px wide, card fits 392`);
  write(`assets/projects/${p.file}.svg`, card(p));
}
