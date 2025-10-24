import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Profile Picture and Basic Info */}
      <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 border-2 border-blue-500 dark:border-blue-400 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">JC</span>
          </div>
          <div className="flex-1">
            <p className="text-xs text-black dark:text-white">She/Her</p>
            <p className="text-xs text-black dark:text-white">San Antonio, TEXAS</p>
            <p className="text-xs text-black dark:text-white">United States</p>
            <p className="text-xs text-black dark:text-white mt-2">Last Login: 2 minutes ago</p>
            <p className="text-xs text-black dark:text-white">Status: Available for New Opportunities</p>
            <div className="mt-2">
              <a href="https://docs.google.com/document/d/1Te9UsvtdF-xzI0v7cLMYAuTnDRmaPyOiDUH30E5XXT8/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">View My: Portfolio | Resume</a>
            </div>
          </div>
        </div>
      </div>

      {/* Contacting Jessica */}
      <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400 p-4">
        <h3 className="font-bold text-black dark:text-white text-sm mb-3">Contacting Jessica</h3>
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
          <a href="https://docs.google.com/document/d/1Te9UsvtdF-xzI0v7cLMYAuTnDRmaPyOiDUH30E5XXT8/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">📄</span> View Resume
          </a>
          <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">↗️</span> Share Profile
          </a>
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
      <div className="bg-white dark:bg-gray-800 border border-black dark:border-gray-600 p-3">
        <p className="text-xs text-black dark:text-white">Portfolio URL:</p>
        <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">http://www.jessicacalderon.dev</a>
      </div>

      {/* Jessica's Technical Skills */}
      <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-4">
        <h3 className="font-bold text-white text-sm mb-3 bg-blue-500 dark:bg-blue-600 px-2 py-1 -mx-2 -mt-2">Jessica's Technical Skills</h3>
        <div className="space-y-2 text-xs">
          <div>
            <span className="font-bold text-black dark:text-white">Programming:</span>
            <p className="text-black dark:text-gray-300">PHP, TypeScript, JavaScript, Python, React, Node.js</p>
          </div>
          <div>
            <span className="font-bold text-black dark:text-white">DevOps:</span>
            <p className="text-black dark:text-gray-300">Docker, AWS ECS, CI/CD, STIG compliance, GitLab CI</p>
          </div>
          <div>
            <span className="font-bold text-black dark:text-white">Databases:</span>
            <p className="text-black dark:text-gray-300">PostgreSQL, MySQL, Redis, OpenSearch</p>
          </div>
          <div>
            <span className="font-bold text-black dark:text-white">Tools:</span>
            <p className="text-black dark:text-gray-300">VS Code, GitLab CI, Fluent Bit, Apache Superset</p>
          </div>
          <div>
            <span className="font-bold text-black dark:text-white">Cloud:</span>
            <p className="text-black dark:text-gray-300">AWS, ECS, S3, RDS, CloudWatch</p>
          </div>
          <div>
            <span className="font-bold text-black dark:text-white">Specialties:</span>
            <p className="text-black dark:text-gray-300">Moodle Workplace, Data Integration, Iron Bank Containers</p>
          </div>
        </div>
      </div>

      {/* Jessica's Links */}
      <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-4">
        <h3 className="font-bold text-white text-sm mb-3 bg-blue-500 dark:bg-blue-600 px-2 py-1 -mx-2 -mt-2">Jessica's Links</h3>
        <div className="space-y-1 text-xs">
          <div>
            <span className="font-bold text-black dark:text-white">GitHub:</span>
            <a href="https://github.com/jessica-calderon" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">github.com/jessica-calderon</a>
          </div>
          <div>
            <span className="font-bold text-black dark:text-white">LinkedIn:</span>
            <a href="https://linkedin.com/in/Jessica-Calderon-00" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">linkedin.com/in/Jessica-Calderon-00</a>
          </div>
          <div>
            <span className="font-bold text-black dark:text-white">Portfolio:</span>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">jessicacalderon.dev</a>
          </div>
          <div>
            <span className="font-bold text-black dark:text-white">Resume:</span>
            <a href="https://docs.google.com/document/d/1Te9UsvtdF-xzI0v7cLMYAuTnDRmaPyOiDUH30E5XXT8/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">View Resume</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;