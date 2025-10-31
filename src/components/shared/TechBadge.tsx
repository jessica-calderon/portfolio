import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface TechBadgeProps {
  name: string;
  icon: string;
  searchQuery: string;
  highlightText: (text: string) => React.ReactNode;
}

const TechBadge: React.FC<TechBadgeProps> = ({ name, icon, searchQuery, highlightText }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div 
      className="group inline-flex items-center gap-1.5 px-3 py-1.5 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 custom-font"
      style={{ 
        fontSize: '10px',
        borderRadius: '12px',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
          : 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
        boxShadow: isDarkMode 
          ? '0 2px 4px rgba(0,0,0,0.3)'
          : '0 2px 4px rgba(0,0,0,0.1)',
        border: isDarkMode 
          ? '1px solid #4b5563'
          : '1px solid #d0d0d0',
        color: isDarkMode ? '#e5e7eb' : '#000000'
      }}
      title={`Click to learn more about ${name}`}
      onMouseEnter={(e) => {
        if (isDarkMode) {
          e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
          e.currentTarget.style.borderColor = '#3b82f6';
        } else {
          e.currentTarget.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
          e.currentTarget.style.borderColor = '#2196f3';
        }
      }}
      onMouseLeave={(e) => {
        if (isDarkMode) {
          e.currentTarget.style.background = 'linear-gradient(135deg, #374151 0%, #1f2937 100%)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
          e.currentTarget.style.borderColor = '#4b5563';
        } else {
          e.currentTarget.style.background = 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          e.currentTarget.style.borderColor = '#d0d0d0';
        }
      }}
      onClick={() => {
        // Add a fun click effect
        const element = document.querySelector(`[title*="${name}"]`) as HTMLElement;
        if (element) {
          element.style.transform = 'scale(1.2) rotate(5deg)';
          setTimeout(() => {
            element.style.transform = 'scale(1) rotate(0deg)';
          }, 200);
        }
      }}
    >
      <span 
        className="text-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"
        style={{ 
          filter: isDarkMode 
            ? 'drop-shadow(0 1px 2px rgba(255,255,255,0.1))' 
            : 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' 
        }}
      >
        {icon}
      </span>
      <span 
        className="font-medium transition-colors duration-300"
        style={{ 
          textShadow: isDarkMode 
            ? '0 1px 1px rgba(255,255,255,0.1)' 
            : '0 1px 1px rgba(0,0,0,0.1)',
          color: 'inherit'
        }}
      >
        {highlightText(name)}
      </span>
    </div>
  );
};

export default TechBadge;
