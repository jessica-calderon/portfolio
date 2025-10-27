import React, { useState } from 'react';

const Technologies: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (itemKey: string) => {
    setOpenItem(openItem === itemKey ? null : itemKey);
  };

  interface MySpaceBlogItemProps {
    title: string;
    itemKey: string;
    details?: string;
    isOpen: boolean;
    onToggle: () => void;
  }

  const MySpaceBlogItem: React.FC<MySpaceBlogItemProps> = ({ title, itemKey, details, isOpen, onToggle }) => {
    return (
      <div className="mt-1 first:mt-0">
        <div 
          className="flex justify-between items-center cursor-pointer py-1 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          onClick={onToggle}
          style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '13px' }}
        >
          <a 
            className="cursor-pointer text-[#0000EE] hover:text-[#000099]"
          >
            {title}
          </a>
          <span className="text-[#0000EE] hover:text-[#000099] cursor-pointer">(view more)</span>
        </div>
        
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {details && (
            <div 
              className="bg-[#f7f7f7] dark:bg-gray-800 p-2 rounded-sm mt-1"
              style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px', lineHeight: '1.4', color: '#000' }}
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
          itemKey="certifications"
          details="Currently pursuing additional certifications in cloud architecture and DevSecOps."
          isOpen={openItem === 'certifications'}
          onToggle={() => toggleItem('certifications')}
        />
        <MySpaceBlogItem
          title="Clearance – Active DoD Secret Clearance"
          itemKey="clearance"
          isOpen={openItem === 'clearance'}
          onToggle={() => toggleItem('clearance')}
        />
        <MySpaceBlogItem
          title="Full Stack Web Development Boot Camp – University of Texas at San Antonio"
          itemKey="bootcamp"
          isOpen={openItem === 'bootcamp'}
          onToggle={() => toggleItem('bootcamp')}
        />
        <MySpaceBlogItem
          title="MBA, Magna Cum Laude – Texas A&M University–San Antonio"
          itemKey="mba"
          isOpen={openItem === 'mba'}
          onToggle={() => toggleItem('mba')}
        />
        <MySpaceBlogItem
          title="B.A. General Business, Cum Laude – Texas A&M University–San Antonio"
          itemKey="ba"
          isOpen={openItem === 'ba'}
          onToggle={() => toggleItem('ba')}
        />
        <MySpaceBlogItem
          title="A.A. Business Administration & A.S. Business Management – Palo Alto College"
          itemKey="aa"
          isOpen={openItem === 'aa'}
          onToggle={() => toggleItem('aa')}
        />
      </div>
      <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 block">[View Full Education History]</a>
    </div>
  );
};

export default Technologies;