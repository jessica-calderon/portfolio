import React from 'react';
import MySpaceTable from './shared/MySpaceTable';

interface SkillsTableProps {
  isMyspaceMode?: boolean;
}

const SkillsTable: React.FC<SkillsTableProps> = ({ isMyspaceMode = false }) => {
  const skillsData = [
    { label: 'Development', value: 'PHP, Python, JavaScript, TypeScript, SQL, REST APIs, Git' },
    { label: 'Cloud / Infra', value: 'AWS, ECS, ECR, RDS / Aurora, Redis / ElastiCache, EFS, CloudWatch' },
    { label: 'Containers / DevOps', value: 'Docker, Docker Compose, GitLab CI/CD, Linux, CI/CD pipelines' },
    { label: 'Platforms', value: 'Moodle, Apache Superset, Keycloak, HAProxy, Solr' },
    { label: 'Frontend', value: 'React, TypeScript, Tailwind, HTML5, CSS3' },
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
