import { useEffect, useState } from 'react';

/**
 * MySpace-style "Last Login" label based on document lastModified (deploy/build time).
 */
export function useLastLoginLabel(): string {
  const [label, setLabel] = useState('');

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

    const deployTime = document.lastModified ? new Date(document.lastModified) : new Date();
    setLabel(formatTimeAgo(deployTime));
  }, []);

  return label;
}
