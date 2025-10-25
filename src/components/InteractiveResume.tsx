import React, { useState } from 'react';

interface ResumeSection {
  id: string;
  title: string;
  content: string;
  icon: string;
}

const InteractiveResume: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('summary');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const resumeSections: ResumeSection[] = [
    {
      id: 'summary',
      title: 'Professional Summary',
      icon: '👤',
      content: `Experienced Full-Stack Developer with 5+ years of expertise in modern web technologies, cloud infrastructure, and enterprise-level data integration. Specialized in React/TypeScript development, AWS cloud services, and Moodle Workplace implementations. Proven track record of delivering scalable solutions for defense contractors and educational institutions.`
    },
    {
      id: 'experience',
      title: 'Professional Experience',
      icon: '💼',
      content: `Senior Full-Stack Developer | Current Company | 2022-Present
• Led development of enterprise Moodle Workplace integration system serving 50,000+ users
• Implemented Iron Bank container registry with STIG compliance for defense contractors
• Built real-time data analytics dashboard using Apache Superset and PostgreSQL
• Reduced deployment time by 60% through CI/CD pipeline optimization

Full-Stack Developer | Previous Company | 2020-2022
• Developed React-based web applications with TypeScript and Tailwind CSS
• Managed AWS infrastructure including ECS, S3, RDS, and CloudWatch
• Implemented automated testing and deployment pipelines using GitLab CI
• Collaborated with cross-functional teams to deliver high-quality software solutions`
    },
    {
      id: 'education',
      title: 'Education & Certifications',
      icon: '🎓',
      content: `Bachelor of Science in Computer Science | University of Texas | 2018-2020
• Graduated Magna Cum Laude
• Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering

Certifications:
• AWS Certified Solutions Architect (2023)
• Docker Certified Associate (2022)
• STIG Compliance Specialist (2023)
• Moodle Workplace Administrator (2022)`
    },
    {
      id: 'projects',
      title: 'Key Projects',
      icon: '🚀',
      content: `MySpace Portfolio Website (2024)
• Built nostalgic portfolio website using React, TypeScript, and Tailwind CSS
• Implemented responsive design with MySpace-inspired UI/UX
• Features dark/light mode toggle and smooth animations

Iron Bank Container Registry (2023)
• Developed secure container registry for defense contractors
• Implemented STIG compliance and automated vulnerability scanning
• Reduced security vulnerabilities by 85% through automated scanning

Moodle Workplace Integration (2022-2023)
• Created enterprise-level data integration system
• Built real-time synchronization between multiple data sources
• Improved data accuracy by 95% through automated validation`
    },
    {
      id: 'skills',
      title: 'Technical Skills',
      icon: '⚡',
      content: `Programming Languages: TypeScript, JavaScript, PHP, Python, HTML/CSS
Frontend Technologies: React, Tailwind CSS, Node.js, Vite
Backend & Databases: Node.js, PostgreSQL, MySQL, Redis, OpenSearch
Cloud & DevOps: AWS (ECS, S3, RDS, CloudWatch), Docker, GitLab CI, CI/CD
Specialized: Moodle Workplace, STIG Compliance, Data Integration, Iron Bank Containers
Tools: VS Code, Git, Apache Superset, Fluent Bit, GitLab`
    }
  ];

  const handleDownload = () => {
    // Create a simple text version of the resume for download
    const resumeText = resumeSections.map(section => 
      `${section.title}\n${section.content}\n\n`
    ).join('');
    
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Jessica_Calderon_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewOnline = () => {
    window.open('https://docs.google.com/document/d/1Te9UsvtdF-xzI0v7cLMYAuTnDRmaPyOiDUH30E5XXT8/edit?usp=sharing', '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-6 rounded-lg">
      <h3 className="font-bold text-white text-lg mb-6 bg-blue-500 dark:bg-blue-600 px-3 py-2 -mx-6 -mt-6 rounded-t-lg">
        📄 Jessica's Interactive Resume 📄
      </h3>

      {/* Resume Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          📥 Download Resume
        </button>
        <button
          onClick={handleViewOnline}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          🌐 View Online
        </button>
        <button
          onClick={() => setIsPreviewOpen(!isPreviewOpen)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {isPreviewOpen ? '👁️ Hide Preview' : '👁️ Show Preview'}
        </button>
      </div>

      {isPreviewOpen && (
        <div className="mb-6">
          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mb-4">
            {resumeSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                {section.icon} {section.title}
              </button>
            ))}
          </div>

          {/* Active Section Content */}
          <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 min-h-[300px]">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              {resumeSections.find(s => s.id === activeSection)?.icon}
              {resumeSections.find(s => s.id === activeSection)?.title}
            </h4>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {resumeSections.find(s => s.id === activeSection)?.content}
            </div>
          </div>
        </div>
      )}

      {/* Quick Resume Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-600 dark:to-gray-700 border border-blue-200 dark:border-gray-500 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-600 dark:to-gray-700 border border-green-200 dark:border-gray-500 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">15+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-gray-600 dark:to-gray-700 border border-purple-200 dark:border-gray-500 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">10+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
        </div>
        <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-gray-600 dark:to-gray-700 border border-orange-200 dark:border-gray-500 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">4</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg p-4">
        <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          📧 Contact Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
            <a href="mailto:calderonjessica13@yahoo.com" className="text-blue-600 dark:text-blue-400 hover:underline ml-2">
              calderonjessica13@yahoo.com
            </a>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Location:</span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">San Antonio, Texas</span>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">LinkedIn:</span>
            <a href="https://linkedin.com/in/Jessica-Calderon-00" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-2">
              linkedin.com/in/Jessica-Calderon-00
            </a>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">GitHub:</span>
            <a href="https://github.com/jessica-calderon" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-2">
              github.com/jessica-calderon
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveResume;
