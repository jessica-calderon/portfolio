import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="bg-white border-2 border-blue-500 p-4">
      <h2 className="font-bold text-white text-sm mb-3 bg-orange-500 px-2 py-1 -mx-2 -mt-2">Jessica's Professional Profile</h2>
      <div className="space-y-3 text-xs">
        <div>
          <span className="font-bold text-blue-600">About me:</span>
          <div className="text-black mt-1 space-y-2">
            <p>
              Senior Software Engineer with extensive expertise in AWS cloud infrastructure, PHP backend development, and Docker containerization. Specialized in DoD/STIG-compliant environments with proven experience in secure, scalable system design and analytics-driven applications.
            </p>
            
            <p>
              Core competencies include Moodle Workplace customization, Apache Superset data visualization, and full-stack development using React, TypeScript, and Python. Experienced in building Iron Bank-compliant containers and implementing CI/CD pipelines with GitLab CI for enterprise deployments.
            </p>
            
            <p>
              Strong background in data integration, PostgreSQL/MySQL database optimization, and AWS ECS orchestration. Passionate about creating secure, maintainable solutions that meet strict compliance requirements while delivering exceptional user experiences.
            </p>
            
            <p>
              Currently available for new opportunities in senior engineering roles, particularly those involving cloud architecture, data analytics, and secure application development. Open to remote and hybrid positions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;