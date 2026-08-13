import React from 'react';
import profilePic from '../assets/8bitme.png';
import { LINKEDIN_URL } from '../constants/contact';
import { PROFILE_IDENTITY } from '../data/profileMeta';
import { useXpWindowBehavior } from '../hooks/useXpWindowBehavior';

interface AddToNetworkModalProps {
  onClose: () => void;
}

/**
 * MySpace/XP “Add to Network” dialog.
 * Does not send a LinkedIn request — View LinkedIn opens the real profile.
 */
const AddToNetworkModal: React.FC<AddToNetworkModalProps> = ({ onClose }) => {
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({ onClose });

  const handleViewLinkedIn = () => {
    window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="xp-window network-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-network-title"
      id="add-to-network-window"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell network-shell modal-window--compact animate-modalAppear motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar modal-window__chrome flex items-center justify-between px-2 py-1.5 select-none">
          <div className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="text-sm leading-none">
              👥
            </span>
            <span
              id="add-network-title"
              className="xp-titlebar-text truncate text-xs font-bold sm:text-sm"
            >
              Add to Network
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label="Close add to network window"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="network-body modal-window__body">
          <div className="network-buddy">
            <img
              src={profilePic}
              alt=""
              className="network-avatar"
              width={56}
              height={56}
              aria-hidden="true"
            />
            <div className="network-buddy-meta">
              <p className="network-name">{PROFILE_IDENTITY.displayName}</p>
              <p className="network-title">{PROFILE_IDENTITY.title}</p>
              <p className="network-online">
                <span className="network-online-dot" aria-hidden="true" /> Online
              </p>
            </div>
          </div>
          <p className="network-copy">
            Jessica is in your extended professional network.
          </p>
          <p className="network-copy network-copy--ask">
            Would you like to connect with Jessica?
          </p>
          <p className="network-hint">
            Continues on LinkedIn — this site cannot send a connection request.
          </p>
        </div>

        <div className="xp-footer modal-window__footer network-footer flex flex-wrap justify-end gap-2 px-3 pt-2">
          <button
            type="button"
            className="xp-btn xp-btn-primary min-h-[36px] px-3 py-1.5 text-xs font-semibold"
            onClick={handleViewLinkedIn}
          >
            View LinkedIn
          </button>
          <button
            type="button"
            className="xp-btn min-h-[36px] px-3 py-1.5 text-xs"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToNetworkModal;
