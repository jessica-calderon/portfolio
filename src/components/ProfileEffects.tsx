import React, { useEffect, useMemo } from 'react';
import { useProfileTheme } from '../contexts/ProfileThemeContext';

/**
 * Decorative profile effects for visitor layouts. Respects reduced motion.
 * Never intercepts pointer events for clicks/scroll.
 */
const ProfileEffects: React.FC = () => {
  const { draft, activeVisitor, isVisitorThemeActive } = useProfileTheme();
  const effects = draft?.effects || activeVisitor?.effects;

  const reducedMotion =
    typeof document !== 'undefined' &&
    (document.documentElement.classList.contains('reduced-motion') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const particles = useMemo(() => {
    if (!effects || reducedMotion) return [];
    const items: { id: number; left: string; delay: string; kind: string }[] = [];
    if (effects.sparkles || effects.starBackground) {
      for (let i = 0; i < 18; i++) {
        items.push({
          id: i,
          left: `${(i * 17) % 100}%`,
          delay: `${(i % 7) * 0.4}s`,
          kind: effects.starBackground && i % 2 === 0 ? 'star' : 'sparkle',
        });
      }
    }
    if (effects.floatingHearts) {
      for (let i = 0; i < 8; i++) {
        items.push({
          id: 100 + i,
          left: `${(i * 23 + 5) % 100}%`,
          delay: `${(i % 5) * 0.6}s`,
          kind: 'heart',
        });
      }
    }
    return items;
  }, [effects, reducedMotion]);

  useEffect(() => {
    if (!effects?.cursorTrail || reducedMotion || !isVisitorThemeActive) return;

    const dots: HTMLDivElement[] = [];
    let i = 0;
    const onMove = (e: MouseEvent) => {
      const dot = document.createElement('div');
      dot.className = 'profile-cursor-trail-dot';
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      document.body.appendChild(dot);
      dots.push(dot);
      i += 1;
      window.setTimeout(() => {
        dot.remove();
      }, 500);
      if (dots.length > 20) {
        const old = dots.shift();
        old?.remove();
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      dots.forEach((d) => d.remove());
    };
  }, [effects?.cursorTrail, reducedMotion, isVisitorThemeActive]);

  if (!isVisitorThemeActive || !effects || reducedMotion) return null;
  if (particles.length === 0) return null;

  return (
    <div className="profile-effects-layer" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`profile-effect-particle profile-effect-particle--${p.kind}`}
          style={{ left: p.left, animationDelay: p.delay }}
        >
          {p.kind === 'heart' ? '♥' : p.kind === 'star' ? '✦' : '✧'}
        </span>
      ))}
    </div>
  );
};

export default ProfileEffects;
