import React, { useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface CaseStudy {
  name: string;
  description: string;
  impact: string;
  techUsed: string[];
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose }) => {
  const { isDarkMode } = useDarkMode();

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

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
    >
      <div 
        className={`w-full max-w-2xl mx-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'} rounded-md shadow-md border border-gray-400 dark:border-gray-600 overflow-hidden animate-modalAppear`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Windows XP-style title bar */}
        <div className={`${isDarkMode ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]' : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'} text-white font-bold px-4 py-2 flex items-center justify-between`}>
          <span className="text-sm">{caseStudy.name}</span>
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
            <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Description:</h3>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{caseStudy.description}</p>
          </div>

          <div>
            <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Impact:</h3>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{caseStudy.impact}</p>
          </div>

          <div>
            <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.techUsed.map((tech, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    isDarkMode
                      ? 'bg-blue-800 text-blue-100 border-blue-600'
                      : 'bg-blue-200 text-blue-800 border-blue-300'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;

