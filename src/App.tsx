import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import CaseStudiesGrid from './components/CaseStudiesGrid';
import LearningWall from './components/LearningWall';
import DarkModeToggle from './components/DarkModeToggle';
import ResumeModal from './components/ResumeModal';
import ShareProfileModal from './components/ShareProfileModal';
import LegacyProfileModal from './components/LegacyProfileModal';
import JumpToTop from './components/JumpToTop';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import profilePic from './assets/8bitme.png';
import './App.css';

function AppContent() {
  // Initialize layout mode from localStorage, default to 'default'
  const [layoutMode, setLayoutMode] = useState<'default' | 'custom'>(() => {
    const saved = localStorage.getItem('layoutMode');
    return (saved === 'default' || saved === 'custom') ? saved : 'default';
  });
  
  const isMyspaceMode = layoutMode === 'custom';
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [forceDesktopView, setForceDesktopView] = useState<boolean>(false);
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showLegacyModal, setShowLegacyModal] = useState<boolean>(false);
  const { isDarkMode, customization } = useDarkMode();

  const [lastDeployed, setLastDeployed] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Apply body class based on layout mode
  useEffect(() => {
    document.body.classList.remove('default-layout', 'custom-layout');
    document.body.classList.add(`${layoutMode}-layout`);
    
    // Save to localStorage
    localStorage.setItem('layoutMode', layoutMode);
  }, [layoutMode]);


  // Check if user wants to force desktop view
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'desktop') {
      setForceDesktopView(true);
    }
  }, []);

  // Calculate last deployed time
  useEffect(() => {
    const formatTimeAgo = (deployTime: Date) => {
      const now = new Date();
      const diffInMs = now.getTime() - deployTime.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      
      if (diffInMinutes < 1) {
        return 'just now';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
      } else if (diffInDays < 7) {
        return `${diffInDays}d ago`;
      } else {
        return deployTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    };

    // Use document.lastModified for build time, fallback to now if not available
    const deployTime = document.lastModified ? new Date(document.lastModified) : new Date();
    setLastDeployed(formatTimeAgo(deployTime));
  }, []);

  const toggleLayoutMode = () => {
    setLayoutMode(prev => prev === 'default' ? 'custom' : 'default');
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
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0 relative max-w-2xl">
          <div className="relative flex-1 min-w-0">
            {/* Search Icon */}
            <div className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
              <svg 
                className={`w-4 h-4 transition-colors duration-200 ${
                  isMyspaceMode 
                    ? 'text-pink-500 dark:text-pink-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search profile..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchQuery('');
                  setShowSuggestions(false);
                  searchInputRef.current?.blur();
                }
                if (e.key === 'Enter' && suggestions.length > 0) {
                  setSearchQuery(suggestions[0].title);
                  setShowSuggestions(false);
                }
                // Arrow key navigation
                if (e.key === 'ArrowDown' && suggestions.length > 0) {
                  e.preventDefault();
                  const firstSuggestion = document.querySelector('.search-suggestion-item');
                  (firstSuggestion as HTMLElement)?.focus();
                }
              }}
              className={`pl-8 sm:pl-9 pr-8 sm:pr-9 py-1.5 sm:py-2 w-full text-xs sm:text-sm ${isMyspaceMode 
                ? 'bg-white/90 dark:bg-pink-900/30 border-pink-300 dark:border-pink-500 focus:ring-pink-400 focus:border-pink-400 placeholder:text-pink-300 dark:placeholder:text-pink-400' 
                : 'bg-white/90 dark:bg-gray-800/90 border-gray-300 dark:border-gray-600 focus:ring-blue-400 focus:border-blue-400 placeholder:text-gray-400 dark:placeholder:text-gray-500'
              } text-gray-900 dark:text-gray-100 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm hover:shadow-md`}
            />
            
            {/* Clear Button (inside input) */}
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-200 flex-shrink-0 ${
                  isMyspaceMode 
                    ? 'text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900/50' 
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Clear search (Esc)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && showSuggestions && (
              <div className={`absolute top-full mt-1.5 w-full z-50 rounded-lg shadow-xl border backdrop-blur-sm search-suggestions-container ${
                isMyspaceMode 
                  ? 'bg-pink-50/95 dark:bg-purple-900/90 border-pink-300 dark:border-purple-500' 
                  : 'bg-white/95 dark:bg-gray-800/95 border-gray-300 dark:border-gray-600'
              }`}>
                <div className="max-h-64 overflow-y-auto rounded-lg">
                  <div className={`px-2 py-1.5 text-xs font-semibold ${
                    isMyspaceMode 
                      ? 'text-pink-600 dark:text-pink-300 border-b border-pink-200 dark:border-pink-700' 
                      : 'text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700'
                  }`}>
                    {suggestions.length} result{suggestions.length !== 1 ? 's' : ''}
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      tabIndex={0}
                      onClick={() => {
                        setSearchQuery(suggestion.title);
                        setShowSuggestions(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setSearchQuery(suggestion.title);
                          setShowSuggestions(false);
                        }
                      }}
                      className={`search-suggestion-item px-3 py-2.5 cursor-pointer transition-all duration-150 border-b last:border-b-0 focus:outline-none focus:ring-2 focus:ring-inset ${
                        isMyspaceMode 
                          ? 'hover:bg-pink-100 dark:hover:bg-purple-800/50 border-pink-200 dark:border-pink-700/50 active:bg-pink-200 dark:active:bg-purple-700 focus:ring-pink-400' 
                          : 'hover:bg-blue-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700 active:bg-blue-100 dark:active:bg-gray-600 focus:ring-blue-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${
                          isMyspaceMode 
                            ? 'text-pink-600 dark:text-pink-400' 
                            : 'text-blue-600 dark:text-blue-400'
                        } font-semibold uppercase tracking-wide`}>
                          {suggestion.category}
                        </span>
                      </div>
                      <p className={`text-sm font-medium mt-0.5 ${
                        isMyspaceMode 
                          ? 'text-gray-800 dark:text-gray-200' 
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {suggestion.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a 
            href="mailto:calderonjessica13@yahoo.com" 
            className="hidden md:flex items-center gap-1 text-sm hover:text-pink-200 dark:hover:text-pink-300 transition-colors duration-200 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help
          </a>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            onClick={toggleLayoutMode}
            title="Switch between Default and Custom MySpace layouts"
            className="layout-toggle flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-md hover:shadow-lg"
          >
            <span className="mr-1">🪄</span>
            <span className="hidden sm:inline">{layoutMode === 'custom' ? 'Default Layout' : 'Custom Layout'}</span>
            <span className="sm:hidden">{layoutMode === 'custom' ? 'Default' : 'Custom'}</span>
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
    <div className="max-w-6xl mx-auto p-2 sm:p-2">
      {/* Desktop Layout: Sidebar + Main Content */}
      <div className={`${forceDesktopView ? 'flex' : 'hidden md:flex'} flex-row gap-2`}>
        {/* Left Sidebar */}
        <div className="w-1/3">
          <Sidebar isMyspaceMode={isMyspaceMode} />
        </div>
        
        {/* Right Main Content */}
        <div className="w-2/3 space-y-2 section-spacing">
          {/* Profile Banner */}
          <div 
            className={`bg-white dark:bg-gray-800 border-2 spacing-standard ${
              isMyspaceMode && !isDarkMode ? 'border-pink-500' : 
              isMyspaceMode && isDarkMode ? 'border-purple-500' : 
              'border-blue-500 dark:border-blue-400'
            }`}
          >
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
          <div 
            className="bg-white dark:bg-gray-800 border-2 spacing-standard"
            style={{ borderColor: customization.accentColor }}
          >
            <p className="text-base font-bold text-black dark:text-white mb-2">Jessica Calderon, MBA</p>
            <div className="flex items-start space-x-3">
              <img 
                src={profilePic}
                alt="Jessica Calderon" 
                className="w-20 h-20 border-2 object-cover flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity"
                style={{ borderColor: customization.accentColor }}
                title="Click for a surprise! 🦖"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-black dark:text-white">"Currently coding... "</p>
                <p className="text-xs text-black dark:text-white">She/Her</p>
                <p className="text-xs text-black dark:text-white">San Antonio, TEXAS</p>
                <p className="text-xs text-black dark:text-white">United States</p>
                <p className="text-xs text-black dark:text-white mt-2">Last Updated: {lastDeployed || '...'}</p>
                <p className="text-xs text-black dark:text-white">Status: Available for New Opportunities</p>
                <div className="mt-2">
                  <span className="text-xs text-black dark:text-white">View My: </span>
                  <button 
                    onClick={() => setShowLegacyModal(true)} 
                    className="text-xs hover:underline break-words"
                    style={{ color: customization.accentColor }}
                  >
                    Legacy Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Contact Banner - order 2 */}
        <div className="mobile-order-2">
          <div 
            className={`bg-white dark:bg-gray-800 border-2 spacing-standard ${
              isMyspaceMode && !isDarkMode ? 'border-pink-500' : 
              isMyspaceMode && isDarkMode ? 'border-purple-500' : 
              'border-blue-500 dark:border-blue-400'
            }`}
          >
            <h2 className="text-xl font-bold text-black dark:text-white text-center">Jessica Calderon is your Professional Contact.</h2>
          </div>
        </div>
        
        {/* Contact Info - order 3 */}
        <div className="mobile-order-3" id="contact">
          <div 
            className="bg-blue-100 dark:bg-blue-900 border-2 spacing-standard"
            style={{ borderColor: customization.accentColor }}
          >
            <h3 className="font-bold text-black dark:text-white text-sm mb-3">Contacting Jessica</h3>
            <div className="grid grid-cols-2 gap-2">
              <a 
                href="mailto:calderonjessica13@yahoo.com" 
                className="text-xs hover:underline flex items-center"
                style={{ color: customization.accentColor }}
              >
                <span className="mr-1">✉️</span> Send Message
              </a>
              <a 
                href="https://linkedin.com/in/Jessica-Calderon-00" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs hover:underline flex items-center"
                style={{ color: customization.accentColor }}
              >
                <span className="mr-1">👥</span> Connect
              </a>
              <button 
                onClick={() => window.open('https://cal.com/jessica-calderon')} 
                className="text-xs hover:underline flex items-center"
                style={{ color: customization.accentColor }}
              >
                <span className="mr-1">💬</span> Schedule Call
              </button>
              <button 
                onClick={() => setShowResumeModal(true)} 
                className="text-xs hover:underline flex items-center"
                style={{ color: customization.accentColor }}
              >
                <span className="mr-1">📄</span> View Resume
              </button>
              <button 
                onClick={() => setShowShareModal(true)} 
                className="text-xs hover:underline flex items-center"
                style={{ color: customization.accentColor }}
              >
                <span className="mr-1">↗️</span> Share Profile
              </button>
              <a 
                href="https://github.com/jessica-calderon" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs hover:underline flex items-center"
                style={{ color: customization.accentColor }}
              >
                <span className="mr-1">⭐</span> Add to Favorites
              </a>
            </div>
          </div>
        </div>
        
        {/* Professional Profile - order 4 */}
        <div className="mobile-order-4" id="about">
          <AboutMe isMyspaceMode={isMyspaceMode} searchQuery={searchQuery} />
        </div>
        
        {/* Certifications & Education - order 5 */}
        <div className="mobile-order-5">
          <Education searchQuery={searchQuery} isMyspaceMode={isMyspaceMode} />
        </div>
        
        {/* Jessica's Links - order 6 */}
        <div className="mobile-order-6 overflow-x-auto" id="tech">
          <table className={`myspace-details-box ${isMyspaceMode && !isDarkMode ? 'border-pink-500' : isMyspaceMode && isDarkMode ? 'border-purple-500' : 'border-blue-500 dark:border-blue-400'}`}>
            <thead>
              <tr>
                <th 
                  colSpan={2}
                  className={isMyspaceMode ? '' : 'text-white'}
                  style={{
                    backgroundColor: isMyspaceMode && !isDarkMode ? '#ec4899' : // pink-500
                                    isMyspaceMode && isDarkMode ? '#9333ea' : // purple-600
                                    isDarkMode ? '#374151' : // gray-700
                                    '#3b82f6' // blue-500
                  }}
                >
                  Jessica's Links
                </th>
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
                <td><a href="https://jessica-calderon.github.io/portfolio/" target="_blank" rel="noopener noreferrer">github.io/portfolio</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Projects section for mobile */}
        
        {/* Technical Skills - order 7 */}
        <div className="mobile-order-7 overflow-x-auto">
          <table 
            className={`myspace-details-box ${isMyspaceMode && !isDarkMode ? 'border-pink-500' : isMyspaceMode && isDarkMode ? 'border-purple-500' : 'border-blue-500 dark:border-blue-400'}`}
          >
            <thead>
              <tr>
                <th 
                  colSpan={2} 
                  className={`whitespace-nowrap custom-font ${isMyspaceMode ? '' : 'text-white'}`}
                  style={{
                    backgroundColor: isMyspaceMode && !isDarkMode ? '#ec4899' : // pink-500
                                    isMyspaceMode && isDarkMode ? '#9333ea' : // purple-600
                                    isDarkMode ? '#374151' : // gray-700
                                    '#3b82f6' // blue-500
                  }}
                >
                  Jessica's Technical Skills
                </th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                // Get label text color based on theme
                const getLabelColor = () => {
                  if (isMyspaceMode && isDarkMode) return '#bb86fc'; // purple-300
                  if (isMyspaceMode && !isDarkMode) return '#4c1d95'; // purple-800
                  if (isDarkMode) return '#93c5fd'; // blue-300
                  return '#336699'; // default blue
                };

                // Get value text color based on theme
                const getValueColor = () => {
                  if (isMyspaceMode && isDarkMode) return '#e0e0e0'; // gray-200
                  if (isMyspaceMode && !isDarkMode) return '#4c1d95'; // purple-900
                  if (isDarkMode) return '#e5e7eb'; // gray-200
                  return '#000000'; // black
                };

                const labelColor = getLabelColor();
                const valueColor = getValueColor();

                return (
                  <>
                    <tr>
                      <td 
                        className="whitespace-nowrap custom-font font-bold" 
                        style={{ color: labelColor }}
                      >
                        Programming:
                      </td>
                      <td 
                        className="custom-font" 
                        style={{ color: valueColor }}
                      >
                        PHP, TypeScript, JavaScript, Python, React, Node.js
                      </td>
                    </tr>
                    <tr>
                      <td 
                        className="whitespace-nowrap custom-font font-bold" 
                        style={{ color: labelColor }}
                      >
                        DevOps:
                      </td>
                      <td 
                        className="custom-font" 
                        style={{ color: valueColor }}
                      >
                        Docker, AWS ECS, CI/CD, STIG compliance, GitLab CI
                      </td>
                    </tr>
                    <tr>
                      <td 
                        className="whitespace-nowrap custom-font font-bold" 
                        style={{ color: labelColor }}
                      >
                        Databases:
                      </td>
                      <td 
                        className="custom-font" 
                        style={{ color: valueColor }}
                      >
                        PostgreSQL, MySQL, Redis, OpenSearch
                      </td>
                    </tr>
                    <tr>
                      <td 
                        className="whitespace-nowrap custom-font font-bold" 
                        style={{ color: labelColor }}
                      >
                        Tools:
                      </td>
                      <td 
                        className="custom-font" 
                        style={{ color: valueColor }}
                      >
                        VS Code, GitLab CI, Fluent Bit, Apache Superset
                      </td>
                    </tr>
                    <tr>
                      <td 
                        className="whitespace-nowrap custom-font font-bold" 
                        style={{ color: labelColor }}
                      >
                        Cloud:
                      </td>
                      <td 
                        className="custom-font" 
                        style={{ color: valueColor }}
                      >
                        AWS, ECS, S3, RDS, CloudWatch
                      </td>
                    </tr>
                    <tr>
                      <td 
                        className="whitespace-nowrap custom-font font-bold" 
                        style={{ color: labelColor }}
                      >
                        Specialties:
                      </td>
                      <td 
                        className="custom-font" 
                        style={{ color: valueColor }}
                      >
                        Moodle Workplace, Data Integration, Iron Bank Containers
                      </td>
                    </tr>
                  </>
                );
              })()}
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
            Built, designed & created by <a 
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
    
    {/* Legacy Profile Modal */}
    {showLegacyModal && <LegacyProfileModal onClose={() => setShowLegacyModal(false)} />}
    
    {/* Jump to Top Button */}
    <JumpToTop isMyspaceMode={isMyspaceMode} />
    
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
