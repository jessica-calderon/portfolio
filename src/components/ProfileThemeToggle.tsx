import React, { useState, useEffect } from 'react';

/**
 * ProfileThemeToggle Component
 * 
 * A toggle button that switches between Default Professional mode and Classic MySpace mode.
 * Features:
 * - Persists theme preference in localStorage
 * - Automatic dark/light mode detection for MySpace mode
 * - Smooth transitions between modes and themes
 * - Animated button with sparkle effects
 * - Retro fonts and accessible color schemes in MySpace mode
 * 
 * Usage:
 * <ProfileThemeToggle onThemeChange={(isMyspace, theme) => setTheme(isMyspace, theme)} />
 */

interface ProfileThemeToggleProps {
  onThemeChange: (isMyspace: boolean, theme: 'light' | 'dark') => void;
}

const ProfileThemeToggle: React.FC<ProfileThemeToggleProps> = ({ onThemeChange }) => {
  const [isMyspace, setIsMyspace] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Detect system color scheme preference
  const detectSystemTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  useEffect(() => {
    // Load saved theme preference from localStorage
    const savedTheme = localStorage.getItem('profileTheme');
    const systemTheme = detectSystemTheme();
    
    if (savedTheme === 'myspace') {
      setIsMyspace(true);
      setTheme(systemTheme);
      onThemeChange(true, systemTheme);
    } else {
      setIsMyspace(false);
      setTheme(systemTheme);
      onThemeChange(false, systemTheme);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      onThemeChange(isMyspace, newTheme);
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [onThemeChange, isMyspace]);

  const toggleTheme = () => {
    const newMyspaceMode = !isMyspace;
    const currentTheme = detectSystemTheme();
    
    setIsMyspace(newMyspaceMode);
    setTheme(currentTheme);
    
    // Save to localStorage
    localStorage.setItem('profileTheme', newMyspaceMode ? 'myspace' : 'default');
    
    // Notify parent component
    onThemeChange(newMyspaceMode, currentTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 transform hover:scale-105
        ${isMyspace 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl' 
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
