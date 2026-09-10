import React from 'react';
import { useXpWindowBehavior } from '../hooks/useXpWindowBehavior';

export type FooterPage = 'about' | 'faq' | 'terms' | 'privacy' | 'safety';

interface FooterModalProps {
  page: FooterPage;
  onClose: () => void;
}

const FOOTER_CONTENT: Record<FooterPage, { title: string; icon: string; content: React.ReactNode }> = {
  about: {
    title: 'About MyPortfolio',
    icon: 'ℹ️',
    content: (
      <>
        <p className="mb-3">
          <strong>MyPortfolio v2.0</strong> — Now with 100% more nostalgia!
        </p>
        <p className="mb-3">
          This portfolio was lovingly crafted to look like it time-traveled from 2006,
          back when we all had top 8 friends and autoplay music was considered a feature, not a crime.
        </p>
        <p className="mb-3">
          <strong>System Requirements:</strong>
        </p>
        <ul className="mb-3 list-disc space-y-1 pl-5">
          <li>A web browser (Netscape Navigator 4.0+ recommended)</li>
          <li>At least 56k modem connection</li>
          <li>Tolerance for blinking text</li>
          <li>Appreciation for questionable design choices</li>
        </ul>
        <p className="xp-muted text-xs">* Actually runs on React 18. I&apos;m not a monster.</p>
      </>
    ),
  },
  faq: {
    title: 'Frequently Asked Questions',
    icon: '❓',
    content: (
      <>
        <div className="mb-4">
          <p className="mb-1 font-bold">Q: Is this really your portfolio?</p>
          <p>A: Yes! I&apos;m a real software engineer who builds real things. The MySpace aesthetic is just for fun.</p>
        </div>
        <div className="mb-4">
          <p className="mb-1 font-bold">Q: Why does it look like 2006?</p>
          <p>A: Because 2006 was peak internet. No notes.</p>
        </div>
        <div className="mb-4">
          <p className="mb-1 font-bold">Q: Where&apos;s the autoplay music?</p>
          <p>A: I have limits. But imagine &quot;How You Remind Me&quot; by Nickelback playing right now if it helps.</p>
        </div>
        <div className="mb-4">
          <p className="mb-1 font-bold">Q: Can I be in your Top 8?</p>
          <p>A: Connect with me on LinkedIn and we&apos;ll talk.</p>
        </div>
        <div>
          <p className="mb-1 font-bold">Q: Did you really build this with Cursor agents?</p>
          <p>A: Yep! The future is wild. Check out the Workers Room project.</p>
        </div>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    icon: '📄',
    content: (
      <>
        <p className="mb-3 font-bold">MYPORTFOLIO TERMS OF SERVICE (Est. 2003)</p>
        <p className="mb-3">By viewing this portfolio, you agree to the following:</p>
        <ol className="mb-3 list-decimal space-y-2 pl-5">
          <li>You will not judge my code too harshly before your morning coffee.</li>
          <li>You acknowledge that CSS was harder in 2006 and we&apos;re all doing our best.</li>
          <li>You agree that this portfolio is &quot;pretty cool&quot; or at minimum &quot;kind of neat.&quot;</li>
          <li>You will consider hiring me for interesting projects.</li>
          <li>You accept that any nostalgia-induced tears are your own responsibility.</li>
          <li>You understand that the &quot;Contact&quot; button actually works and you should use it.</li>
          <li>You hereby waive all claims related to earworm from imagining MySpace-era music.</li>
        </ol>
        <p className="xp-muted text-xs">* These terms are not legally binding. Obviously.</p>
      </>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    icon: '🔒',
    content: (
      <>
        <p className="mb-3 font-bold">YOUR PRIVACY MATTERS (Kind of)</p>
        <p className="mb-3">
          <strong>What I collect:</strong> Literally nothing. This is a static site hosted on GitHub Pages.
          I couldn&apos;t track you if I wanted to. (I don&apos;t want to.)
        </p>
        <p className="mb-3">
          <strong>Cookies:</strong> None. Not even the delicious kind. Sorry.
        </p>
        <p className="mb-3">
          <strong>Third parties:</strong> GitHub hosts this. Google hosts my resume preview.
          That&apos;s it. No shadowy data brokers here.
        </p>
        <p className="mb-3">
          <strong>Your data rights:</strong> You have the right to... view this portfolio?
          Close the tab whenever you want? Live your best life? All of the above!
        </p>
        <p className="xp-muted mt-4 text-xs">
          This privacy policy is more transparent than most actual privacy policies, and that&apos;s kind of sad.
        </p>
      </>
    ),
  },
  safety: {
    title: 'Safety Tips',
    icon: '🛡️',
    content: (
      <>
        <p className="mb-3 font-bold">MYPORTFOLIO SAFETY CENTER</p>
        <p className="mb-3">Stay safe on the information superhighway with these tips:</p>
        <ul className="mb-3 space-y-2">
          <li className="flex items-start gap-2">
            <span aria-hidden="true">✓</span>
            <span>Never give your password to anyone, even if they claim to be a &quot;MyPortfolio Admin.&quot;</span>
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden="true">✓</span>
            <span>If a pop-up says you&apos;ve won a million dollars, you probably haven&apos;t.</span>
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden="true">✓</span>
            <span>Be wary of anyone who puts &quot;Entrepreneur&quot; in their bio.</span>
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden="true">✓</span>
            <span>Take breaks from screens. Go touch grass. (Then come back and view more of this portfolio.)</span>
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden="true">✓</span>
            <span>If a website autoplays music, close it immediately. Unless it&apos;s a banger.</span>
          </li>
        </ul>
        <p className="xp-muted text-xs">
          Remember: Stranger danger applies to the internet too, but I&apos;m not a stranger — I&apos;m a potential colleague!
        </p>
      </>
    ),
  },
};

/**
 * Theme-isolated XP dialog for footer legal/fun pages.
 * Title bar and OK stay pinned; only the body scrolls.
 */
const FooterModal: React.FC<FooterModalProps> = ({ page, onClose }) => {
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({ onClose });
  const { title, icon, content } = FOOTER_CONTENT[page];

  return (
    <div
      className="xp-window footer-dialog-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="footer-modal-title"
      id="footer-legal-window"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell footer-dialog-shell modal-window--compact w-full max-w-[480px] animate-modalAppear motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar modal-window__chrome flex items-center justify-between px-2 py-1.5 select-none">
          <div className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="text-sm leading-none">
              {icon}
            </span>
            <span id="footer-modal-title" className="xp-titlebar-text truncate text-xs font-bold sm:text-sm">
              {title}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label={`Close ${title}`}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="xp-body footer-dialog-body modal-window__body">
          <div className="xp-text text-sm leading-relaxed">{content}</div>
        </div>

        <div className="xp-footer modal-window__footer footer-dialog-footer flex justify-end px-3 pt-2">
          <button type="button" onClick={onClose} className="xp-btn-primary xp-action-btn" autoFocus>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterModal;
