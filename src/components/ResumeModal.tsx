import React, { useEffect, useRef, useState } from 'react';

interface ResumeModalProps {
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  const resumeDocId = '1Te9UsvtdF-xzI0v7cLMYAuTnDRmaPyOiDUH30E5XXT8';
  const resumeUrl = `https://docs.google.com/document/d/${resumeDocId}/preview`;
  const downloadUrl = `https://docs.google.com/document/d/${resumeDocId}/export?format=pdf`;
  const openDocsUrl = `https://docs.google.com/document/d/${resumeDocId}/edit?usp=sharing`;

  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const [docStatus, setDocStatus] = useState('Loading document…');
  // Preserve prior "Last updated" behavior (dynamic calendar date)
  const lastUpdatedLabel = new Date().toLocaleDateString();

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    const getFocusable = () => {
      if (!dialog) return [];
      return Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], iframe, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el.tagName === 'IFRAME');
    };

    // Focus first toolbar control (skip trapping into cross-origin iframe)
    const focusable = getFocusable().filter((el) => el.tagName !== 'IFRAME');
    focusable[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !dialog) return;

      const items = getFocusable().filter((el) => el.tagName !== 'IFRAME');
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

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      previouslyFocusedRef.current?.focus();
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenDocs = () => {
    window.open(openDocsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="xp-window fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-1.5 sm:p-4 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      id="resume-document-window"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell flex w-full max-w-5xl flex-col overflow-hidden animate-modalAppear motion-reduce:animate-none
          h-[calc(100dvh-0.75rem)] max-h-[calc(100dvh-0.75rem)]
          sm:h-[min(92vh,900px)] sm:max-h-[min(92vh,900px)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="xp-titlebar flex shrink-0 items-center justify-between px-2 py-1.5 sm:px-3 select-none">
          <div className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="text-sm leading-none">📄</span>
            <span
              id="resume-modal-title"
              className="xp-titlebar-text truncate text-xs font-bold sm:text-sm"
            >
              Jessica_Calderon_Resume.doc - My Documents
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label="Close resume document window"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Toolbar — only real actions */}
        <div className="xp-toolbar shrink-0" role="toolbar" aria-label="Resume document tools">
          <button
            type="button"
            className="xp-toolbar-btn"
            onClick={handleOpenDocs}
            aria-label="Open resume in Google Docs"
          >
            <span aria-hidden="true">📄</span>
            <span>Open</span>
          </button>
          <button
            type="button"
            className="xp-toolbar-btn"
            onClick={handleDownload}
            aria-label="Download resume as PDF"
          >
            <span aria-hidden="true">💾</span>
            <span>Download PDF</span>
          </button>
        </div>

        {/* Document viewport — Google Docs iframe remains source of truth */}
        <div className="xp-doc-viewport">
          <iframe
            src={resumeUrl}
            className="xp-doc-frame"
            title="Jessica Calderon resume document"
            onLoad={() => setDocStatus('Ready')}
          />
        </div>

        {/* Status bar */}
        <div className="xp-statusbar shrink-0" role="status" aria-live="polite">
          <span>{docStatus}</span>
          <span className="xp-muted">Last updated: {lastUpdatedLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
