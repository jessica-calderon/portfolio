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
    <div className="bg-white border-2 border-blue-500 p-4">
      <h2 className="font-bold text-black text-sm mb-3">Jessica's Career Updates</h2>
      <a href="#" className="text-xs text-blue-600 hover:underline">[Subscribe to Updates]</a>
      <div className="mt-3 space-y-1">
        {careerUpdates.map((update, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-xs text-black">{update}</span>
            <a href="#" className="text-xs text-blue-600 hover:underline">(view details)</a>
          </div>
        ))}
      </div>
      <a href="#" className="text-xs text-blue-600 hover:underline mt-2 block">[View All Career Updates]</a>
    </div>
  );
};

export default Technologies;