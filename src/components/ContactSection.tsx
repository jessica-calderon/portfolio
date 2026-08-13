import React from 'react';

interface ContactSectionProps {
  onSendMessageClick: () => void;
  onResumeClick: () => void;
  onShareClick: () => void;
  onSaveContactClick: () => void;
  onRatingClick: () => void;
  onCustomizeClick: () => void;
  onScheduleClick: () => void;
  onConnectClick: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  onSendMessageClick,
  onResumeClick,
  onShareClick,
  onSaveContactClick,
  onRatingClick,
  onCustomizeClick,
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
          <span className="mr-1" aria-hidden="true">✉️</span> Send Message
        </button>
        <button
          type="button"
          onClick={onConnectClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Add Jessica to professional network"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true">👥</span> Connect
        </button>
        <button
          type="button"
          onClick={onScheduleClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Schedule a call"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true">💬</span> Schedule Call
        </button>
        <button
          type="button"
          onClick={onResumeClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="View resume"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true">📄</span> View Resume
        </button>
        <button
          type="button"
          onClick={onShareClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Share profile"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true">↗️</span> Share Profile
        </button>
        <button
          type="button"
          onClick={onSaveContactClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Save contact as vCard"
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true">📇</span> Save Contact
        </button>
        <button
          type="button"
          onClick={onCustomizeClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Build your own layout"
        >
          <span className="mr-1" aria-hidden="true">🎨</span> Customize Profile
        </button>
        <button
          type="button"
          onClick={onRatingClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label="Rate this profile"
        >
          <span className="mr-1" aria-hidden="true">👍</span> Rate Profile
        </button>
      </div>
    </div>
  );
};

export default ContactSection;
