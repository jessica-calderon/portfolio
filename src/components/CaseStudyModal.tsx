import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface PreviewImage {
  src: string;
  alt: string;
}

interface CaseStudy {
  name: string;
  description: string;
  impact: string;
  techUsed: string[];
  emoji: string;
  websiteUrl?: string;
  githubUrl?: string;
  previewImages?: PreviewImage[];
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy;
  onClose: () => void;
  onViewHomelab?: () => void;
  /** When set, Visit Website closes into this handler instead of navigating away (e.g. shared IE window). */
  onVisitWebsite?: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onViewHomelab,
  onVisitWebsite,
}) => {
  const isHomelab = caseStudy.name.toLowerCase().includes('homelab');
  const { isDarkMode } = useDarkMode();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const previewImages = caseStudy.previewImages || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % previewImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length);
  };

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

  const showFooter =
    Boolean(caseStudy.websiteUrl) ||
    Boolean(caseStudy.githubUrl) ||
    Boolean(isHomelab && onViewHomelab);

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
    >
      <div
        className={`modal-window--app ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'
        } rounded-md shadow-md border border-gray-400 dark:border-gray-600 animate-modalAppear`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed title bar */}
        <div
          className={`modal-window__chrome ${
            isDarkMode
              ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]'
              : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'
          } text-white font-bold px-3 sm:px-4 py-2 flex items-center justify-between`}
        >
          <span id="case-study-modal-title" className="text-sm truncate pr-2">
            {caseStudy.name}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white min-w-[28px] min-h-[28px] w-7 h-7 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors shrink-0"
            aria-label={`Close ${caseStudy.name} case study modal`}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Scrollable body */}
        <div
          className={`modal-window__body p-4 sm:p-6 space-y-4 ${
            isDarkMode ? 'bg-gray-700' : 'bg-[#ece9d8]'
          }`}
        >
          <div>
            <h3
              className={`text-sm font-bold mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              Description:
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {caseStudy.description}
            </p>
          </div>

          <div>
            <h3
              className={`text-sm font-bold mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              Impact:
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {caseStudy.impact}
            </p>
          </div>

          <div>
            <h3
              className={`text-sm font-bold mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              Technologies Used:
            </h3>
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

          {previewImages.length > 0 && (
            <div className="mt-2">
              <h3
                className={`text-sm font-bold mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                Preview:
              </h3>
              <div className="relative">
                <div className="border-2 border-gray-400 dark:border-gray-600 rounded overflow-hidden bg-black">
                  <img
                    src={previewImages[currentImageIndex].src}
                    alt={previewImages[currentImageIndex].alt}
                    className="w-full h-auto max-h-[300px] object-contain"
                  />
                </div>
                {previewImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                        isDarkMode
                          ? 'bg-gray-800/80 hover:bg-gray-700 text-white'
                          : 'bg-white/80 hover:bg-white text-gray-800'
                      } shadow-md`}
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                        isDarkMode
                          ? 'bg-gray-800/80 hover:bg-gray-700 text-white'
                          : 'bg-white/80 hover:bg-white text-gray-800'
                      } shadow-md`}
                      aria-label="Next image"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {previewImages.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === currentImageIndex
                              ? isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                              : isDarkMode ? 'bg-gray-500' : 'bg-gray-400'
                          }`}
                          aria-label={`View image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <p className={`text-xs mt-1 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {previewImages[currentImageIndex].alt}
                {previewImages.length > 1 && ` (${currentImageIndex + 1}/${previewImages.length})`}
              </p>
            </div>
          )}

          {caseStudy.websiteUrl && (
            <div className="mt-2">
              <h3
                className={`text-sm font-bold mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                Website Preview:
              </h3>
              <div className="modal-preview border-2 border-gray-400 dark:border-gray-600 rounded">
                <iframe
                  src={caseStudy.websiteUrl}
                  title={`${caseStudy.name} Preview`}
                  loading="lazy"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
                />
              </div>
            </div>
          )}
        </div>

        {/* Fixed footer actions */}
        {showFooter && (
          <div
            className={`modal-window__footer px-4 sm:px-6 pt-3 border-t ${
              isDarkMode
                ? 'border-gray-600 bg-gray-700'
                : 'border-gray-300 bg-[#ece9d8]'
            } flex flex-wrap justify-end gap-x-4 gap-y-2`}
          >
            {isHomelab && onViewHomelab && (
              <button
                type="button"
                onClick={onViewHomelab}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm min-h-[44px] sm:min-h-0 inline-flex items-center"
                aria-label="View Homelab in My Network Places"
                aria-haspopup="dialog"
              >
                View Homelab
              </button>
            )}
            {caseStudy.githubUrl && (
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm min-h-[44px] sm:min-h-0 inline-flex items-center"
                aria-label={`View ${caseStudy.name} on GitHub (opens in new tab)`}
              >
                View on GitHub
              </a>
            )}
            {caseStudy.websiteUrl &&
              (onVisitWebsite ? (
                <button
                  type="button"
                  onClick={onVisitWebsite}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm min-h-[44px] sm:min-h-0 inline-flex items-center"
                  aria-label={`Visit ${caseStudy.name} website`}
                  aria-haspopup="dialog"
                >
                  Visit Website
                </button>
              ) : (
                <a
                  href={caseStudy.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm min-h-[44px] sm:min-h-0 inline-flex items-center"
                  aria-label={`Visit ${caseStudy.name} website (opens in new tab)`}
                >
                  Visit Website
                </a>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudyModal;
