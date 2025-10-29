import React from 'react';

interface SearchHighlightProps {
  text: string;
  searchQuery: string;
  className?: string;
}

const SearchHighlight: React.FC<SearchHighlightProps> = ({ text, searchQuery, className = '' }) => {
  if (!searchQuery.trim()) return <span className={className}>{text}</span>;
  
  const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
  return (
    <span className={className}>
      {parts.map((part, index) => 
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <span key={index} className="bg-yellow-300 dark:bg-yellow-600 font-semibold">{part}</span>
        ) : part
      )}
    </span>
  );
};

export default SearchHighlight;
