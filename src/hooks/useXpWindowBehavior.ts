import { useEffect, useRef, type MouseEvent } from 'react';

interface UseXpWindowBehaviorOptions {
  onClose: () => void;
  initialFocus?: 'first' | 'none';
  /** Tag names to skip in the focus trap (e.g. IFRAME) */
  excludeTags?: string[];
}

/**
 * Shared XP/OS window behavior: Escape, body scroll lock, focus trap, focus restore.
 */
export function useXpWindowBehavior({
  onClose,
  initialFocus = 'first',
  excludeTags = [],
}: UseXpWindowBehaviorOptions) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const excludeKey = excludeTags.slice().sort().join('|');

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    const excluded = new Set(excludeTags);

    const getFocusable = () => {
      if (!dialog) return [];
      return Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => {
        if (excluded.has(el.tagName)) return false;
        return el.offsetParent !== null;
      });
    };

    if (initialFocus === 'first') {
      getFocusable()[0]?.focus();
    }

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
    // excludeKey encodes excludeTags; avoid depending on a new array identity each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, initialFocus, excludeKey]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return { dialogRef, handleBackdropClick };
}
