import React from 'react';

const TopProjects: React.FC = () => {
  const projects = [
    { name: "Moodle Superset Plugin", description: "Custom data visualization integration" },
    { name: "Apache Superset Iron Bank", description: "STIG-compliant container deployment" },
    { name: "Fluent Bit → OpenSearch", description: "Log processing pipeline" },
    { name: "openSIS Iron Bank Container", description: "Secure student information system" }
  ];

  return (
    <div className="bg-white border-2 border-blue-500 p-4">
      <h2 className="font-bold text-black text-sm mb-3">Jessica's Highlighted Projects</h2>
      <a href="#" className="text-xs text-blue-600 hover:underline">[view all]</a>
      <p className="text-xs text-black mt-2">Featured enterprise solutions and integrations.</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-300 p-2">
            <div className="w-full h-16 bg-gray-200 border border-gray-400 mb-2 flex items-center justify-center">
              <span className="text-xs text-gray-600">Project Preview</span>
            </div>
            <p className="text-xs font-bold text-black">{project.name}</p>
            <p className="text-xs text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProjects;