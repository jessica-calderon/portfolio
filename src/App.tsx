import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import CaseStudiesGrid from './components/CaseStudiesGrid';
import LearningWall from './components/LearningWall';
import DarkModeToggle from './components/DarkModeToggle';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import './App.css';

function AppContent() {
  const [isMyspaceMode, setIsMyspaceMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();

  const handleModeChange = (isMyspace: boolean) => {
    setIsMyspaceMode(isMyspace);
  };

  // Search data - all searchable content
  const searchData = [
    { category: 'Case Study', title: 'Secure Analytics Integration', keywords: 'Docker Superset AWS PostgreSQL data visualization bridge analytics dashboard' },
    { category: 'Case Study', title: 'STIG-Compliant Container Pipeline', keywords: 'Iron Bank GitLab CI/CD AWS ECS DoD security containers' },
    { category: 'Case Study', title: 'Centralized Log Ingestion', keywords: 'Fluent Bit OpenSearch CloudWatch observability error detection analytics' },
    { category: 'Case Study', title: 'Secure Application Framework', keywords: 'Docker Redis PostgreSQL CI/CD configuration management Moodle' },
    { category: 'Education', title: 'CompTIA Security+ Certification', keywords: 'Security CompTIA certification DoD active' },
    { category: 'Education', title: 'DoD Secret Clearance', keywords: 'Security clearance classified background investigation contracting' },
    { category: 'Education', title: 'Full Stack Boot Camp', keywords: 'University Texas San Antonio React Node.js MongoDB MySQL AWS' },
    { category: 'Education', title: 'MBA Technology Management', keywords: 'MBA Magna Cum Laude Texas A&M management cloud economics agile' },
    { category: 'Skill', title: 'TypeScript JavaScript React', keywords: 'TypeScript JavaScript React frontend programming web development' },
    { category: 'Skill', title: 'PHP Python', keywords: 'PHP Python backend server-side scripting' },
    { category: 'Skill', title: 'Docker AWS ECS', keywords: 'Docker containerization AWS ECS cloud deployment CI/CD' },
    { category: 'Skill', title: 'PostgreSQL MySQL Redis', keywords: 'PostgreSQL MySQL Redis database SQL data storage cache' },
    { category: 'Skill', title: 'GitLab CI/CD Git', keywords: 'GitLab CI/CD Git version control automation deployment pipeline' },
    { category: 'Skill', title: 'Moodle Workplace', keywords: 'Moodle workplace LMS learning management system integration' },
    { category: 'Tool', title: 'VS Code GitLab Apache Superset', keywords: 'VS Code IDE GitLab Superset data visualization business intelligence' },
    { category: 'Cloud', title: 'AWS ECS S3 RDS CloudWatch', keywords: 'AWS cloud infrastructure ECS containers S3 storage RDS database CloudWatch monitoring' },
  ];

  // Search functionality
  const getFilteredSuggestions = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return searchData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.keywords.toLowerCase().includes(query)
    ).slice(0, 5);
  };

  const suggestions = getFilteredSuggestions();

  // Scroll to content when searching
  useEffect(() => {
    if (searchQuery) {
      const firstMatch = document.querySelector('.search-result-match');
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [searchQuery]);

  // Get theme classes
  const getThemeClasses = () => {
    if (isMyspaceMode) {
      return `min-h-screen myspace-mode ${isDarkMode ? 'dark' : ''}`;
    }
    return 'min-h-screen bg-gray-200 dark:bg-gray-900 default-mode';
  };

  // Navigation items - same for both modes
  const navigationItems = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#projects' },
    { label: 'Tech Stack', href: '#tech' },
    { label: 'Experience', href: '#experience' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#blog' },
    { label: 'About', href: '#about' }
  ];

  return (
    <div className={getThemeClasses()}>
    {/* Professional Portfolio Header */}
    <div className={`text-white py-3 px-4 ${isMyspaceMode 
      ? 'bg-gradient-to-r from-pink-500 to-purple-500 dark:from-purple-700 dark:to-pink-700' 
      : 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-slate-800 dark:to-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl md:text-2xl font-bold">MyPortfolio</h1>
          <span className="hidden sm:inline text-sm text-gray-100">a place to showcase my work</span>
        </div>
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto relative">
          <div className="relative flex-1 md:flex-none md:min-w-[200px]">
            <input 
              type="text" 
              placeholder="🔍 Search projects, skills, technologies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className={`px-3 py-2 w-full ${isMyspaceMode ? 'bg-pink-100 border-pink-300 focus:ring-pink-500' : 'bg-gray-50 border-gray-300 focus:ring-blue-500'} text-gray-900 border text-sm rounded-lg focus:outline-none focus:ring-2 transition-all duration-200`}
            />
            {suggestions.length > 0 && showSuggestions && (
              <div className={`absolute top-full mt-1 w-full z-50 rounded-lg shadow-lg border-2 max-h-64 overflow-y-auto ${isMyspaceMode ? 'bg-pink-50 border-pink-300' : 'bg-white border-gray-300'}`}>
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion.title);
                      setShowSuggestions(false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-opacity-50 transition-colors border-b ${isMyspaceMode ? 'hover:bg-pink-200 border-pink-200' : 'hover:bg-gray-100 border-gray-200'}`}
                  >
                    <p className="text-xs font-semibold text-gray-800">{suggestion.category}: {suggestion.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${isMyspaceMode ? 'bg-red-500 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'}`}
              title="Clear search"
            >
              ✕
            </button>
          )}
          <a href="#" className="hidden lg:inline text-sm hover:text-pink-200 transition-colors duration-200">Help</a>
          <button
            onClick={() => handleModeChange(!isMyspaceMode)}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200"
          >
            {isMyspaceMode ? 'Default View' : 'Custom View'}
          </button>
          <DarkModeToggle />
        </div>
      </div>
    </div>

    {/* Navigation */}
    <div className={`text-white py-2 px-4 ${isMyspaceMode 
      ? 'bg-gradient-to-r from-pink-400 to-purple-400 dark:from-purple-600 dark:to-pink-600' 
      : 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-slate-700 dark:to-slate-800'
    }`}>
      <div className="max-w-6xl mx-auto">
        <nav className="flex flex-wrap items-center justify-center sm:justify-start space-x-4 sm:space-x-6 text-sm">
          {navigationItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className={`transition-colors duration-200 py-1 px-2 rounded hover:bg-white/10 ${isMyspaceMode ? 'hover:text-pink-200' : 'hover:text-blue-300'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-6xl mx-auto p-2 sm:p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Sidebar - MySpace Profile Style */}
        <div className="w-full lg:w-1/3">
          <Sidebar />
        </div>
        
        {/* Right Main Content */}
        <div className="w-full lg:w-2/3 space-y-4">
          {/* Profile Banner */}
          <div className={`bg-white dark:bg-gray-800 border-2 p-3 sm:p-4 ${isMyspaceMode ? 'border-pink-500 dark:border-pink-400' : 'border-blue-500 dark:border-blue-400'}`}>
            <h2 className="text-base sm:text-xl font-bold text-black dark:text-white text-center">Jessica Calderon is your Professional Contact.</h2>
          </div>
          <Education searchQuery={searchQuery} />
          <AboutMe isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} />
          <CaseStudiesGrid isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} />
          <LearningWall isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;
