import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AboutMe from './components/AboutMe';
import Technologies from './components/Technologies';
import TopProjects from './components/TopProjects';
import Comments from './components/Comments';
import DarkModeToggle from './components/DarkModeToggle';
import ProfileThemeToggle from './components/ProfileThemeToggle';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
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

  // Navigation items for different modes
  const getNavigationItems = () => {
    if (isMyspaceMode) {
      return [
        { label: 'About', href: '#about' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Skills', href: '#skills' },
        { label: 'Experience', href: '#experience' },
        { label: 'Contact', href: '#contact' }
      ];
    } else {
      return [
        { label: 'Home', href: '#' },
        { label: 'Projects', href: '#projects' },
        { label: 'Search', href: '#search' },
        { label: 'Career Updates', href: '#career' },
        { label: 'Tech Stack', href: '#tech' },
        { label: 'Favorites', href: '#favorites' },
        { label: 'Connect', href: '#connect' },
        { label: 'Mail', href: '#mail' },
        { label: 'Forum', href: '#forum' },
        { label: 'Groups', href: '#groups' },
        { label: 'Events', href: '#events' },
        { label: 'Videos', href: '#videos' }
      ];
    }
  };

  return (
    <DarkModeProvider>
      <div className={getThemeClasses()}>
      {/* MySpace Header */}
      <div className="bg-blue-600 dark:bg-blue-800 text-white py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">MyPortfolio</h1>
            <span className="text-sm">a place for professionals</span>
          </div>
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search Professionals" className="px-2 py-1 text-black text-sm rounded" />
            <button className="bg-blue-500 dark:bg-blue-700 px-3 py-1 text-sm rounded hover:bg-blue-600 dark:hover:bg-blue-600">Search</button>
            <a href="#" className="text-sm hover:underline">Help</a>
            <a href="#" className="text-sm hover:underline">LogOut</a>
            <ProfileThemeToggle onModeChange={handleModeChange} />
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-blue-500 dark:bg-blue-700 text-white py-1 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex space-x-6 text-sm">
            {getNavigationItems().map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="hover:underline transition-all duration-300 hover:text-yellow-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Profile Banner */}
        <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-4 mb-4">
          <h2 className="text-xl font-bold text-black dark:text-white">Jessica Calderon is your Professional Contact.</h2>
        </div>

        <div className="flex gap-4">
          {/* Left Sidebar - MySpace Profile Style */}
          <div className="w-1/3">
            <Sidebar />
          </div>
          
          {/* Right Main Content */}
          <div className="w-2/3 space-y-4">
            {isMyspaceMode && (
              <div className="music-player">
                <div className="text-sm font-bold mb-2">🎵 Jessica's Playlist 🎵</div>
                <div className="text-xs">♪ Currently Playing: "Code Like It's 2005" ♪</div>
                <div className="text-xs mt-1">♪ Next: "JavaScript Dreams" ♪</div>
                <div className="text-xs mt-1">♪ Then: "React Revolution" ♪</div>
                <div className="mt-2 text-xs">🔊 Volume: 100% | ⏸️ Pause | ⏭️ Next</div>
              </div>
            )}
            <Technologies />
            <AboutMe />
            <TopProjects />
            <Comments />
          </div>
        </div>
      </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;
