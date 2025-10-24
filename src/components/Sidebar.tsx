import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Profile Picture and Basic Info */}
      <div className="bg-white border-2 border-blue-500 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-20 h-20 bg-gray-300 border-2 border-blue-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">JC</span>
          </div>
          <div className="flex-1">
            <p className="text-xs text-black">She/Her</p>
            <p className="text-xs text-black">San Antonio, TEXAS</p>
            <p className="text-xs text-black">United States</p>
            <p className="text-xs text-black mt-2">Last Login: 2 minutes ago</p>
            <p className="text-xs text-black">Status: Available for New Opportunities</p>
            <div className="mt-2">
              <a href="#" className="text-xs text-blue-600 hover:underline">View My: Portfolio | Resume</a>
            </div>
          </div>
        </div>
      </div>

      {/* Contacting Jessica */}
      <div className="bg-blue-100 border-2 border-blue-500 p-4">
        <h3 className="font-bold text-black text-sm mb-3">Contacting Jessica</h3>
        <div className="grid grid-cols-2 gap-2">
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">✉️</span> Send Message
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">👥</span> Connect
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">💬</span> Schedule Call
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">📄</span> View Resume
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">↗️</span> Share Profile
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">⭐</span> Add to Favorites
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">📧</span> Email Resume
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">⭐</span> Rate Profile
          </a>
        </div>
      </div>

      {/* Portfolio URL */}
      <div className="bg-white border border-black p-3">
        <p className="text-xs text-black">Portfolio URL:</p>
        <a href="#" className="text-xs text-blue-600 hover:underline">http://www.jessicacalderon.dev</a>
      </div>

      {/* Jessica's Technical Skills */}
      <div className="bg-white border-2 border-blue-500 p-4">
        <h3 className="font-bold text-white text-sm mb-3 bg-blue-500 px-2 py-1 -mx-2 -mt-2">Jessica's Technical Skills</h3>
        <div className="space-y-2 text-xs">
          <div>
            <span className="font-bold text-black">Programming:</span>
            <p className="text-black">PHP, TypeScript, JavaScript, Python, React, Node.js</p>
          </div>
          <div>
            <span className="font-bold text-black">DevOps:</span>
            <p className="text-black">Docker, AWS ECS, CI/CD, STIG compliance, GitLab CI</p>
          </div>
          <div>
            <span className="font-bold text-black">Databases:</span>
            <p className="text-black">PostgreSQL, MySQL, Redis, OpenSearch</p>
          </div>
          <div>
            <span className="font-bold text-black">Tools:</span>
            <p className="text-black">VS Code, GitLab CI, Fluent Bit, Apache Superset</p>
          </div>
          <div>
            <span className="font-bold text-black">Cloud:</span>
            <p className="text-black">AWS, ECS, S3, RDS, CloudWatch</p>
          </div>
          <div>
            <span className="font-bold text-black">Specialties:</span>
            <p className="text-black">Moodle Workplace, Data Integration, Iron Bank Containers</p>
          </div>
        </div>
      </div>

      {/* Jessica's Links */}
      <div className="bg-white border-2 border-blue-500 p-4">
        <h3 className="font-bold text-white text-sm mb-3 bg-blue-500 px-2 py-1 -mx-2 -mt-2">Jessica's Links</h3>
        <div className="space-y-1 text-xs">
          <div>
            <span className="font-bold text-black">GitHub:</span>
            <a href="#" className="text-blue-600 hover:underline ml-1">github.com/jessicacalderon</a>
          </div>
          <div>
            <span className="font-bold text-black">LinkedIn:</span>
            <a href="#" className="text-blue-600 hover:underline ml-1">linkedin.com/in/jessicacalderon</a>
          </div>
          <div>
            <span className="font-bold text-black">Portfolio:</span>
            <a href="#" className="text-blue-600 hover:underline ml-1">jessicacalderon.dev</a>
          </div>
          <div>
            <span className="font-bold text-black">Resume:</span>
            <a href="#" className="text-blue-600 hover:underline ml-1">Download PDF</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;