import React, { useState } from 'react';
import profilePic from '../assets/8bitme.png';
import ResumeModal from './ResumeModal';
import ShareProfileModal from './ShareProfileModal';

const Sidebar: React.FC = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <div className="space-y-4">
      {/* Profile Picture and Basic Info */}
      <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-3 sm:p-4">
        <p className="text-sm sm:text-base font-bold text-black dark:text-white mb-2">Jessica Calderon, MBA</p>
        <div className="flex items-start space-x-2 sm:space-x-3">
          <img 
            src={profilePic} 
            alt="Jessica Calderon" 
            className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-blue-500 dark:border-blue-400 object-cover myspace-light-img-border flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
          <p className="text-xs text-black dark:text-white">"Currently coding... "</p>
            <p className="text-xs text-black dark:text-white">She/Her</p>
            <p className="text-xs text-black dark:text-white">San Antonio, TEXAS</p>
            <p className="text-xs text-black dark:text-white">United States</p>
            <p className="text-xs text-black dark:text-white mt-2">Last Login: 2 minutes ago</p>
            <p className="text-xs text-black dark:text-white">Status: Available for New Opportunities</p>
            <div className="mt-2">
              <button onClick={() => setShowResumeModal(true)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline break-words">View My: Portfolio</button>
            </div>
          </div>
        </div>
      </div>

      {/* Contacting Jessica */}
      <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400 p-3 sm:p-4" id="contact">
        <h3 className="font-bold text-black dark:text-white text-xs sm:text-sm mb-2 sm:mb-3">Contacting Jessica</h3>
        <div className="grid grid-cols-2 gap-2">
          <a href="mailto:calderonjessica13@yahoo.com" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">✉️</span> Send Message
          </a>
          <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">👥</span> Connect
          </a>
          <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">💬</span> Schedule Call
          </a>
          <button onClick={() => setShowResumeModal(true)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">📄</span> View Resume
          </button>
          <button onClick={() => setShowShareModal(true)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">↗️</span> Share Profile
          </button>
          <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">⭐</span> Add to Favorites
          </a>
          <a href="mailto:calderonjessica13@yahoo.com" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">📧</span> Email Resume
          </a>
          <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">⭐</span> Rate Profile
          </a>
        </div>
      </div>

      {/* Portfolio URL */}
      <div className="bg-white dark:bg-gray-800 border border-black dark:border-gray-600 p-2 sm:p-3">
        <p className="text-xs text-black dark:text-white">Portfolio URL:</p>
        <a href="https://jessica-calderon.github.io/myspace-portfolio/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline break-all">https://jessica-calderon.github.io/myspace-portfolio/</a>
      </div>

      {/* Jessica's Technical Skills */}
      <div className="overflow-x-auto" id="tech">
        <table className="myspace-box">
          <thead>
            <tr>
              <th colSpan={2} className="whitespace-nowrap">Jessica's Technical Skills</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-black dark:text-gray-300 whitespace-nowrap"><b>Programming:</b></td>
              <td className="text-black dark:text-gray-300">PHP, TypeScript, JavaScript, Python, React, Node.js</td>
            </tr>
            <tr>
              <td className="text-black dark:text-gray-300 whitespace-nowrap"><b>DevOps:</b></td>
              <td className="text-black dark:text-gray-300">Docker, AWS ECS, CI/CD, STIG compliance, GitLab CI</td>
            </tr>
            <tr>
              <td className="text-black dark:text-gray-300 whitespace-nowrap"><b>Databases:</b></td>
              <td className="text-black dark:text-gray-300">PostgreSQL, MySQL, Redis, OpenSearch</td>
            </tr>
            <tr>
              <td className="text-black dark:text-gray-300 whitespace-nowrap"><b>Tools:</b></td>
              <td className="text-black dark:text-gray-300">VS Code, GitLab CI, Fluent Bit, Apache Superset</td>
            </tr>
            <tr>
              <td className="text-black dark:text-gray-300 whitespace-nowrap"><b>Cloud:</b></td>
              <td className="text-black dark:text-gray-300">AWS, ECS, S3, RDS, CloudWatch</td>
            </tr>
            <tr>
              <td className="text-black dark:text-gray-300 whitespace-nowrap"><b>Specialties:</b></td>
              <td className="text-black dark:text-gray-300">Moodle Workplace, Data Integration, Iron Bank Containers</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Jessica's Links */}
      <div className="overflow-x-auto">
        <table className="myspace-box">
          <thead>
            <tr>
              <th colSpan={2} className="whitespace-nowrap">Jessica's Links</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="whitespace-nowrap"><b>GitHub:</b></td>
              <td><a href="https://github.com/jessica-calderon" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">github.com/jessica-calderon</a></td>
            </tr>
            <tr>
              <td className="whitespace-nowrap"><b>LinkedIn:</b></td>
              <td><a href="https://linkedin.com/in/Jessica-Calderon-00" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">linkedin.com/in/Jessica-Calderon-00</a></td>
            </tr>
            <tr>
              <td className="whitespace-nowrap"><b>Portfolio:</b></td>
              <td><a href="https://jessica-calderon.github.io/myspace-portfolio/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">github.io/myspace-portfolio</a></td>
            </tr>
            <tr>
              <td className="whitespace-nowrap"><b>Resume:</b></td>
              <td><button onClick={() => setShowResumeModal(true)} className="text-blue-600 dark:text-blue-400 hover:underline break-all">View Resume</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Resume Modal */}
      {showResumeModal && <ResumeModal onClose={() => setShowResumeModal(false)} />}
      
      {/* Share Profile Modal */}
      {showShareModal && <ShareProfileModal onClose={() => setShowShareModal(false)} />}
    </div>
  );
};

export default Sidebar;