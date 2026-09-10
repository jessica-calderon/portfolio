import React from 'react';
import { useXpWindowBehavior } from '../hooks/useXpWindowBehavior';

interface CaseStudy {
  name: string;
  description: string;
  impact: string;
  techUsed: string[];
  emoji: string;
  websiteUrl?: string;
  githubUrl?: string;
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
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({ onClose });

  const showFooter =
    Boolean(caseStudy.websiteUrl) ||
    Boolean(caseStudy.githubUrl) ||
    Boolean(isHomelab && onViewHomelab);

  return (
    <div
      className="xp-window case-study-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      id="case-study-window"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell case-study-shell modal-window--compact w-full max-w-2xl animate-modalAppear motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar modal-window__chrome flex items-center justify-between px-2 py-1.5 select-none">
          <div className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="text-sm leading-none">
              {caseStudy.emoji || '📄'}
            </span>
            <span
              id="case-study-modal-title"
              className="xp-titlebar-text truncate text-xs font-bold sm:text-sm"
            >
              {caseStudy.name}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label={`Close ${caseStudy.name} case study`}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="xp-body case-study-body modal-window__body">
          <div>
            <h3 className="case-study-heading">Description:</h3>
            <p className="xp-text text-sm leading-relaxed">{caseStudy.description}</p>
          </div>

          <div>
            <h3 className="case-study-heading">Impact:</h3>
            <p className="xp-text text-sm leading-relaxed">{caseStudy.impact}</p>
          </div>

          <div>
            <h3 className="case-study-heading">Technologies Used:</h3>
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.techUsed.map((tech) => (
                <span key={tech} className="case-study-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {caseStudy.websiteUrl && (
            <div>
              <h3 className="case-study-heading">Website Preview:</h3>
              <div className="case-study-preview">
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

        <div className="xp-footer modal-window__footer case-study-footer flex flex-wrap justify-end gap-2 px-3 pt-2">
          {isHomelab && onViewHomelab && (
            <button
              type="button"
              onClick={onViewHomelab}
              className="xp-btn-primary xp-action-btn"
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
              className="xp-btn xp-action-btn inline-flex items-center justify-center no-underline"
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
                className="xp-btn-primary xp-action-btn"
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
                className="xp-btn-primary xp-action-btn inline-flex items-center justify-center no-underline"
                aria-label={`Visit ${caseStudy.name} website (opens in new tab)`}
              >
                Visit Website
              </a>
            ))}
          {!showFooter && (
            <button type="button" onClick={onClose} className="xp-btn-primary xp-action-btn">
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
