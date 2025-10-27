import React, { useState } from 'react';
import CaseStudyModal from './CaseStudyModal';

interface CaseStudy {
  name: string;
  description: string;
  impact: string;
  techUsed: string[];
}

const CaseStudiesGrid: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const caseStudies: CaseStudy[] = [
    { 
      name: "Secure Analytics Integration",
      description: "Developed a data visualization bridge between a learning platform and a secure analytics environment.",
      impact: "Improved dashboard performance and compliance readiness.",
      techUsed: ["Docker", "Superset", "AWS ECS", "PostgreSQL"]
    },
    { 
      name: "STIG-Compliant Container Pipeline",
      description: "Built and deployed secure application containers aligned with DoD STIG standards.",
      impact: "Reduced security remediation workload by 35%.",
      techUsed: ["Iron Bank", "GitLab CI/CD", "AWS ECS"]
    },
    { 
      name: "Centralized Log Ingestion",
      description: "Implemented a Fluent Bit → OpenSearch pipeline for system observability.",
      impact: "Enabled real-time error detection and analytics across multiple services.",
      techUsed: ["Fluent Bit", "OpenSearch", "AWS CloudWatch"]
    },
    { 
      name: "Secure Application Framework",
      description: "Containerized an open-source education platform for controlled deployment.",
      impact: "Streamlined configuration management and patch compliance.",
      techUsed: ["Docker", "Redis", "PostgreSQL", "CI/CD"]
    }
  ];

  return (
    <>
      <div className="bg-[#fff8f4] border border-[#d47a1f] p-4" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {/* MySpace-style header bar */}
        <div className="bg-[#ffcc99] border-b-[1px] border-[#cc6600] py-[6px] px-2 mb-3">
          <h2 className="font-bold text-black text-xs uppercase" style={{ fontFamily: 'Verdana, sans-serif' }}>
            Jessica's Case Studies
          </h2>
        </div>
        
        {/* Friend count subtext */}
        <p className="text-xs mb-3" style={{ fontFamily: 'Verdana, sans-serif' }}>
          Jessica has{' '}
          <span style={{ color: '#cc0000' }}>{caseStudies.length}</span>
          {' '}Featured Case Studies.
        </p>

        {/* MySpace Friend Space Grid - 4 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {caseStudies.map((caseStudy, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center cursor-pointer p-2 rounded transition-all duration-200 hover:scale-[1.03] hover:shadow-md"
              onClick={() => setSelectedCaseStudy(caseStudy)}
              style={{ 
                textAlign: 'center',
                width: '140px',
                margin: '0 auto'
              }}
            >
              {/* Square image placeholder - MySpace style */}
              <div 
                className="w-[100px] h-[100px] bg-[#f5f5f5] border border-[#ccc] flex items-center justify-center mb-2 rounded transition-all duration-200 hover:border-[#999]"
                style={{ 
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              
              {/* Title - MySpace "name" style */}
              <p 
                className="text-[11pt] font-bold text-black mb-1 mt-1" 
                style={{ fontFamily: 'Verdana, sans-serif' }}
              >
                {caseStudy.name}
              </p>
              
              {/* Subtitle - "Click to view" in gray italic */}
              <p 
                className="text-[10pt] text-[#666] italic leading-tight" 
                style={{ fontFamily: 'Verdana, sans-serif' }}
              >
                Click to view case study
              </p>
            </div>
          ))}
        </div>

        {/* "View All" link - MySpace style */}
        <div className="text-center pt-2 border-t border-[#ddd]">
          <a 
            href="#" 
            className="text-xs hover:underline"
            style={{ 
              color: '#cc0000',
              fontFamily: 'Verdana, sans-serif',
              textDecoration: 'underline'
            }}
          >
            View All Case Studies
          </a>
        </div>
      </div>

      {selectedCaseStudy && (
        <CaseStudyModal 
          caseStudy={selectedCaseStudy} 
          onClose={() => setSelectedCaseStudy(null)} 
        />
      )}
    </>
  );
};

export default CaseStudiesGrid;

