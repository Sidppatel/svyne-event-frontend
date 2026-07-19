export function isHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

function expandHex(hex: string): string {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  return hex;
}

export function hexToRgb(hex: string): [number, number, number] | null {
  if (!isHexColor(hex)) {
    return null;
  }
  const full = expandHex(hex);
  return [
    parseInt(full.slice(1, 3), 16),
    parseInt(full.slice(3, 5), 16),
    parseInt(full.slice(5, 7), 16),
  ];
}

function channelLuminance(channel: number): number {
  const scaled = channel / 255;
  return scaled <= 0.03928 ? scaled / 12.92 : Math.pow((scaled + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return 0;
  }
  return (
    0.2126 * channelLuminance(rgb[0]) +
    0.7152 * channelLuminance(rgb[1]) +
    0.0722 * channelLuminance(rgb[2])
  );
}

export function mixHex(hexA: string, hexB: string, weightA: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  if (!a || !b) {
    return hexA;
  }
  const channel = (i: number) =>
    Math.round(a[i] * weightA + b[i] * (1 - weightA))
      .toString(16)
      .padStart(2, '0');
  return `#${channel(0)}${channel(1)}${channel(2)}`;
}

export function contrastRatio(hexA: string, hexB: string): number {
  const lumA = relativeLuminance(hexA);
  const lumB = relativeLuminance(hexB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

export type ContrastGrade = 'AAA' | 'AA' | 'AA Large' | 'Fail';

export function contrastGrade(hexA: string, hexB: string): ContrastGrade {
  const ratio = contrastRatio(hexA, hexB);
  if (ratio >= 7) {
    return 'AAA';
  }
  if (ratio >= 4.5) {
    return 'AA';
  }
  if (ratio >= 3) {
    return 'AA Large';
  }
  return 'Fail';
}

export function resolveCssColor(varName: string, alpha?: number): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  if (alpha === undefined) {
    return value;
  }
  const rgb = hexToRgb(value);
  return rgb ? `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})` : value;
}

export function readableTextOn(backgroundHex: string): string {
  const darkCandidate = resolveCssColor('--branding-contrast-dark-candidate');
  const lightCandidate = resolveCssColor('--branding-contrast-light-candidate');
  return contrastRatio(backgroundHex, darkCandidate) >= contrastRatio(backgroundHex, lightCandidate)
    ? darkCandidate
    : lightCandidate;
}

export interface TenantBranding {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  button: string;
  highlight: string;
  tokens: Record<string, string>;
  logoUrl: string | null;
  tenantName: string;
}

export const ADVANCED_BRANDING_TOKENS: { token: string; label: string; hint: string }[] = [
  { token: 'surface', label: 'Surface', hint: 'Cards and panels' },
  { token: 'surface-sunken', label: 'Surface sunken', hint: 'Muted panels and wells' },
  { token: 'ink-soft', label: 'Text soft', hint: 'Body copy and captions' },
  { token: 'ink-faint', label: 'Text faint', hint: 'Placeholders and disabled text' },
  { token: 'hairline', label: 'Border', hint: 'Default borders and dividers' },
  { token: 'hairline-strong', label: 'Border strong', hint: 'Input outlines and emphasis borders' },
  { token: 'brand-hover', label: 'Primary hover', hint: 'Hover state of primary elements' },
  { token: 'brand-ink', label: 'Text on primary', hint: 'Labels on primary-colored fills' },
  { token: 'voltage-accent-ink', label: 'Text on accent', hint: 'Labels on accent-colored fills' },
  { token: 'status-success', label: 'Success', hint: 'Confirmations and paid states' },
  { token: 'status-warn', label: 'Warning', hint: 'Cautions and pending states' },
  { token: 'status-danger', label: 'Danger', hint: 'Errors and destructive actions' },
  { token: 'stage', label: 'Stage', hint: 'Dark sections like footer and checkout' },
  { token: 'stage-elevated', label: 'Stage elevated', hint: 'Raised panels on dark sections' },
  { token: 'on-stage', label: 'Text on stage', hint: 'Text over dark sections' },
  { token: 'on-stage-soft', label: 'Text on stage soft', hint: 'Muted text over dark sections' },
];

const ADVANCED_TOKEN_SET = new Set(ADVANCED_BRANDING_TOKENS.map((entry) => entry.token));

export function parseBrandTokens(json: string): Record<string, string> {
  if (!json) {
    return {};
  }
  try {
    const raw = JSON.parse(json) as Record<string, unknown>;
    const tokens: Record<string, string> = {};
    for (const [key, value] of Object.entries(raw)) {
      if (ADVANCED_TOKEN_SET.has(key) && typeof value === 'string' && isHexColor(value)) {
        tokens[key] = value;
      }
    }
    return tokens;
  } catch {
    return {};
  }
}

export function serializeBrandTokens(tokens: Record<string, string>): string {
  const entries = Object.entries(tokens).filter(
    ([key, value]) => ADVANCED_TOKEN_SET.has(key) && isHexColor(value),
  );
  return entries.length === 0 ? '' : JSON.stringify(Object.fromEntries(entries));
}

export type BrandingColorRole =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'background'
  | 'text'
  | 'button'
  | 'highlight';

const BRANDING_COLOR_ROLES: BrandingColorRole[] = [
  'primary',
  'secondary',
  'accent',
  'background',
  'text',
  'button',
  'highlight',
];

export type BrandingColors = Pick<TenantBranding, BrandingColorRole>;

function readBrandingColors(cssVarPrefix: string): BrandingColors {
  const colors = {} as BrandingColors;
  for (const role of BRANDING_COLOR_ROLES) {
    colors[role] = resolveCssColor(`${cssVarPrefix}-${role}`);
  }
  return colors;
}

let cachedDefaultBranding: TenantBranding | null = null;

export function defaultBranding(): TenantBranding {
  if (!cachedDefaultBranding || !isHexColor(cachedDefaultBranding.primary)) {
    cachedDefaultBranding = {
      ...readBrandingColors('--branding-default'),
      tokens: {},
      logoUrl: null,
      tenantName: '',
    };
  }
  return cachedDefaultBranding;
}

export interface BrandingPreset {
  name: string;
  colors: BrandingColors;
}

const BRANDING_PRESET_SLUGS: { name: string; slug: string }[] = [
  { name: 'TicketSpan Classic', slug: 'ticketspan-classic' },
  { name: 'Midnight Stage', slug: 'midnight-stage' },
  { name: 'Forest Gala', slug: 'forest-gala' },
  { name: 'Coastal Club', slug: 'coastal-club' },
  { name: 'Noir Premiere', slug: 'noir-premiere' },
];

let cachedBrandingPresets: BrandingPreset[] | null = null;

export function brandingPresets(): BrandingPreset[] {
  if (!cachedBrandingPresets || !isHexColor(cachedBrandingPresets[0].colors.primary)) {
    cachedBrandingPresets = BRANDING_PRESET_SLUGS.map(({ name, slug }) => ({
      name,
      colors: readBrandingColors(`--branding-preset-${slug}`),
    }));
  }
  return cachedBrandingPresets;
}

export function brandingCssVars(branding: TenantBranding): Record<string, string> {
  const vars: Record<string, string> = {};
  const fallback = defaultBranding();
  const shadeMixTarget = resolveCssColor('--branding-shade-mix-target');
  const set = (name: string, value: string) => {
    vars[name] = value;
  };
  if (isHexColor(branding.primary)) {
    set('--brand', branding.primary);
    set('--brand-hover', `color-mix(in srgb, ${branding.primary} 85%, ${shadeMixTarget})`);
    set('--brand-ink', readableTextOn(branding.primary));
    set('--ring', branding.primary);
    set('--brand-primary', branding.primary);
  }
  if (isHexColor(branding.secondary)) {
    set('--brand-secondary', branding.secondary);
    set('--secondary', branding.secondary);
    set('--secondary-foreground', readableTextOn(branding.secondary));
  }
  if (isHexColor(branding.accent)) {
    set('--voltage-accent', branding.accent);
    set('--voltage-accent-ink', readableTextOn(branding.accent));
    set('--brand-accent', branding.accent);
  }
  if (isHexColor(branding.background)) {
    set('--canvas', branding.background);
    set('--surface-sunken', `color-mix(in srgb, ${branding.background} 92%, ${branding.text || fallback.text})`);
  }
  if (isHexColor(branding.text)) {
    set('--ink', branding.text);
    set('--ink-soft', `color-mix(in srgb, ${branding.text} 72%, ${branding.background || fallback.background})`);
    set('--ink-faint', `color-mix(in srgb, ${branding.text} 62%, ${branding.background || fallback.background})`);
  }
  if (isHexColor(branding.text) && isHexColor(branding.background)) {
    set('--hairline', `color-mix(in srgb, ${branding.text} 10%, ${branding.background})`);
    set('--hairline-strong', `color-mix(in srgb, ${branding.text} 22%, ${branding.background})`);
    set('--stage', branding.text);
    set('--stage-elevated', `color-mix(in srgb, ${branding.text} 92%, ${branding.background})`);
    set('--on-stage', branding.background);
    set('--on-stage-soft', `color-mix(in srgb, ${branding.background} 70%, ${branding.text})`);
  }
  if (isHexColor(branding.button)) {
    set('--primary', branding.button);
    set('--primary-foreground', readableTextOn(branding.button));
  }
  if (isHexColor(branding.highlight)) {
    set('--marigold', branding.highlight);
    set('--marigold-foreground', readableTextOn(branding.highlight));
  }
  const customTokens = branding.tokens ?? {};
  const tokenHex = (token: string) =>
    isHexColor(customTokens[token] ?? '') ? customTokens[token] : null;
  const backgroundHex = isHexColor(branding.background) ? branding.background : fallback.background;
  const textHex = isHexColor(branding.text) ? branding.text : fallback.text;
  const onStageSoftHex = tokenHex('on-stage-soft') ?? mixHex(backgroundHex, textHex, 0.7);
  const inkSoftHex = tokenHex('ink-soft') ?? mixHex(textHex, backgroundHex, 0.72);
  const MIN_SURFACE_CONTRAST = 3;
  const SURFACE_TOKEN_TEXT: Record<string, string> = {
    stage: onStageSoftHex,
    'stage-elevated': onStageSoftHex,
    surface: inkSoftHex,
    'surface-sunken': inkSoftHex,
  };
  for (const [token, value] of Object.entries(customTokens)) {
    if (!ADVANCED_TOKEN_SET.has(token) || !isHexColor(value)) {
      continue;
    }
    const pairedText = SURFACE_TOKEN_TEXT[token];
    if (pairedText && contrastRatio(value, pairedText) < MIN_SURFACE_CONTRAST) {
      continue;
    }
    set(`--${token}`, value);
  }
  return vars;
}

export function applyBranding(branding: TenantBranding): void {
  if (typeof document === 'undefined') {
    return;
  }
  const root = document.documentElement;
  for (const [name, value] of Object.entries(brandingCssVars(branding))) {
    root.style.setProperty(name, value);
  }
  
  if (branding.logoUrl) {
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = branding.logoUrl;
  }
}
