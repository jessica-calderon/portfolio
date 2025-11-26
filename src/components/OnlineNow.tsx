import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface OnlineNowProps {
  isMyspaceMode: boolean;
}

const OnlineNow: React.FC<OnlineNowProps> = ({ isMyspaceMode }) => {
  const { isDarkMode } = useDarkMode();
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const incrementActive = async () => {
      try {
        // Increment active count on load
        await fetch('https://api.countapi.xyz/hit/jessica-portfolio-online/active', {
          method: 'GET',
          mode: 'cors',
        });
      } catch (err) {
        console.error('Error incrementing active count:', err);
      }
    };

    const fetchOnlineCount = async () => {
      try {
        setIsLoading(true);
        setError(false);

        // Fetch current count
        const response = await fetch('https://api.countapi.xyz/get/jessica-portfolio-online/active', {
          method: 'GET',
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch online count');
        }

        const data = await response.json();
        
        if (isMounted && data.value !== undefined) {
          setOnlineCount(data.value);
        }
      } catch (err) {
        console.error('Error fetching online count:', err);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Increment and fetch on mount
    incrementActive().then(() => {
      fetchOnlineCount();
    });

    // Decrement on unload
    const handleBeforeUnload = async () => {
      try {
        // Use sendBeacon for more reliable unload handling
        await fetch('https://api.countapi.xyz/hit/jessica-portfolio-online/active?amount=-1', {
          method: 'GET',
          mode: 'cors',
          keepalive: true,
        });
      } catch (err) {
        // Ignore errors on unload
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      isMounted = false;
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Decrement on cleanup (component unmount)
      fetch('https://api.countapi.xyz/hit/jessica-portfolio-online/active?amount=-1', {
        method: 'GET',
        mode: 'cors',
        keepalive: true,
      }).catch(() => {
        // Ignore errors on cleanup
      });
    };
  }, []);

  // Theme-aware styling
  const dotClasses = isMyspaceMode
    ? `bg-green-400 drop-shadow-[0_0_6px_#00ff66] transition-all duration-300`
    : `bg-green-500 transition-all duration-300`;

  const textClasses = isMyspaceMode
    ? `text-[#00ff66] transition-all duration-300`
    : `text-gray-800 dark:text-gray-200 transition-all duration-300`;

  return (
    <div className="flex items-center gap-1.5 transition-all duration-300">
      <div className={`w-2 h-2 rounded-full ${dotClasses}`} aria-hidden="true"></div>
      <p className={`text-xs font-medium ${textClasses}`}>
        {isLoading ? '...' : error ? '0' : onlineCount !== null ? onlineCount : '0'} people online now
      </p>
    </div>
  );
};

export default OnlineNow;

