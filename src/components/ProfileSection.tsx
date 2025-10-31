import React, { useState, useEffect } from 'react';
import profilePic from '../assets/8bitme.png';

interface ProfileSectionProps {
  onLegacyClick: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onLegacyClick }) => {
  const [lastDeployed, setLastDeployed] = useState<string>('');

  useEffect(() => {
    const formatTimeAgo = (deployTime: Date) => {
      const now = new Date();
      const diffInMs = now.getTime() - deployTime.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      
      if (diffInMinutes < 1) {
        return 'just now';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
      } else if (diffInDays < 7) {
        return `${diffInDays}d ago`;
      } else {
        return deployTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    };

    // Use document.lastModified for build time, fallback to now if not available
    const deployTime = document.lastModified ? new Date(document.lastModified) : new Date();
    setLastDeployed(formatTimeAgo(deployTime));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 spacing-standard">
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
          <p className="text-xs text-black dark:text-white mt-2">Last Deployed: {lastDeployed || '...'}</p>
          <p className="text-xs text-black dark:text-white">Status: Available for New Opportunities</p>
          <div className="mt-2">
            <span className="text-xs text-black dark:text-white">View My: </span>
            <button onClick={onLegacyClick} className="text-xs text-blue-600 dark:text-blue-400 hover:underline break-words">Legacy Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
