import React, { useEffect, useState, useRef } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface LegacyProfileModalProps {
  onClose: () => void;
}

const LegacyProfileModal: React.FC<LegacyProfileModalProps> = ({ onClose }) => {
  const { isDarkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Set a timeout for loading - if it takes too long, stop showing loading indicator
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        // Don't set error, just stop loading - iframe might still be loading
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
    >
      <div 
        className={`w-full max-w-3xl mx-4 rounded-md shadow-2xl border border-gray-400 overflow-hidden animate-modalAppear flex flex-col ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'
        }`}
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Windows XP-style title bar - toned down in dark mode */}
        <div className={`font-bold px-4 py-2 flex items-center justify-between flex-shrink-0 ${
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
        <div className={`flex flex-col overflow-y-auto p-4 sm:p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-[#ece9d8]'}`}>
          {/* Description */}
          <p className={`text-sm sm:text-base mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            This is my original developer portfolio — the early version that inspired this MySpace theme. Built with HTML, Bootstrap, and JavaScript.
          </p>

          {/* Iframe container with loading state */}
          <div className="relative flex justify-center items-center mb-4">
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50 rounded-lg z-10" style={{ minHeight: '400px' }}>
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Loading preview...
                  </p>
                </div>
              </div>
            )}

            {/* Iframe */}
            <div className="w-full flex items-center justify-center">
              <iframe
                ref={iframeRef}
                src="https://jessica-calderon.github.io/portfolio-legacy/"
                className="w-full rounded-lg border-2 shadow-lg border-gray-300 dark:border-gray-600 bg-white"
                style={{ 
                  height: '400px',
                  minHeight: '400px'
                }}
                title="Legacy Portfolio Preview"
                onLoad={handleIframeLoad}
                allow="fullscreen"
                loading="lazy"
              />
            </div>
          </div>

          {/* Link to open full site */}
          <div className="text-center pt-2">
            <button
              onClick={handleOpenFullSite}
              className={`text-sm sm:text-base font-medium underline transition-colors flex items-center justify-center gap-1 mx-auto ${
                isDarkMode 
                  ? 'text-blue-300 hover:text-blue-200' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <span>Open full legacy site</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegacyProfileModal;

