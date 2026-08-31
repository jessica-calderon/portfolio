import React from 'react';
import PixelSprite from './shared/PixelSprite';

interface ContactSectionProps {
  onSendMessageClick: () => void;
  onResumeClick: () => void;
  onShareClick: () => void;
  onSaveContactClick: () => void;
  onScheduleClick: () => void;
  onConnectClick: () => void;
}

/** Shared Contacting Jessica actions — same set on desktop sidebar and mobile. */
const ContactSection: React.FC<ContactSectionProps> = ({
  onSendMessageClick,
  onResumeClick,
  onShareClick,
  onSaveContactClick,
  onScheduleClick,
  onConnectClick,
}) => {
  return (
    <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400 spacing-standard" id="contact">
      <h3 className="font-bold text-black dark:text-white text-xs sm:text-sm mb-2 sm:mb-3">Contacting Jessica</h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onSendMessageClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Send message to Jessica Calderon"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true"><PixelSprite type="mail" size={14} /></span> Send Message
        </button>
        <button
          type="button"
          onClick={onConnectClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Add Jessica to professional network"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true"><PixelSprite type="people" size={14} /></span> Connect
        </button>
        <button
          type="button"
          onClick={onScheduleClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Schedule a call"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true"><PixelSprite type="chat" size={14} /></span> Schedule Call
        </button>
        <button
          type="button"
          onClick={onResumeClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="View resume"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true"><PixelSprite type="document" size={14} /></span> View Resume
        </button>
        <button
          type="button"
          onClick={onShareClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Share profile"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true"><PixelSprite type="share" size={14} /></span> Share Profile
        </button>
        <button
          type="button"
          onClick={onSaveContactClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Save contact as vCard"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true"><PixelSprite type="contact" size={14} /></span> Save Contact
        </button>
      </div>
    </div>
  );
};

export default ContactSection;
