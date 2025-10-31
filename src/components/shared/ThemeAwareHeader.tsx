import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface ThemeAwareHeaderProps {
  children: React.ReactNode;
  isMyspaceMode: boolean;
  className?: string;
}

const ThemeAwareHeader: React.FC<ThemeAwareHeaderProps> = ({ 
  children, 
  isMyspaceMode, 
  className = '' 
}) => {
  const { isDarkMode } = useDarkMode();
  
  const getHeaderBg = () => {
    if (isMyspaceMode && isDarkMode) return 'bg-purple-600';
    if (isMyspaceMode && !isDarkMode) return 'bg-pink-500';
    return 'bg-orange-500 dark:bg-gray-700';
  };

  return (
    <div className={`${getHeaderBg()} px-2 py-1 -mx-2 -mt-2 mb-0 ${className}`} 
         style={{ borderBottom: '1px solid white' }}>
      <h2 className="font-bold text-white text-xs sm:text-sm">{children}</h2>
    </div>
  );
};

export default ThemeAwareHeader;
