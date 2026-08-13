import React from 'react';
import AccessibilityButton from './AccessibilityButton';
import JumpToTop from './JumpToTop';

interface FloatingUtilityControlsProps {
  isMyspaceMode: boolean;
}

/**
 * Bottom-right utility cluster for Accessibility + Scroll-to-Top.
 * Stacked vertically with safe-area insets so controls stay reachable
 * without floating mid-viewport over content.
 */
const FloatingUtilityControls: React.FC<FloatingUtilityControlsProps> = ({ isMyspaceMode }) => {
  return (
    <div
      className="floating-utility-controls fixed z-[70] flex flex-col items-center gap-3"
      role="region"
      aria-label="Page utilities"
    >
      <AccessibilityButton />
      <JumpToTop isMyspaceMode={isMyspaceMode} />
    </div>
  );
};

export default FloatingUtilityControls;
