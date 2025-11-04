import React, { useState, useEffect } from 'react';
import BaseModal from './shared/BaseModal';

interface AccessibilitySettings {
  fontSize: number; // percentage (100 = default)
  highContrast: boolean;
  reducedMotion: boolean;
  enhancedFocus: boolean;
}

const AccessibilityButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Load from localStorage or use defaults
    const saved = localStorage.getItem('accessibilitySettings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback to defaults if parsing fails
      }
    }
    return {
      fontSize: 100,
      highContrast: false,
      reducedMotion: false,
      enhancedFocus: false,
    };
  });

  // Apply settings when they change
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));

    // Apply font size
    document.documentElement.style.fontSize = `${settings.fontSize}%`;

    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (settings.reducedMotion) {
      document.documentElement.classList.add('animations-disabled');
      document.documentElement.classList.remove('animations-enabled');
    } else {
      document.documentElement.classList.add('animations-enabled');
      document.documentElement.classList.remove('animations-disabled');
    }

    // Apply enhanced focus
    if (settings.enhancedFocus) {
      document.documentElement.classList.add('enhanced-focus');
    } else {
      document.documentElement.classList.remove('enhanced-focus');
    }
  }, [settings]);

  // Announce changes to screen readers
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const updateFontSize = (delta: number) => {
    const newSize = Math.max(75, Math.min(150, settings.fontSize + delta));
    setSettings(prev => ({ ...prev, fontSize: newSize }));
    announceToScreenReader(`Font size set to ${newSize}%`);
  };

  const resetFontSize = () => {
    setSettings(prev => ({ ...prev, fontSize: 100 }));
    announceToScreenReader('Font size reset to default');
  };

  const toggleHighContrast = () => {
    setSettings(prev => {
      const newValue = !prev.highContrast;
      announceToScreenReader(`High contrast ${newValue ? 'enabled' : 'disabled'}`);
      return { ...prev, highContrast: newValue };
    });
  };

  const toggleReducedMotion = () => {
    setSettings(prev => {
      const newValue = !prev.reducedMotion;
      announceToScreenReader(`Reduced motion ${newValue ? 'enabled' : 'disabled'}`);
      return { ...prev, reducedMotion: newValue };
    });
  };

  const toggleEnhancedFocus = () => {
    setSettings(prev => {
      const newValue = !prev.enhancedFocus;
      announceToScreenReader(`Enhanced focus indicators ${newValue ? 'enabled' : 'disabled'}`);
      return { ...prev, enhancedFocus: newValue };
    });
  };

  const resetAllSettings = () => {
    setSettings({
      fontSize: 100,
      highContrast: false,
      reducedMotion: false,
      enhancedFocus: false,
    });
    announceToScreenReader('All accessibility settings reset to default');
  };

  // Keyboard shortcut: Alt + A to open accessibility menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setShowModal(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Floating Accessibility Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-4 sm:bottom-24 z-40 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Open accessibility options (Alt+A)"
        title="Accessibility Options (Alt+A)"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <span className="sr-only">Open accessibility options</span>
      </button>

      {/* Accessibility Modal */}
      {showModal && (
        <BaseModal
          title="Accessibility Options"
          onClose={() => setShowModal(false)}
          maxWidth="max-w-md"
          footer={
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={resetAllSettings}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Reset all settings"
              >
                Reset All
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  announceToScreenReader('Accessibility settings saved');
                }}
                className="px-6 py-2 text-sm font-medium text-white bg-[#245edb] hover:bg-[#1a4aa5] dark:bg-[#1a3a85] dark:hover:bg-[#0f2a65] rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Done, close accessibility options"
              >
                Done
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Font Size Controls */}
            <div>
              <label
                htmlFor="font-size"
                className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100"
              >
                Font Size: {settings.fontSize}%
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateFontSize(-5)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Decrease font size"
                >
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100" aria-hidden="true">A−</span>
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    id="font-size"
                    min="75"
                    max="150"
                    step="5"
                    value={settings.fontSize}
                    onChange={(e) => {
                      const newSize = parseInt(e.target.value);
                      setSettings(prev => ({ ...prev, fontSize: newSize }));
                      announceToScreenReader(`Font size set to ${newSize}%`);
                    }}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-gray-600 dark:accent-gray-400"
                    aria-label="Font size slider"
                  />
                </div>
                <button
                  onClick={() => updateFontSize(5)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Increase font size"
                >
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100" aria-hidden="true">A+</span>
                </button>
                <button
                  onClick={resetFontSize}
                  className="px-3 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2 text-sm text-gray-900 dark:text-gray-100"
                  aria-label="Reset font size to default"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label
                    htmlFor="high-contrast"
                    className="text-sm font-semibold text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    High Contrast Mode
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Increases contrast for better visibility
                  </p>
                </div>
                <button
                  id="high-contrast"
                  onClick={toggleHighContrast}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2 ${
                    settings.highContrast
                      ? 'bg-gray-600 dark:bg-gray-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  role="switch"
                  aria-checked={settings.highContrast}
                  aria-label="Toggle high contrast mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label
                    htmlFor="reduced-motion"
                    className="text-sm font-semibold text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    Reduced Motion
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Reduces animations and transitions
                  </p>
                </div>
                <button
                  id="reduced-motion"
                  onClick={toggleReducedMotion}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2 ${
                    settings.reducedMotion
                      ? 'bg-gray-600 dark:bg-gray-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  role="switch"
                  aria-checked={settings.reducedMotion}
                  aria-label="Toggle reduced motion"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label
                    htmlFor="enhanced-focus"
                    className="text-sm font-semibold text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    Enhanced Focus Indicators
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Makes focus indicators more visible
                  </p>
                </div>
                <button
                  id="enhanced-focus"
                  onClick={toggleEnhancedFocus}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2 ${
                    settings.enhancedFocus
                      ? 'bg-gray-600 dark:bg-gray-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  role="switch"
                  aria-checked={settings.enhancedFocus}
                  aria-label="Toggle enhanced focus indicators"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enhancedFocus ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Keyboard Shortcuts Info */}
            <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                <strong>Keyboard Shortcut:</strong> Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">Alt</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">A</kbd> to open this menu
              </p>
            </div>
          </div>
        </BaseModal>
      )}

    </>
  );
};

export default AccessibilityButton;

