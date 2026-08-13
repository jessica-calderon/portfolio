import React from 'react';
import { useXpWindowBehavior } from '../../hooks/useXpWindowBehavior';

interface XpAlertDialogProps {
  title: string;
  message: string;
  onClose: () => void;
  icon?: string;
}

/**
 * Small theme-independent XP confirmation / info dialog.
 */
const XpAlertDialog: React.FC<XpAlertDialogProps> = ({
  title,
  message,
  onClose,
  icon = '📋',
}) => {
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({ onClose });

  return (
    <div
      className="xp-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="xp-alert-title"
      aria-describedby="xp-alert-message"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell w-full max-w-[340px] overflow-hidden animate-modalAppear motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar flex items-center justify-between px-2 py-1.5 select-none">
          <span id="xp-alert-title" className="xp-titlebar-text text-xs font-bold truncate">
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label={`Close ${title}`}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <div className="xp-body p-4">
          <div className="flex gap-3 items-start">
            <span className="text-2xl leading-none" aria-hidden="true">
              {icon}
            </span>
            <p id="xp-alert-message" className="xp-text text-sm leading-snug pt-0.5">
              {message}
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="xp-btn-primary xp-action-btn"
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XpAlertDialog;
