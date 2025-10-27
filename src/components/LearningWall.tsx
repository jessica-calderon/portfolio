import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface LearningEntry {
  id: number;
  timestamp: string;
  learning: string;
  focus: string;
}

interface LearningWallProps {
  isMyspaceMode: boolean;
  searchQuery: string;
}

const LearningWall: React.FC<LearningWallProps> = ({ isMyspaceMode, searchQuery }) => {
  const { isDarkMode } = useDarkMode();
  
  // Filter entries based on search query
  const shouldShow = (entry: LearningEntry): boolean => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      entry.learning.toLowerCase().includes(query) ||
      entry.focus.toLowerCase().includes(query) ||
      entry.timestamp.toLowerCase().includes(query)
    );
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
  
  // Determine header background color based on mode
  const getHeaderBg = () => {
    if (isMyspaceMode && isDarkMode) return 'bg-purple-600';
    if (isMyspaceMode && !isDarkMode) return 'bg-pink-500';
    return 'bg-orange-500 dark:bg-orange-600';
  };
  
  const entries: LearningEntry[] = [
    {
      id: 1,
      timestamp: "4/26/2025 9:50 PM",
      learning: "Learned how to use Ghostscript to compress large Superset PDF exports efficiently.",
      focus: "optimizing memory & file size in data pipelines."
    },
    {
      id: 2,
      timestamp: "4/18/2025 7:32 PM",
      learning: "Experimenting with Fusion 360 parametric modeling for 3D printed tray designs.",
      focus: "tolerances, snap fits, and design-for-print workflow."
    },
    {
      id: 3,
      timestamp: "4/10/2025 6:21 PM",
      learning: "Revisiting async/await patterns in TypeScript for cleaner Superset plugin code.",
      focus: "simplifying fetch logic and error handling."
    },
    {
      id: 4,
      timestamp: "3/30/2025 11:04 PM",
      learning: "Refining Superset Docker builds with Iron Bank Ubuntu STIG images.",
      focus: "security hardening & reproducible builds."
    },
    {
      id: 5,
      timestamp: "3/15/2025 2:58 PM",
      learning: "Learning to visualize real-time logs in OpenSearch from Fluent Bit pipelines.",
      focus: "pattern parsing & ECS dashboard design."
    }
  ];

  const filteredEntries = entries.filter(shouldShow);
  
  if (filteredEntries.length === 0 && searchQuery) return null;

  return (
    <div className={`bg-white dark:bg-gray-800 border-2 p-3 sm:p-4 search-result-match ${isMyspaceMode && !isDarkMode ? 'border-pink-500' : 'border-blue-500'} ${isMyspaceMode && isDarkMode ? 'border-purple-500' : 'dark:border-blue-400'} ${searchQuery && filteredEntries.length > 0 ? 'ring-2 ring-blue-400 dark:ring-blue-500 animate-pulse-subtle' : ''}`}>
      <h2 className={`font-bold text-white text-xs sm:text-sm mb-2 sm:mb-3 px-2 py-1 -mx-2 -mt-2 ${getHeaderBg()}`}>What I'm Learning</h2>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">View/Edit All Comments</a>
        {searchQuery && filteredEntries.length < entries.length && (
          <span className="ml-2 text-pink-600 dark:text-pink-400">
            ({filteredEntries.length} match{filteredEntries.length !== 1 ? 'es' : ''})
          </span>
        )}
      </p>
      
      {/* Comments Container */}
      <div>
        {filteredEntries.map((entry, index) => {
          const entryIndex = entries.findIndex(e => e.id === entry.id);
          const isEven = entryIndex % 2 === 0;
          const borderColor = isEven 
            ? (isDarkMode ? '#5a5a5a' : '#d0d0d0') 
            : (isDarkMode ? '#4a4a4a' : '#e5e5e5');
          
          const bgColor = isEven 
            ? (isDarkMode ? 'rgba(30, 20, 45, 0.6)' : 'rgba(255, 255, 255, 0.95)')
            : (isDarkMode ? 'rgba(25, 15, 40, 0.6)' : 'rgba(250, 250, 252, 0.95)');
          
          return (
            <React.Fragment key={entry.id}>
              {index > 0 && entryIndex > 0 && (
                <div 
                  className="my-0"
                  style={{ 
                    height: '1px',
                    backgroundColor: isDarkMode ? '#444' : '#ddd',
                    borderTop: 'none'
                  }}
                />
              )}
              <div
                className="flex flex-col sm:flex-row gap-3 p-3 transition-all duration-200"
                style={{
                  backgroundColor: bgColor,
                  border: `1px solid ${borderColor}`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isDarkMode ? '#7a7a7a' : '#c0c0c0';
                  e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(35, 25, 50, 0.8)' : 'rgba(248, 248, 250, 0.98)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.backgroundColor = bgColor;
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
                }}
              >
                {/* Avatar - Left - Square Frame */}
                <div 
                  className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 mx-auto sm:mx-0"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
                    border: '3px solid white',
                    borderRadius: '3px',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                  }}
                >
                  <div style={{ fontSize: '1.8rem' }}>🧠</div>
                </div>
                
                {/* Comment Bubble - Right */}
                <div className="flex-1" style={{ fontFamily: 'Verdana, Arial, sans-serif' }}>
                  {/* Date/Time */}
                  <div 
                    className="text-xs mb-2"
                    style={{ 
                      color: isDarkMode ? '#999' : '#666',
                      fontFamily: 'Verdana, Arial, sans-serif',
                      fontSize: '11px'
                    }}
                  >
                    {highlightText(entry.timestamp)}
                  </div>
                  
                  {/* Learning Text in Bubble */}
                  <div
                    className="mb-2 p-2"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(40, 30, 60, 0.5)' : 'rgba(245, 245, 250, 0.9)',
                      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
                      borderRadius: '4px',
                      minHeight: '40px'
                    }}
                  >
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ 
                        color: isDarkMode ? '#e0e0e0' : '#333',
                        fontFamily: 'Verdana, Arial, sans-serif',
                        fontSize: '13px',
                        margin: 0
                      }}
                    >
                      {highlightText(entry.learning)}
                    </p>
                  </div>
                  
                  {/* Focus Area - Smaller Italic */}
                  <p 
                    className="text-xs italic"
                    style={{ 
                      color: isDarkMode ? '#aaa' : '#888',
                      marginTop: '2px',
                      fontFamily: 'Verdana, Arial, sans-serif',
                      fontSize: '10px',
                      fontStyle: 'italic'
                    }}
                  >
                    {highlightText(entry.focus)}
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LearningWall;

