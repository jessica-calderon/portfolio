import React, { useState, useEffect } from 'react';
import AccessibilityMenu from './AccessibilityMenu';

const AccessibilityButton: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

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

  return (
    <>
      {/* Floating Accessibility Button - Responsive Positioning */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed z-50 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:ring-offset-2
        w-10 h-10 sm:w-12 sm:h-12
        top-24 right-4
        md:top-28 md:right-4
        lg:top-4 lg:right-4"
        aria-label="Accessibility Options"
        title="Accessibility Options (Alt+A)"
      >
        {/* Universal Access Icon - Standard ISO Symbol */}
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
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
        <span className="sr-only">Open accessibility options</span>
      </button>

      {/* Accessibility Menu */}
      <AccessibilityMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  );
};

export default AccessibilityButton;

