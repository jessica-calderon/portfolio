import React, { useId, useState } from 'react';
import { CAL_COM_PROFILE_URL } from '../constants/urls';
import { useXpWindowBehavior } from '../hooks/useXpWindowBehavior';
import PixelSprite from './shared/PixelSprite';

export type MeetingDuration = 15 | 30;

interface ScheduleCallModalProps {
  onClose: () => void;
}

/**
 * Outlook 2003–inspired appointment window.
 * Presentation only — Cal.com remains the scheduling backend.
 * Only the profile URL exists in-repo; duration choice is UI framing.
 */
const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({ onClose }) => {
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({ onClose });
  const [duration, setDuration] = useState<MeetingDuration | null>(null);
  const groupId = useId();

  const handleViewTimes = () => {
    if (!duration) return;
    window.open(CAL_COM_PROFILE_URL, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="xp-window schedule-call-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-call-title"
      id="schedule-call-window"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell schedule-call-shell modal-window--compact animate-modalAppear motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar modal-window__chrome flex items-center justify-between px-2 py-1.5 select-none">
          <div className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="text-sm leading-none">
              📅
            </span>
            <span
              id="schedule-call-title"
              className="xp-titlebar-text truncate text-xs font-bold sm:text-sm"
            >
              Schedule a Call — Jessica Calderon
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label="Close schedule call window"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="schedule-call-toolbar modal-window__chrome" aria-hidden="true">
          <span className="schedule-call-toolbar-item"><PixelSprite type="document" size={12} /> Appointment</span>
          <span className="schedule-call-toolbar-sep">|</span>
          <span className="schedule-call-toolbar-item"><PixelSprite type="clock" size={12} /> Availability</span>
        </div>

        <div className="schedule-call-body modal-window__body">
          <div className="schedule-call-fields">
            <div className="schedule-call-row">
              <span className="schedule-call-label">With:</span>
              <span className="schedule-call-value">Jessica Calderon</span>
            </div>
            <div className="schedule-call-row">
              <span className="schedule-call-label">Subject:</span>
              <span className="schedule-call-value">Intro / Portfolio Chat</span>
            </div>
            <div className="schedule-call-row">
              <span className="schedule-call-label">Location:</span>
              <span className="schedule-call-value">Online</span>
            </div>
            <div className="schedule-call-row">
              <span className="schedule-call-label">Organizer:</span>
              <span className="schedule-call-value">Jessica Calderon</span>
            </div>
            <div className="schedule-call-row">
              <span className="schedule-call-label">Availability:</span>
              <span className="schedule-call-value">Online scheduling</span>
            </div>
            <div className="schedule-call-row">
              <span className="schedule-call-label">Duration:</span>
              <span className="schedule-call-value">
                {duration ? `${duration} minutes` : '— select below —'}
              </span>
            </div>
            <div className="schedule-call-row">
              <span className="schedule-call-label">Status:</span>
              <span className="schedule-call-value schedule-call-muted">
                Available times provided by Cal.com
              </span>
            </div>
          </div>

          <fieldset className="schedule-call-duration">
            <legend className="schedule-call-duration-legend">Choose a meeting length:</legend>
            <div
              className="schedule-call-options"
              role="radiogroup"
              aria-labelledby={`${groupId}-legend`}
            >
              <span id={`${groupId}-legend`} className="sr-only">
                Meeting length
              </span>
              <label
                className={`schedule-call-option${duration === 15 ? ' schedule-call-option--selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`${groupId}-duration`}
                  value="15"
                  checked={duration === 15}
                  onChange={() => setDuration(15)}
                  className="schedule-call-radio"
                />
                <span className="schedule-call-option-body">
                  <span className="schedule-call-option-title">
                    <span aria-hidden="true"><PixelSprite type="clock" size={14} /> </span>15 Minutes
                  </span>
                  <span className="schedule-call-option-desc">
                    Quick intro, portfolio discussion, or question.
                  </span>
                </span>
              </label>
              <label
                className={`schedule-call-option${duration === 30 ? ' schedule-call-option--selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`${groupId}-duration`}
                  value="30"
                  checked={duration === 30}
                  onChange={() => setDuration(30)}
                  className="schedule-call-radio"
                />
                <span className="schedule-call-option-body">
                  <span className="schedule-call-option-title">
                    <span aria-hidden="true"><PixelSprite type="clock" size={14} /> </span>30 Minutes
                  </span>
                  <span className="schedule-call-option-desc">
                    Longer conversation about engineering, opportunities, projects, or technical
                    topics.
                  </span>
                </span>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="xp-footer modal-window__footer schedule-call-footer flex flex-wrap justify-end gap-2 px-3 pt-2">
          <button
            type="button"
            className="xp-btn xp-btn-primary min-h-[36px] px-3 py-1.5 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={duration === null}
            onClick={handleViewTimes}
          >
            View Available Times
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
  );
};

export default ScheduleCallModal;
