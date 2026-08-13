/** Shared skills data — Default table + Jessica's Custom dense stack both consume this. */
export interface SkillCategory {
  label: string;
  value: string;
  /** Compact tokens for DIV-layout dense display */
  tokens: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: 'Development',
    value: 'PHP, Python, JavaScript, TypeScript, SQL, REST APIs, Git',
    tokens: ['PHP', 'PYTHON', 'JAVASCRIPT', 'TYPESCRIPT', 'SQL', 'REST APIs', 'GIT'],
  },
  {
    label: 'Cloud / AWS',
    value: 'AWS, ECS, ECR, RDS / Aurora, EFS, ElastiCache, CloudWatch',
    tokens: ['AWS', 'ECS', 'ECR', 'RDS', 'AURORA', 'REDIS', 'EFS', 'CLOUDWATCH'],
  },
  {
    label: 'Containers / DevOps',
    value: 'Docker, Docker Compose, GitLab CI/CD, Linux',
    tokens: ['DOCKER', 'DOCKER COMPOSE', 'LINUX', 'GITLAB CI/CD'],
  },
  {
    label: 'Web Apps',
    value: 'Moodle, Rustici Content Controller, Apache Superset',
    tokens: ['MOODLE', 'SUPERSET', 'RUSTICI'],
  },
  {
    label: 'Web / Identity / Search',
    value: 'Apache HTTP Server, Nginx, HAProxy, Keycloak, Solr',
    tokens: ['KEYCLOAK', 'HAPROXY', 'SOLR', 'NGINX', 'APACHE'],
  },
  {
    label: 'Data',
    value: 'PostgreSQL, MySQL, Redis',
    tokens: ['POSTGRESQL', 'MYSQL', 'REDIS'],
  },
  {
    label: 'Frontend',
    value: 'React, Tailwind, HTML5, CSS3',
    tokens: ['REACT', 'TAILWIND', 'HTML5', 'CSS3'],
  },
  {
    label: 'Engineering',
    value:
      'Technical Leadership, Architecture, Code Review, Production Troubleshooting, Vulnerability Remediation, Release Management',
    tokens: [
      'TECHNICAL LEADERSHIP',
      'ARCHITECTURE',
      'CODE REVIEW',
      'TROUBLESHOOTING',
      'SECURITY REMEDIATION',
      'RELEASES',
    ],
  },
];
