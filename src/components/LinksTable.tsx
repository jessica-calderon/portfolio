import React from 'react';
import MySpaceTable from './shared/MySpaceTable';

interface LinksTableProps {
  onResumeClick: () => void;
}

const LinksTable: React.FC<LinksTableProps> = ({ onResumeClick }) => {
  const linksData = [
    { 
      label: 'GitHub', 
      value: <a href="https://github.com/jessica-calderon" target="_blank" rel="noopener noreferrer" className="break-all">github.com/jessica-calderon</a>
    },
    { 
      label: 'LinkedIn', 
      value: <a href="https://linkedin.com/in/Jessica-Calderon-00" target="_blank" rel="noopener noreferrer" className="break-all">linkedin.com/in/Jessica-Calderon-00</a>
    },
    { 
      label: 'Portfolio', 
      value: <a href="https://jessica-calderon.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className="break-all">github.io/portfolio</a>
    },
    { 
      label: 'Resume', 
      value: <button onClick={onResumeClick} className="break-all">View Resume</button>
    }
  ];

  return (
    <MySpaceTable 
      title="Jessica's Links" 
      rows={linksData}
    />
  );
};

export default LinksTable;
