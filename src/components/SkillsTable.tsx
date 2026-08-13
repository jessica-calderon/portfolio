import React from 'react';
import MySpaceTable from './shared/MySpaceTable';

interface SkillsTableProps {
  isMyspaceMode?: boolean;
}

const SkillsTable: React.FC<SkillsTableProps> = ({ isMyspaceMode = false }) => {
  const skillsData = [
    { label: 'Development', value: 'PHP, Python, JavaScript, TypeScript, SQL, REST APIs, Git' },
    { label: 'Cloud / AWS', value: 'AWS, ECS, ECR, RDS / Aurora, EFS, ElastiCache, CloudWatch' },
    { label: 'Containers / DevOps', value: 'Docker, Docker Compose, GitLab CI/CD, Linux' },
    { label: 'Web Apps', value: 'Moodle, Rustici Content Controller, Apache Superset' },
    { label: 'Web / Identity / Search', value: 'Apache HTTP Server, Nginx, HAProxy, Keycloak, Solr' },
    { label: 'Data', value: 'PostgreSQL, MySQL, Redis' },
    { label: 'Frontend', value: 'React, Tailwind, HTML5, CSS3' },
    { label: 'Engineering', value: 'Technical Leadership, Architecture, Code Review, Production Troubleshooting, Vulnerability Remediation, Release Management' }
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
