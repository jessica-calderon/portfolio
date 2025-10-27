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
      <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-3 sm:p-4">
        <h2 className="font-bold text-black dark:text-white text-sm mb-2 sm:mb-3">Jessica's Case Studies</h2>
        <p className="text-xs mb-3 text-black dark:text-gray-300">
          Jessica has{' '}
          <span className="text-blue-600 dark:text-blue-400">{caseStudies.length}</span>
          {' '}Featured Case Studies.
        </p>

        {/* MySpace Friend Space Grid - 2 columns on mobile/tablet, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {caseStudies.map((caseStudy, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center cursor-pointer p-2 rounded transition-all duration-200 hover:scale-[1.03] hover:shadow-md"
              onClick={() => setSelectedCaseStudy(caseStudy)}
            >
              {/* Square image placeholder - MySpace style */}
              <div 
                className="w-16 h-16 sm:w-[100px] sm:h-[100px] bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center mb-2 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
                style={{ 
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">📊</span>
                </div>
              </div>
              
              {/* Title */}
              <p className="text-sm font-bold mb-1 mt-1 text-center">
                <span className="text-black dark:text-white break-words">
                  {caseStudy.name}
                </span>
              </p>
              
              {/* Subtitle */}
              <p className="text-xs italic leading-tight text-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Click to view case study
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* "View All" link */}
        <div className="text-center pt-2 border-t border-gray-300 dark:border-gray-600">
          <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
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

