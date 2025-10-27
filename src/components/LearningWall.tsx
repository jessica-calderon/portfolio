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

  // Determine colors based on mode
  const getColors = () => {
    if (isMyspaceMode) {
      // MySpace mode styling
      if (isDarkMode) {
        return {
          bg: '#cc7700',
          commentBg: '#2a1f14',
          border: '#884400',
          borderTop: '#aa5500',
          text: '#f0d0a0',
          timestamp: '#c0a070',
          focus: '#d4b580',
          titleText: '#fff',
          linkText: '#66aaff'
        };
      } else {
        return {
          bg: '#ff9900',
          commentBg: '#fff8f4',
          border: '#cc6600',
          borderTop: '#e67300',
          text: '#2d1e0f',
          timestamp: '#666',
          focus: '#884400',
          titleText: '#fff',
          linkText: '#0000cc'
        };
      }
    } else {
      // Default mode styling
      if (isDarkMode) {
        return {
          bg: '#1a1a1a',
          commentBg: '#2a2a2a',
          border: '#404040',
          borderTop: '#404040',
          text: '#e0e0e0',
          timestamp: '#a0a0a0',
          focus: '#c0c0c0',
          titleText: '#fff',
          linkText: '#66aaff'
        };
      } else {
        return {
          bg: '#f5f5f5',
          commentBg: '#ffffff',
          border: '#ddd',
          borderTop: '#ddd',
          text: '#333',
          timestamp: '#666',
          focus: '#888',
          titleText: '#000',
          linkText: '#0066cc'
        };
      }
    }
  };

  const colors = getColors();

  return (
    <section 
      style={{ 
        fontFamily: isMyspaceMode ? 'Verdana, Tahoma, sans-serif' : 'inherit',
        backgroundColor: colors.bg,
        padding: '10px',
        borderRadius: isMyspaceMode ? '0' : '4px'
      }}
      className={!isMyspaceMode ? 'bg-gray-100 dark:bg-gray-900' : ''}
    >
      {/* Header Section */}
      <div style={{ marginBottom: '10px' }}>
        <h2 style={{ 
          color: colors.titleText,
          fontSize: isMyspaceMode ? '16pt' : '18pt',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          What I'm Learning
        </h2>
        <p style={{ fontSize: '10pt', color: colors.text }}>
          Displaying {entries.length} of {entries.length} comments{' '}
          <a 
            href="#" 
            style={{ color: colors.linkText, textDecoration: 'underline' }}
          >
            (View/Edit All Comments)
          </a>
        </p>
      </div>
      
      {/* Comments Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {entries.map((entry, index) => (
          <div 
            key={entry.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              backgroundColor: colors.commentBg,
              border: `1px solid ${colors.border}`,
              borderTop: index > 0 ? `1px solid ${colors.borderTop}` : `1px solid ${colors.border}`,
              padding: '10px',
              width: '100%',
              borderRadius: isMyspaceMode ? '0' : '4px'
            }}
          >
            {/* Avatar - Left */}
            <div 
              style={{
                width: '70px',
                height: '70px',
                marginRight: '10px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
                border: `1px solid ${isDarkMode ? '#666' : '#999'}`
              }}
            >
              <div style={{ fontSize: '2rem' }}>🧠</div>
            </div>
            
            {/* Comment Box - Right */}
            <div style={{ flex: 1, paddingLeft: '5px' }}>
              {/* Timestamp */}
              <p 
                style={{ 
                  fontSize: '10pt', 
                  color: colors.timestamp, 
                  fontStyle: 'italic',
                  marginBottom: '5px',
                  marginTop: '0'
                }}
              >
                {entry.timestamp}
              </p>
              
              {/* Learning Text */}
              <p 
                style={{ 
                  fontSize: '11pt',
                  color: colors.text,
                  lineHeight: '1.4',
                  marginBottom: '5px',
                  marginTop: '0'
                }}
              >
                {entry.learning}
              </p>
              
              {/* Focus Area */}
              <p 
                style={{ 
                  fontSize: '10pt',
                  color: colors.focus,
                  fontStyle: 'italic',
                  marginTop: '0',
                  marginBottom: '0'
                }}
              >
                – Focus: {entry.focus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningWall;

