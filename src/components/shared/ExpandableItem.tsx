import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface ExpandableItemProps {
  title: string;
  details?: string;
  isOpen: boolean;
  onToggle: () => void;
  highlightTitle?: React.ReactNode;
  highlightDetails?: React.ReactNode;
  isMyspaceMode?: boolean;
}

const ExpandableItem: React.FC<ExpandableItemProps> = ({ 
  title, 
  details, 
  isOpen, 
  onToggle, 
  highlightTitle, 
  highlightDetails,
  isMyspaceMode = false
}) => {
  const { isDarkMode } = useDarkMode();

  // Get link color based on theme
  const getLinkColor = () => {
    if (isMyspaceMode && isDarkMode) return '#bb86fc'; // purple-300
    if (isMyspaceMode && !isDarkMode) return '#ec4899'; // pink-500
    if (isDarkMode) return '#60a5fa'; // blue-400
    return '#0000EE'; // default blue
  };

  // Get link hover color based on theme
  const getLinkHoverColor = () => {
    if (isMyspaceMode && isDarkMode) return '#03dac6'; // teal-400
    if (isMyspaceMode && !isDarkMode) return '#831843'; // pink-900
    if (isDarkMode) return '#93c5fd'; // blue-300
    return '#000099'; // default dark blue
  };

  // Get details text color based on theme
  const getDetailsColor = () => {
    if (isMyspaceMode && isDarkMode) return '#e0e0e0'; // gray-200
    if (isMyspaceMode && !isDarkMode) return '#4c1d95'; // purple-900
    if (isDarkMode) return '#e5e7eb'; // gray-200
    return '#000000'; // black
  };

  const linkColor = getLinkColor();
  const linkHoverColor = getLinkHoverColor();
  const detailsColor = getDetailsColor();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggle();
  };

  return (
    <div className="mt-1 first:mt-0">
      <div 
        className="flex justify-between items-center cursor-pointer py-1 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        onClick={handleToggle}
      >
        <button 
          className="cursor-pointer custom-font break-words pr-2 bg-transparent border-none p-0 text-left underline"
          onClick={handleToggle}
          style={{ color: linkColor, fontSize: '12px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
          onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
        >
          {highlightTitle || title}
        </button>
        <span 
          className="cursor-pointer custom-font whitespace-nowrap underline"
          style={{ color: linkColor, fontSize: '12px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
          onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
        >
          (view more)
        </span>
      </div>
        
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {details && (
          <div 
            className="bg-[#f7f7f7] dark:bg-gray-800 p-2 rounded-sm mt-1 break-words custom-font"
            style={{ color: detailsColor, fontSize: '11px', lineHeight: '1.4' }}
          >
            {highlightDetails || details}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandableItem;
