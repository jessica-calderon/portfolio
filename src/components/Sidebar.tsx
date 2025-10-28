import React, { useState } from 'react';
import profilePic from '../assets/8bitme.png';
import ResumeModal from './ResumeModal';
import ShareProfileModal from './ShareProfileModal';
import DinoGameModal from './DinoGameModal';

const Sidebar: React.FC = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDinoModal, setShowDinoModal] = useState(false);

  return (
    <div className="space-y-4">
      {/* Profile Picture and Basic Info */}
      <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-3 sm:p-4">
        <p className="text-sm sm:text-base font-bold text-black dark:text-white mb-2">Jessica Calderon, MBA</p>
        <div className="flex items-start space-x-2 sm:space-x-3">
          <img 
            src={profilePic} 
            alt="Jessica Calderon" 
            onClick={() => setShowDinoModal(true)}
            className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-blue-500 dark:border-blue-400 object-cover myspace-light-img-border flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity"
            title="Click for a surprise! 🦖"
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

      {/* Jessica's Technical Skills and Links Container */}
      <div className="myspace-details-container">
        {/* Jessica's Technical Skills */}
        <div className="overflow-x-auto" id="tech">
          <table className="myspace-details-box border-blue-500 dark:border-blue-400">
            <thead>
              <tr>
                <th colSpan={2} className="whitespace-nowrap">Jessica's Technical Skills</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="whitespace-nowrap">Programming:</td>
                <td>PHP, TypeScript, JavaScript, Python, React, Node.js</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">DevOps:</td>
                <td>Docker, AWS ECS, CI/CD, STIG compliance, GitLab CI</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">Databases:</td>
                <td>PostgreSQL, MySQL, Redis, OpenSearch</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">Tools:</td>
                <td>VS Code, GitLab CI, Fluent Bit, Apache Superset</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">Cloud:</td>
                <td>AWS, ECS, S3, RDS, CloudWatch</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">Specialties:</td>
                <td>Moodle Workplace, Data Integration, Iron Bank Containers</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Jessica's Links */}
        <div className="overflow-x-auto">
          <table className="myspace-details-box border-blue-500 dark:border-blue-400">
            <thead>
              <tr>
                <th colSpan={2} className="whitespace-nowrap">Jessica's Links</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="whitespace-nowrap">GitHub:</td>
                <td><a href="https://github.com/jessica-calderon" target="_blank" rel="noopener noreferrer" className="break-all">github.com/jessica-calderon</a></td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">LinkedIn:</td>
                <td><a href="https://linkedin.com/in/Jessica-Calderon-00" target="_blank" rel="noopener noreferrer" className="break-all">linkedin.com/in/Jessica-Calderon-00</a></td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">Portfolio:</td>
                <td><a href="https://jessica-calderon.github.io/myspace-portfolio/" target="_blank" rel="noopener noreferrer" className="break-all">github.io/myspace-portfolio</a></td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">Resume:</td>
                <td><button onClick={() => setShowResumeModal(true)} className="break-all">View Resume</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Resume Modal */}
      {showResumeModal && <ResumeModal onClose={() => setShowResumeModal(false)} />}
      
      {/* Share Profile Modal */}
      {showShareModal && <ShareProfileModal onClose={() => setShowShareModal(false)} />}
      
      {/* Dino Game Modal */}
      {showDinoModal && <DinoGameModal onClose={() => setShowDinoModal(false)} />}
    </div>
  );
};

export default Sidebar;