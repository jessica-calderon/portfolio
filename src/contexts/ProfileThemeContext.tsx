import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  applyLayoutTokens,
  AuthoredThemeId,
  createVisitorLayout,
  intensifyMyspace,
  randomizeLayoutValues,
  sanitizeVisitorLayout,
  VisitorLayout,
  VisitorLayoutValues,
} from '../themes/layoutSchema';

const STORAGE_ACTIVE = 'jc-profile-theme-active-v1';
const STORAGE_VISITORS = 'jc-profile-visitor-layouts-v1';
const LEGACY_LAYOUT_KEY = 'layoutMode';

type ActiveTheme =
  | { kind: 'authored'; id: AuthoredThemeId }
  | { kind: 'visitor'; id: string };

interface ProfileThemeContextValue {
  active: ActiveTheme;
  authoredId: AuthoredThemeId;
  /** True when Jessica's Custom authored theme is showing (not a visitor override). */
  isMyspaceMode: boolean;
  /** True when a visitor layout (saved or draft preview) drives profile colors. */
  isVisitorThemeActive: boolean;
  visitorLayouts: VisitorLayout[];
  activeVisitor: VisitorLayout | null;
  /** Live draft while builder is open */
  draft: VisitorLayout | null;
  builderOpen: boolean;
  myspaceIntensity: number;
  setAuthoredTheme: (id: AuthoredThemeId) => void;
  activateVisitor: (id: string) => void;
  openBuilder: (
    startFrom?: AuthoredThemeId | 'active',
    options?: { randomize?: boolean; visitorId?: string }
  ) => void;
  closeBuilder: (restore: boolean) => void;
  updateDraft: (patch: Partial<VisitorLayoutValues> & { name?: string }) => void;
  applyDraft: () => void;
  saveDraft: () => void;
  deleteVisitor: (id: string) => void;
  randomizeDraft: () => void;
  makeMoreMyspace: () => void;
  resetToJessicasCustom: () => void;
  exportActiveVisitor: () => string | null;
  importVisitorLayout: (json: string) => boolean;
}

const ProfileThemeContext = createContext<ProfileThemeContextValue | null>(null);

