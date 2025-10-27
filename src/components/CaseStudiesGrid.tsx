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
      name: "Case Study 1: Secure Analytics Integration",
      description: "Developed a data visualization bridge between a learning platform and a secure analytics environment.",
      impact: "Improved dashboard performance and compliance readiness.",
      techUsed: ["Docker", "Superset", "AWS ECS", "PostgreSQL"]
    },
    { 
      name: "Case Study 2: STIG-Compliant Container Pipeline",
      description: "Built and deployed secure application containers aligned with DoD STIG standards.",
      impact: "Reduced security remediation workload by 35%.",
      techUsed: ["Iron Bank", "GitLab CI/CD", "AWS ECS"]
    },
    { 
      name: "Case Study 3: Centralized Log Ingestion",
      description: "Implemented a Fluent Bit → OpenSearch pipeline for system observability.",
      impact: "Enabled real-time error detection and analytics across multiple services.",
      techUsed: ["Fluent Bit", "OpenSearch", "AWS CloudWatch"]
    },
    { 
      name: "Case Study 4: Secure Application Framework",
      description: "Containerized an open-source education platform for controlled deployment.",
      impact: "Streamlined configuration management and patch compliance.",
      techUsed: ["Docker", "Redis", "PostgreSQL", "CI/CD"]
    }
  ];

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-4">
        <h2 className="font-bold text-black dark:text-white text-sm mb-3">Jessica's Case Studies</h2>
        <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">[view all]</a>
        <p className="text-xs text-black dark:text-gray-300 mt-2">Featured enterprise solutions and integrations.</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {caseStudies.map((caseStudy, index) => (
            <div 
              key={index} 
              className="border border-gray-300 dark:border-gray-600 p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setSelectedCaseStudy(caseStudy)}
            >
              <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-500 mb-2 flex items-center justify-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">Case Study Preview</span>
              </div>
              <p className="text-xs font-bold text-black dark:text-white">{caseStudy.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{caseStudy.description}</p>
            </div>
          ))}
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

