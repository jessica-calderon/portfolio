import React, { useEffect, useState } from 'react';
import { readFavorited } from './AddFavoriteDialog';

interface ContactSectionProps {
  onSendMessageClick: () => void;
  onResumeClick: () => void;
  onShareClick: () => void;
  onFavoritesClick: () => void;
  onRatingClick: () => void;
  onCustomizeClick: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  onSendMessageClick,
  onResumeClick,
  onShareClick,
  onFavoritesClick,
  onRatingClick,
  onCustomizeClick,
}) => {
  const [favorited, setFavorited] = useState(readFavorited);

  useEffect(() => {
    const sync = () => setFavorited(readFavorited());
    window.addEventListener('jc-favorites-changed', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('jc-favorites-changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

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
        <a href="https://linkedin.com/in/Jessica-Calderon-00" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center" aria-label="Connect on LinkedIn (opens in new tab)">
          <span className="mr-1" aria-hidden="true">👥</span> Connect
        </a>
        <a href="https://cal.com/jessica-calderon" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center" aria-label="Schedule a call via Cal.com (opens in new tab)">
          <span className="mr-1" aria-hidden="true">💬</span> Schedule Call
        </a>
        <button type="button" onClick={onResumeClick} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center" aria-label="View resume" aria-haspopup="dialog">
          <span className="mr-1" aria-hidden="true">📄</span> View Resume
        </button>
        <button type="button" onClick={onShareClick} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center" aria-label="Share profile" aria-haspopup="dialog">
          <span className="mr-1" aria-hidden="true">↗️</span> Share Profile
        </button>
        <button type="button" onClick={onCustomizeClick} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center" aria-label="Build your own layout">
          <span className="mr-1" aria-hidden="true">🎨</span> Customize Profile
        </button>
        <button
          type="button"
          onClick={onFavoritesClick}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          aria-label={favorited ? 'Manage MyPortfolio favorite' : 'Add to Favorites'}
          aria-haspopup="dialog"
        >
          <span className="mr-1" aria-hidden="true">⭐</span> {favorited ? 'Favorited' : 'Add to Favorites'}
        </button>
        <button type="button" onClick={onRatingClick} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center" aria-label="Rate this profile">
          <span className="mr-1" aria-hidden="true">👍</span> Rate Profile
        </button>
      </div>
    </div>
  );
};

export default ContactSection;