function readActive(): ActiveTheme {
  try {
    const raw = localStorage.getItem(STORAGE_ACTIVE);
    if (raw) {
      const parsed = JSON.parse(raw) as ActiveTheme;
      if (parsed?.kind === 'authored' && (parsed.id === 'default' || parsed.id === 'jessicas-custom')) {
        return parsed;
      }
      if (parsed?.kind === 'visitor' && typeof parsed.id === 'string') {
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  // Migrate legacy layoutMode
  const legacy = localStorage.getItem(LEGACY_LAYOUT_KEY);
  if (legacy === 'custom') return { kind: 'authored', id: 'jessicas-custom' };
  return { kind: 'authored', id: 'default' };
}

function readVisitors(): VisitorLayout[] {
  try {
    const raw = localStorage.getItem(STORAGE_VISITORS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(sanitizeVisitorLayout)
      .filter((v): v is VisitorLayout => Boolean(v));
  } catch {
    return [];
  }
}

export const ProfileThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = useState<ActiveTheme>(readActive);
  const [visitorLayouts, setVisitorLayouts] = useState<VisitorLayout[]>(readVisitors);
  const [draft, setDraft] = useState<VisitorLayout | null>(null);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [preBuilderActive, setPreBuilderActive] = useState<ActiveTheme | null>(null);
  const [myspaceIntensity, setMyspaceIntensity] = useState(0);

  const authoredId: AuthoredThemeId =
    active.kind === 'authored' ? active.id : 'default';

  const activeVisitor =
    active.kind === 'visitor'
      ? visitorLayouts.find((v) => v.id === active.id) ?? null
      : null;

  const effectiveVisitorValues: VisitorLayoutValues | null = draft
    ? draft
    : activeVisitor;

  const isMyspaceMode =
    !effectiveVisitorValues && active.kind === 'authored' && active.id === 'jessicas-custom';

  const isVisitorThemeActive = Boolean(effectiveVisitorValues);

  // Persist active + visitors
  useEffect(() => {
    localStorage.setItem(STORAGE_ACTIVE, JSON.stringify(active));
    // Keep legacy key in sync for any residual readers
    if (active.kind === 'authored') {
      localStorage.setItem(LEGACY_LAYOUT_KEY, active.id === 'jessicas-custom' ? 'custom' : 'default');
    }
  }, [active]);

  useEffect(() => {
    localStorage.setItem(STORAGE_VISITORS, JSON.stringify(visitorLayouts));
  }, [visitorLayouts]);

  // Apply visitor tokens to profile root element
  useEffect(() => {
    const root = document.getElementById('profile-theme-root');
    applyLayoutTokens(root, effectiveVisitorValues);
  }, [effectiveVisitorValues]);

  const setAuthoredTheme = useCallback((id: AuthoredThemeId) => {
    setDraft(null);
    setBuilderOpen(false);
    setActive({ kind: 'authored', id });
  }, []);

  const activateVisitor = useCallback(
    (id: string) => {
      if (!visitorLayouts.some((v) => v.id === id)) return;
      setDraft(null);
      setBuilderOpen(false);
      setActive({ kind: 'visitor', id });
    },
    [visitorLayouts]
  );

  const openBuilder = useCallback(
    (
      startFrom: AuthoredThemeId | 'active' = 'active',
      options?: { randomize?: boolean; visitorId?: string }
    ) => {
      const visitorId = options?.visitorId;
      const editingVisitor = visitorId
        ? visitorLayouts.find((v) => v.id === visitorId) ?? null
        : null;

      setPreBuilderActive(
        editingVisitor ? { kind: 'visitor', id: editingVisitor.id } : active
      );
      setMyspaceIntensity(0);

      let next: VisitorLayout;
      if (editingVisitor) {
        next = { ...editingVisitor, effects: { ...editingVisitor.effects } };
      } else if (startFrom === 'active' && active.kind === 'visitor' && activeVisitor) {
        next = { ...activeVisitor, effects: { ...activeVisitor.effects } };
      } else if (
        startFrom === 'jessicas-custom' ||
        (startFrom === 'active' && authoredId === 'jessicas-custom' && active.kind === 'authored')
      ) {
        next = createVisitorLayout('jessicas-custom');
      } else if (startFrom === 'default') {
        next = createVisitorLayout('default');
      } else {
        next = createVisitorLayout(
          active.kind === 'authored' && active.id === 'jessicas-custom'
            ? 'jessicas-custom'
            : 'default'
        );
      }
      if (options?.randomize) {
        const values = randomizeLayoutValues(next);
        next = { ...next, ...values, effects: values.effects };
      }
      setDraft(next);
      setBuilderOpen(true);
    },
    [active, activeVisitor, authoredId, visitorLayouts]
  );

  const closeBuilder = useCallback(
    (restore: boolean) => {
      setBuilderOpen(false);
      setDraft(null);
      setMyspaceIntensity(0);
      if (restore && preBuilderActive) {
        setActive(preBuilderActive);
      }
      setPreBuilderActive(null);
    },
    [preBuilderActive]
  );

  const updateDraft = useCallback(
    (patch: Partial<VisitorLayoutValues> & { name?: string }) => {
      setDraft((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          ...patch,
          effects: patch.effects ? { ...prev.effects, ...patch.effects } : prev.effects,
          updatedAt: Date.now(),
        };
      });
    },
    []
  );

  const applyDraft = useCallback(() => {
    if (!draft) return;
    setVisitorLayouts((prev) => {
      const exists = prev.some((v) => v.id === draft.id);
      if (exists) {
        return prev.map((v) => (v.id === draft.id ? { ...draft, updatedAt: Date.now() } : v));
      }
      return [...prev, { ...draft, updatedAt: Date.now() }];
    });
    setActive({ kind: 'visitor', id: draft.id });
    setBuilderOpen(false);
    setDraft(null);
    setPreBuilderActive(null);
    setMyspaceIntensity(0);
  }, [draft]);

  const saveDraft = useCallback(() => {
    applyDraft();
  }, [applyDraft]);

  const deleteVisitor = useCallback(
    (id: string) => {
      setVisitorLayouts((prev) => prev.filter((v) => v.id !== id));
      if (active.kind === 'visitor' && active.id === id) {
        setActive({ kind: 'authored', id: 'jessicas-custom' });
      }
    },
    [active]
  );

  const randomizeDraft = useCallback(() => {
    setDraft((prev) => {
      if (!prev) return prev;
      const values = randomizeLayoutValues(prev);
      return { ...prev, ...values, effects: values.effects, updatedAt: Date.now() };
    });
  }, []);

  const makeMoreMyspace = useCallback(() => {
    setMyspaceIntensity((stage) => {
      const nextStage = Math.min(5, stage + 1);
      setDraft((prev) => {
        if (!prev) return prev;
        const values = intensifyMyspace(prev, nextStage);
        return { ...prev, ...values, effects: values.effects, updatedAt: Date.now() };
      });
      return nextStage;
    });
  }, []);

  const resetToJessicasCustom = useCallback(() => {
    setDraft(null);
    setBuilderOpen(false);
    setActive({ kind: 'authored', id: 'jessicas-custom' });
  }, []);

  const exportActiveVisitor = useCallback(() => {
    const layout = draft || activeVisitor;
    if (!layout) return null;
    return JSON.stringify(layout, null, 2);
  }, [draft, activeVisitor]);

  const importVisitorLayout = useCallback((json: string) => {
    try {
      const sanitized = sanitizeVisitorLayout(JSON.parse(json));
      if (!sanitized) return false;
      sanitized.id = `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      sanitized.updatedAt = Date.now();
      setVisitorLayouts((prev) => [...prev, sanitized]);
      setActive({ kind: 'visitor', id: sanitized.id });
      return true;
    } catch {
      return false;
    }
  }, []);

  const value = useMemo(
    () => ({
      active,
      authoredId,
      isMyspaceMode,
      isVisitorThemeActive,
      visitorLayouts,
      activeVisitor,
      draft,
      builderOpen,
      myspaceIntensity,
      setAuthoredTheme,
      activateVisitor,
      openBuilder,
      closeBuilder,
      updateDraft,
      applyDraft,
      saveDraft,
      deleteVisitor,
      randomizeDraft,
      makeMoreMyspace,
      resetToJessicasCustom,
      exportActiveVisitor,
      importVisitorLayout,
    }),
    [
      active,
      authoredId,
      isMyspaceMode,
      isVisitorThemeActive,
      visitorLayouts,
      activeVisitor,
      draft,
      builderOpen,
      myspaceIntensity,
      setAuthoredTheme,
      activateVisitor,
      openBuilder,
      closeBuilder,
      updateDraft,
      applyDraft,
      saveDraft,
      deleteVisitor,
      randomizeDraft,
      makeMoreMyspace,
      resetToJessicasCustom,
      exportActiveVisitor,
      importVisitorLayout,
    ]
  );

  return (
    <ProfileThemeContext.Provider value={value}>{children}</ProfileThemeContext.Provider>
  );
};

export function useProfileTheme(): ProfileThemeContextValue {
  const ctx = useContext(ProfileThemeContext);
  if (!ctx) throw new Error('useProfileTheme must be used within ProfileThemeProvider');
  return ctx;
}
