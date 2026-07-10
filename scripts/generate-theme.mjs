import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Color, BackgroundColor, Theme } from '@adobe/leonardo-contrast-colors';

const CANVAS = '#faf8f5';

const FAMILIES = {
  sand: {
    keys: ['#faf8f5', '#a8a29e', '#57534e', '#1c1917'],
    tokens: {
      surface: '#ffffff',
      canvas: '#faf8f5',
      'surface-sunken': '#f3f0eb',
      hairline: '#e7e2db',
      'hairline-strong': '#d6cfc5',
      'ink-faint': '#a8a29e',
      'ink-soft': '#57534e',
      'stage-elevated': '#292524',
      ink: '#1c1917',
    },
  },
  burgundy: {
    keys: ['#8a2d3b'],
    tokens: { brand: '#8a2d3b', 'brand-hover': '#792734' },
  },
  gold: {
    keys: ['#e8940a', '#b45309'],
    tokens: {
      'accent-admin': '#f9a825',
      accent: '#e8940a',
      'accent-dev': '#d99b00',
      warn: '#b45309',
      'accent-ink': '#201400',
    },
  },
  green: {
    keys: ['#3a7d44', '#2e7d32'],
    tokens: {
      'on-stage': '#f3f8f2',
      'on-stage-soft': '#c4d6c4',
      success: '#3a7d44',
      brand: '#2e7d32',
      'brand-hover': '#27682a',
      'stage-elevated': '#1a3220',
      stage: '#0f2211',
    },
  },
  teal: {
    keys: ['#00695c'],
    tokens: { success: '#00695c' },
  },
  red: {
    keys: ['#b3261e'],
    tokens: { 'danger-on-dark': '#ff4d4d', danger: '#b3261e' },
  },
  purple: {
    keys: ['#4a148c'],
    tokens: {
      'on-stage': '#f6f2fb',
      'on-stage-soft': '#cbbfdd',
      brand: '#4a148c',
      'brand-hover': '#3b1072',
      'stage-elevated': '#241239',
      stage: '#190b2b',
    },
  },
};

function luminance(hex) {
  const c = (i) => {
    const s = parseInt(hex.slice(i, i + 2), 16) / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * c(1) + 0.7152 * c(3) + 0.0722 * c(5);
}

function signedRatio(hex) {
  const la = luminance(hex);
  const lb = luminance(CANVAS);
  const ratio = (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  return la > lb ? -ratio : ratio;
}

const colors = [];
const stepByToken = {};
for (const [family, def] of Object.entries(FAMILIES)) {
  const entries = Object.entries(def.tokens)
    .map(([token, hex]) => ({ token, hex, ratio: signedRatio(hex) }))
    .sort((a, b) => a.ratio - b.ratio);
  const ratios = {};
  entries.forEach((e, i) => {
    const step = (i + 1) * 100;
    ratios[String(step)] = Math.round(e.ratio * 100) / 100;
    stepByToken[`${family}/${e.token}`] = `--color-${family}-${step}`;
  });
  const Ctor = family === 'sand' ? BackgroundColor : Color;
  colors.push(new Ctor({ name: family, colorKeys: def.keys, ratios, colorSpace: 'CAM02', smooth: true }));
}

const theme = new Theme({
  colors,
  backgroundColor: colors[0],
  lightness: 98,
  contrast: 1,
  saturation: 100,
  output: 'HEX',
});

const lines = [];
const report = [];
for (const group of theme.contrastColors) {
  if (!group.values) continue;
  for (const v of group.values) {
    lines.push(`  --color-${group.name}-${v.name}: ${v.value};`);
    report.push({ name: `${group.name}-${v.name}`, value: v.value, contrast: v.contrast });
  }
}

const css = `:root {\n${lines.join('\n')}\n}\n`;
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'shared', 'theme', 'palette.css');
writeFileSync(out, css);

console.log(`wrote ${out} (${report.length} colors)`);
console.log('\ntoken -> scale step mapping:');
for (const [token, step] of Object.entries(stepByToken)) {
  console.log(`  ${token} -> var(${step})`);
}
console.log('\ncontrast vs canvas:');
for (const r of report) {
  console.log(`  ${r.name} ${r.value} ${r.contrast}`);
}
