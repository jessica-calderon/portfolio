import React from 'react';
import MySpaceTable from './shared/MySpaceTable';

interface SkillsTableProps {
  isMyspaceMode?: boolean;
}

const SkillsTable: React.FC<SkillsTableProps> = ({ isMyspaceMode = false }) => {
  const skillsData = [
    { label: 'Programming', value: 'PHP, TypeScript, JavaScript, Python, React, Node.js' },
    { label: 'Frontend', value: 'React, TypeScript, Tailwind, HTML5, CSS3, Responsive UI Design' },
    { label: 'DevOps', value: 'Docker, AWS ECS/Fargate, CI/CD (GitLab CI), STIG Compliance, Container Security' },
    { label: 'Databases', value: 'PostgreSQL, MySQL, Redis, OpenSearch' },
    { label: 'Cloud & Infra', value: 'AWS (ECS, S3, RDS, CloudWatch, IAM), CloudFormation, Linux (Ubuntu, Debian, UBI STIG)' },
    { label: 'Tools', value: 'VS Code, GitLab CI, JMeter, Fluent Bit, Fusion 360, Apache Superset' },
    { label: 'Analytics & Data', value: 'Data Integration, Log Pipelines, Dashboard Design, Visualization' },
    { label: 'Specialties', value: 'Moodle Workplace Development, Iron Bank Containerization, Secure Application Design' }
  ];

  return (
    <MySpaceTable 
      title="Jessica's Technical Skills" 
      rows={skillsData}
      className=""
      isMyspaceMode={isMyspaceMode}
    />
  );
};

export default SkillsTable;
