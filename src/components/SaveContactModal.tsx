import React, { useState } from 'react';
import profilePic from '../assets/8bitme.png';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../constants/contact';
import { PROFILE_URL } from '../constants/urls';
import { PROFILE_IDENTITY } from '../data/profileMeta';
import { useXpWindowBehavior } from '../hooks/useXpWindowBehavior';

interface SaveContactModalProps {
  onClose: () => void;
}

/** Escape special characters for vCard 3.0 TEXT values. */
function escapeVCardText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function buildJessicaVCard(): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeVCardText(PROFILE_IDENTITY.displayName)}`,
    `N:${escapeVCardText('Calderon')};${escapeVCardText('Jessica')};;;`,
    `TITLE:${escapeVCardText(PROFILE_IDENTITY.title)}`,
    `EMAIL;TYPE=INTERNET:${CONTACT_EMAIL}`,
    `URL;TYPE=Portfolio:${PROFILE_URL}`,
    `URL;TYPE=LinkedIn:${LINKEDIN_URL}`,
    `URL;TYPE=GitHub:${GITHUB_URL}`,
    'END:VCARD',
  ];
  return `${lines.join('\r\n')}\r\n`;
}

function downloadVCard(): void {
  const blob = new Blob([buildJessicaVCard()], {
    type: 'text/vcard;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Jessica-Calderon.vcf';
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  // Delay revoke so mobile Safari can start the download/import handoff
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/**
 * Outlook/XP address-book dialog that downloads a real .vcf for the visitor’s device.
 */
const SaveContactModal: React.FC<SaveContactModalProps> = ({ onClose }) => {
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({ onClose });
  const [status, setStatus] = useState('Ready.');

  const handleSave = () => {
    setStatus('Opening contact card…');
    downloadVCard();
    window.setTimeout(() => setStatus('Contact card ready.'), 200);
  };

  return (
    <div
      className="xp-window save-contact-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-contact-title"
      id="save-contact-window"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell save-contact-shell modal-window--compact animate-modalAppear motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar modal-window__chrome flex items-center justify-between px-2 py-1.5 select-none">
          <div className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="text-sm leading-none">
              📇
            </span>
            <span
              id="save-contact-title"
              className="xp-titlebar-text truncate text-xs font-bold sm:text-sm"
            >
              Add to Address Book
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label="Close save contact window"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="save-contact-body modal-window__body">
          <div className="save-contact-buddy">
            <img
              src={profilePic}
              alt=""
              className="save-contact-avatar"
              width={56}
              height={56}
              aria-hidden="true"
            />
            <div>
              <p className="save-contact-name">{PROFILE_IDENTITY.displayName}</p>
              <p className="save-contact-title">{PROFILE_IDENTITY.title}</p>
            </div>
          </div>

          <dl className="save-contact-fields">
            <div className="save-contact-row">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </dd>
            </div>
            <div className="save-contact-row">
              <dt>LinkedIn</dt>
              <dd>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/Jessica-Calderon-00
                </a>
              </dd>
            </div>
            <div className="save-contact-row">
              <dt>GitHub</dt>
              <dd>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  github.com/jessica-calderon
                </a>
              </dd>
            </div>
            <div className="save-contact-row">
              <dt>Portfolio</dt>
              <dd>
                <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
                  jessica-calderon.github.io/portfolio
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="xp-footer modal-window__footer save-contact-footer">
          <p className="save-contact-status" role="status" aria-live="polite">
            {status}
          </p>
          <div className="flex flex-wrap justify-end gap-2 px-3 pt-1">
            <button
              type="button"
              className="xp-btn xp-btn-primary min-h-[36px] px-3 py-1.5 text-xs font-semibold"
              onClick={handleSave}
            >
              Save Contact
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
    </div>
  );
};

export default SaveContactModal;
