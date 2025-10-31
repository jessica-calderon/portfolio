import React from 'react';

const PortfolioUrl: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 spacing-standard">
      <p className="text-xs text-black dark:text-white">Portfolio URL:</p>
      <a 
        href="https://jessica-calderon.github.io/portfolio/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-xs text-blue-600 dark:text-blue-400 hover:underline break-all"
      >
        https://jessica-calderon.github.io/portfolio/
      </a>
    </div>
  );
};

export default PortfolioUrl;
