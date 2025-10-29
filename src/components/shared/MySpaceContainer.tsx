import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface MySpaceContainerProps {
  children: React.ReactNode;
  isMyspaceMode: boolean;
  searchQuery?: string;
  className?: string;
  id?: string;
}

const MySpaceContainer: React.FC<MySpaceContainerProps> = ({ 
  children, 
  isMyspaceMode, 
  searchQuery = '',
  className = '',
  id
}) => {
  const { isDarkMode } = useDarkMode();
  
  const getBorderClasses = () => {
    if (isMyspaceMode && !isDarkMode) return 'border-pink-500';
    if (isMyspaceMode && isDarkMode) return 'border-purple-500';
    return 'border-blue-500 dark:border-blue-400';
  };

  const getSearchClasses = () => {
    return searchQuery ? 'ring-2 ring-blue-400 dark:ring-blue-500 animate-pulse-subtle' : '';
  };

  return (
    <div 
      id={id}
      className={`bg-white dark:bg-gray-800 border-2 spacing-standard search-result-match ${getBorderClasses()} ${getSearchClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default MySpaceContainer;
