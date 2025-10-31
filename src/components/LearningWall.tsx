import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import SearchHighlight from './shared/SearchHighlight';
import MySpaceContainer from './shared/MySpaceContainer';
import ThemeAwareHeader from './shared/ThemeAwareHeader';
import profilePic from '../assets/8bitme.png';

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
  const { isDarkMode, customization } = useDarkMode();

  // Helper function to lighten a color for light mode comment boxes
  const lightenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.min(255, ((num >> 16) & 0xff) + Math.round(255 * percent));
    const g = Math.min(255, ((num >> 8) & 0xff) + Math.round(255 * percent));
    const b = Math.min(255, (num & 0xff) + Math.round(255 * percent));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  // Helper function to create a muted, desaturated color for dark mode
  const createMutedDarkColor = (color: string): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const r = (num >> 16) & 0xff;
    const g = (num >> 8) & 0xff;
    const b = num & 0xff;
    
    // Create a muted brown-ish tone for dark mode (lower saturation, darker)
    // Mix with a dark brown base (#2d1f0f ~ rgb(45, 31, 15)) to create muted version
    const darkBaseR = 45;
    const darkBaseG = 31;
    const darkBaseB = 15;
    
    // Blend with 70% dark base, 30% accent (heavily desaturated)
    const newR = Math.round(darkBaseR * 0.7 + r * 0.3 * 0.3);
    const newG = Math.round(darkBaseG * 0.7 + g * 0.3 * 0.3);
    const newB = Math.round(darkBaseB * 0.7 + b * 0.3 * 0.3);
    
    return `#${((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0')}`;
  };

  // Check if using default MySpace orange theme
  const isDefaultOrange = customization.accentColor === '#FF9900';

  // Generate comment box colors based on custom accent color
  const getCommentBgColor = () => {
    // MySpace mode (pink/purple theme)
    if (isMyspaceMode) {
      if (isDarkMode) {
        // Dark mode MySpace: muted purple tone
        return '#6b3a7a'; // Muted purple for MySpace dark mode
      } else {
        // Light mode MySpace: light pink tone
        return '#ffb3d9'; // Light pink-beige for MySpace light mode
      }
    }
    
    // Non-MySpace themes
    if (isDarkMode) {
      // For dark mode: default orange uses original muted tan, custom themes use muted version
      if (isDefaultOrange) {
        return '#704A2E'; // Original muted tan for default MySpace theme
      } else {
        // For custom themes, create a muted, desaturated dark color
        return createMutedDarkColor(customization.accentColor);
      }
    } else {
      // For light mode: default orange stays orange-beige, custom themes use accent color
      if (isDefaultOrange) {
        return '#ffcc80'; // Original orange-beige for default MySpace theme
      } else {
        // For custom themes, use a lighter version of the accent
        return lightenColor(customization.accentColor, 0.4);
      }
    }
  };

  // Generate divider color based on comment box color
  const getDividerColor = () => {
    // MySpace mode (pink/purple theme)
    if (isMyspaceMode) {
      if (isDarkMode) {
        // Dark mode MySpace: slightly lighter purple divider
        return '#8b5a9c'; // Lighter purple divider for MySpace dark mode
      } else {
        // Light mode MySpace: darker pink divider
        return '#ff9fcc'; // Darker pink divider for MySpace light mode
      }
    }
    
    // Non-MySpace themes
    if (isDarkMode) {
      if (isDefaultOrange) {
        return '#8b6b4a'; // Original divider color for default orange theme dark mode
      } else {
        // Create a slightly lighter muted color for divider
        const baseColor = createMutedDarkColor(customization.accentColor);
        const num = parseInt(baseColor.replace('#', ''), 16);
        const r = Math.min(255, ((num >> 16) & 0xff) + 20);
        const g = Math.min(255, ((num >> 8) & 0xff) + 15);
        const b = Math.min(255, (num & 0xff) + 10);
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
      }
    } else {
      if (isDefaultOrange) {
        return '#e6b873'; // Original divider color for default orange theme
      } else {
        const baseColor = getCommentBgColor();
        const num = parseInt(baseColor.replace('#', ''), 16);
        const r = Math.max(0, ((num >> 16) & 0xff) - 30);
        const g = Math.max(0, ((num >> 8) & 0xff) - 30);
        const b = Math.max(0, (num & 0xff) - 30);
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
      }
    }
  };
  
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
    return <SearchHighlight text={text} searchQuery={searchQuery} />;
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

  // MySpace styling colors - comment section colors
  const myspaceColors = {
    commentSectionBg: isDarkMode ? '#0f1b2b' : '#d8e5f2',
    commentBg: getCommentBgColor(),
    dividerColor: getDividerColor(),
    usernameColor: isDarkMode ? '#99ccff' : '#003399',
    textColor: isDarkMode ? '#e0e0e0' : '#000000',
    timestampColor: isDarkMode ? '#b0b0b0' : '#666666',
    italicColor: isDarkMode ? '#c0c0c0' : '#555555',
    linkColor: isDarkMode ? '#99ccff' : '#003399'
  };

  return (
    <MySpaceContainer isMyspaceMode={isMyspaceMode} searchQuery={searchQuery}>
      <ThemeAwareHeader isMyspaceMode={isMyspaceMode}>
        What I'm Learning
      </ThemeAwareHeader>

      {/* Thin gray line beneath header */}
      <div
        style={{
          height: '1px',
          backgroundColor: isDarkMode ? '#4b5563' : '#ccc',
          margin: '0 -1rem',
          marginTop: 0
        }}
      />

      {/* Comment Links - Directly below header */}
      <div
        className="custom-font"
        style={{
          padding: '8px 0',
          color: myspaceColors.textColor,
          fontSize: '12px'
        }}
      >
        Displaying {filteredEntries.length} of {entries.length} entries ( 
        <a
          href="https://github.com/jessica-calderon"
          target="_blank"
          rel="noopener noreferrer"
          className="custom-font"
          style={{
            color: myspaceColors.linkColor,
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          View on GitHub
        </a>
        {' | '}
        <a
          href="https://linkedin.com/in/Jessica-Calderon-00"
          target="_blank"
          rel="noopener noreferrer"
          className="custom-font"
          style={{
            color: myspaceColors.linkColor,
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          Connect
        </a>
        {' )'}
      </div>
      
      {/* Comments Container - Continuous vertical stack */}
      <div 
        className="custom-font"
        style={{ 
          backgroundColor: myspaceColors.commentSectionBg,
          marginTop: '8px',
          padding: 0,
          fontSize: '12px'
        }}
      >
        {filteredEntries.map((entry, index) => (
          <React.Fragment key={entry.id}>
            {/* Comment Box */}
            <div
              className="custom-font"
              style={{
                backgroundColor: myspaceColors.commentBg,
                padding: '8px',
                display: 'flex',
                alignItems: 'flex-start'
              }}
            >
              {/* Profile Image - Square, Left Aligned, Top */}
              <div
                style={{
                  flexShrink: 0,
                  width: '70px',
                  height: '70px',
                  marginRight: '9px'
                }}
              >
                <img
                  src={profilePic}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              {/* Comment Content - Right of Image */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Username and Timestamp - Same Line */}
                <div 
                  style={{ 
                    marginBottom: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                  }}
                >
                  <a
                    href="https://github.com/jessica-calderon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-font"
                    style={{
                      color: myspaceColors.usernameColor,
                      fontWeight: 'bold',
                      fontSize: '13px',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    jessica
                  </a>
                  <span
                    className="custom-font"
                    style={{
                      color: myspaceColors.timestampColor,
                      fontSize: '11px'
                    }}
                  >
                    {highlightText(entry.timestamp)}
                  </span>
                </div>
                
                {/* Main Comment Text */}
                <div
                  className="custom-font"
                  style={{
                    color: myspaceColors.textColor,
                    fontSize: '12px',
                    lineHeight: '1.3',
                    marginBottom: '4px'
                  }}
                >
                  {highlightText(entry.learning)}
                </div>
                
                {/* Focus Area - Smaller Italic, Indented */}
                <div
                  className="custom-font"
                  style={{
                    color: myspaceColors.italicColor,
                    fontSize: '11px',
                    fontStyle: 'italic',
                    marginLeft: '2px'
                  }}
                >
                  {highlightText(entry.focus)}
                </div>
              </div>
            </div>
            
            {/* Divider Line - Between comments */}
            {index < filteredEntries.length - 1 && (
              <div
                style={{
                  height: '1px',
                  backgroundColor: myspaceColors.dividerColor,
                  width: '100%',
                  margin: 0,
                  padding: 0
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </MySpaceContainer>
  );
};

export default LearningWall;

