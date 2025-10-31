import React, { useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import SearchHighlight from './shared/SearchHighlight';
import ExpandableItem from './shared/ExpandableItem';
import MySpaceContainer from './shared/MySpaceContainer';

interface EducationProps {
  searchQuery: string;
  isMyspaceMode?: boolean;
}

const Education: React.FC<EducationProps> = ({ searchQuery, isMyspaceMode = false }) => {
  const { isDarkMode } = useDarkMode();
  const [openItem, setOpenItem] = useState<string | null>(null);

  // Get header text color based on theme
  const getHeaderColor = () => {
    if (isMyspaceMode && isDarkMode) return '#a855f7'; // purple-500
    if (isMyspaceMode && !isDarkMode) return '#ec4899'; // pink-500
    if (isDarkMode) return '#f97316'; // orange-500
    return '#FF9900'; // accent color for light mode
  };

  const headerColor = getHeaderColor();
  
  // Helper function to highlight search matches
  const highlightText = (text: string) => {
    return <SearchHighlight text={text} searchQuery={searchQuery} />;
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

  if (filteredItems.length === 0 && searchQuery) return null;

  return (
    <MySpaceContainer isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} id="education">
      <h2 
        className="font-bold custom-font text-xs sm:text-sm mb-2 sm:mb-3"
        style={{ color: headerColor }}
      >
        Jessica's Certifications & Education
      </h2>
      <div className="mt-3">
        {filteredItems.map((item) => (
          <ExpandableItem
            key={item.key}
            title={item.title}
            details={item.details}
            isOpen={openItem === item.key}
            onToggle={() => toggleItem(item.key)}
            highlightTitle={highlightText(item.title)}
            highlightDetails={item.details ? highlightText(item.details) : undefined}
            isMyspaceMode={isMyspaceMode}
          />
        ))}
      </div>
    </MySpaceContainer>
  );
};

export default Education;