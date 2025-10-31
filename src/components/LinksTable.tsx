import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import MySpaceTable from './shared/MySpaceTable';

interface LinksTableProps {
  onResumeClick: () => void;
  isMyspaceMode?: boolean;
}

const LinksTable: React.FC<LinksTableProps> = ({ onResumeClick, isMyspaceMode = false }) => {
  const { isDarkMode } = useDarkMode();

  // Get link color based on theme
  const getLinkColor = () => {
    if (isMyspaceMode && isDarkMode) return '#bb86fc'; // purple-300 (uses CSS var in myspace mode)
    if (isMyspaceMode && !isDarkMode) return '#ec4899'; // pink-500
    if (isDarkMode) return '#60a5fa'; // blue-400
    return '#0033CC'; // default blue
  };

  // Get link hover color based on theme
  const getLinkHoverColor = () => {
    if (isMyspaceMode && isDarkMode) return '#03dac6'; // teal-400 (uses CSS var in myspace mode)
    if (isMyspaceMode && !isDarkMode) return '#831843'; // pink-900
    if (isDarkMode) return '#93c5fd'; // blue-300
    return '#000099'; // default dark blue
  };

  const linkColor = getLinkColor();
  const linkHoverColor = getLinkHoverColor();

  const linksData = [
    { 
      label: 'GitHub', 
      value: (
        <a 
          href="https://github.com/jessica-calderon" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="break-all custom-font underline"
          style={{ color: linkColor }}
          onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
          onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
        >
          github.com/jessica-calderon
        </a>
      )
    },
    { 
      label: 'LinkedIn', 
      value: (
        <a 
          href="https://linkedin.com/in/Jessica-Calderon-00" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="break-all custom-font underline"
          style={{ color: linkColor }}
          onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
          onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
        >
          linkedin.com/in/Jessica-Calderon-00
        </a>
      )
    },
    { 
      label: 'Portfolio', 
      value: (
        <a 
          href="https://jessica-calderon.github.io/portfolio/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="break-all custom-font underline"
          style={{ color: linkColor }}
          onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
          onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
        >
          github.io/portfolio
        </a>
      )
    },
    { 
      label: 'Resume', 
      value: (
        <button 
          onClick={onResumeClick} 
          className="break-all custom-font underline bg-transparent border-none p-0 cursor-pointer"
          style={{ color: linkColor }}
          onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
          onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
        >
          View Resume
        </button>
      )
    }
  ];

  return (
    <MySpaceTable 
      title="Jessica's Links" 
      rows={linksData}
      isMyspaceMode={isMyspaceMode}
    />
  );
};

export default LinksTable;
