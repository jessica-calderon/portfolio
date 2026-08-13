import React, { useEffect, useRef, useState } from 'react';
import { useProfileTheme } from '../contexts/ProfileThemeContext';

/**
 * MySpace-layer theme picker (not XP Control Panel).
 */
const ThemePicker: React.FC = () => {
  const {
    active,
    visitorLayouts,
    isMyspaceMode,
    isVisitorThemeActive,
    setAuthoredTheme,
    activateVisitor,
    openBuilder,
    deleteVisitor,
    resetToJessicasCustom,
  } = useProfileTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const activeLabel =
    active.kind === 'authored'
      ? active.id === 'jessicas-custom'
        ? "Jessica's Custom"
        : 'Default'
      : visitorLayouts.find((v) => v.id === active.id)?.name || 'My Layout';

  const triggerClass = isMyspaceMode || isVisitorThemeActive
    ? 'from-pink-500 to-purple-600'
    : 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700';

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`layout-toggle flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-lg bg-gradient-to-r ${triggerClass} text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 shadow-md hover:shadow-lg`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Theme picker. Current: ${activeLabel}`}
        title="Jessica's Layouts"
      >
        <span className="mr-1" aria-hidden="true">🎨</span>
        <span className="hidden sm:inline max-w-[9rem] truncate">{activeLabel}</span>
        <span className="sm:hidden">Theme</span>
      </button>

      {open && (
        <div
          className="theme-picker-panel absolute right-0 mt-2 z-[55] w-[min(92vw,320px)] border-2 border-pink-400 bg-[#fff0f6] text-purple-950 shadow-lg"
          role="dialog"
          aria-label="Jessica's Layouts"
        >
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5">
            Jessica&apos;s Layouts
          </div>

          <div className="p-2 space-y-2 max-h-[min(70dvh,420px)] overflow-y-auto">
            <p className="text-[10px] text-purple-800 px-1">
              Official built-in profiles — always available.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`theme-preview-card${active.kind === 'authored' && active.id === 'default' ? ' theme-preview-card--active' : ''}`}
                onClick={() => {
                  setAuthoredTheme('default');
                  setOpen(false);
                }}
              >
                <span className="theme-preview-swatch theme-preview-swatch--default" aria-hidden="true" />
                <span className="text-[11px] font-bold">Default</span>
              </button>
              <button
                type="button"
                className={`theme-preview-card${active.kind === 'authored' && active.id === 'jessicas-custom' ? ' theme-preview-card--active' : ''}`}
                onClick={() => {
                  resetToJessicasCustom();
                  setOpen(false);
                }}
              >
                <span className="theme-preview-swatch theme-preview-swatch--jessica" aria-hidden="true" />
                <span className="text-[11px] font-bold">Jessica&apos;s Custom</span>
              </button>
            </div>

            <div className="border-t border-pink-300 pt-2 mt-1">
              <p className="text-[10px] font-bold text-purple-900 px-1 mb-1">Try Your Own</p>
              <button
                type="button"
                className="w-full text-left text-xs px-2 py-2 bg-white border border-pink-300 hover:bg-pink-50"
                onClick={() => {
                  setOpen(false);
                  openBuilder('active');
                }}
              >
                🎨 Build Your Own Layout
              </button>
              <button
                type="button"
                className="w-full text-left text-xs px-2 py-2 mt-1 bg-white border border-pink-300 hover:bg-pink-50"
                onClick={() => {
                  setOpen(false);
                  openBuilder('jessicas-custom', { randomize: true });
                }}
              >
                🎲 Randomize from Jessica&apos;s Custom
              </button>
            </div>

            {visitorLayouts.length > 0 && (
              <div className="border-t border-pink-300 pt-2 mt-1">
                <p className="text-[10px] font-bold text-purple-900 px-1 mb-1">My Layouts</p>
                <ul className="space-y-1">
                  {visitorLayouts.map((layout) => (
                    <li
                      key={layout.id}
                      className={`flex items-center gap-1 text-xs px-1 py-1 ${
                        active.kind === 'visitor' && active.id === layout.id
                          ? 'bg-pink-200'
                          : 'bg-white/70'
                      }`}
                    >
                      <button
                        type="button"
                        className="flex-1 text-left truncate font-medium hover:underline"
                        onClick={() => {
                          activateVisitor(layout.id);
                          setOpen(false);
                        }}
                      >
                        {layout.name}
                      </button>
                      <button
                        type="button"
                        className="text-[10px] text-blue-700 hover:underline shrink-0"
                        onClick={() => {
                          setOpen(false);
                          openBuilder('active', { visitorId: layout.id });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-[10px] text-red-700 hover:underline shrink-0"
                        onClick={() => deleteVisitor(layout.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePicker;
