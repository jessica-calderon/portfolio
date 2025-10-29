import React from 'react';

interface ContactSectionProps {
  onResumeClick: () => void;
  onShareClick: () => void;
  onRatingClick: () => void;
  onCustomizeClick: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onResumeClick, onShareClick, onRatingClick, onCustomizeClick }) => {
  return (
    <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400 spacing-standard" id="contact">
      <h3 className="font-bold text-black dark:text-white text-xs sm:text-sm mb-2 sm:mb-3">Contacting Jessica</h3>
      <div className="grid grid-cols-2 gap-2">
        <a href="mailto:calderonjessica13@yahoo.com" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <span className="mr-1">✉️</span> Send Message
        </a>
        <a href="https://linkedin.com/in/Jessica-Calderon-00" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <span className="mr-1">👥</span> Connect
        </a>
        <a href="https://cal.com/jessica-calderon" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <span className="mr-1">💬</span> Schedule Call
        </a>
        <button onClick={onResumeClick} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <span className="mr-1">📄</span> View Resume
        </button>
        <button onClick={onShareClick} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <span className="mr-1">↗️</span> Share Profile
        </button>
        <button onClick={onCustomizeClick} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <span className="mr-1">🎨</span> Customize Profile
        </button>
        <a href="mailto:calderonjessica13@yahoo.com" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <span className="mr-1">📧</span> Email Resume
        </a>
        <button onClick={onRatingClick} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <span className="mr-1">⭐</span> Rate Profile
        </button>
      </div>
    </div>
  );
};

export default ContactSection;
