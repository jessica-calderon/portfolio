import React, { useState } from 'react';
import CaseStudyModal from './CaseStudyModal';
import { useDarkMode } from '../contexts/DarkModeContext';

interface CaseStudy {
  name: string;
  description: string;
  impact: string;
  techUsed: string[];
}

interface CaseStudiesGridProps {
  isMyspaceMode: boolean;
  searchQuery: string;
}

const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({ isMyspaceMode, searchQuery }) => {
  const { isDarkMode } = useDarkMode();
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

  // Filter case studies based on search query
  const matchesQuery = (caseStudy: CaseStudy): boolean => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      caseStudy.name.toLowerCase().includes(query) ||
      caseStudy.description.toLowerCase().includes(query) ||
      caseStudy.impact.toLowerCase().includes(query) ||
      caseStudy.techUsed.some(tech => tech.toLowerCase().includes(query))
    );
  };

  const filteredStudies = caseStudies.filter(matchesQuery);

  // Hide entire section if no matches during search
  if (searchQuery.trim() && filteredStudies.length === 0) {
    return null;
  }

  // Determine header background color based on mode
  const getHeaderBg = () => {
    if (isMyspaceMode && isDarkMode) return 'bg-purple-600';
    if (isMyspaceMode && !isDarkMode) return 'bg-pink-500';
    return 'bg-orange-500 dark:bg-orange-600';
  };

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 border-2 p-3 sm:p-4 search-result-match ${isMyspaceMode && !isDarkMode ? 'border-pink-500' : 'border-blue-500'} ${isMyspaceMode && isDarkMode ? 'border-purple-500' : 'dark:border-blue-400'} ${searchQuery ? 'ring-2 ring-blue-400 dark:ring-blue-500 animate-pulse-subtle' : ''}`}>
        <h2 className={`font-bold text-white text-xs sm:text-sm mb-2 sm:mb-3 px-2 py-1 -mx-2 -mt-2 ${getHeaderBg()}`}>Jessica's Case Studies</h2>
        <p className="text-xs mb-3 text-black dark:text-gray-300">
          Jessica has{' '}
          <span className="text-blue-600 dark:text-blue-400">{caseStudies.length}</span>
          {' '}Featured Case Studies.
          {searchQuery && filteredStudies.length < caseStudies.length && (
            <span className="ml-2 text-pink-600 dark:text-pink-400">
              ({filteredStudies.length} match{filteredStudies.length !== 1 ? 'es' : ''})
            </span>
          )}
        </p>

        {/* MySpace Friend Space Grid - 2 columns on mobile/tablet, 4 on desktop */}
        {filteredStudies.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {filteredStudies.map((caseStudy, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center cursor-pointer p-2 rounded transition-all duration-200 hover:scale-[1.03] hover:shadow-md search-result-match ${
                searchQuery ? 'ring-2 ring-blue-400 dark:ring-blue-500 animate-pulse-subtle' : ''
              }`}
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
        ) : null}

        {/* "View All" link */}
        {filteredStudies.length > 0 && (
        <div className="text-center pt-2 border-t border-gray-300 dark:border-gray-600">
          <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            View All Case Studies
          </a>
        </div>
        )}
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

