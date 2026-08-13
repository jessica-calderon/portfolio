import React from 'react';
import profilePic from '../assets/8bitme.png';
import { useLastLoginLabel } from '../hooks/useLastLoginLabel';
import { formatProfileViews, useProfileViews } from '../hooks/useProfileViews';

interface ProfileSectionProps {
  onLegacyClick: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onLegacyClick }) => {
  const lastLogin = useLastLoginLabel();
  const profileViews = useProfileViews();

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 spacing-standard">
      <p className="text-sm sm:text-base font-bold text-black dark:text-white mb-1">Jessica Calderon, MBA</p>
      <p className="text-xs text-black dark:text-white mb-2">Principal Software Engineer / Technical Lead</p>
      <div className="flex items-start space-x-2 sm:space-x-3">
        <img 
          src={profilePic} 
          alt="Jessica Calderon professional profile picture" 
          className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-blue-500 dark:border-blue-400 object-cover myspace-light-img-border flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-black dark:text-white">She/Her</p>
          <p className="text-xs text-black dark:text-white">San Antonio, TEXAS</p>
          <p className="text-xs text-black dark:text-white">United States</p>
          <p className="text-xs text-black dark:text-white mt-2">
            Status: Currently coding... (and occasionally breaking things)
          </p>
          <p className="text-xs text-black dark:text-white">Last Login: {lastLogin || '...'}</p>
          {profileViews !== null && (
            <p className="text-xs text-black dark:text-white">
              Profile Views: {formatProfileViews(profileViews)}
            </p>
          )}
          <p className="text-xs text-black dark:text-white">
            <span aria-hidden="true">♫ </span>
            Profile Song: Jessica.exe — deploy_final_v7_REAL_final
          </p>
          <div className="mt-2">
            <span className="text-xs text-black dark:text-white">View My: </span>
            <button onClick={onLegacyClick} className="text-xs text-blue-600 dark:text-blue-400 hover:underline break-words" aria-label="View legacy profile">Legacy Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
