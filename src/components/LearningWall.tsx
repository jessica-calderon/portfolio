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
}

const LearningWall: React.FC<LearningWallProps> = ({ isMyspaceMode }) => {
  const { isDarkMode } = useDarkMode();
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

  return (
    <div className={`bg-white dark:bg-gray-800 border-2 ${isMyspaceMode && !isDarkMode ? 'border-pink-500' : 'border-blue-500'} ${isMyspaceMode && isDarkMode ? 'border-purple-500' : 'dark:border-blue-400'} p-4 transition-shadow hover:shadow-lg`} style={{
      borderRadius: '6px',
      background: isMyspaceMode ? (isDarkMode ? 'rgba(26, 0, 51, 0.8)' : 'rgba(255, 248, 254, 0.95)') : undefined,
      backdropFilter: isMyspaceMode ? 'blur(5px)' : undefined,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* MySpace-style Header Bar */}
      <div className={`mb-3 py-2 px-3 ${isMyspaceMode && !isDarkMode ? 'bg-pink-100' : isMyspaceMode && isDarkMode ? 'bg-purple-900' : 'bg-gray-100 dark:bg-gray-700'} rounded`}>
        <h2 className="font-bold text-black dark:text-white text-sm uppercase" style={{ fontFamily: 'Verdana, Arial, sans-serif' }}>
          What I'm Learning
        </h2>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">View/Edit All Comments</a>
        </p>
      </div>
      
      {/* Comments Container */}
      <div className="space-y-3">
        {entries.map((entry, index) => {
          const isEven = index % 2 === 0;
          const baseBg = isEven 
            ? (isDarkMode ? 'rgba(42, 42, 42, 0.8)' : 'rgba(250, 250, 250, 0.9)')
            : (isDarkMode ? 'rgba(51, 51, 51, 0.8)' : 'rgba(255, 255, 255, 0.95)');
          
          return (
            <div
              key={entry.id}
              className="flex flex-col sm:flex-row gap-3 p-3 rounded-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: baseBg,
                border: `1px solid ${isEven 
                  ? (isDarkMode ? '#4a4a4a' : '#e5e5e5') 
                  : (isDarkMode ? '#5a5a5a' : '#d5d5d5')}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              {/* Avatar - Left */}
              <div 
                className="flex-shrink-0 w-16 h-16 mx-auto sm:mx-0"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
                  border: '3px solid white',
                  borderRadius: '50%',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                }}
              >
                <div style={{ fontSize: '2rem' }}>🧠</div>
              </div>
              
              {/* Comment Box - Right */}
              <div className="flex-1" style={{ fontFamily: 'Verdana, Arial, sans-serif' }}>
                {/* Timestamp */}
                <p 
                  className="text-xs mb-2"
                  style={{ 
                    color: isDarkMode ? '#a0a0a0' : '#666666',
                    fontVariant: 'small-caps',
                    letterSpacing: '0.5px'
                  }}
                >
                  {entry.timestamp}
                </p>
                
                {/* Learning Text */}
                <p 
                  className="text-sm mb-2 leading-relaxed"
                  style={{ 
                    color: isDarkMode ? '#e0e0e0' : '#333333'
                  }}
                >
                  {entry.learning}
                </p>
                
                {/* Focus Area */}
                <p 
                  className="text-xs italic"
                  style={{ 
                    color: isDarkMode ? '#b0b0b0' : '#888888',
                    marginTop: '4px'
                  }}
                >
                  – Focus: {entry.focus}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningWall;

