import React, { useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface LegacyProfileModalProps {
  onClose: () => void;
}

const LegacyProfileModal: React.FC<LegacyProfileModalProps> = ({ onClose }) => {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenFullSite = () => {
    window.open('https://jessica-calderon.github.io/portfolio-legacy/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
    >
      <div 
        className={`w-full max-w-2xl mx-4 rounded-md shadow-md border border-gray-400 overflow-hidden animate-modalAppear ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Windows XP-style title bar - toned down in dark mode */}
        <div className={`font-bold px-4 py-2 flex items-center justify-between ${
          isDarkMode 
            ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]' 
            : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'
        } text-white`}>
          <span className="text-sm">Jessica's Legacy Profile</span>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal content */}
        <div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-[#ece9d8]'}`}>
          {/* Description */}
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            This is my original developer portfolio — the early version that inspired this MySpace theme. Built with HTML, Bootstrap, and JavaScript.
          </p>

          {/* Iframe container */}
          <div className="flex justify-center mb-4">
            <iframe
              src="https://jessica-calderon.github.io/portfolio-legacy/"
              className="w-[90%] md:w-full max-w-[700px] h-[400px] rounded border border-gray-300 dark:border-gray-600"
              title="Legacy Portfolio Preview"
            />
          </div>

          {/* Link to open full site */}
          <div className="text-center">
            <button
              onClick={handleOpenFullSite}
              className={`text-sm font-medium underline transition-colors ${
                isDarkMode 
                  ? 'text-blue-300 hover:text-blue-200' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Open full legacy site →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegacyProfileModal;

