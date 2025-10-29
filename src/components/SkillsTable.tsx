import React from 'react';
import MySpaceTable from './shared/MySpaceTable';

const SkillsTable: React.FC = () => {
  const skillsData = [
    { label: 'Programming', value: 'PHP, TypeScript, JavaScript, Python, React, Node.js' },
    { label: 'DevOps', value: 'Docker, AWS ECS, CI/CD, STIG compliance, GitLab CI' },
    { label: 'Databases', value: 'PostgreSQL, MySQL, Redis, OpenSearch' },
    { label: 'Tools', value: 'VS Code, GitLab CI, Fluent Bit, Apache Superset' },
    { label: 'Cloud', value: 'AWS, ECS, S3, RDS, CloudWatch' },
    { label: 'Specialties', value: 'Moodle Workplace, Data Integration, Iron Bank Containers' }
  ];

  return (
    <MySpaceTable 
      title="Jessica's Technical Skills" 
      rows={skillsData}
      className=""
      id="tech"
    />
  );
};

export default SkillsTable;
