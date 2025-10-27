import { useState } from 'react';
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
  const { isDarkMode } = useDarkMode();

  const handleModeChange = (isMyspace: boolean) => {
    setIsMyspaceMode(isMyspace);
  };

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
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
          <input type="text" placeholder="Search projects..." className={`px-3 py-2 ${isMyspaceMode ? 'bg-pink-100 border-pink-300 focus:ring-pink-500' : 'bg-gray-50 border-gray-300 focus:ring-blue-500'} text-gray-900 border text-sm rounded-lg focus:outline-none focus:ring-2 flex-1 md:flex-none md:min-w-[200px]`} />
          <button className={`px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${isMyspaceMode ? 'bg-pink-600 hover:bg-pink-700' : 'bg-blue-600 hover:bg-blue-700'}`}>Search</button>
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
            <h2 className="text-base sm:text-xl font-bold text-black dark:text-white">Jessica Calderon is your Professional Contact.</h2>
          </div>
          <Education />
          <AboutMe />
          <CaseStudiesGrid />
          <LearningWall isMyspaceMode={isMyspaceMode} />
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
