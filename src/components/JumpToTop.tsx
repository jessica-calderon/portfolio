import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface JumpToTopProps {
  isMyspaceMode: boolean;
}

const JumpToTop: React.FC<JumpToTopProps> = ({ isMyspaceMode }) => {
  const { isDarkMode } = useDarkMode();
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  // Get button styling based on theme
  const getButtonClasses = () => {
    const baseClasses = 'fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg';
    
    // Add fade-in/fade-out animation classes
    const visibilityClasses = isVisible 
      ? 'opacity-100 translate-y-0 pointer-events-auto' 
      : 'opacity-0 translate-y-2 pointer-events-none';
    
    // Default layout mode
    if (!isMyspaceMode) {
      if (isDarkMode) {
        return `${baseClasses} ${visibilityClasses} bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-400 text-white border border-blue-500 hover:shadow-xl hover:scale-110 active:scale-95`;
      } else {
        return `${baseClasses} ${visibilityClasses} bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-400 text-white border border-blue-400 hover:shadow-xl hover:scale-110 active:scale-95`;
      }
    }
    
    // MySpace layout mode
    if (isDarkMode) {
      return `${baseClasses} ${visibilityClasses} bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-purple-400 text-white border border-purple-400 hover:shadow-xl hover:scale-110 active:scale-95`;
    } else {
      return `${baseClasses} ${visibilityClasses} bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:ring-pink-400 text-white border border-pink-400 hover:shadow-xl hover:scale-110 active:scale-95`;
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={getButtonClasses()}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default JumpToTop;

