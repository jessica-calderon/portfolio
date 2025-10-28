import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

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
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 dark:bg-yellow-600 font-semibold">{part}</span>
      ) : part
    );
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

  // Determine header background color based on mode
  const getHeaderBg = () => {
    if (isMyspaceMode && isDarkMode) return 'bg-purple-600';
    if (isMyspaceMode && !isDarkMode) return 'bg-pink-500';
    return 'bg-orange-500 dark:bg-orange-600';
  };

  if (!shouldShow() && searchQuery) return null;

  return (
    <div className={`bg-white dark:bg-gray-800 border-2 p-3 sm:p-4 search-result-match ${isMyspaceMode && !isDarkMode ? 'border-pink-500' : 'border-blue-500'} ${isMyspaceMode && isDarkMode ? 'border-purple-500' : 'dark:border-blue-400'} ${searchQuery ? 'ring-2 ring-blue-400 dark:ring-blue-500 animate-pulse-subtle' : ''}`}>
      {/* Main Section Header with white separator line */}
      <div className={`${getHeaderBg()} px-2 py-1 -mx-2 -mt-2 mb-0`} style={{ borderBottom: '1px solid white' }}>
        <h2 className="font-bold text-white text-xs sm:text-sm">Jessica's Professional Profile</h2>
      </div>
      
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
              <div 
                key={index}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                style={{ 
                  fontFamily: 'Verdana, Arial, sans-serif', 
                  fontSize: '10px',
                  borderRadius: '12px',
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
                    : 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
                  boxShadow: isDarkMode 
                    ? '0 2px 4px rgba(0,0,0,0.3)'
                    : '0 2px 4px rgba(0,0,0,0.1)',
                  border: isDarkMode 
                    ? '1px solid #4b5563'
                    : '1px solid #d0d0d0',
                  color: isDarkMode ? '#e5e7eb' : '#000000'
                }}
                title={`Click to learn more about ${tech.name}`}
                onMouseEnter={(e) => {
                  if (isDarkMode) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
                    e.currentTarget.style.borderColor = '#3b82f6';
                  } else {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                    e.currentTarget.style.borderColor = '#2196f3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isDarkMode) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #374151 0%, #1f2937 100%)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
                    e.currentTarget.style.borderColor = '#4b5563';
                  } else {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = '#d0d0d0';
                  }
                }}
                onClick={() => {
                  // Add a fun click effect
                  const element = document.querySelector(`[title*="${tech.name}"]`) as HTMLElement;
                  if (element) {
                    element.style.transform = 'scale(1.2) rotate(5deg)';
                    setTimeout(() => {
                      element.style.transform = 'scale(1) rotate(0deg)';
                    }, 200);
                  }
                }}
              >
                <span 
                  className="text-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"
                  style={{ 
                    filter: isDarkMode 
                      ? 'drop-shadow(0 1px 2px rgba(255,255,255,0.1))' 
                      : 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' 
                  }}
                >
                  {tech.icon}
                </span>
                <span 
                  className="font-medium transition-colors duration-300"
                  style={{ 
                    textShadow: isDarkMode 
                      ? '0 1px 1px rgba(255,255,255,0.1)' 
                      : '0 1px 1px rgba(0,0,0,0.1)',
                    color: 'inherit'
                  }}
                >
                  {highlightText(tech.name)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Stats - Animated badges with Dark Mode */}
        <div style={{ marginBottom: '8px' }}>
          {portfolioStats.map((stat, index) => {
            const getColors = () => {
              if (isDarkMode) {
                return {
                  background: index === 0 
                    ? 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)'
                    : index === 1 
                    ? 'linear-gradient(135deg, #92400e 0%, #b45309 100%)'
                    : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                  border: index === 0 ? '#10b981' : index === 1 ? '#f59e0b' : '#3b82f6',
                  color: '#e5e7eb',
                  shadow: '0 1px 3px rgba(0,0,0,0.4)',
                  hoverShadow: '0 2px 6px rgba(0,0,0,0.5)'
                };
              } else {
                return {
                  background: index === 0 
                    ? 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)'
                    : index === 1 
                    ? 'linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)'
                    : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  border: index === 0 ? '#4caf50' : index === 1 ? '#ff9800' : '#2196f3',
                  color: '#000000',
                  shadow: '0 1px 3px rgba(0,0,0,0.1)',
                  hoverShadow: '0 2px 6px rgba(0,0,0,0.2)'
                };
              }
            };
            
            const colors = getColors();
            
            return (
              <span 
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 mr-1 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                style={{
            fontFamily: 'Verdana, Arial, sans-serif',
            fontSize: '9px',
                  background: colors.background,
                  borderRadius: '8px',
                  color: colors.color,
                  boxShadow: colors.shadow,
                  border: `1px solid ${colors.border}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = colors.hoverShadow;
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = colors.shadow;
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                }}
              >
                <span className="font-bold">{stat.label}</span>
                <span>{stat.value}</span>
          </span>
            );
          })}
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
    </div>
  );
};

export default AboutMe;