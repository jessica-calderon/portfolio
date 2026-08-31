import React from 'react';
import { useXpWindowBehavior } from '../hooks/useXpWindowBehavior';
import PixelSprite from './shared/PixelSprite';

type FooterPage = 'about' | 'faq' | 'terms' | 'privacy' | 'safety';

interface FooterModalProps {
  page: FooterPage;
  onClose: () => void;
}

const FOOTER_CONTENT: Record<FooterPage, { title: string; content: React.ReactNode }> = {
  about: {
    title: 'About MyPortfolio',
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
        <ul className="list-disc list-inside mb-3 space-y-1">
          <li>A web browser (Netscape Navigator 4.0+ recommended)</li>
          <li>At least 56k modem connection</li>
          <li>Tolerance for blinking text</li>
          <li>Appreciation for questionable design choices</li>
        </ul>
        <p className="text-xs opacity-70">
          * Actually runs on React 18. I'm not a monster.
        </p>
      </>
    ),
  },
  faq: {
    title: 'Frequently Asked Questions',
    content: (
      <>
        <div className="mb-4">
          <p className="font-bold mb-1">Q: Is this really your portfolio?</p>
          <p className="ml-4">A: Yes! I'm a real software engineer who builds real things. The MySpace aesthetic is just for fun.</p>
        </div>
        <div className="mb-4">
          <p className="font-bold mb-1">Q: Why does it look like 2006?</p>
          <p className="ml-4">A: Because 2006 was peak internet. No notes.</p>
        </div>
        <div className="mb-4">
          <p className="font-bold mb-1">Q: Where's the autoplay music?</p>
          <p className="ml-4">A: I have limits. But imagine "How You Remind Me" by Nickelback playing right now if it helps.</p>
        </div>
        <div className="mb-4">
          <p className="font-bold mb-1">Q: Can I be in your Top 8?</p>
          <p className="ml-4">A: Connect with me on LinkedIn and we'll talk.</p>
        </div>
        <div className="mb-4">
          <p className="font-bold mb-1">Q: Did you really build this with Cursor agents?</p>
          <p className="ml-4">A: Yep! The future is wild. Check out the Workers Room project.</p>
        </div>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    content: (
      <>
        <p className="mb-3 font-bold">MYPORTFOLIO TERMS OF SERVICE (Est. 2003)</p>
        <p className="mb-3">By viewing this portfolio, you agree to the following:</p>
        <ol className="list-decimal list-inside space-y-2 mb-3">
          <li>You will not judge my code too harshly before your morning coffee.</li>
          <li>You acknowledge that CSS was harder in 2006 and we're all doing our best.</li>
          <li>You agree that this portfolio is "pretty cool" or at minimum "kind of neat."</li>
          <li>You will consider hiring me for interesting projects.</li>
          <li>You accept that any nostalgia-induced tears are your own responsibility.</li>
          <li>You understand that the "Contact" button actually works and you should use it.</li>
          <li>You hereby waive all claims related to earworm from imagining MySpace-era music.</li>
        </ol>
        <p className="text-xs opacity-70">
          * These terms are not legally binding. Obviously.
        </p>
      </>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    content: (
      <>
        <p className="mb-3 font-bold">YOUR PRIVACY MATTERS (Kind of)</p>
        <p className="mb-3">
          <strong>What I collect:</strong> Literally nothing. This is a static site hosted on GitHub Pages. 
          I couldn't track you if I wanted to. (I don't want to.)
        </p>
        <p className="mb-3">
          <strong>Cookies:</strong> None. Not even the delicious kind. Sorry.
        </p>
        <p className="mb-3">
          <strong>Third parties:</strong> GitHub hosts this. Google hosts my resume preview. 
          That's it. No shadowy data brokers here.
        </p>
        <p className="mb-3">
          <strong>Your data rights:</strong> You have the right to... view this portfolio? 
          Close the tab whenever you want? Live your best life? All of the above!
        </p>
        <p className="text-xs opacity-70 mt-4">
          This privacy policy is more transparent than most actual privacy policies, and that's kind of sad.
        </p>
      </>
    ),
  },
  safety: {
    title: 'Safety Tips',
    content: (
      <>
        <p className="mb-3 font-bold">🛡️ MYPORTFOLIO SAFETY CENTER 🛡️</p>
        <p className="mb-3">Stay safe on the information superhighway with these tips:</p>
        <ul className="space-y-2 mb-3">
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Never give your password to anyone, even if they claim to be a "MyPortfolio Admin."</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>If a pop-up says you've won a million dollars, you probably haven't.</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Be wary of anyone who puts "Entrepreneur" in their bio.</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Take breaks from screens. Go touch grass. (Then come back and view more of this portfolio.)</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>If a website autoplays music, close it immediately. Unless it's a banger.</span>
          </li>
        </ul>
        <p className="text-xs opacity-70">
          Remember: Stranger danger applies to the internet too, but I'm not a stranger — I'm a potential colleague!
        </p>
      </>
    ),
  },
};

const FooterModal: React.FC<FooterModalProps> = ({ page, onClose }) => {
  const { dialogRef, handleBackdropClick } = useXpWindowBehavior({ onClose });
  const { title, content } = FOOTER_CONTENT[page];

  return (
    <div
      className="xp-window modal-overlay z-[60] bg-black bg-opacity-50 animate-fadeIn motion-reduce:animate-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="footer-modal-title"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="xp-shell w-full max-w-[480px] overflow-hidden animate-modalAppear motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xp-titlebar flex items-center justify-between px-2 py-1.5 select-none">
          <span id="footer-modal-title" className="xp-titlebar-text text-xs font-bold truncate flex items-center gap-2">
            <PixelSprite type="document" size={14} />
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="xp-close flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#1a4aa5]"
            aria-label={`Close ${title}`}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <div className="xp-body p-4 max-h-[60vh] overflow-y-auto">
          <div className="xp-text text-sm leading-relaxed">
            {content}
          </div>
          <div className="flex justify-end mt-4 pt-3 border-t border-gray-300">
            <button
              type="button"
              onClick={onClose}
              className="xp-btn-primary xp-action-btn"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterModal;
