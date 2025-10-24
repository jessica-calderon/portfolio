import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';

type ProfileMode = 'default' | 'myspace';

const ProfileViewToggle: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<ProfileMode>('default');

  const toggleMode = () => {
    setCurrentMode(currentMode === 'default' ? 'myspace' : 'default');
  };

  const myspaceStyles = {
    background: `
      linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff, #00ffff),
      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.8"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>')
    `,
    backgroundSize: '400% 400%, 20px 20px',
    animation: 'gradientShift 3s ease infinite, starTwinkle 2s ease-in-out infinite alternate'
  };

  return (
    <div className="w-full">
      {/* Toggle Button */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={toggleMode}
          className={`
            px-6 py-3 rounded-lg font-bold text-lg transition-all duration-500 transform hover:scale-105
            ${currentMode === 'default' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl' 
              : 'bg-gradient-to-r from-neon-pink to-neon-cyan text-black shadow-lg hover:shadow-xl animate-pulse'
            }
          `}
        >
          {currentMode === 'default' 
            ? 'Switch to MySpace Mode' 
            : 'Switch to Default Mode'
          }
        </button>
      </div>

      {/* Profile Content */}
      <div 
        className={`
          transition-all duration-1000 ease-in-out
          ${currentMode === 'myspace' ? 'opacity-100' : 'opacity-100'}
        `}
        style={currentMode === 'myspace' ? myspaceStyles : {}}
      >
        {currentMode === 'default' ? (
          <DefaultProfileView />
        ) : (
          <MySpaceProfileView />
        )}
      </div>

      {/* Custom CSS for MySpace animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes starTwinkle {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
        
        @keyframes neonGlow {
          0%, 100% { 
            text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
          }
          50% { 
            text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
          }
        }
        
        .neon-text {
          animation: neonGlow 2s ease-in-out infinite alternate;
        }
        
        .myspace-scroll {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Default Profile View Component
const DefaultProfileView: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold text-white">JC</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Jessica Calderon</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">Senior Software Engineer</p>
          <p className="text-gray-500 dark:text-gray-400">San Antonio, Texas</p>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Senior Software Engineer with extensive expertise in AWS cloud infrastructure, PHP backend development, 
            and Docker containerization. Specialized in DoD/STIG-compliant environments with proven experience in 
            secure, scalable system design and analytics-driven applications.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Core competencies include Moodle Workplace customization, Apache Superset data visualization, and 
            full-stack development using React, TypeScript, and Python. Experienced in building Iron Bank-compliant 
            containers and implementing CI/CD pipelines with GitLab CI for enterprise deployments.
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technical Skills</h3>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {['PHP', 'TypeScript', 'JavaScript', 'Python', 'React', 'Node.js'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Cloud & DevOps</h3>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {['AWS', 'Docker', 'CI/CD', 'PostgreSQL', 'MySQL', 'GitLab CI'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MySpace Profile View Component
const MySpaceProfileView: React.FC = () => {
  return (
    <div className="min-h-screen p-4">
      {/* MySpace Header */}
      <div className="bg-black text-neon-cyan p-4 mb-4 rounded-lg border-4 border-neon-pink">
        <h1 className="text-4xl font-bold neon-text text-center" style={{ fontFamily: 'Orbitron, monospace' }}>
          ✨ Jessica's Space ✨
        </h1>
        <p className="text-center text-lg neon-text mt-2">
          Welcome to my totally awesome profile! 🎉
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Sidebar - MySpace Style */}
        <div className="w-full lg:w-1/3 space-y-4">
          {/* Profile Picture and Info */}
          <div className="bg-black border-4 border-neon-pink p-4 rounded-lg">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-neon-pink to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white">
                <span className="text-4xl font-bold text-black">JC</span>
              </div>
              <h2 className="text-2xl font-bold text-neon-cyan neon-text mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                Jessica Calderon
              </h2>
              <p className="text-neon-pink font-bold mb-1">Senior Software Engineer</p>
              <p className="text-white text-sm mb-1">San Antonio, Texas</p>
              <p className="text-neon-cyan text-sm">Status: Available for New Opportunities</p>
            </div>
          </div>

          {/* Music Player */}
          <div className="bg-black border-4 border-neon-cyan p-4 rounded-lg">
            <h3 className="text-lg font-bold text-neon-cyan neon-text mb-3 text-center" style={{ fontFamily: 'Orbitron, monospace' }}>
              🎵 My Music Player 🎵
            </h3>
            <div className="bg-gray-900 border-2 border-neon-pink p-3 rounded">
              <div className="text-center mb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-neon-pink to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">♪</span>
                </div>
                <p className="text-neon-cyan font-bold text-sm">Currently Playing</p>
                <p className="text-white text-xs">Synthwave Dreams - Retro Vibes</p>
              </div>
              
              {/* Fake Music Player Controls */}
              <div className="flex justify-center space-x-2 mb-3">
                <button className="bg-neon-pink text-black px-3 py-1 rounded text-xs font-bold hover:bg-neon-cyan transition-colors">
                  ▶ PLAY
                </button>
                <button className="bg-neon-cyan text-black px-3 py-1 rounded text-xs font-bold hover:bg-neon-pink transition-colors">
                  ⏸ PAUSE
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 h-2 rounded mb-2">
                <div className="bg-gradient-to-r from-neon-pink to-neon-cyan h-2 rounded w-1/3"></div>
              </div>
              
              <div className="flex justify-between text-xs text-white">
                <span>1:23</span>
                <span>4:56</span>
              </div>
              
              {/* Scrolling Text */}
              <div className="mt-3 bg-black border border-neon-cyan p-2 rounded overflow-hidden">
                <div className="myspace-scroll text-neon-pink text-xs whitespace-nowrap">
                  ♪ Now playing: Synthwave Dreams - Retro Vibes | Next: Cyberpunk Nights - Neon City | Upcoming: Digital Love - Future Bass ♪
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-black border-4 border-neon-pink p-4 rounded-lg">
            <h3 className="text-lg font-bold text-neon-cyan neon-text mb-3 text-center" style={{ fontFamily: 'Orbitron, monospace' }}>
              📧 Contact Me 📧
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-neon-pink">✉️</span>
                <a href="mailto:calderonjessica13@yahoo.com" className="text-neon-cyan hover:text-white transition-colors">
                  calderonjessica13@yahoo.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-neon-pink">💼</span>
                <a href="https://linkedin.com/in/Jessica-Calderon-00" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:text-white transition-colors">
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-neon-pink">🐙</span>
                <a href="https://github.com/jessica-calderon" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:text-white transition-colors">
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - MySpace Style */}
        <div className="w-full lg:w-2/3 space-y-4">
          {/* About Me Section */}
          <div className="bg-black border-4 border-neon-cyan p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-neon-pink neon-text mb-4 text-center" style={{ fontFamily: 'Orbitron, monospace' }}>
              🌟 About Jessica 🌟
            </h2>
            <div className="space-y-4 text-sm">
              <p className="text-white leading-relaxed">
                <span className="text-neon-cyan font-bold">Hey there! 👋</span> I'm Jessica, a Senior Software Engineer 
                with a passion for creating amazing cloud infrastructure and secure applications! I've been coding 
                for years and absolutely LOVE what I do! 💻✨
              </p>
              
              <p className="text-neon-pink leading-relaxed">
                <span className="text-neon-cyan font-bold">My Superpowers:</span> I'm a wizard with AWS cloud stuff, 
                PHP backend magic, and Docker containerization! I specialize in DoD/STIG-compliant environments 
                and building secure, scalable systems that actually work! 🚀
              </p>
              
              <p className="text-white leading-relaxed">
                <span className="text-neon-cyan font-bold">Cool Stuff I Do:</span> Moodle Workplace customization, 
                Apache Superset data visualization, and full-stack development using React, TypeScript, and Python. 
                I also build Iron Bank-compliant containers and implement CI/CD pipelines! It's like being a digital 
                architect! 🏗️
              </p>
              
              <p className="text-neon-pink leading-relaxed">
                <span className="text-neon-cyan font-bold">Currently:</span> I'm available for new opportunities 
                in senior engineering roles! I'm super excited about cloud architecture, data analytics, and 
                secure application development. Remote and hybrid positions are totally cool with me! 🌈
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-black border-4 border-neon-pink p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-neon-cyan neon-text mb-4 text-center" style={{ fontFamily: 'Orbitron, monospace' }}>
              🛠️ My Tech Arsenal 🛠️
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-bold text-neon-pink mb-2">Programming Languages</h3>
                <div className="space-y-1">
                  {['PHP', 'TypeScript', 'JavaScript', 'Python', 'React', 'Node.js'].map(skill => (
                    <div key={skill} className="text-white text-sm flex items-center">
                      <span className="text-neon-cyan mr-2">⚡</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neon-pink mb-2">Cloud & DevOps</h3>
                <div className="space-y-1">
                  {['AWS', 'Docker', 'CI/CD', 'PostgreSQL', 'MySQL', 'GitLab CI'].map(skill => (
                    <div key={skill} className="text-white text-sm flex items-center">
                      <span className="text-neon-cyan mr-2">☁️</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-black border-4 border-neon-cyan p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-neon-pink neon-text mb-4 text-center" style={{ fontFamily: 'Orbitron, monospace' }}>
              🎉 Fun Facts About Me 🎉
            </h2>
            <div className="space-y-2 text-sm text-white">
              <div className="flex items-center space-x-2">
                <span className="text-neon-cyan">🎯</span>
                <span>I can debug code while drinking coffee (it's a superpower!)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-neon-cyan">🚀</span>
                <span>I once deployed a critical fix at 2 AM and it worked perfectly!</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-neon-cyan">💡</span>
                <span>I believe every bug is just a feature in disguise</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-neon-cyan">🌟</span>
                <span>I'm always learning new technologies and sharing knowledge!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewToggle;
