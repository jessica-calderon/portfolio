import React from 'react';

interface ExpandableItemProps {
  title: string;
  details?: string;
  isOpen: boolean;
  onToggle: () => void;
  highlightTitle?: React.ReactNode;
  highlightDetails?: React.ReactNode;
}

const ExpandableItem: React.FC<ExpandableItemProps> = ({ 
  title, 
  details, 
  isOpen, 
  onToggle, 
  highlightTitle, 
  highlightDetails 
}) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggle();
  };

  return (
    <div className="mt-1 first:mt-0">
      <div 
        className="flex justify-between items-center cursor-pointer py-1 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        onClick={handleToggle}
        style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}
      >
        <button 
          className="cursor-pointer text-[#0000EE] dark:text-blue-400 hover:text-[#000099] dark:hover:text-blue-300 break-words pr-2 bg-transparent border-none p-0 text-left"
          onClick={handleToggle}
        >
          {highlightTitle || title}
        </button>
        <span className="text-[#0000EE] dark:text-blue-400 hover:text-[#000099] dark:hover:text-blue-300 cursor-pointer whitespace-nowrap text-xs">(view more)</span>
      </div>
        
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {details && (
          <div 
            className="bg-[#f7f7f7] dark:bg-gray-800 text-black dark:text-gray-200 p-2 rounded-sm mt-1 break-words"
            style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px', lineHeight: '1.4' }}
          >
            {highlightDetails || details}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandableItem;
