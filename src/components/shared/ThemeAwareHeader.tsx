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
  const { isDarkMode, customization } = useDarkMode();
  
  const getHeaderStyle = (): React.CSSProperties => {
    return { 
      backgroundColor: customization.accentColor,
      borderBottom: '1px solid white'
    };
  };

  const headerStyle = getHeaderStyle();

  return (
    <div 
      className={`px-2 py-1 -mx-2 -mt-2 mb-0 ${className}`} 
      style={headerStyle}
    >
      <h2 className="font-bold text-white text-xs sm:text-sm custom-font">{children}</h2>
    </div>
  );
};

export default ThemeAwareHeader;
