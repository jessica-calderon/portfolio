import React, { FormEvent, useEffect, useId, useRef, useState } from 'react';
import profilePic from '../assets/8bitme.png';
import { CONTACT_EMAIL } from '../constants/contact';

interface AimContactModalProps {
  onClose: () => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AimContactModal: React.FC<AimContactModalProps> = ({ onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const formId = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [statusText, setStatusText] = useState('Online');

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    // Focus first field after paint
    requestAnimationFrame(() => {
      nameInputRef.current?.focus();
    });

    const dialog = dialogRef.current;
    const getFocusable = () => {
      if (!dialog) return [];
      return Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !dialog) return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      previouslyFocusedRef.current?.focus();
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const validate = () => {
    const next: { name?: string; email?: string; message?: string } = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) next.name = 'Please enter your name.';
    if (!trimmedEmail) {
      next.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!trimmedMessage) next.message = 'Please enter a message.';

    setErrors(next);
    return Object.keys(next).length === 0
      ? { trimmedName, trimmedEmail, trimmedMessage }
      : null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const values = validate();
    if (!values) return;

    const subject = `Portfolio message from ${values.trimmedName}`;
    const body = [
      `Name: ${values.trimmedName}`,
      `Email: ${values.trimmedEmail}`,
      '',
      'Message:',
      values.trimmedMessage,
    ].join('\n');

    setStatusText('Opening your email client…');

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const nameErrorId = `${formId}-name-error`;
  const emailErrorId = `${formId}-email-error`;
  const messageErrorId = `${formId}-message-error`;

  return (
    <div
      className="xp-window aim-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="aim-modal-title"
      id="aim-contact-window"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell aim-shell modal-window--compact max-w-[420px] animate-modalAppear motion-reduce:animate-none
          sm:max-h-[min(90vh,560px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar modal-window__chrome flex items-center justify-between px-2 py-1.5 select-none">
          <div className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="text-sm leading-none">💬</span>
            <span
              id="aim-modal-title"
              className="xp-titlebar-text truncate text-xs font-bold sm:text-sm"
            >
              Instant Message — Jessica Calderon
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label="Close instant message window"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="aim-buddy modal-window__chrome">
          <img
            src={profilePic}
            alt=""
            className="aim-buddy-icon"
            width={40}
            height={40}
            aria-hidden="true"
          />
          <div className="aim-buddy-meta min-w-0">
            <div className="aim-buddy-name">Jessica Calderon</div>
            <div className="aim-buddy-presence">
              <span className="aim-online-dot" aria-hidden="true" />
              <span>Online</span>
            </div>
            <div className="aim-buddy-title">Principal Software Engineer / Technical Lead</div>
            <div className="aim-buddy-status">
              Status: Currently coding… (and occasionally breaking things)
            </div>
          </div>
        </div>

        <form
          className="aim-body modal-window__body flex flex-col"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="aim-fields">
            <div className="aim-field">
              <label htmlFor={`${formId}-name`} className="aim-label">
                Your Name <span className="aim-required">(required)</span>
              </label>
              <input
                ref={nameInputRef}
                id={`${formId}-name`}
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="aim-input"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? nameErrorId : undefined}
              />
              {errors.name && (
                <p id={nameErrorId} className="aim-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="aim-field">
              <label htmlFor={`${formId}-email`} className="aim-label">
                Your Email <span className="aim-required">(required)</span>
              </label>
              <input
                id={`${formId}-email`}
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="aim-input"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? emailErrorId : undefined}
              />
              {errors.email && (
                <p id={emailErrorId} className="aim-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="aim-field aim-field--message">
              <label htmlFor={`${formId}-message`} className="aim-label">
                Message <span className="aim-required">(required)</span>
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="aim-textarea"
                rows={6}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? messageErrorId : undefined}
              />
              {errors.message && (
                <p id={messageErrorId} className="aim-error" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <div className="aim-actions shrink-0">
            <button type="submit" className="xp-btn-primary aim-btn">
              Send IM
            </button>
            <button type="button" className="xp-btn aim-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>

        <div className="xp-statusbar aim-statusbar modal-window__chrome" role="status" aria-live="polite">
          <span>{statusText}</span>
          <span className="xp-muted">Connected</span>
        </div>
      </div>
    </div>
  );
};

export default AimContactModal;
