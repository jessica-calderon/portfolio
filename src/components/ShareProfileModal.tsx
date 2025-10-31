import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface ShareProfileModalProps {
  onClose: () => void;
}

const ShareProfileModal: React.FC<ShareProfileModalProps> = ({ onClose }) => {
  const { isDarkMode } = useDarkMode();
  const [copied, setCopied] = useState(false);
  const profileUrl = window.location.href;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      url: `mailto:?subject=Check out my portfolio!&body=${encodeURIComponent(profileUrl)}`,
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
    >
      <div 
        className={`w-full max-w-md mx-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'} rounded-md shadow-md border border-gray-400 dark:border-gray-600 overflow-hidden animate-modalAppear`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Windows XP-style title bar */}
        <div className={`${isDarkMode ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]' : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'} text-white font-bold px-4 py-2 flex items-center justify-between`}>
          <span className="text-sm">Share Profile</span>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal content */}
        <div className={`p-6 space-y-4 ${isDarkMode ? 'bg-gray-700' : 'bg-[#ece9d8]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Share this profile:</h3>
            <p className={`text-xs break-all p-2 border rounded ${
              isDarkMode 
                ? 'text-gray-300 bg-gray-800 border-gray-600' 
                : 'text-gray-600 bg-gray-50 border-gray-300'
            }`}>{profileUrl}</p>
          </div>

          <div>
            <h3 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Share on:</h3>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleShare(option.url)}
                  className={`px-4 py-3 rounded border transition-colors flex items-center justify-center space-x-2 text-sm font-medium ${
                    isDarkMode
                      ? 'bg-blue-800 hover:bg-blue-700 text-blue-100 border-blue-600'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300'
                  }`}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`pt-3 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <button
              onClick={handleCopyUrl}
              className={`w-full px-4 py-3 rounded font-medium text-sm transition-colors ${
                copied
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copied ? '✓ URL Copied!' : '📋 Copy Profile URL'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareProfileModal;

