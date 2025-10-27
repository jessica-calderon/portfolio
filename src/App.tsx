import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import CaseStudiesGrid from './components/CaseStudiesGrid';
import Comments from './components/Comments';
import DarkModeToggle from './components/DarkModeToggle';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './App.css';

function App() {
  const [isMyspaceMode, setIsMyspaceMode] = useState<boolean>(false);

  const handleModeChange = (isMyspace: boolean) => {
    setIsMyspaceMode(isMyspace);
  };

  // Get theme classes
  const getThemeClasses = () => {
    if (isMyspaceMode) {
      return `min-h-screen myspace-mode`;
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
    <DarkModeProvider>
      <div className={getThemeClasses()}>
      {/* Professional Portfolio Header */}
      <div className={`text-white py-3 px-4 ${isMyspaceMode 
        ? 'bg-blue-600 dark:bg-blue-800' 
        : 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-slate-800 dark:to-slate-900'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">MyPortfolio</h1>
            <span className="text-sm text-gray-300">a place to showcase my work</span>
          </div>
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search projects..." className="px-3 py-2 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm rounded-lg transition-colors duration-200">Search</button>
            <a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Help</a>
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
        ? 'bg-blue-500 dark:bg-blue-700' 
        : 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-slate-700 dark:to-slate-800'
      }`}>
        <div className="max-w-6xl mx-auto">
          <nav className="flex flex-wrap items-center justify-center sm:justify-start space-x-4 sm:space-x-6 text-sm">
            {navigationItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="hover:text-blue-300 transition-colors duration-200 py-1 px-2 rounded hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex gap-4">
          {/* Left Sidebar - MySpace Profile Style */}
          <div className="w-1/3">
            <Sidebar />
          </div>
          
          {/* Right Main Content */}
          <div className="w-2/3 space-y-4">
            {/* Profile Banner */}
            <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-4">
              <h2 className="text-xl font-bold text-black dark:text-white">Jessica Calderon is your Professional Contact.</h2>
            </div>
            {isMyspaceMode && (
              <div className="music-player bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-4 rounded-lg">
                <div className="text-sm font-bold mb-2 text-black dark:text-white">🎵 Jessica's Playlist 🎵</div>
                <div className="text-xs text-gray-700 dark:text-gray-300">♪ Currently Playing: "Code Like It's 2005" ♪</div>
                <div className="text-xs mt-1 text-gray-700 dark:text-gray-300">♪ Next: "JavaScript Dreams" ♪</div>
                <div className="text-xs mt-1 text-gray-700 dark:text-gray-300">♪ Then: "React Revolution" ♪</div>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">🔊 Volume: 100% | ⏸️ Pause | ⏭️ Next</div>
              </div>
            )}
            <Education />
            <AboutMe />
            <CaseStudiesGrid />
            <Comments />
          </div>
        </div>
      </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;
