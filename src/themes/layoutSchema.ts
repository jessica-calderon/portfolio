/** Immutable authored theme ids — never overwritten by visitor layouts. */
export type AuthoredThemeId = 'default' | 'jessicas-custom';

export type BackgroundStyle = 'solid' | 'gradient' | 'pattern';
export type BackgroundPattern =
  | 'dots'
  | 'stars'
  | 'hearts'
  | 'checkerboard'
  | 'diagonal'
  | 'sparkles';
export type BorderWidth = 'thin' | 'medium' | 'thick';
export type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double';
export type HeaderStyle = 'solid' | 'gradient';

export interface LayoutEffects {
  sparkles: boolean;
  floatingHearts: boolean;
  starBackground: boolean;
  boxGlow: boolean;
  linkGlow: boolean;
  cursorTrail: boolean;
}

/** Declarative visitor (and builder draft) layout — no arbitrary CSS. */
export interface VisitorLayoutValues {
  backgroundColor: string;
  backgroundStyle: BackgroundStyle;
  backgroundPattern: BackgroundPattern;
  backgroundGradientEnd: string;
  boxBackground: string;
  borderColor: string;
  borderWidth: BorderWidth;
  borderStyle: BorderStyle;
  headerBackground: string;
  headerGradientEnd: string;
  headerTextColor: string;
  headerStyle: HeaderStyle;
  primaryTextColor: string;
  headingColor: string;
  linkColor: string;
  fontFamily: string;
  effects: LayoutEffects;
}

export interface VisitorLayout extends VisitorLayoutValues {
  id: string;
  name: string;
  basedOn: AuthoredThemeId;
  createdAt: number;
  updatedAt: number;
}

export const FONT_OPTIONS = [
  'Arial',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Georgia',
  'Times New Roman',
  'Comic Sans MS',
] as const;

export const PATTERN_OPTIONS: { id: BackgroundPattern; label: string }[] = [
  { id: 'dots', label: 'Dots' },
  { id: 'stars', label: 'Stars' },
  { id: 'hearts', label: 'Hearts' },
  { id: 'checkerboard', label: 'Checkerboard' },
  { id: 'diagonal', label: 'Diagonal stripes' },
  { id: 'sparkles', label: 'Sparkles' },
];

const DEFAULT_EFFECTS: LayoutEffects = {
  sparkles: false,
  floatingHearts: false,
  starBackground: false,
  boxGlow: false,
  linkGlow: false,
  cursorTrail: false,
};

/** Snapshot used when starting the builder from Default (approximate). */
export function createDefaultStartValues(): VisitorLayoutValues {
  return {
    backgroundColor: '#e5e7eb',
    backgroundStyle: 'solid',
    backgroundPattern: 'dots',
    backgroundGradientEnd: '#dbeafe',
    boxBackground: '#ffffff',
    borderColor: '#3b82f6',
    borderWidth: 'medium',
    borderStyle: 'solid',
    headerBackground: '#f97316',
    headerGradientEnd: '#ea580c',
    headerTextColor: '#ffffff',
    headerStyle: 'solid',
    primaryTextColor: '#111827',
    headingColor: '#111827',
    linkColor: '#2563eb',
    fontFamily: 'Verdana',
    effects: { ...DEFAULT_EFFECTS },
  };
}

/** Snapshot used when starting from Jessica's Custom light look (copy, not live edit). */
export function createJessicasCustomStartValues(): VisitorLayoutValues {
  return {
    backgroundColor: '#fecdd3',
    backgroundStyle: 'gradient',
    backgroundPattern: 'sparkles',
    backgroundGradientEnd: '#c084fc',
    boxBackground: '#ffffff',
    borderColor: '#ec4899',
    borderWidth: 'medium',
    borderStyle: 'solid',
    headerBackground: '#ec4899',
    headerGradientEnd: '#a855f7',
    headerTextColor: '#ffffff',
    headerStyle: 'gradient',
    primaryTextColor: '#4c1d95',
    headingColor: '#4c1d95',
    linkColor: '#db2777',
    fontFamily: 'Comic Sans MS',
    effects: {
      ...DEFAULT_EFFECTS,
      sparkles: true,
      boxGlow: true,
    },
  };
}

