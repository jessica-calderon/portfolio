import React, { useEffect, useRef, ReactNode } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface BaseModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  titleBarActions?: ReactNode;
  maxWidth?: string;
  footer?: ReactNode;
  id?: string;
  /** When true, moves focus into the dialog on mount and traps Tab within it */
  manageFocus?: boolean;
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
  id,
  manageFocus = false,
}) => {
  const { isDarkMode } = useDarkMode();
  const dialogRef = useRef<HTMLDivElement>(null);

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

  // Optional focus management: initial focus + basic Tab trap
  useEffect(() => {
    if (!manageFocus) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const getFocusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

    const focusable = getFocusable();
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      dialog.focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener('keydown', handleTab);
    return () => dialog.removeEventListener('keydown', handleTab);
  }, [manageFocus]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      id={id}
      ref={dialogRef}
      tabIndex={-1}
    >
      <div 
        className={`w-full ${maxWidth} mx-4 max-h-[min(90vh,100%)] ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'} rounded-md shadow-md border border-gray-400 dark:border-gray-600 overflow-hidden animate-modalAppear motion-reduce:animate-none flex flex-col ${
          footer ? '' : 'max-h-[calc(90vh-2rem)]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Windows XP-style title bar - adapts to dark mode */}
        <div 
          className={`${isDarkMode ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]' : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'} text-white font-bold px-4 py-2 flex items-center justify-between select-none`}
        >
          <span id="modal-title" className="text-sm">{title}</span>
          <div className="flex items-center gap-2">
            {titleBarActions}
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white min-w-[28px] min-h-[28px] w-7 h-7 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
              aria-label={`Close ${title}`}
            >
              <span aria-hidden="true">✕</span>
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

