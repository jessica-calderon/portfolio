import React, { useEffect, useMemo, useState } from 'react';
import { FAVORITED_STORAGE_KEY, PROFILE_URL } from '../constants/urls';
import { useXpWindowBehavior } from '../hooks/useXpWindowBehavior';

interface AddFavoriteDialogProps {
  onClose: () => void;
  onFavoritedChange?: (favorited: boolean) => void;
}

function readFavorited(): boolean {
  try {
    return localStorage.getItem(FAVORITED_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function detectBookmarkHint(): string {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const platform = typeof navigator !== 'undefined' ? navigator.platform : '';
  const isApple =
    /Mac|iPhone|iPad|iPod/.test(platform) ||
    (/Mac/.test(ua) && !/Windows/.test(ua)) ||
    (/Mobile/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|Android/.test(ua));

  if (/iPhone|iPad|iPod/.test(ua)) {
    return 'In Safari, tap Share, then Add Bookmark to save this page.';
  }
  if (/Android/.test(ua)) {
    return 'Use your browser menu to bookmark this page (often ★ or Add to bookmarks).';
  }
  if (isApple) {
    return 'Press ⌘D to bookmark this page in your browser.';
  }
  return 'Press Ctrl+D to bookmark this page in your browser.';
}

/**
 * IE-era Add Favorite dialog. Cannot create real browser bookmarks; persists a local preference.
 */
const AddFavoriteDialog: React.FC<AddFavoriteDialogProps> = ({ onClose, onFavoritedChange }) => {
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({ onClose });
  const [favorited, setFavorited] = useState(readFavorited);
  const [phase, setPhase] = useState<'form' | 'done'>(favorited ? 'done' : 'form');
  const [name] = useState('Jessica Calderon - MyPortfolio');
  const bookmarkHint = useMemo(() => detectBookmarkHint(), []);

  useEffect(() => {
    onFavoritedChange?.(favorited);
  }, [favorited, onFavoritedChange]);

  const notifyFavoritesChanged = () => {
    window.dispatchEvent(new Event('jc-favorites-changed'));
  };

  const handleAdd = () => {
    try {
      localStorage.setItem(FAVORITED_STORAGE_KEY, '1');
    } catch {
      /* ignore quota / private mode */
    }
    setFavorited(true);
    setPhase('done');
    notifyFavoritesChanged();
  };

  const handleRemove = () => {
    try {
      localStorage.removeItem(FAVORITED_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setFavorited(false);
    setPhase('form');
    notifyFavoritesChanged();
  };

  return (
    <div
      className="xp-window fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-3 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="favorite-dialog-title"
      id="add-favorite-dialog"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell w-full max-w-[380px] overflow-hidden animate-modalAppear motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar flex items-center justify-between px-2 py-1.5 select-none">
          <span id="favorite-dialog-title" className="xp-titlebar-text text-xs font-bold">
            Add Favorite
          </span>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label="Close Add Favorite"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="xp-body p-4 space-y-3">
          {phase === 'form' ? (
            <>
              <div>
                <label htmlFor="favorite-name" className="block text-xs font-bold mb-1">
                  Name:
                </label>
                <input
                  id="favorite-name"
                  className="xp-input"
                  value={name}
                  readOnly
                />
              </div>
              <div>
                <span className="block text-xs font-bold mb-1">Create in:</span>
                <div className="ie-favorite-folder">Favorites</div>
              </div>
              <p className="xp-muted text-xs leading-snug">
                Browsers do not allow sites to create real bookmarks. Add stores a local MyPortfolio
                preference only.
              </p>
              <div className="flex justify-end gap-2 pt-1">
                <button type="button" className="xp-btn-primary xp-action-btn" onClick={handleAdd}>
                  Add
                </button>
                <button type="button" className="xp-btn xp-action-btn" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="xp-text text-sm">
                Jessica has been added to your MyPortfolio favorites.
              </p>
              <p className="xp-muted text-xs leading-snug">{bookmarkHint}</p>
              <p className="xp-muted text-xs break-all">{PROFILE_URL}</p>
              <div className="flex justify-end gap-2 pt-1 flex-wrap">
                <button type="button" className="xp-btn xp-action-btn" onClick={handleRemove}>
                  Remove
                </button>
                <button type="button" className="xp-btn-primary xp-action-btn" onClick={onClose}>
                  OK
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFavoriteDialog;

export { readFavorited };
