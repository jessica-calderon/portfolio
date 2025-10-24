import React from 'react';

const Technologies: React.FC = () => {
  const careerUpdates = [
    'Completed AWS Solutions Architect certification',
    'Launched Iron Bank-compliant container registry',
    'Implemented STIG-compliant CI/CD pipeline',
    'Delivered Moodle Workplace integration project',
    'Published open source Fluent Bit configuration'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-4">
      <h2 className="font-bold text-black dark:text-white text-sm mb-3">Jessica's Career Updates</h2>
      <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">[Subscribe to Updates]</a>
      <div className="mt-3 space-y-1">
        {careerUpdates.map((update, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-xs text-black dark:text-gray-300">{update}</span>
            <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">(view details)</a>
          </div>
        ))}
      </div>
      <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 block">[View All Career Updates]</a>
    </div>
  );
};

export default Technologies;