import React, { useState, useEffect, useRef } from 'react';
import AccessibilityMenu from './AccessibilityMenu';

const AccessibilityButton: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Keyboard shortcut: Alt + A to open accessibility menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowMenu(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setShowMenu(false);
    // Return focus to the Accessibility button after the menu unmounts
    requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        id="accessibility-options-button"
        onClick={() => setShowMenu((open) => !open)}
        className="flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent
        w-12 h-12 sm:w-14 sm:h-14
        transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none
        hover:scale-105 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
        aria-label="Accessibility Options"
        aria-expanded={showMenu}
        aria-haspopup="dialog"
        aria-controls="accessibility-options-dialog"
        title="Accessibility Options (Alt+A)"
      >
        {/* Universal Access Icon - Standard ISO Symbol */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          {/* Outer circle */}
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
          {/* Person head */}
          <circle cx="12" cy="8.5" r="2" strokeWidth={1.5} />
          {/* Person body */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 10.5c-2.2 0-4 1.3-4 3v3h8v-3c0-1.7-1.8-3-4-3z"
          />
        </svg>
      </button>

      <AccessibilityMenu isOpen={showMenu} onClose={handleClose} />
    </>
  );
};

export default AccessibilityButton;
