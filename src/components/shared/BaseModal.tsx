import React, { useEffect, ReactNode } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface BaseModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  titleBarActions?: ReactNode;
  maxWidth?: string;
  footer?: ReactNode;
}

/**
 * BaseModal - A reusable modal component with dark mode support
 * Handles common modal functionality: backdrop, escape key, scroll lock, dark mode styling
 */
const BaseModal: React.FC<BaseModalProps> = ({
  children,
  title,
  onClose,
  titleBarActions,
  maxWidth = 'max-w-2xl',
  footer,
}) => {
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

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
    >
      <div 
        className={`w-full ${maxWidth} mx-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'} rounded-md shadow-md border border-gray-400 dark:border-gray-600 overflow-hidden animate-modalAppear flex flex-col ${
          footer ? '' : 'max-h-[calc(90vh-2rem)]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Windows XP-style title bar - adapts to dark mode */}
        <div 
          className={`${isDarkMode ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]' : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'} text-white font-bold px-4 py-2 flex items-center justify-between select-none`}
        >
          <span className="text-sm">{title}</span>
          <div className="flex items-center gap-2">
            {titleBarActions}
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal content */}
        <div className={`flex-1 overflow-auto p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-[#ece9d8]'}`}>
          {children}
        </div>

        {/* Optional footer */}
        {footer && (
          <div className={`border-t border-gray-300 dark:border-gray-600 px-4 py-3 flex items-center justify-between ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseModal;

