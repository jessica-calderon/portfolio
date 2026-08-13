import React, { useState, useEffect } from 'react';
import BaseModal from './shared/BaseModal';

interface AccessibilitySettings {
  fontSize: number; // percentage (100 = default)
  highContrast: boolean;
  reducedMotion: boolean;
  enhancedFocus: boolean;
  dyslexiaFriendly: boolean;
}

interface AccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ isOpen, onClose }) => {
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
      dyslexiaFriendly: false,
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

    // Apply dyslexia-friendly font
    if (settings.dyslexiaFriendly) {
      document.documentElement.classList.add('dyslexia-friendly');
    } else {
      document.documentElement.classList.remove('dyslexia-friendly');
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
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
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

  const toggleDyslexiaFriendly = () => {
    setSettings(prev => {
      const newValue = !prev.dyslexiaFriendly;
      announceToScreenReader(`Dyslexia-friendly font ${newValue ? 'enabled' : 'disabled'}`);
      return { ...prev, dyslexiaFriendly: newValue };
    });
  };

  const resetAllSettings = () => {
    setSettings({
      fontSize: 100,
      highContrast: false,
      reducedMotion: false,
      enhancedFocus: false,
      dyslexiaFriendly: false,
    });
    announceToScreenReader('All accessibility settings reset to default');
  };

  if (!isOpen) return null;

  const renderSwitch = (
    id: string,
    checked: boolean,
    onToggle: () => void,
    ariaLabel: string
  ) => (
    <button
      type="button"
      id={id}
      onClick={onToggle}
      className="xp-switch relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[#245edb] focus:ring-offset-2 focus:ring-offset-[#ece9d8]"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
    >
      <span
        className={`xp-switch-thumb inline-block h-5 w-5 transform rounded-full shadow transition-transform motion-reduce:transition-none ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
        aria-hidden="true"
      />
    </button>
  );

  return (
    <BaseModal
      id="accessibility-options-dialog"
      title="Accessibility Options"
      onClose={onClose}
      maxWidth="max-w-md"
      manageFocus
      visualVariant="xp"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            onClick={resetAllSettings}
            className="xp-btn min-h-[44px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[#245edb] focus:ring-offset-2 focus:ring-offset-[#ece9d8]"
            aria-label="Reset all accessibility settings to defaults"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={() => {
              announceToScreenReader('Accessibility settings saved');
              onClose();
            }}
            className="xp-btn-primary min-h-[44px] px-6 py-2 text-sm font-medium transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[#245edb] focus:ring-offset-2 focus:ring-offset-[#ece9d8]"
            aria-label="Done, close Accessibility Options"
          >
            Done
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <p className="xp-muted text-xs">
          Optional display preferences for this site. These settings are stored in your browser and do not imply ADA or WCAG compliance.
        </p>

        {/* Increase Text Size */}
        <div>
          <label
            htmlFor="font-size"
            className="xp-text block text-sm font-semibold mb-2"
          >
            Increase Text Size: {settings.fontSize}%
          </label>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => updateFontSize(-5)}
              className="xp-btn min-h-[44px] min-w-[44px] px-4 py-2 transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[#245edb] focus:ring-offset-2 focus:ring-offset-[#ece9d8]"
              aria-label="Decrease font size"
            >
              <span className="xp-text text-lg font-bold" aria-hidden="true">A−</span>
            </button>
            <div className="flex-1 min-w-[8rem]">
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
                className="xp-slider w-full h-3 appearance-none cursor-pointer"
                aria-valuemin={75}
                aria-valuemax={150}
                aria-valuenow={settings.fontSize}
                aria-label={`Font size, currently ${settings.fontSize} percent`}
              />
            </div>
            <button
              type="button"
              onClick={() => updateFontSize(5)}
              className="xp-btn min-h-[44px] min-w-[44px] px-4 py-2 transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[#245edb] focus:ring-offset-2 focus:ring-offset-[#ece9d8]"
              aria-label="Increase font size"
            >
              <span className="xp-text text-lg font-bold" aria-hidden="true">A+</span>
            </button>
            <button
              type="button"
              onClick={resetFontSize}
              className="xp-btn min-h-[44px] px-3 py-2 text-sm transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[#245edb] focus:ring-offset-2 focus:ring-offset-[#ece9d8]"
              aria-label="Reset font size to default"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Toggle Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <label
                htmlFor="high-contrast"
                className="xp-text text-sm font-semibold cursor-pointer"
              >
                High Contrast Mode
              </label>
              <p className="xp-muted text-xs mt-1">
                Increases contrast for better visibility
              </p>
            </div>
            {renderSwitch('high-contrast', settings.highContrast, toggleHighContrast, 'High contrast mode')}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <label
                htmlFor="dyslexia-friendly"
                className="xp-text text-sm font-semibold cursor-pointer"
              >
                Dyslexia-Friendly Font
              </label>
              <p className="xp-muted text-xs mt-1">
                Uses OpenDyslexic font for better readability
              </p>
            </div>
            {renderSwitch('dyslexia-friendly', settings.dyslexiaFriendly, toggleDyslexiaFriendly, 'Dyslexia-friendly font')}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <label
                htmlFor="reduced-motion"
                className="xp-text text-sm font-semibold cursor-pointer"
              >
                Reduced Motion
              </label>
              <p className="xp-muted text-xs mt-1">
                Reduces animations and transitions
              </p>
            </div>
            {renderSwitch('reduced-motion', settings.reducedMotion, toggleReducedMotion, 'Reduced motion')}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <label
                htmlFor="enhanced-focus"
                className="xp-text text-sm font-semibold cursor-pointer"
              >
                Enhanced Focus Indicators
              </label>
              <p className="xp-muted text-xs mt-1">
                Makes focus indicators more visible
              </p>
            </div>
            {renderSwitch('enhanced-focus', settings.enhancedFocus, toggleEnhancedFocus, 'Enhanced focus indicators')}
          </div>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="xp-divider pt-4 border-t">
          <p className="xp-muted text-xs mb-2">
            <strong className="xp-text">Keyboard Shortcut:</strong> Press{' '}
            <kbd className="xp-kbd px-1.5 py-0.5">Alt</kbd> +{' '}
            <kbd className="xp-kbd px-1.5 py-0.5">A</kbd> to open this menu. Press{' '}
            <kbd className="xp-kbd px-1.5 py-0.5">Esc</kbd> to close.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

export default AccessibilityMenu;
