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
export type CustomizationMode = 'basic' | 'advanced';
export type LayoutTemplate =
  | 'classic-override'
  | 'full-div'
  | 'sidebar'
  | 'graphic-header';
export type NavPlacement = 'top' | 'sidebar';
export type SectionEmphasis = 'feature-first' | 'identity-first' | 'lab-first';

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
  customizationMode: CustomizationMode;
  layoutTemplate: LayoutTemplate;
  navPlacement: NavPlacement;
  sectionEmphasis: SectionEmphasis;
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

export const LAYOUT_TEMPLATES: LayoutTemplate[] = [
  'classic-override',
  'full-div',
  'sidebar',
  'graphic-header',
];

export const NAV_PLACEMENTS: NavPlacement[] = ['top', 'sidebar'];

export const SECTION_EMPHASIS_OPTIONS: SectionEmphasis[] = [
  'feature-first',
  'identity-first',
  'lab-first',
];

export const LAYOUT_TEMPLATE_OPTIONS: { id: LayoutTemplate; label: string; blurb: string }[] = [
  {
    id: 'classic-override',
    label: 'Classic Override',
    blurb: 'Still recognizable as MySpace, but rearranged.',
  },
  {
    id: 'full-div',
    label: 'Full DIV Overlay',
    blurb: 'Custom masthead + little resemblance to stock layout.',
  },
  {
    id: 'sidebar',
    label: 'Sidebar Layout',
    blurb: 'Narrow identity sidebar + wide custom content.',
  },
  {
    id: 'graphic-header',
    label: 'Graphic Header',
    blurb: 'Large decorative header with dense sections below.',
  },
];

export const SECTION_EMPHASIS_LABELS: { id: SectionEmphasis; label: string }[] = [
  { id: 'feature-first', label: 'Featured Work first' },
  { id: 'identity-first', label: 'Identity / About first' },
  { id: 'lab-first', label: 'Homelab first' },
];

const DEFAULT_EFFECTS: LayoutEffects = {
  sparkles: false,
  floatingHearts: false,
  starBackground: false,
  boxGlow: false,
  linkGlow: false,
  cursorTrail: false,
};

const ADVANCED_DEFAULTS = {
  customizationMode: 'basic' as CustomizationMode,
  layoutTemplate: 'classic-override' as LayoutTemplate,
  navPlacement: 'top' as NavPlacement,
  sectionEmphasis: 'feature-first' as SectionEmphasis,
};

/** Snapshot used when starting the builder from Default (approximate). */
export function createDefaultStartValues(): VisitorLayoutValues {
  return {
    ...ADVANCED_DEFAULTS,
    customizationMode: 'basic',
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
    ...ADVANCED_DEFAULTS,
    customizationMode: 'advanced',
    layoutTemplate: 'full-div',
    navPlacement: 'top',
    sectionEmphasis: 'feature-first',
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
    el.removeAttribute('data-custom-mode');
    el.removeAttribute('data-layout-template');
    el.removeAttribute('data-nav-placement');
    el.removeAttribute('data-section-emphasis');
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
  el.setAttribute('data-custom-mode', values.customizationMode);
  el.setAttribute('data-layout-template', values.layoutTemplate);
  el.setAttribute('data-nav-placement', values.navPlacement);
  el.setAttribute('data-section-emphasis', values.sectionEmphasis);
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
  const advanced = base.customizationMode === 'advanced';

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
    ...(advanced
      ? {
          layoutTemplate:
            LAYOUT_TEMPLATES[Math.floor(Math.random() * LAYOUT_TEMPLATES.length)],
          navPlacement: Math.random() > 0.5 ? 'sidebar' : 'top',
          sectionEmphasis:
            SECTION_EMPHASIS_OPTIONS[
              Math.floor(Math.random() * SECTION_EMPHASIS_OPTIONS.length)
            ],
        }
      : {}),
  };

  next.primaryTextColor = ensureReadableText(next.boxBackground, next.primaryTextColor);
  next.headingColor = ensureReadableText(next.boxBackground, next.headingColor, 3);
  next.linkColor = ensureReadableText(next.boxBackground, next.linkColor, 3);
  next.headerTextColor = ensureReadableText(next.headerBackground, next.headerTextColor, 3);
  return next;
}

/** Progressive “Make It More MySpace” intensity (0–7). */
export function intensifyMyspace(
  values: VisitorLayoutValues,
  stage: number
): VisitorLayoutValues {
  const next = { ...values, effects: { ...values.effects } };
  const s = Math.min(7, Math.max(0, stage));
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
    next.fontFamily = 'Comic Sans MS';
  }
  if (s >= 5) {
    next.effects.linkGlow = true;
    next.effects.boxGlow = true;
  }
  if (s >= 6) {
    next.effects.sparkles = true;
    next.effects.starBackground = true;
  }
  if (s >= 7) {
    next.effects.floatingHearts = true;
    next.effects.cursorTrail = true;
    next.borderStyle = 'double';
    if (next.customizationMode === 'advanced') {
      next.layoutTemplate = 'full-div';
      next.navPlacement = 'sidebar';
      next.sectionEmphasis = 'feature-first';
    }
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
    customizationMode: o.customizationMode === 'advanced' ? 'advanced' : 'basic',
    layoutTemplate: LAYOUT_TEMPLATES.includes(o.layoutTemplate as LayoutTemplate)
      ? (o.layoutTemplate as LayoutTemplate)
      : base.layoutTemplate,
    navPlacement: o.navPlacement === 'sidebar' ? 'sidebar' : 'top',
    sectionEmphasis: SECTION_EMPHASIS_OPTIONS.includes(o.sectionEmphasis as SectionEmphasis)
      ? (o.sectionEmphasis as SectionEmphasis)
      : base.sectionEmphasis,
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

/** Educational CSS representation — display only, never executed as user CSS. */
export function buildEducationalCss(values: VisitorLayoutValues): string {
  const bw = borderWidthPx(values.borderWidth);
  const bg =
    values.backgroundStyle === 'gradient'
      ? `linear-gradient(180deg, ${values.backgroundColor}, ${values.backgroundGradientEnd})`
      : values.backgroundColor;
  const headerBg =
    values.headerStyle === 'gradient'
      ? `linear-gradient(90deg, ${values.headerBackground}, ${values.headerGradientEnd})`
      : values.headerBackground;

  return `/* Representation of your selected styles — not executed as pasted CSS */
body {
  background: ${bg};
  color: ${values.primaryTextColor};
  font-family: "${values.fontFamily}", sans-serif;
}
.profile-box {
  background: ${values.boxBackground};
  border: ${bw} ${values.borderStyle} ${values.borderColor};
}
.section-header {
  background: ${headerBg};
  color: ${values.headerTextColor};
}
h1, h2, h3 {
  color: ${values.headingColor};
}
a {
  color: ${values.linkColor};
}`;
}

/** Educational HTML structure — display only. */
export function buildEducationalHtml(values: VisitorLayoutValues): string {
  const navTag = values.navPlacement === 'sidebar' ? 'aside' : 'nav';
  return `<!-- Simplified layout structure (display only) -->
<div class="profile layout-${values.layoutTemplate}">
  <header class="masthead">Jessica Calderon</header>
  <${navTag}>ABOUT // WORK // STACK // LAB // EXPERIENCE // CONTACT</${navTag}>
  <main data-emphasis="${values.sectionEmphasis}">
    <section class="featured-work">...</section>
    <section class="about">...</section>
    <section class="stack">...</section>
    <section class="lab">...</section>
    <section class="experience">...</section>
  </main>
</div>`;
}
