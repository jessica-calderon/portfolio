import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

/**
 * ProfileThemeToggle Component
 * 
 * A toggle button that switches between Default Professional mode and Classic MySpace mode.
 * Features:
 * - Persists mode preference in localStorage
 * - Uses global dark mode state from DarkModeContext
 * - Smooth transitions between modes
 * - Animated button with sparkle effects
 * - Retro fonts and accessible color schemes in MySpace mode
 * 
 * Usage:
 * <ProfileThemeToggle onModeChange={(isMyspace) => setMode(isMyspace)} />
 */

interface ProfileThemeToggleProps {
  onModeChange: (isMyspace: boolean) => void;
}

const ProfileThemeToggle: React.FC<ProfileThemeToggleProps> = ({ onModeChange }) => {
  const [isMyspace, setIsMyspace] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Load saved mode preference from localStorage
    const savedMode = localStorage.getItem('profileTheme');
    
    if (savedMode === 'myspace') {
      setIsMyspace(true);
      onModeChange(true);
    } else {
      setIsMyspace(false);
      onModeChange(false);
    }
  }, [onModeChange]);

  const toggleMode = () => {
    const newMyspaceMode = !isMyspace;
    
    setIsMyspace(newMyspaceMode);
    
    // Save to localStorage
    localStorage.setItem('profileTheme', newMyspaceMode ? 'myspace' : 'default');
    
    // Notify parent component
    onModeChange(newMyspaceMode);
  };

  return (
    <button
      onClick={toggleMode}
      className={`
        flex items-center justify-center px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 transform hover:scale-105
        ${isMyspace 
          ? isDarkMode
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
          : isDarkMode
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-xl'
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl'
        }
        hover:animate-pulse
      `}
      style={{
        fontFamily: isMyspace ? 'Comic Sans MS, cursive' : 'inherit',
        textShadow: isMyspace ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none'
      }}
    >
      {isMyspace ? (
        <>
          <span className="animate-spin inline-block mr-1">✨</span>
          Back to Professional View
          <span className="animate-spin inline-block ml-1">✨</span>
        </>
      ) : (
        <>
          <span className="animate-bounce inline-block mr-1">✨</span>
          Classic MySpace Mode
          <span className="animate-bounce inline-block ml-1">✨</span>
        </>
      )}
    </button>
  );
};

export default ProfileThemeToggle;
