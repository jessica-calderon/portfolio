import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import MySpaceTable from './shared/MySpaceTable';

interface LinksTableProps {
  onResumeClick: () => void;
  isMyspaceMode?: boolean;
}

const LinksTable: React.FC<LinksTableProps> = ({ onResumeClick, isMyspaceMode = false }) => {
  const { isDarkMode, customization } = useDarkMode();

  // Helper function to darken a color for hover
  const darkenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, ((num >> 16) & 0xff) - Math.round(255 * percent));
    const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * percent));
    const b = Math.max(0, (num & 0xff) - Math.round(255 * percent));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  // Get link color - use default theme colors (not accent color)
  const getLinkColor = () => {
    if (isMyspaceMode && isDarkMode) return '#bb86fc'; // purple-300
    if (isMyspaceMode && !isDarkMode) return '#ec4899'; // pink-500
    if (isDarkMode) return '#60a5fa'; // blue-400
    return '#0033CC'; // default blue
  };

  // Get link hover color - use default theme hover colors
  const getLinkHoverColor = () => {
    if (isMyspaceMode && isDarkMode) return '#03dac6'; // teal-400
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
          aria-label="View GitHub profile (opens in new tab)"
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
          aria-label="View LinkedIn profile (opens in new tab)"
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
          aria-label="View portfolio website (opens in new tab)"
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
          aria-label="View resume"
        >
          View Resume
        </button>
      )
    }
  ];

  return (
    <div id="tech">
      <MySpaceTable 
        title="Jessica's Links" 
        rows={linksData}
        isMyspaceMode={isMyspaceMode}
      />
    </div>
  );
};

export default LinksTable;
