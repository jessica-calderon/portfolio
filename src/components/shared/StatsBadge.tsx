import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface StatsBadgeProps {
  label: string;
  value: string;
  index: number;
}

const StatsBadge: React.FC<StatsBadgeProps> = ({ label, value, index }) => {
  const { isDarkMode } = useDarkMode();

  const getColors = () => {
    if (isDarkMode) {
      return {
        background: index === 0 
          ? 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)'
          : index === 1 
          ? 'linear-gradient(135deg, #92400e 0%, #b45309 100%)'
          : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        border: index === 0 ? '#10b981' : index === 1 ? '#f59e0b' : '#3b82f6',
        color: '#e5e7eb',
        shadow: '0 1px 3px rgba(0,0,0,0.4)',
        hoverShadow: '0 2px 6px rgba(0,0,0,0.5)'
      };
    } else {
      return {
        background: index === 0 
          ? 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)'
          : index === 1 
          ? 'linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)'
          : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        border: index === 0 ? '#4caf50' : index === 1 ? '#ff9800' : '#2196f3',
        color: '#000000',
        shadow: '0 1px 3px rgba(0,0,0,0.1)',
        hoverShadow: '0 2px 6px rgba(0,0,0,0.2)'
      };
    }
  };

  const colors = getColors();

  return (
    <span 
      className="inline-flex items-center gap-1 px-2 py-1 mr-1 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 custom-font"
      style={{
        fontSize: '9px',
        background: colors.background,
        borderRadius: '8px',
        color: colors.color,
        boxShadow: colors.shadow,
        border: `1px solid ${colors.border}`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = colors.hoverShadow;
        e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = colors.shadow;
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
      }}
    >
      <span className="font-bold">{label}</span>
      <span>{value}</span>
    </span>
  );
};

export default StatsBadge;
