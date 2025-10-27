import React, { useState } from 'react';

interface EducationProps {
  searchQuery: string;
}

const Education: React.FC<EducationProps> = ({ searchQuery }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  // Helper function to highlight search matches
  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 dark:bg-yellow-600 font-semibold">{part}</span>
      ) : part
    );
  };
  
  // Education data
  const educationItems = [
    { key: 'certifications', title: "Certifications – CompTIA Security+ CE – Active", details: "Currently pursuing additional certifications in cloud architecture and DevSecOps." },
    { key: 'clearance', title: "Clearance – Active DoD Secret Clearance", details: "Issued and maintained for DoD contracting work. Background investigation completed and clearance active for ongoing classified project work." },
    { key: 'bootcamp', title: "Full Stack Web Development Boot Camp – University of Texas at San Antonio", details: "Intensive 6-month program covering React, Node.js, MongoDB, MySQL, AWS, and modern development practices. Completed capstone project focused on cloud-based application architecture." },
    { key: 'mba', title: "MBA, Magna Cum Laude – Texas A&M University–San Antonio", details: "Concentration in Technology Management with coursework in strategic business analysis, cloud economics, and agile project management. GPA: 3.89/4.0" },
    { key: 'ba', title: "B.A. General Business, Cum Laude – Texas A&M University–San Antonio", details: "Comprehensive business curriculum covering finance, marketing, operations, and management. Foundation for advanced business strategy and leadership roles. GPA: 3.65/4.0" },
    { key: 'aa', title: "A.A. Business Administration & A.S. Business Management – Palo Alto College", details: "Dual associate degrees providing strong foundation in business operations, accounting principles, and management fundamentals. Excellent preparation for advanced business studies." },
  ];
  
  // Filter education items based on search
  const shouldShow = (item: typeof educationItems[0]): boolean => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.details.toLowerCase().includes(query)
    );
  };
  
  const filteredItems = educationItems.filter(shouldShow);

  const toggleItem = (itemKey: string) => {
    setOpenItem(openItem === itemKey ? null : itemKey);
  };

  interface MySpaceBlogItemProps {
    title: string;
    details?: string;
    isOpen: boolean;
    onToggle: () => void;
    highlightTitle?: React.ReactNode;
    highlightDetails?: React.ReactNode;
  }

  const MySpaceBlogItem: React.FC<MySpaceBlogItemProps> = ({ title, details, isOpen, onToggle, highlightTitle, highlightDetails }) => {
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
        <a 
          href="#"
          className="cursor-pointer text-[#0000EE] dark:text-blue-400 hover:text-[#000099] dark:hover:text-blue-300 break-words pr-2"
          onClick={handleToggle}
        >
          {highlightTitle || title}
        </a>
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

  if (filteredItems.length === 0 && searchQuery) return null;

  return (
    <div className={`bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-3 sm:p-4 search-result-match ${searchQuery ? 'ring-2 ring-blue-400 dark:ring-blue-500 animate-pulse-subtle' : ''}`}>
      <h2 className="font-bold text-black dark:text-white text-xs sm:text-sm mb-2 sm:mb-3">Jessica's Certifications & Education</h2>
      <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">[Subscribe to Updates]</a>
      <div className="mt-3">
        {filteredItems.map((item) => (
          <MySpaceBlogItem
            key={item.key}
            title={item.title}
            details={item.details}
            isOpen={openItem === item.key}
            onToggle={() => toggleItem(item.key)}
            highlightTitle={highlightText(item.title)}
            highlightDetails={item.details ? highlightText(item.details) : undefined}
          />
        ))}
      </div>
      <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 block">[View Full Education History]</a>
    </div>
  );
};

export default Education;