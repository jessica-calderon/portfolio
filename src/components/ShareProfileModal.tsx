import React from 'react';
import { PROFILE_URL } from '../constants/urls';
import { useXpWindowBehavior } from '../hooks/useXpWindowBehavior';

interface ShareProfileModalProps {
  onClose: () => void;
  onCopied: () => void;
}

/** Attempt Web Share first; returns whether the share sheet handled the action. */
export async function tryNativeShare(profileUrl: string): Promise<'shared' | 'aborted' | 'unavailable'> {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') {
    return 'unavailable';
  }
  try {
    await navigator.share({
      title: 'Jessica Calderon — Portfolio',
      text: 'Check out Jessica Calderon’s portfolio',
      url: profileUrl,
    });
    return 'shared';
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return 'aborted';
    }
    return 'unavailable';
  }
}

/**
 * Fallback share sheet (social targets + clipboard).
 * Clipboard success is confirmed via a separate XP alert (onCopied).
 */
const ShareProfileModal: React.FC<ShareProfileModalProps> = ({ onClose, onCopied }) => {
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({ onClose });
  const profileUrl =
    typeof window !== 'undefined' && window.location.href
      ? window.location.href
      : PROFILE_URL;

  const shareOptions = [
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my portfolio!')}&url=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: 'Facebook',
      icon: '👥',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: 'Email',
      icon: '📧',
      url: `mailto:?subject=${encodeURIComponent('Check out my portfolio!')}&body=${encodeURIComponent(profileUrl)}`,
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleCopyUrl = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profileUrl);
      } else {
        const ta = document.createElement('textarea');
        ta.value = profileUrl;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      onCopied();
    } catch {
      /* keep modal open if copy fails */
    }
  };

  return (
    <div
      className="xp-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell modal-window--compact max-w-md animate-modalAppear motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar modal-window__chrome flex items-center justify-between px-2 py-1.5 select-none">
          <span id="share-modal-title" className="xp-titlebar-text text-xs font-bold">
            Share Profile
          </span>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label="Close Share Profile"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="xp-body modal-window__body p-4 space-y-3">
          <div>
            <h3 className="text-xs font-bold mb-1">Share this profile:</h3>
            <p className="text-xs break-all p-2 border border-[#aca899] bg-white">{profileUrl}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold mb-2">Share on:</h3>
            <div className="grid grid-cols-2 gap-2">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => handleShare(option.url)}
                  className="xp-btn xp-action-btn flex items-center justify-center gap-1 text-xs"
                >
                  <span aria-hidden="true">{option.icon}</span>
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#aca899]">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="xp-btn-primary xp-action-btn w-full"
            >
              📋 Copy Profile URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareProfileModal;
