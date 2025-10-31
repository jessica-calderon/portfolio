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
  
  // Get header background color based on theme (not customization)
  const getHeaderBg = () => {
    if (isMyspaceMode && isDarkMode) return 'bg-purple-600'; // purple-600 for MySpace dark
    if (isMyspaceMode && !isDarkMode) return 'bg-pink-500'; // pink-500 for MySpace light
    if (isDarkMode) return 'bg-gray-700'; // gray-700 for default dark
    return 'bg-orange-500'; // orange-500 for default light
  };

  return (
    <div 
      className={`${getHeaderBg()} px-2 py-1 -mx-2 -mt-2 mb-0 ${className}`}
      style={{ borderBottom: '1px solid white' }}
    >
      <h2 className="font-bold text-white text-xs sm:text-sm custom-font">{children}</h2>
    </div>
  );
};

export default ThemeAwareHeader;
