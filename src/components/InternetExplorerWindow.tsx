import React, { useCallback, useEffect, useState } from 'react';
import { LEGACY_PORTFOLIO_URL } from '../constants/urls';
import { useXpWindowBehavior } from '../hooks/useXpWindowBehavior';

interface InternetExplorerWindowProps {
  onClose: () => void;
}

/**
 * Theme-independent IE6 / XP-era browser chrome for viewing the Legacy Portfolio.
 */
const InternetExplorerWindow: React.FC<InternetExplorerWindowProps> = ({ onClose }) => {
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({
    onClose,
    excludeTags: ['IFRAME'],
  });

  const [address, setAddress] = useState(LEGACY_PORTFOLIO_URL);
  const [frameSrc, setFrameSrc] = useState(LEGACY_PORTFOLIO_URL);
  const [status, setStatus] = useState('Opening page…');
  const [isLoading, setIsLoading] = useState(true);
  const [embedFailed, setEmbedFailed] = useState(false);
  const [frameKey, setFrameKey] = useState(0);

  const openExternally = useCallback(() => {
    window.open(LEGACY_PORTFOLIO_URL, '_blank', 'noopener,noreferrer');
  }, []);

  const navigateHome = () => {
    setAddress(LEGACY_PORTFOLIO_URL);
    setFrameSrc(LEGACY_PORTFOLIO_URL);
    setEmbedFailed(false);
    setIsLoading(true);
    setStatus('Opening page…');
    setFrameKey((k) => k + 1);
  };

  const handleRefresh = () => {
    setEmbedFailed(false);
    setIsLoading(true);
    setStatus('Refreshing…');
    setFrameKey((k) => k + 1);
  };

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = address.trim();
    // Only allow navigating to the known legacy portfolio URL inside the iframe
    if (trimmed === LEGACY_PORTFOLIO_URL || trimmed === LEGACY_PORTFOLIO_URL.replace(/\/$/, '')) {
      navigateHome();
    } else {
      setStatus('This browser can only open Jessica’s Legacy Profile.');
      setAddress(LEGACY_PORTFOLIO_URL);
    }
  };

  const handleFrameLoad = () => {
    setIsLoading(false);
    setStatus('Done');
  };

  // Graceful fallback if embed appears blocked / never loads
  useEffect(() => {
    if (!isLoading || embedFailed) return;
    const timeout = window.setTimeout(() => {
      setIsLoading(false);
      setEmbedFailed(true);
      setStatus('Page may be blocked from embedding — use Open.');
    }, 12000);
    return () => window.clearTimeout(timeout);
  }, [isLoading, embedFailed, frameKey]);

  return (
    <div
      className="xp-window ie-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ie-window-title"
      id="internet-explorer-window"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell ie-shell modal-window--large max-w-5xl animate-modalAppear motion-reduce:animate-none
          h-[min(90dvh,calc(100dvh-24px))] sm:h-[min(90vh,860px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar modal-window__chrome flex items-center justify-between px-2 py-1 select-none">
          <div className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="ie-app-icon">e</span>
            <span id="ie-window-title" className="xp-titlebar-text truncate text-xs font-bold sm:text-sm">
              Microsoft Internet Explorer
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label="Close Internet Explorer"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Decorative IE menu — not interactive */}
        <div className="ie-menubar modal-window__chrome" aria-hidden="true">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Favorites</span>
          <span>Tools</span>
          <span>Help</span>
        </div>

        <div className="ie-toolbar modal-window__chrome" role="toolbar" aria-label="Browser tools">
          {/* Non-functional chrome (cross-origin history not available) */}
          <span className="ie-tool-deco" aria-hidden="true" title="Back">← Back</span>
          <span className="ie-tool-deco" aria-hidden="true" title="Forward">→ Forward</span>
          <button type="button" className="ie-tool-btn" onClick={handleRefresh} aria-label="Refresh page">
            ↻ Refresh
          </button>
          <button type="button" className="ie-tool-btn" onClick={navigateHome} aria-label="Home — Legacy Profile">
            🏠 Home
          </button>
          <button
            type="button"
            className="ie-tool-btn"
            onClick={openExternally}
            aria-label="Open Legacy Profile in a new browser tab"
          >
            Open
          </button>
        </div>

        <form className="ie-addressbar modal-window__chrome" onSubmit={handleGo}>
          <label htmlFor="ie-address" className="ie-address-label">
            Address
          </label>
          <input
            id="ie-address"
            type="url"
            className="ie-address-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
          <button type="submit" className="ie-go-btn">
            Go
          </button>
        </form>

        <div className="ie-viewport min-h-0 flex-1">
          {isLoading && (
            <div className="ie-loading" role="status">
              <div className="xp-progress" aria-hidden="true">
                <div className="xp-progress-bar" />
              </div>
              <span className="xp-muted text-xs">Loading Legacy Profile…</span>
            </div>
          )}

          {embedFailed ? (
            <div className="ie-fallback">
              <p className="font-bold text-sm mb-2">This page cannot be displayed in the browser window.</p>
              <p className="text-xs xp-muted mb-4">
                The legacy portfolio blocked embedding (or took too long to load). You can still open it in a new tab.
              </p>
              <button type="button" className="xp-btn-primary xp-action-btn" onClick={openExternally}>
                Open Legacy Profile
              </button>
            </div>
          ) : (
            <iframe
              key={frameKey}
              src={frameSrc}
              title="Jessica Calderon Legacy Portfolio"
              className="ie-frame"
              onLoad={handleFrameLoad}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          )}
        </div>

        <div className="xp-statusbar ie-statusbar modal-window__chrome" role="status" aria-live="polite">
          <span>{status}</span>
          <span className="xp-muted hidden sm:inline">Internet zone</span>
        </div>
      </div>
    </div>
  );
};

export default InternetExplorerWindow;
