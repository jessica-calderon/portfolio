import React, { useState } from 'react';

const Education: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (itemKey: string) => {
    setOpenItem(openItem === itemKey ? null : itemKey);
  };

  interface MySpaceBlogItemProps {
    title: string;
    details?: string;
    isOpen: boolean;
    onToggle: () => void;
  }

  const MySpaceBlogItem: React.FC<MySpaceBlogItemProps> = ({ title, details, isOpen, onToggle }) => {
    const handleToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      onToggle();
    };

    return (
      <div className="mt-1 first:mt-0">
        <div 
          className="flex justify-between items-center cursor-pointer py-1 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          onClick={handleToggle}
          style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '13px' }}
        >
          <a 
            href="#"
            className="cursor-pointer text-[#0000EE] dark:text-blue-400 hover:text-[#000099] dark:hover:text-blue-300"
            onClick={handleToggle}
          >
            {title}
          </a>
          <span className="text-[#0000EE] dark:text-blue-400 hover:text-[#000099] dark:hover:text-blue-300 cursor-pointer">(view more)</span>
        </div>
        
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {details && (
            <div 
              className="bg-[#f7f7f7] dark:bg-gray-800 text-black dark:text-gray-200 p-2 rounded-sm mt-1"
              style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px', lineHeight: '1.4' }}
            >
              {details}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-4">
      <h2 className="font-bold text-black dark:text-white text-sm mb-3">Jessica's Certifications & Education</h2>
      <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">[Subscribe to Updates]</a>
      <div className="mt-3">
        <MySpaceBlogItem
          title="Certifications – CompTIA Security+ CE – Active"
          details="Currently pursuing additional certifications in cloud architecture and DevSecOps."
          isOpen={openItem === 'certifications'}
          onToggle={() => toggleItem('certifications')}
        />
        <MySpaceBlogItem
          title="Clearance – Active DoD Secret Clearance"
          details="Issued and maintained for DoD contracting work. Background investigation completed and clearance active for ongoing classified project work."
          isOpen={openItem === 'clearance'}
          onToggle={() => toggleItem('clearance')}
        />
        <MySpaceBlogItem
          title="Full Stack Web Development Boot Camp – University of Texas at San Antonio"
          details="Intensive 6-month program covering React, Node.js, MongoDB, MySQL, AWS, and modern development practices. Completed capstone project focused on cloud-based application architecture."
          isOpen={openItem === 'bootcamp'}
          onToggle={() => toggleItem('bootcamp')}
        />
        <MySpaceBlogItem
          title="MBA, Magna Cum Laude – Texas A&M University–San Antonio"
          details="Concentration in Technology Management with coursework in strategic business analysis, cloud economics, and agile project management. GPA: 3.89/4.0"
          isOpen={openItem === 'mba'}
          onToggle={() => toggleItem('mba')}
        />
        <MySpaceBlogItem
          title="B.A. General Business, Cum Laude – Texas A&M University–San Antonio"
          details="Comprehensive business curriculum covering finance, marketing, operations, and management. Foundation for advanced business strategy and leadership roles. GPA: 3.65/4.0"
          isOpen={openItem === 'ba'}
          onToggle={() => toggleItem('ba')}
        />
        <MySpaceBlogItem
          title="A.A. Business Administration & A.S. Business Management – Palo Alto College"
          details="Dual associate degrees providing strong foundation in business operations, accounting principles, and management fundamentals. Excellent preparation for advanced business studies."
          isOpen={openItem === 'aa'}
          onToggle={() => toggleItem('aa')}
        />
      </div>
      <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 block">[View Full Education History]</a>
    </div>
  );
};

export default Education;