import React, { useEffect, useRef, useState } from 'react';
import { useProfileTheme } from '../contexts/ProfileThemeContext';
import {
  AuthoredThemeId,
  buildEducationalCss,
  buildEducationalHtml,
  collectContrastWarnings,
  FONT_OPTIONS,
  isValidHex,
  LAYOUT_TEMPLATE_OPTIONS,
  PATTERN_OPTIONS,
  SECTION_EMPHASIS_LABELS,
} from '../themes/layoutSchema';

const LayoutBuilderModal: React.FC = () => {
  const {
    builderOpen,
    draft,
    myspaceIntensity,
    closeBuilder,
    updateDraft,
    applyDraft,
    saveDraft,
    randomizeDraft,
    makeMoreMyspace,
    openBuilder,
    exportActiveVisitor,
    importVisitorLayout,
    setAuthoredTheme,
    resetToJessicasCustom,
  } = useProfileTheme();

  const [openSection, setOpenSection] = useState<string>('mode');
  const [importError, setImportError] = useState('');
  const [showCss, setShowCss] = useState(false);
  const [showHtml, setShowHtml] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [builderStartSnapshot, setBuilderStartSnapshot] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!builderOpen || !draft) return;
    setBuilderStartSnapshot(JSON.stringify(draft));
    setOpenSection('mode');
    setShowCss(false);
    setShowHtml(false);
  }, [builderOpen]); // eslint-disable-line react-hooks/exhaustive-deps -- snapshot only when opening

  useEffect(() => {
    if (!builderOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBuilder(true);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [builderOpen, closeBuilder]);

  if (!builderOpen || !draft) return null;

  const warnings = collectContrastWarnings(draft);
  const toggle = (id: string) => setOpenSection((s) => (s === id ? '' : id));

  const colorField = (label: string, key: keyof typeof draft, value: string) => (
    <label className="block text-xs mb-2">
      <span className="font-bold">{label}</span>
      <div className="flex gap-2 mt-1 items-center">
        <input
          type="color"
          value={isValidHex(value) ? value : '#000000'}
          onChange={(e) => updateDraft({ [key]: e.target.value } as never)}
          className="h-9 w-12 border border-pink-300 bg-white cursor-pointer"
          aria-label={label}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (isValidHex(v) || v === '' || /^#[0-9A-Fa-f]{0,6}$/.test(v)) {
              updateDraft({ [key]: v } as never);
            }
          }}
          className="flex-1 border border-pink-300 px-2 py-1 text-xs font-mono"
          spellCheck={false}
        />
      </div>
    </label>
  );

  const startFrom = (id: AuthoredThemeId) => {
    openBuilder(id);
  };

  const resetChanges = () => {
    if (!builderStartSnapshot) return;
    try {
      const snap = JSON.parse(builderStartSnapshot);
      updateDraft({
        ...snap,
        effects: { ...snap.effects },
        name: snap.name,
      });
    } catch {
      /* ignore */
    }
  };

  const handleExport = () => {
    const json = exportActiveVisitor();
    if (!json) return;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${draft.name.replace(/[^\w.-]+/g, '_') || 'layout'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = async (file: File) => {
    setImportError('');
    try {
      const text = await file.text();
      const ok = importVisitorLayout(text);
      if (!ok) setImportError('Could not import that layout file.');
      else closeBuilder(false);
    } catch {
      setImportError('Could not import that layout file.');
    }
  };

  return (
    <div
      className="modal-overlay z-[58] bg-black/50 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="layout-builder-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBuilder(true);
      }}
    >
      <div
        className="modal-window--large max-w-lg border-2 border-pink-500 bg-[#fff5fb] text-purple-950 shadow-xl animate-modalAppear"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-window__chrome bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-2 flex items-center justify-between">
          <span id="layout-builder-title" className="text-sm font-bold truncate pr-2">
            Build Your Own MySpace Layout
          </span>
          <button
            type="button"
            onClick={() => closeBuilder(true)}
            className="bg-red-600 hover:bg-red-700 min-w-[28px] min-h-[28px] w-7 h-7 text-xs font-bold border border-red-800"
            aria-label="Cancel and close layout builder"
          >
            ✕
          </button>
        </div>

        <div className="modal-window__body p-3 space-y-3 text-xs">
          <p className="text-[11px] text-purple-800">
            Choose how much damage you&apos;d like to do. Built-in themes stay untouched.
          </p>

          <label className="block">
            <span className="font-bold">Layout Name</span>
            <input
              type="text"
              value={draft.name}
              maxLength={48}
              onChange={(e) => updateDraft({ name: e.target.value })}
              className="mt-1 w-full border border-pink-300 px-2 py-2 text-sm"
            />
          </label>

          <div>
            <span className="font-bold">Start from</span>
            <div className="flex flex-wrap gap-2 mt-1">
              <button
                type="button"
                className="px-2 py-1 border border-pink-400 bg-white hover:bg-pink-50"
                onClick={() => startFrom('default')}
              >
                Default
              </button>
              <button
                type="button"
                className="px-2 py-1 border border-pink-400 bg-white hover:bg-pink-50"
                onClick={() => startFrom('jessicas-custom')}
              >
                Jessica&apos;s Custom
              </button>
            </div>
            <p className="text-[10px] text-purple-700 mt-1">
              Starting from Jessica&apos;s Custom clones her look — it never overwrites the original.
            </p>
          </div>

          <section className="border border-pink-300 bg-white/80">
            <button
              type="button"
              className="w-full text-left font-bold px-2 py-2 bg-pink-100"
              onClick={() => toggle('mode')}
              aria-expanded={openSection === 'mode'}
            >
              Editing Mode
            </button>
            {openSection === 'mode' && (
              <div className="p-2 space-y-2">
                <label className="flex gap-2 items-start border border-pink-200 p-2 bg-white cursor-pointer">
                  <input
                    type="radio"
                    name="custom-mode"
                    checked={draft.customizationMode === 'basic'}
                    onChange={() => updateDraft({ customizationMode: 'basic' })}
                    className="mt-1"
                  />
                  <span>
                    <strong>Basic Profile Editor</strong>
                    <br />
                    Customize the recognizable MySpace profile — colors, borders, fonts, effects.
                  </span>
                </label>
                <label className="flex gap-2 items-start border border-pink-200 p-2 bg-white cursor-pointer">
                  <input
                    type="radio"
                    name="custom-mode"
                    checked={draft.customizationMode === 'advanced'}
                    onChange={() =>
                      updateDraft({
                        customizationMode: 'advanced',
                        layoutTemplate:
                          draft.layoutTemplate === 'classic-override' &&
                          draft.basedOn === 'jessicas-custom'
                            ? 'full-div'
                            : draft.layoutTemplate,
                      })
                    }
                    className="mt-1"
                  />
                  <span>
                    <strong>Advanced / DIV Layout</strong>
                    <br />
                    Change the actual composition with safe structural options.
                  </span>
                </label>
              </div>
            )}
          </section>

          {warnings.length > 0 && (
            <div className="border border-amber-500 bg-amber-50 text-amber-950 p-2" role="status">
              <p className="font-bold">⚠ Low contrast</p>
              <ul className="list-disc pl-4 mt-1">
                {warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {draft.customizationMode === 'advanced' && (
            <section className="border border-pink-300 bg-white/80">
              <button
                type="button"
                className="w-full text-left font-bold px-2 py-2 bg-pink-100"
                onClick={() => toggle('advanced')}
                aria-expanded={openSection === 'advanced'}
              >
                Advanced / DIV Layout
              </button>
              {openSection === 'advanced' && (
                <div className="p-2 space-y-3">
                  <div>
                    <span className="font-bold">Layout template</span>
                    <div className="mt-1 space-y-1">
                      {LAYOUT_TEMPLATE_OPTIONS.map((opt) => (
                        <label
                          key={opt.id}
                          className="flex gap-2 items-start border border-pink-200 p-1.5 bg-white cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="layout-template"
                            checked={draft.layoutTemplate === opt.id}
                            onChange={() => updateDraft({ layoutTemplate: opt.id })}
                            className="mt-1"
                          />
                          <span>
                            <strong>{opt.label}</strong>
                            <br />
                            <span className="text-[10px] text-purple-700">{opt.blurb}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <label className="block">
                    <span className="font-bold">Navigation</span>
                    <select
                      className="mt-1 w-full border border-pink-300 px-2 py-2"
                      value={draft.navPlacement}
                      onChange={(e) =>
                        updateDraft({
                          navPlacement: e.target.value as typeof draft.navPlacement,
                        })
                      }
                    >
                      <option value="top">Top</option>
                      <option value="sidebar">Sidebar</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="font-bold">Content emphasis</span>
                    <select
                      className="mt-1 w-full border border-pink-300 px-2 py-2"
                      value={draft.sectionEmphasis}
                      onChange={(e) =>
                        updateDraft({
                          sectionEmphasis: e.target.value as typeof draft.sectionEmphasis,
                        })
                      }
                    >
                      {SECTION_EMPHASIS_LABELS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
            </section>
          )}

          <section className="border border-pink-300 bg-white/80">
            <button
              type="button"
              className="w-full text-left font-bold px-2 py-2 bg-pink-100"
              onClick={() => toggle('background')}
              aria-expanded={openSection === 'background'}
            >
              Background
            </button>
            {openSection === 'background' && (
              <div className="p-2 space-y-2">
                {colorField('Background Color', 'backgroundColor', draft.backgroundColor)}
                <label className="block">
                  <span className="font-bold">Background Style</span>
                  <select
                    className="mt-1 w-full border border-pink-300 px-2 py-2"
                    value={draft.backgroundStyle}
                    onChange={(e) =>
                      updateDraft({
                        backgroundStyle: e.target.value as typeof draft.backgroundStyle,
                      })
                    }
                  >
                    <option value="solid">Solid</option>
                    <option value="gradient">Gradient</option>
                    <option value="pattern">Pattern</option>
                  </select>
                </label>
                {draft.backgroundStyle === 'gradient' &&
                  colorField('Gradient End', 'backgroundGradientEnd', draft.backgroundGradientEnd)}
                {draft.backgroundStyle === 'pattern' && (
                  <label className="block">
                    <span className="font-bold">Pattern</span>
                    <select
                      className="mt-1 w-full border border-pink-300 px-2 py-2"
                      value={draft.backgroundPattern}
                      onChange={(e) =>
                        updateDraft({
                          backgroundPattern: e.target.value as typeof draft.backgroundPattern,
                        })
                      }
                    >
                      {PATTERN_OPTIONS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            )}
          </section>

          <section className="border border-pink-300 bg-white/80">
            <button
              type="button"
              className="w-full text-left font-bold px-2 py-2 bg-pink-100"
              onClick={() => toggle('boxes')}
              aria-expanded={openSection === 'boxes'}
            >
              Profile Boxes
            </button>
            {openSection === 'boxes' && (
              <div className="p-2 space-y-2">
                {colorField('Box Background', 'boxBackground', draft.boxBackground)}
                {colorField('Border Color', 'borderColor', draft.borderColor)}
                <label className="block">
                  <span className="font-bold">Border Width</span>
                  <select
                    className="mt-1 w-full border border-pink-300 px-2 py-2"
                    value={draft.borderWidth}
                    onChange={(e) =>
                      updateDraft({ borderWidth: e.target.value as typeof draft.borderWidth })
                    }
                  >
                    <option value="thin">Thin</option>
                    <option value="medium">Medium</option>
                    <option value="thick">Thick</option>
                  </select>
                </label>
                <label className="block">
                  <span className="font-bold">Border Style</span>
                  <select
                    className="mt-1 w-full border border-pink-300 px-2 py-2"
                    value={draft.borderStyle}
                    onChange={(e) =>
                      updateDraft({ borderStyle: e.target.value as typeof draft.borderStyle })
                    }
                  >
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                    <option value="double">Double</option>
                  </select>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={draft.effects.boxGlow}
                    onChange={(e) =>
                      updateDraft({
                        effects: { ...draft.effects, boxGlow: e.target.checked },
                      })
                    }
                  />
                  <span>Box Glow</span>
                </label>
              </div>
            )}
          </section>

          <section className="border border-pink-300 bg-white/80">
            <button
              type="button"
              className="w-full text-left font-bold px-2 py-2 bg-pink-100"
              onClick={() => toggle('headers')}
              aria-expanded={openSection === 'headers'}
            >
              Headers
            </button>
            {openSection === 'headers' && (
              <div className="p-2 space-y-2">
                {colorField('Header Background', 'headerBackground', draft.headerBackground)}
                {colorField('Header Text Color', 'headerTextColor', draft.headerTextColor)}
                <label className="block">
                  <span className="font-bold">Header Style</span>
                  <select
                    className="mt-1 w-full border border-pink-300 px-2 py-2"
                    value={draft.headerStyle}
                    onChange={(e) =>
                      updateDraft({ headerStyle: e.target.value as typeof draft.headerStyle })
                    }
                  >
                    <option value="solid">Solid</option>
                    <option value="gradient">Gradient</option>
                  </select>
                </label>
                {draft.headerStyle === 'gradient' &&
                  colorField('Header Gradient End', 'headerGradientEnd', draft.headerGradientEnd)}
              </div>
            )}
          </section>

          <section className="border border-pink-300 bg-white/80">
            <button
              type="button"
              className="w-full text-left font-bold px-2 py-2 bg-pink-100"
              onClick={() => toggle('text')}
              aria-expanded={openSection === 'text'}
            >
              Text
            </button>
            {openSection === 'text' && (
              <div className="p-2 space-y-2">
                {colorField('Primary Text Color', 'primaryTextColor', draft.primaryTextColor)}
                {colorField('Heading Color', 'headingColor', draft.headingColor)}
                {colorField('Link Color', 'linkColor', draft.linkColor)}
                <label className="block">
                  <span className="font-bold">Font</span>
                  <select
                    className="mt-1 w-full border border-pink-300 px-2 py-2"
                    value={draft.fontFamily}
                    onChange={(e) => updateDraft({ fontFamily: e.target.value })}
                  >
                    {FONT_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
          </section>

          <section className="border border-pink-300 bg-white/80">
            <button
              type="button"
              className="w-full text-left font-bold px-2 py-2 bg-pink-100"
              onClick={() => toggle('effects')}
              aria-expanded={openSection === 'effects'}
            >
              Profile Effects
            </button>
            {openSection === 'effects' && (
              <div className="p-2 space-y-2">
                {(
                  [
                    ['sparkles', 'Sparkles'],
                    ['floatingHearts', 'Floating hearts'],
                    ['starBackground', 'Star background'],
                    ['boxGlow', 'Glow around profile boxes'],
                    ['linkGlow', 'Glowing links'],
                    ['cursorTrail', 'Cursor trail'],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft.effects[key]}
                      onChange={(e) =>
                        updateDraft({
                          effects: { ...draft.effects, [key]: e.target.checked },
                        })
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
                <p className="text-[10px] text-purple-700">
                  Effects respect Reduced Motion and never block clicks or scrolling.
                </p>
              </div>
            )}
          </section>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="px-2 py-2 border border-pink-400 bg-white hover:bg-pink-50"
              onClick={randomizeDraft}
            >
              🎲 Randomize Layout
            </button>
            <button
              type="button"
              className="px-2 py-2 border border-pink-400 bg-white hover:bg-pink-50"
              onClick={makeMoreMyspace}
            >
              ✨ Make It More MySpace ({myspaceIntensity}/7)
            </button>
            <button
              type="button"
              className="px-2 py-2 border border-pink-400 bg-white hover:bg-pink-50"
              onClick={resetChanges}
            >
              Reset Changes
            </button>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-pink-200 pt-2">
            <button
              type="button"
              className="px-2 py-2 border border-purple-400 bg-white hover:bg-purple-50 font-mono"
              onClick={() => setShowCss((v) => !v)}
            >
              {'</>'} View My Changes
            </button>
            {draft.customizationMode === 'advanced' && (
              <button
                type="button"
                className="px-2 py-2 border border-purple-400 bg-white hover:bg-purple-50 font-mono"
                onClick={() => setShowHtml((v) => !v)}
              >
                View Layout Structure
              </button>
            )}
            <button
              type="button"
              className="px-2 py-2 border border-pink-300 bg-white hover:bg-pink-50 text-[11px]"
              onClick={() => setShowWhy((v) => !v)}
            >
              Why is this here?
            </button>
          </div>

          {showWhy && (
            <p className="text-[11px] text-purple-800 border border-pink-200 bg-white/90 p-2">
              Customizing MySpace layouts was one of my first introductions to HTML and CSS.
              Consider this the modern version — with fewer broken tables.
            </p>
          )}

          {showCss && (
            <pre className="text-[10px] leading-snug bg-[#1a1025] text-pink-100 p-2 overflow-x-auto border border-pink-400 whitespace-pre-wrap">
              {buildEducationalCss(draft)}
            </pre>
          )}

          {showHtml && draft.customizationMode === 'advanced' && (
            <pre className="text-[10px] leading-snug bg-[#1a1025] text-cyan-100 p-2 overflow-x-auto border border-pink-400 whitespace-pre-wrap">
              {buildEducationalHtml(draft)}
            </pre>
          )}

          <div className="flex flex-wrap gap-2 border-t border-pink-200 pt-2">
            <button
              type="button"
              className="px-2 py-2 border border-pink-400 bg-white hover:bg-pink-50"
              onClick={() => {
                closeBuilder(false);
                setAuthoredTheme('default');
              }}
            >
              Reset to Default
            </button>
            <button
              type="button"
              className="px-2 py-2 border border-pink-400 bg-white hover:bg-pink-50"
              onClick={() => {
                closeBuilder(false);
                resetToJessicasCustom();
              }}
            >
              Reset to Jessica&apos;s Custom
            </button>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-pink-200 pt-2">
            <button
              type="button"
              className="px-2 py-2 border border-pink-400 bg-white hover:bg-pink-50"
              onClick={handleExport}
            >
              Export Layout
            </button>
            <button
              type="button"
              className="px-2 py-2 border border-pink-400 bg-white hover:bg-pink-50"
              onClick={() => fileRef.current?.click()}
            >
              Import Layout
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleImportFile(f);
                e.target.value = '';
              }}
            />
            {importError && <p className="text-red-700 w-full">{importError}</p>}
          </div>
        </div>

        <div className="modal-window__footer border-t border-pink-300 bg-pink-50 px-3 pt-3 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className="px-3 py-2 border border-gray-400 bg-white min-h-[40px]"
            onClick={() => closeBuilder(true)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-3 py-2 border border-pink-500 bg-pink-200 min-h-[40px] font-bold"
            onClick={applyDraft}
          >
            Apply Layout
          </button>
          <button
            type="button"
            className="px-3 py-2 border border-purple-700 bg-purple-600 text-white min-h-[40px] font-bold"
            onClick={saveDraft}
          >
            Save Layout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayoutBuilderModal;
