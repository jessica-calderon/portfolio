import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import CaseStudiesGrid from './components/CaseStudiesGrid';
import LearningWall from './components/LearningWall';
import DarkModeToggle from './components/DarkModeToggle';
import ResumeModal from './components/ResumeModal';
import ShareProfileModal from './components/ShareProfileModal';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import profilePic from './assets/8bitme.png';
import DinoGameModal from './components/DinoGameModal';
import './App.css';

function AppContent() {
  const [isMyspaceMode, setIsMyspaceMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [forceDesktopView, setForceDesktopView] = useState<boolean>(false);
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showDinoModal, setShowDinoModal] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();

  // Check if user wants to force desktop view
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'desktop') {
      setForceDesktopView(true);
    }
  }, []);

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
    { category: 'Tech Stack', title: 'React TypeScript Vite Tailwind', keywords: 'React TypeScript Vite Tailwind CSS frontend development build tools npm GitHub Pages' },
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
    { label: 'Home', href: '#', scrollToId: '' },
    { label: 'Projects', href: '#projects', scrollToId: 'projects' },
    { label: 'Tech Stack', href: '#tech', scrollToId: 'tech' },
    { label: 'Experience', href: '#experience', scrollToId: 'experience' },
    { label: 'Resume', href: '#resume', scrollToId: 'resume', isModal: true },
    { label: 'Contact', href: '#contact', scrollToId: 'contact' },
    { label: 'About', href: '#about', scrollToId: 'about' }
  ];

  // Scroll to section handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navigationItems[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (item.isModal) {
      // Handle Resume modal
      setShowResumeModal(true);
      return;
    }
    
    if (!item.scrollToId) {
      // Scroll to top for Home
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Use requestAnimationFrame for better mobile compatibility
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(item.scrollToId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  return (
    <div className={getThemeClasses()}>
    {/* Professional Portfolio Header */}
    <div className={`text-white py-2 sm:py-3 px-2 sm:px-4 ${isMyspaceMode 
      ? 'bg-gradient-to-r from-pink-500 to-purple-500 dark:from-purple-700 dark:to-pink-700' 
      : 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-slate-800 dark:to-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">MyPortfolio</h1>
          <span className="hidden sm:inline text-sm text-gray-100">a place to showcase my work</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0 relative">
          <div className="relative flex-1 min-w-0">
            <input 
              type="text" 
              placeholder="Search profile" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className={`px-2 sm:px-3 py-1 sm:py-2 w-full text-xs sm:text-sm ${isMyspaceMode ? 'bg-pink-100 border-pink-300 focus:ring-pink-500' : 'bg-gray-50 border-gray-300 focus:ring-blue-500'} text-gray-900 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200`}
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
              className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg transition-colors duration-200 flex-shrink-0 ${isMyspaceMode ? 'bg-red-500 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'}`}
              title="Clear search"
            >
              ✕
            </button>
          )}
          <a href="#" className="hidden md:inline text-sm hover:text-pink-200 transition-colors duration-200">Help</a>
          <button
            onClick={() => handleModeChange(!isMyspaceMode)}
            className="flex items-center justify-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200 flex-shrink-0"
          >
            <span className="hidden md:inline">{isMyspaceMode ? 'Default View' : 'Custom View'}</span>
            <span className="md:hidden">{isMyspaceMode ? 'Default' : 'Custom'}</span>
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
              onClick={(e) => handleNavClick(e, item)}
              className={`transition-colors duration-200 py-1 px-2 rounded hover:bg-white/10 ${isMyspaceMode ? 'hover:text-pink-200' : 'hover:text-blue-300'} cursor-pointer`}
            >
              {item.label}
            </a>
          ))}
          {/* View Desktop Version Link - Only visible on mobile */}
          <a 
            href="?view=desktop" 
            className={`${forceDesktopView ? 'hidden' : ''} md:hidden transition-colors duration-200 py-1 px-2 rounded hover:bg-white/10 ${isMyspaceMode ? 'hover:text-pink-200' : 'hover:text-blue-300'} flex items-center gap-1`}
          >
            <span>🖥️</span> Desktop View
          </a>
          {/* View Mobile Version Link - Only visible when desktop is forced */}
          <a 
            href="?" 
            className={`${forceDesktopView ? '' : 'hidden'} transition-colors duration-200 py-1 px-2 rounded hover:bg-white/10 ${isMyspaceMode ? 'hover:text-pink-200' : 'hover:text-blue-300'} flex items-center gap-1`}
          >
            <span>📱</span> Mobile View
          </a>
        </nav>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-6xl mx-auto p-2 sm:p-4">
      {/* Desktop Layout: Sidebar + Main Content */}
      <div className={`${forceDesktopView ? 'flex' : 'hidden md:flex'} flex-row gap-4`}>
        {/* Left Sidebar */}
        <div className="w-1/3">
          <Sidebar />
        </div>
        
        {/* Right Main Content */}
        <div className="w-2/3 space-y-4 section-spacing">
          {/* Profile Banner */}
          <div className={`bg-white dark:bg-gray-800 border-2 spacing-standard ${isMyspaceMode ? 'border-pink-500 dark:border-pink-400' : 'border-blue-500 dark:border-blue-400'}`}>
            <h2 className="text-xl font-bold text-black dark:text-white text-center">Jessica Calderon is your Professional Contact.</h2>
          </div>
          <div id="about"><Education searchQuery={searchQuery} isMyspaceMode={isMyspaceMode} /></div>
          <AboutMe isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} />
          <div id="projects"><CaseStudiesGrid isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} /></div>
          <div id="experience"><LearningWall isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} /></div>
        </div>
      </div>
      
      {/* Mobile Layout: All sections in one column with custom order */}
      <div className={`flex flex-col section-spacing ${forceDesktopView ? 'hidden' : 'md:hidden'}`}>
        {/* Profile Picture - order 1 */}
        <div className="mobile-order-1">
          <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 spacing-standard">
            <p className="text-base font-bold text-black dark:text-white mb-2">Jessica Calderon, MBA</p>
            <div className="flex items-start space-x-3">
              <img 
                src={profilePic}
                alt="Jessica Calderon" 
                onClick={() => setShowDinoModal(true)}
                className="w-20 h-20 border-2 border-blue-500 dark:border-blue-400 object-cover flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity"
                title="Click for a surprise! 🦖"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-black dark:text-white">"Currently coding... "</p>
                <p className="text-xs text-black dark:text-white">She/Her</p>
                <p className="text-xs text-black dark:text-white">San Antonio, TEXAS</p>
                <p className="text-xs text-black dark:text-white">United States</p>
                <p className="text-xs text-black dark:text-white mt-2">Last Login: 2 minutes ago</p>
                <p className="text-xs text-black dark:text-white">Status: Available for New Opportunities</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Contact Banner - order 2 */}
        <div className={`mobile-order-2 ${isMyspaceMode ? 'border-pink-500 dark:border-pink-400' : 'border-blue-500 dark:border-blue-400'}`}>
          <div className="bg-white dark:bg-gray-800 border-2 spacing-standard">
            <h2 className="text-xl font-bold text-black dark:text-white text-center">Jessica Calderon is your Professional Contact.</h2>
          </div>
        </div>
        
        {/* Contact Info - order 3 */}
        <div className="mobile-order-3" id="contact">
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400 spacing-standard">
            <h3 className="font-bold text-black dark:text-white text-sm mb-3">Contacting Jessica</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="mailto:calderonjessica13@yahoo.com" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <span className="mr-1">✉️</span> Send Message
              </a>
              <a href="https://linkedin.com/in/Jessica-Calderon-00" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <span className="mr-1">👥</span> Connect
              </a>
              <button onClick={() => window.open('https://calendly.com')} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <span className="mr-1">💬</span> Schedule Call
              </button>
              <button onClick={() => setShowResumeModal(true)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <span className="mr-1">📄</span> View Resume
              </button>
              <button onClick={() => setShowShareModal(true)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <span className="mr-1">↗️</span> Share Profile
              </button>
              <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <span className="mr-1">⭐</span> Add to Favorites
              </a>
            </div>
          </div>
        </div>
        
        {/* Professional Profile - order 4 */}
        <div className="mobile-order-4" id="about">
          <AboutMe isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} />
        </div>
        
        {/* Jessica's Links - order 5 */}
        <div className="mobile-order-5 overflow-x-auto" id="tech">
          <table className="myspace-details-box">
            <thead>
              <tr>
                <th colSpan={2}>Jessica's Links</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GitHub:</td>
                <td><a href="https://github.com/jessica-calderon" target="_blank" rel="noopener noreferrer">github.com/jessica-calderon</a></td>
              </tr>
              <tr>
                <td>LinkedIn:</td>
                <td><a href="https://linkedin.com/in/Jessica-Calderon-00" target="_blank" rel="noopener noreferrer">linkedin.com/in/Jessica-Calderon-00</a></td>
              </tr>
              <tr>
                <td>Portfolio:</td>
                <td><a href="https://jessica-calderon.github.io/myspace-portfolio/" target="_blank" rel="noopener noreferrer">github.io/myspace-portfolio</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Certifications & Education - order 6 */}
        <div className="mobile-order-6">
          <Education searchQuery={searchQuery} isMyspaceMode={isMyspaceMode} />
        </div>
        
        {/* Projects section for mobile */}
        
        {/* Technical Skills - order 7 */}
        <div className="mobile-order-7 overflow-x-auto">
          <table className="myspace-details-box">
            <thead>
              <tr>
                <th colSpan={2}>Jessica's Technical Skills</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Programming:</td>
                <td>PHP, TypeScript, JavaScript, Python, React, Node.js</td>
              </tr>
              <tr>
                <td>DevOps:</td>
                <td>Docker, AWS ECS, CI/CD, STIG compliance, GitLab CI</td>
              </tr>
              <tr>
                <td>Databases:</td>
                <td>PostgreSQL, MySQL, Redis, OpenSearch</td>
              </tr>
              <tr>
                <td>Tools:</td>
                <td>VS Code, GitLab CI, Fluent Bit, Apache Superset</td>
              </tr>
              <tr>
                <td>Cloud:</td>
                <td>AWS, ECS, S3, RDS, CloudWatch</td>
              </tr>
              <tr>
                <td>Specialties:</td>
                <td>Moodle Workplace, Data Integration, Iron Bank Containers</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Case Studies - order 8 */}
        <div className="mobile-order-8" id="projects">
          <CaseStudiesGrid isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} />
        </div>
        
        {/* What I'm Learning - order 9 */}
        <div className="mobile-order-9" id="experience">
          <LearningWall isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
    
    {/* Footer */}
    <div className={`text-white py-4 px-4 mt-8 ${isMyspaceMode 
      ? 'bg-gradient-to-r from-pink-400 to-purple-400 dark:from-purple-600 dark:to-pink-600' 
      : 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-slate-700 dark:to-slate-800'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Sitemap / Navigation Links */}
        <div className="mb-3">
          <p className="text-xs font-semibold mb-2 text-center sm:text-left">Sitemap</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs">
            {navigationItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                onClick={(e) => handleNavClick(e, item)}
                className={`transition-colors duration-200 py-1 px-2 rounded hover:bg-white/10 ${isMyspaceMode ? 'hover:text-pink-200' : 'hover:text-blue-300'} cursor-pointer`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        
        {/* Copyright and Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-xs sm:text-sm gap-2 pt-2 border-t border-white/20">
          <p className="text-center sm:text-left">
            Made by <a 
              href="https://github.com/jessica-calderon" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`underline transition-colors duration-200 ${isMyspaceMode ? 'hover:text-pink-200' : 'hover:text-blue-300'}`}
            >
              Jessica Calderon
            </a>
          </p>
          <p className="text-center sm:text-right opacity-75">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
    
    {/* Resume Modal */}
    {showResumeModal && <ResumeModal onClose={() => setShowResumeModal(false)} />}
    
    {/* Share Profile Modal */}
    {showShareModal && <ShareProfileModal onClose={() => setShowShareModal(false)} />}
    
    {/* Dino Game Modal */}
    {showDinoModal && <DinoGameModal onClose={() => setShowDinoModal(false)} />}
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
