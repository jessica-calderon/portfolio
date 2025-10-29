import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import SearchHighlight from './shared/SearchHighlight';
import MySpaceContainer from './shared/MySpaceContainer';
import ThemeAwareHeader from './shared/ThemeAwareHeader';
import TechBadge from './shared/TechBadge';
import StatsBadge from './shared/StatsBadge';

interface AboutMeProps {
  isMyspaceMode: boolean;
  searchQuery: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ isMyspaceMode, searchQuery }) => {
  const { isDarkMode } = useDarkMode();
  
  // Check if this section should be visible based on search
  const shouldShow = () => {
    if (!searchQuery.trim()) return true;
    const keywords = ['senior software engineer', 'aws', 'php', 'docker', 'moodle', 'superset', 'react', 'typescript', 'python', 'postgresql', 'mysql', 'gitlab', 'ci/cd', 'iron bank', 'stig', 'dod', 'ecs', 's3', 'rds', 'cloudwatch', 'built with', 'tech stack', 'portfolio'];
    const query = searchQuery.toLowerCase();
    return keywords.some(keyword => keyword.includes(query) || query.includes(keyword));
  };

  const highlightText = (text: string) => {
    return <SearchHighlight text={text} searchQuery={searchQuery} />;
  };

  // Tech stack data with icons
  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'GitHub Pages', icon: '📄' },
    { name: 'ESLint', icon: '🔍' },
    { name: 'PostCSS', icon: '🔧' }
  ];

  // Portfolio stats
  const portfolioStats = [
    { label: '100%', value: 'TypeScript' },
    { label: 'Mobile', value: 'First' },
    { label: 'Fast', value: 'Loading' }
  ];

  if (!shouldShow() && searchQuery) return null;

  return (
    <MySpaceContainer isMyspaceMode={isMyspaceMode} searchQuery={searchQuery}>
      {/* Main Section Header with white separator line */}
      <ThemeAwareHeader isMyspaceMode={isMyspaceMode}>
        Jessica's Professional Profile
      </ThemeAwareHeader>
      
      {/* Single clean bordered container - NO nested containers */}
      <div>
        {/* About Me Header - Theme adaptive */}
        <h4 className="font-bold" style={{ 
          color: isDarkMode ? '#fbbf24' : '#FF9900',
          fontFamily: 'Verdana, Arial, sans-serif',
          fontSize: '12px',
          marginTop: '10px',
          marginBottom: '6px'
        }}>About Me</h4>
        
        {/* Professional Profile Text */}
        <p style={{ 
          color: isDarkMode ? '#e5e7eb' : '#000000',
          fontSize: '11px',
          lineHeight: '1.4',
          fontFamily: 'Verdana, Arial, sans-serif',
          marginBottom: '8px'
        }}>
          {highlightText("Senior Software Engineer with extensive expertise in AWS cloud infrastructure, PHP backend development, and Docker containerization. Specialized in DoD/STIG-compliant environments with proven experience in secure, scalable system design and analytics-driven applications.")}
        </p>
        
        <p style={{ 
          color: isDarkMode ? '#e5e7eb' : '#000000',
          fontSize: '11px',
          lineHeight: '1.4',
          fontFamily: 'Verdana, Arial, sans-serif',
          marginBottom: '8px'
        }}>
          {highlightText("Core competencies include Moodle Workplace customization, Apache Superset data visualization, and full-stack development using React, TypeScript, and Python. Experienced in building Iron Bank-compliant containers and implementing CI/CD pipelines with GitLab CI for enterprise deployments.")}
        </p>
        
        <p style={{ 
          color: isDarkMode ? '#e5e7eb' : '#000000',
          fontSize: '11px',
          lineHeight: '1.4',
          fontFamily: 'Verdana, Arial, sans-serif',
          marginBottom: '8px'
        }}>
          {highlightText("Strong background in data integration, PostgreSQL/MySQL database optimization, and AWS ECS orchestration. Passionate about creating secure, maintainable solutions that meet strict compliance requirements while delivering exceptional user experiences.")}
        </p>
        
        <p style={{ 
          color: isDarkMode ? '#e5e7eb' : '#000000',
          fontSize: '11px',
          lineHeight: '1.4',
          fontFamily: 'Verdana, Arial, sans-serif',
          marginBottom: '12px'
        }}>
          {highlightText("Currently available for new opportunities in senior engineering roles, particularly those involving cloud architecture, data analytics, and secure application development. Open to remote and hybrid positions.")}
        </p>

        {/* Built With Header - Theme adaptive */}
        <h4 className="font-bold" style={{ 
          color: isDarkMode ? '#fbbf24' : '#FF9900',
          fontFamily: 'Verdana, Arial, sans-serif',
          fontSize: '12px',
          marginTop: '10px',
          marginBottom: '6px'
        }}>Built With</h4>
        
        <p style={{ 
          color: isDarkMode ? '#e5e7eb' : '#000000',
          fontSize: '11px',
          lineHeight: '1.4',
          fontFamily: 'Verdana, Arial, sans-serif',
          marginBottom: '8px'
        }}>
          {highlightText("This portfolio was crafted using modern web technologies and best practices. Built with React and TypeScript for type-safe development, styled with Tailwind CSS for responsive design, and deployed via GitHub Pages.")}
        </p>
        
        <p style={{ 
          color: isDarkMode ? '#e5e7eb' : '#000000',
          fontSize: '11px',
          lineHeight: '1.4',
          fontFamily: 'Verdana, Arial, sans-serif',
          marginBottom: '12px'
        }}>
          {highlightText("The development stack includes Vite for fast building and hot reloading, Node.js for the runtime environment, ESLint for code quality, and PostCSS for CSS processing. The entire project is optimized for performance and accessibility.")}
        </p>

        {/* Tech Stack Badges - Interactive and Fun with Dark Mode */}
        <div style={{ marginBottom: '12px' }}>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <TechBadge
                key={index}
                name={tech.name}
                icon={tech.icon}
                searchQuery={searchQuery}
                highlightText={highlightText}
              />
            ))}
          </div>
        </div>

        {/* Portfolio Stats - Animated badges with Dark Mode */}
        <div style={{ marginBottom: '8px' }}>
          {portfolioStats.map((stat, index) => (
            <StatsBadge
              key={index}
              label={stat.label}
              value={stat.value}
              index={index}
            />
          ))}
        </div>

        {/* Additional Info - Dark Mode Compatible */}
        <p style={{ 
          color: isDarkMode ? '#9ca3af' : '#666666',
          fontSize: '11px',
          fontFamily: 'Verdana, Arial, sans-serif',
          marginBottom: '4px'
        }}>
          <strong style={{ color: isDarkMode ? '#d1d5db' : '#000000' }}>Development Tools:</strong> VS Code, Git, npm, GitHub Actions
        </p>
        <p style={{ 
          color: isDarkMode ? '#9ca3af' : '#666666',
          fontSize: '11px',
          fontFamily: 'Verdana, Arial, sans-serif'
        }}>
          <strong style={{ color: isDarkMode ? '#d1d5db' : '#000000' }}>Features:</strong> WCAG Compliant, Responsive Design, Optimized Assets
        </p>
      </div>
    </MySpaceContainer>
  );
};

export default AboutMe;