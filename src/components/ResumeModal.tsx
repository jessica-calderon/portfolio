import React, { useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface ResumeModalProps {
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  const { isDarkMode } = useDarkMode();
  const resumeDocId = '1Te9UsvtdF-xzI0v7cLMYAuTnDRmaPyOiDUH30E5XXT8';
  const resumeUrl = `https://docs.google.com/document/d/${resumeDocId}/preview`;
  const downloadUrl = `https://docs.google.com/document/d/${resumeDocId}/export?format=pdf`;

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

  const handleDownload = () => {
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  };

  const handleViewOriginal = () => {
    window.open(`https://docs.google.com/document/d/${resumeDocId}/edit?usp=sharing`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
    >
      <div 
        className={`w-full max-w-4xl mx-4 my-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'} rounded-md shadow-md border border-gray-400 dark:border-gray-600 overflow-hidden animate-modalAppear flex flex-col h-[calc(90vh-2rem)] max-h-[calc(90vh-2rem)]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Windows XP-style title bar */}
        <div className={`${isDarkMode ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]' : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'} text-white font-bold px-4 py-2 flex items-center justify-between`}>
          <span className="text-sm">Jessica Calderon - Resume</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs font-medium border border-green-700 transition-colors"
              aria-label="Download Resume"
            >
              📥 Download PDF
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal content */}
        <div className={`flex-1 overflow-hidden p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-[#ece9d8]'}`}>
          <iframe
            src={resumeUrl}
            className={`w-full h-full border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
            title="Resume"
          />
        </div>

        {/* Footer with action buttons */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'} border-t px-4 py-3 flex items-center justify-between`}>
          <button
            onClick={handleViewOriginal}
            className={`text-sm font-medium underline transition-colors ${
              isDarkMode 
                ? 'text-blue-300 hover:text-blue-200' 
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            Open in Google Docs
          </button>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;