export function createVisitorLayout(
  basedOn: AuthoredThemeId,
  name = 'My Custom Layout'
): VisitorLayout {
  const values =
    basedOn === 'jessicas-custom'
      ? createJessicasCustomStartValues()
      : createDefaultStartValues();
  const now = Date.now();
  return {
    id: `visitor-${now}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    basedOn,
    createdAt: now,
    updatedAt: now,
    ...values,
  };
}

export function borderWidthPx(width: BorderWidth): string {
  if (width === 'thin') return '1px';
  if (width === 'thick') return '4px';
  return '2px';
}

/** Relative luminance 0–1 (sRGB). */
export function relativeLuminance(hex: string): number {
  const cleaned = hex.replace('#', '');
  if (cleaned.length !== 6) return 0.5;
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = toLinear(parseInt(cleaned.slice(0, 2), 16));
  const g = toLinear(parseInt(cleaned.slice(2, 4), 16));
  const b = toLinear(parseInt(cleaned.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function ensureReadableText(bg: string, text: string, minRatio = 4.5): string {
  if (contrastRatio(bg, text) >= minRatio) return text;
  return relativeLuminance(bg) > 0.55 ? '#111827' : '#f9fafb';
}

export function collectContrastWarnings(v: VisitorLayoutValues): string[] {
  const warnings: string[] = [];
  if (contrastRatio(v.boxBackground, v.primaryTextColor) < 4.5) {
    warnings.push('Body text contrast is low against box background.');
  }
  if (contrastRatio(v.boxBackground, v.headingColor) < 3) {
    warnings.push('Heading contrast is low against box background.');
  }
  if (contrastRatio(v.boxBackground, v.linkColor) < 3) {
    warnings.push('Link contrast is low against box background.');
  }
  if (contrastRatio(v.headerBackground, v.headerTextColor) < 3) {
    warnings.push('Header text contrast is low.');
  }
  return warnings;
}

/** Apply layout tokens to an element (profile root). Never touches XP windows. */
export function applyLayoutTokens(
  el: HTMLElement | null,
  values: VisitorLayoutValues | null
): void {
  if (!el) return;
  if (!values) {
    [
      '--profile-bg',
      '--profile-bg-end',
      '--profile-box-bg',
      '--profile-border',
      '--profile-border-width',
      '--profile-border-style',
      '--profile-header-bg',
      '--profile-header-end',
      '--profile-header-text',
      '--profile-text',
      '--profile-heading',
      '--profile-link',
      '--profile-font',
    ].forEach((k) => el.style.removeProperty(k));
    el.removeAttribute('data-bg-style');
    el.removeAttribute('data-bg-pattern');
    el.removeAttribute('data-header-style');
    el.removeAttribute('data-box-glow');
    el.removeAttribute('data-link-glow');
    return;
  }

  const text = ensureReadableText(values.boxBackground, values.primaryTextColor);
  const heading = ensureReadableText(values.boxBackground, values.headingColor, 3);
  const link = ensureReadableText(values.boxBackground, values.linkColor, 3);
  const headerText = ensureReadableText(values.headerBackground, values.headerTextColor, 3);

  el.style.setProperty('--profile-bg', values.backgroundColor);
  el.style.setProperty('--profile-bg-end', values.backgroundGradientEnd);
  el.style.setProperty('--profile-box-bg', values.boxBackground);
  el.style.setProperty('--profile-border', values.borderColor);
  el.style.setProperty('--profile-border-width', borderWidthPx(values.borderWidth));
  el.style.setProperty('--profile-border-style', values.borderStyle);
  el.style.setProperty('--profile-header-bg', values.headerBackground);
  el.style.setProperty('--profile-header-end', values.headerGradientEnd);
  el.style.setProperty('--profile-header-text', headerText);
  el.style.setProperty('--profile-text', text);
  el.style.setProperty('--profile-heading', heading);
  el.style.setProperty('--profile-link', link);
  el.style.setProperty('--profile-font', values.fontFamily);

  el.setAttribute('data-bg-style', values.backgroundStyle);
  el.setAttribute('data-bg-pattern', values.backgroundPattern);
  el.setAttribute('data-header-style', values.headerStyle);
  el.setAttribute('data-box-glow', values.effects.boxGlow ? '1' : '0');
  el.setAttribute('data-link-glow', values.effects.linkGlow ? '1' : '0');
}

const CURATED_PALETTES: Array<Partial<VisitorLayoutValues>> = [
  {
    backgroundColor: '#1a0533',
    backgroundGradientEnd: '#4c1d95',
    boxBackground: '#2e1065',
    borderColor: '#c084fc',
    headerBackground: '#7e22ce',
    headerGradientEnd: '#db2777',
    headerTextColor: '#fdf4ff',
    primaryTextColor: '#f3e8ff',
    headingColor: '#fce7f3',
    linkColor: '#f0abfc',
    fontFamily: 'Comic Sans MS',
    backgroundStyle: 'gradient',
    headerStyle: 'gradient',
  },
  {
    backgroundColor: '#ecfccb',
    backgroundGradientEnd: '#a7f3d0',
    boxBackground: '#ffffff',
    borderColor: '#65a30d',
    headerBackground: '#84cc16',
    headerGradientEnd: '#22c55e',
    headerTextColor: '#14532d',
    primaryTextColor: '#14532d',
    headingColor: '#166534',
    linkColor: '#15803d',
    fontFamily: 'Trebuchet MS',
    backgroundStyle: 'pattern',
    backgroundPattern: 'dots',
  },
  {
    backgroundColor: '#0f172a',
    backgroundGradientEnd: '#1e293b',
    boxBackground: '#1e293b',
    borderColor: '#38bdf8',
    headerBackground: '#0369a1',
    headerGradientEnd: '#0ea5e9',
    headerTextColor: '#e0f2fe',
    primaryTextColor: '#e2e8f0',
    headingColor: '#bae6fd',
    linkColor: '#7dd3fc',
    fontFamily: 'Tahoma',
    backgroundStyle: 'solid',
    headerStyle: 'solid',
  },
  {
    backgroundColor: '#fff1f2',
    backgroundGradientEnd: '#fecdd3',
    boxBackground: '#fff7ed',
    borderColor: '#f43f5e',
    headerBackground: '#fb7185',
    headerGradientEnd: '#f97316',
    headerTextColor: '#ffffff',
    primaryTextColor: '#881337',
    headingColor: '#9f1239',
    linkColor: '#e11d48',
    fontFamily: 'Comic Sans MS',
    backgroundStyle: 'pattern',
    backgroundPattern: 'hearts',
    borderStyle: 'dashed',
    borderWidth: 'thick',
  },
  {
    backgroundColor: '#111827',
    backgroundGradientEnd: '#374151',
    boxBackground: '#1f2937',
    borderColor: '#fbbf24',
    headerBackground: '#b45309',
    headerGradientEnd: '#f59e0b',
    headerTextColor: '#fffbeb',
    primaryTextColor: '#f3f4f6',
    headingColor: '#fde68a',
    linkColor: '#fbbf24',
    fontFamily: 'Georgia',
    backgroundStyle: 'gradient',
    borderStyle: 'double',
  },
];

export function randomizeLayoutValues(base: VisitorLayoutValues): VisitorLayoutValues {
  const palette = CURATED_PALETTES[Math.floor(Math.random() * CURATED_PALETTES.length)];
  const patterns: BackgroundPattern[] = [
    'dots',
    'stars',
    'hearts',
    'checkerboard',
    'diagonal',
    'sparkles',
  ];
  const borders: BorderStyle[] = ['solid', 'dashed', 'dotted', 'double'];
  const widths: BorderWidth[] = ['thin', 'medium', 'thick'];
  const fonts = [...FONT_OPTIONS];

  const next: VisitorLayoutValues = {
    ...base,
    ...palette,
    backgroundPattern:
      palette.backgroundPattern ||
      patterns[Math.floor(Math.random() * patterns.length)],
    borderStyle: borders[Math.floor(Math.random() * borders.length)],
    borderWidth: widths[Math.floor(Math.random() * widths.length)],
    fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
    effects: {
      sparkles: Math.random() > 0.45,
      floatingHearts: Math.random() > 0.7,
      starBackground: Math.random() > 0.55,
      boxGlow: Math.random() > 0.4,
      linkGlow: Math.random() > 0.5,
      cursorTrail: Math.random() > 0.75,
    },
  };

  next.primaryTextColor = ensureReadableText(next.boxBackground, next.primaryTextColor);
  next.headingColor = ensureReadableText(next.boxBackground, next.headingColor, 3);
  next.linkColor = ensureReadableText(next.boxBackground, next.linkColor, 3);
  next.headerTextColor = ensureReadableText(next.headerBackground, next.headerTextColor, 3);
  return next;
}

/** Progressive “Make It More MySpace” intensity (0–5). */
export function intensifyMyspace(
  values: VisitorLayoutValues,
  stage: number
): VisitorLayoutValues {
  const next = { ...values, effects: { ...values.effects } };
  const s = Math.min(5, Math.max(0, stage));
  if (s >= 1) {
    next.borderWidth = 'thick';
    next.borderStyle = s >= 3 ? 'dashed' : 'solid';
  }
  if (s >= 2) {
    next.headerStyle = 'gradient';
  }
  if (s >= 3) {
    next.backgroundStyle = 'pattern';
    next.backgroundPattern = 'sparkles';
  }
  if (s >= 4) {
    next.effects.linkGlow = true;
    next.effects.boxGlow = true;
  }
  if (s >= 5) {
    next.effects.sparkles = true;
    next.effects.floatingHearts = true;
    next.fontFamily = 'Comic Sans MS';
  }
  return next;
}

export function isValidHex(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}

export function sanitizeVisitorLayout(raw: unknown): VisitorLayout | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const basedOn = o.basedOn === 'jessicas-custom' ? 'jessicas-custom' : 'default';
  const base = createVisitorLayout(basedOn, typeof o.name === 'string' ? o.name.slice(0, 48) : 'My Custom Layout');

  const pickHex = (v: unknown, fallback: string) =>
    typeof v === 'string' && isValidHex(v) ? v : fallback;
  const fonts = FONT_OPTIONS as readonly string[];

  return {
    ...base,
    id: typeof o.id === 'string' ? o.id.slice(0, 64) : base.id,
    name: typeof o.name === 'string' && o.name.trim() ? o.name.trim().slice(0, 48) : base.name,
    basedOn,
    backgroundColor: pickHex(o.backgroundColor, base.backgroundColor),
    backgroundStyle:
      o.backgroundStyle === 'gradient' || o.backgroundStyle === 'pattern'
        ? o.backgroundStyle
        : 'solid',
    backgroundPattern: PATTERN_OPTIONS.some((p) => p.id === o.backgroundPattern)
      ? (o.backgroundPattern as BackgroundPattern)
      : base.backgroundPattern,
    backgroundGradientEnd: pickHex(o.backgroundGradientEnd, base.backgroundGradientEnd),
    boxBackground: pickHex(o.boxBackground, base.boxBackground),
    borderColor: pickHex(o.borderColor, base.borderColor),
    borderWidth:
      o.borderWidth === 'thin' || o.borderWidth === 'thick' ? o.borderWidth : 'medium',
    borderStyle: ['solid', 'dashed', 'dotted', 'double'].includes(String(o.borderStyle))
      ? (o.borderStyle as BorderStyle)
      : 'solid',
    headerBackground: pickHex(o.headerBackground, base.headerBackground),
    headerGradientEnd: pickHex(o.headerGradientEnd, base.headerGradientEnd),
    headerTextColor: pickHex(o.headerTextColor, base.headerTextColor),
    headerStyle: o.headerStyle === 'gradient' ? 'gradient' : 'solid',
    primaryTextColor: pickHex(o.primaryTextColor, base.primaryTextColor),
    headingColor: pickHex(o.headingColor, base.headingColor),
    linkColor: pickHex(o.linkColor, base.linkColor),
    fontFamily: fonts.includes(String(o.fontFamily)) ? String(o.fontFamily) : base.fontFamily,
    effects: {
      sparkles: Boolean((o.effects as LayoutEffects | undefined)?.sparkles),
      floatingHearts: Boolean((o.effects as LayoutEffects | undefined)?.floatingHearts),
      starBackground: Boolean((o.effects as LayoutEffects | undefined)?.starBackground),
      boxGlow: Boolean((o.effects as LayoutEffects | undefined)?.boxGlow),
      linkGlow: Boolean((o.effects as LayoutEffects | undefined)?.linkGlow),
      cursorTrail: Boolean((o.effects as LayoutEffects | undefined)?.cursorTrail),
    },
    createdAt: typeof o.createdAt === 'number' ? o.createdAt : base.createdAt,
    updatedAt: Date.now(),
  };
}
