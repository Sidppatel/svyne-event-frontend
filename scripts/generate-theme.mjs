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

const SEMANTIC = `
:root {
  --canvas: var(--color-sand-200);
  --surface: var(--color-sand-100);
  --surface-sunken: var(--color-sand-300);
  --ink: var(--color-sand-900);
  --ink-soft: var(--color-sand-700);
  --ink-faint: var(--color-sand-600);
  --hairline: var(--color-sand-400);
  --hairline-strong: var(--color-sand-500);

  --brand: var(--color-burgundy-100);
  --brand-hover: var(--color-burgundy-200);
  --brand-ink: var(--color-sand-100);
  --voltage-accent: var(--color-gold-200);
  --voltage-accent-ink: var(--color-gold-500);

  --status-success: var(--color-green-300);
  --status-warn: var(--color-gold-400);
  --status-danger: var(--color-red-200);
  --status-danger-on-dark: var(--color-red-100);

  --stage: var(--color-sand-900);
  --stage-elevated: var(--color-sand-800);
  --on-stage: var(--color-sand-200);
  --on-stage-soft: var(--color-sand-500);

  --font-body-stack: 'Inter', -apple-system, system-ui, sans-serif;
  --font-display-stack: 'Fraunces', 'Georgia', serif;
  --font-mono-stack: 'JetBrains Mono', ui-monospace, monospace;

  --radius-input: 4px;
  --radius-card: 10px;
  --radius-sheet: 16px;

  --shadow-e1: 0 1px 2px color-mix(in srgb, var(--ink) 6%, transparent), 0 4px 12px color-mix(in srgb, var(--ink) 6%, transparent);
  --shadow-e2: 0 2px 4px color-mix(in srgb, var(--ink) 8%, transparent), 0 16px 40px color-mix(in srgb, var(--ink) 14%, transparent);

  --t-instant: 90ms;
  --t-quick: 180ms;
  --t-move: 280ms;
  --t-scene: 480ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.4, 0.64, 1);

  --voltage: 0.5;

  --background: var(--canvas);
  --foreground: var(--ink);
  --card: var(--surface);
  --card-foreground: var(--ink);
  --popover: var(--surface);
  --popover-foreground: var(--ink);
  --primary: var(--brand);
  --primary-foreground: var(--brand-ink);
  --secondary: var(--surface-sunken);
  --secondary-foreground: var(--ink);
  --muted: var(--surface-sunken);
  --muted-foreground: var(--ink-soft);
  --accent: var(--surface-sunken);
  --accent-foreground: var(--ink);
  --marigold: var(--voltage-accent);
  --marigold-foreground: var(--voltage-accent-ink);
  --success: var(--status-success);
  --success-foreground: var(--color-sand-100);
  --warning: var(--status-warn);
  --destructive: var(--status-danger);
  --destructive-foreground: var(--color-sand-100);
  --border: var(--hairline);
  --input: var(--hairline-strong);
  --ring: var(--brand);
  --radius: var(--radius-card);

  --brand-font: var(--font-body-stack);
  --brand-font-display: var(--font-display-stack);
  --brand-font-mono: var(--font-mono-stack);
  --brand-primary: var(--brand);
  --brand-secondary: var(--surface-sunken);
  --brand-accent: var(--voltage-accent);

  --surface-900: var(--canvas);
  --surface-800: var(--surface);
  --surface-700: var(--surface);
  --surface-canvas: var(--canvas);
  --surface-card: var(--surface);
  --accent-burgundy: var(--brand);
  --accent-gold: var(--voltage-accent);
  --border-strong: var(--hairline-strong);
  --border-soft: var(--surface-sunken);
  --amber: var(--status-warn);
  --amber-foreground: var(--voltage-accent-ink);
  --gradient-bg: none;
}

[data-portal='developer'] {
  --brand: var(--color-purple-300);
  --brand-hover: var(--color-purple-400);
  --voltage-accent: var(--color-gold-300);
  --voltage-accent-ink: var(--color-gold-500);
  --status-success: var(--color-teal-100);
  --stage: var(--color-purple-600);
  --stage-elevated: var(--color-purple-500);
  --on-stage: var(--color-purple-100);
  --on-stage-soft: var(--color-purple-200);
}

[data-portal='admin'] {
  --brand: var(--color-green-400);
  --brand-hover: var(--color-green-500);
  --voltage-accent: var(--color-gold-100);
  --voltage-accent-ink: var(--color-gold-500);
  --stage: var(--color-green-700);
  --stage-elevated: var(--color-green-600);
  --on-stage: var(--color-green-100);
  --on-stage-soft: var(--color-green-200);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-marigold: var(--marigold);
  --color-marigold-foreground: var(--marigold-foreground);
  --color-amber: var(--amber);
  --color-amber-foreground: var(--amber-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-danger: var(--destructive);
  --color-danger-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-canvas: var(--canvas);
  --color-canvas-soft: var(--surface-sunken);
  --color-surface: var(--surface);
  --color-surface-sunken: var(--surface-sunken);
  --color-surface-strong: var(--hairline);
  --color-surface-dark: var(--stage);
  --color-surface-dark-elevated: var(--stage-elevated);
  --color-stage: var(--stage);
  --color-stage-elevated: var(--stage-elevated);
  --color-ink: var(--ink);
  --color-ink-soft: var(--ink-soft);
  --color-ink-faint: var(--ink-faint);
  --color-body: var(--ink-soft);
  --color-on-dark: var(--on-stage);
  --color-on-dark-soft: var(--on-stage-soft);
  --color-on-stage: var(--on-stage);
  --color-on-stage-soft: var(--on-stage-soft);
  --color-text-link: var(--brand);
  --color-text-link-secondary: var(--voltage-accent);
  --color-hairline: var(--hairline);
  --color-hairline-soft: var(--surface-sunken);
  --color-hairline-strong: var(--hairline-strong);
  --color-brand: var(--brand);
  --color-brand-hover: var(--brand-hover);
  --color-brand-ink: var(--brand-ink);
  --color-voltage: var(--voltage-accent);
  --color-voltage-ink: var(--voltage-accent-ink);

  --color-surface-900: var(--surface-900);
  --color-surface-800: var(--surface-800);
  --color-surface-700: var(--surface-700);
  --color-surface-canvas: var(--surface-canvas);
  --color-surface-card: var(--surface-card);
  --color-accent-burgundy: var(--accent-burgundy);
  --color-accent-gold: var(--accent-gold);
  --color-border-strong: var(--border-strong);
  --color-border-soft: var(--border-soft);

  --radius-lg: var(--radius-card);
  --radius-md: 8px;
  --radius-sm: var(--radius-input);
  --radius-xl: var(--radius-sheet);

  --shadow-e1: var(--shadow-e1);
  --shadow-e2: var(--shadow-e2);

  --font-sans: var(--font-body-stack);
  --font-display: var(--font-display-stack);
  --font-mono: var(--font-mono-stack);

  --ease-out: var(--ease-out);
  --ease-in-out: var(--ease-in-out);
  --ease-spring: var(--ease-spring);
}
`;

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

const css = `:root {\n${lines.join('\n')}\n}\n${SEMANTIC}`;
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'shared', 'theme', 'theme.css');
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
