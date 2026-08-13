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
  /** Parent DIV layout provides section chrome. */
  embedded?: boolean;
}

const AboutMe: React.FC<AboutMeProps> = ({ isMyspaceMode, searchQuery, embedded = false }) => {
  const { isDarkMode } = useDarkMode();
  
  // Get header text color based on theme
  const getHeaderColor = () => {
    if (isMyspaceMode && isDarkMode) return '#faf5ff'; // purple-50 (very light purple)
    if (isMyspaceMode && !isDarkMode) return '#831843'; // pink-900 (dark pink)
    if (isDarkMode) return '#e5e7eb'; // gray-200
    return '#FF9900'; // MySpace orange for default light mode
  };

  // Get body text color based on theme
  const getTextColor = () => {
    if (isMyspaceMode && isDarkMode) return '#faf5ff'; // purple-50 (very light purple)
    if (isMyspaceMode && !isDarkMode) return '#831843'; // pink-900 (dark pink)
    if (isDarkMode) return '#e5e7eb'; // gray-200
    return '#000000'; // black
  };

  // Check if this section should be visible based on search
  const shouldShow = () => {
    if (!searchQuery.trim()) return true;
    const keywords = [
      'principal software engineer', 'technical lead', 'aws', 'php', 'docker', 'moodle',
      'superset', 'react', 'typescript', 'python', 'postgresql', 'mysql', 'gitlab', 'ci/cd',
      'ecs', 'rds', 'cloudwatch', 'homelab', 'self-hosting', 'jellyfin', 'roku', 'linux',
      'automation', 'security', 'built with', 'tech stack', 'portfolio', 'interests'
    ];
    const query = searchQuery.toLowerCase();
    return keywords.some(keyword => keyword.includes(query) || query.includes(keyword));
  };

  const highlightText = (text: string) => {
    return <SearchHighlight text={text} searchQuery={searchQuery} />;
  };

  const headerColor = getHeaderColor();
  const textColor = getTextColor();

  // Interests — mix of professional + hobby, kept compact
  const interests = [
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Linux', icon: '🐧' },
    { name: 'Homelab', icon: '🏠' },
    { name: 'Self-Hosting', icon: '🖥️' },
    { name: 'Automation', icon: '⚙️' },
    { name: 'Security', icon: '🔐' },
    { name: 'Jellyfin', icon: '🎬' },
    { name: 'Open Source', icon: '💚' }
  ];

  // Portfolio tech stack
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

  const aboutHeader = !embedded ? (
        <h4 className="font-bold custom-font" style={{ 
          fontSize: '13px',
          marginTop: '10px',
          marginBottom: '6px',
          color: headerColor
        }}>About Me</h4>
  ) : null;

  const body = (
      <div className={embedded ? 'jdiv-about-body' : undefined}>
        {aboutHeader}
        
        <p className="custom-font" style={{ 
          color: textColor,
          fontSize: '11px',
          lineHeight: '1.4',
          marginBottom: '8px'
        }}>
          {highlightText("I'm a Principal Software Engineer / Technical Lead who still writes a lot of the code myself. Day to day I bounce between app development, cloud infrastructure, containers, CI/CD, application security, architecture, releases, and production troubleshooting — wherever the system needs attention.")}
        </p>
        
        <p className="custom-font" style={{ 
          color: textColor,
          fontSize: '11px',
          lineHeight: '1.4',
          marginBottom: '8px'
        }}>
          {highlightText("I support a large-scale government learning platform and work across both the application and infrastructure layers. Leadership is part of the role now — code review, technical direction, standards, helping unblock other engineers — but I'm still very much in the weeds.")}
        </p>
        
        <p className="custom-font" style={{ 
          color: textColor,
          fontSize: '11px',
          lineHeight: '1.4',
          marginBottom: '12px'
        }}>
          {highlightText("Outside of work I run a homelab because one environment apparently wasn't enough. Lots of Linux, Docker, self-hosting, networking, storage, media stacks, automation, and monitoring. Sometimes things work. Sometimes I break them on purpose to see why.")}
        </p>

        {/* Interests Header */}
        <h4 className="font-bold custom-font" style={{ 
          fontSize: '13px',
          marginTop: '10px',
          marginBottom: '6px',
          color: headerColor
        }}>Interests</h4>
        
        <div style={{ marginBottom: '12px' }}>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <TechBadge
                key={index}
                name={interest.name}
                icon={interest.icon}
                searchQuery={searchQuery}
                highlightText={highlightText}
              />
            ))}
          </div>
        </div>

        {/* Built With Header - Theme adaptive */}
        <h4 className="font-bold custom-font" style={{ 
          fontSize: '13px',
          marginTop: '10px',
          marginBottom: '6px',
          color: headerColor
        }}>Built With</h4>
        
        <p className="custom-font" style={{ 
          color: textColor,
          fontSize: '11px',
          lineHeight: '1.4',
          marginBottom: '8px'
        }}>
          {highlightText("This portfolio was crafted using modern web technologies and best practices. Built with React and TypeScript for type-safe development, styled with Tailwind CSS for responsive design, and deployed via GitHub Pages.")}
        </p>
        
        <p className="custom-font" style={{ 
          color: textColor,
          fontSize: '11px',
          lineHeight: '1.4',
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

        {/* Additional Info - Theme Compatible */}
        <p className="custom-font" style={{ 
          color: isMyspaceMode && isDarkMode ? '#e9d5ff' : isMyspaceMode && !isDarkMode ? '#9f1239' : isDarkMode ? '#9ca3af' : '#666666',
          fontSize: '11px',
          marginBottom: '4px'
        }}>
          <strong style={{ 
            color: isMyspaceMode && isDarkMode ? '#faf5ff' : isMyspaceMode && !isDarkMode ? '#831843' : isDarkMode ? '#d1d5db' : '#000000' 
          }}>Development Tools:</strong> Cursor, VS Code, Git, npm, GitHub Actions
        </p>
        <p className="custom-font" style={{ 
          color: isMyspaceMode && isDarkMode ? '#e9d5ff' : isMyspaceMode && !isDarkMode ? '#9f1239' : isDarkMode ? '#9ca3af' : '#666666',
          fontSize: '11px'
        }}>
          <strong style={{ 
            color: isMyspaceMode && isDarkMode ? '#faf5ff' : isMyspaceMode && !isDarkMode ? '#831843' : isDarkMode ? '#d1d5db' : '#000000' 
          }}>Features:</strong> Responsive Design, Optimized Assets
        </p>
      </div>
  );

  if (embedded) return body;

  return (
    <MySpaceContainer isMyspaceMode={isMyspaceMode} searchQuery={searchQuery}>
      <ThemeAwareHeader isMyspaceMode={isMyspaceMode}>
        Jessica&apos;s Professional Profile
      </ThemeAwareHeader>
      {body}
    </MySpaceContainer>
  );
};

export default AboutMe;
