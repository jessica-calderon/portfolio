import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface PixelCounterProps {
  isMyspaceMode: boolean;
}

const PixelCounter: React.FC<PixelCounterProps> = ({ isMyspaceMode }) => {
  const { isDarkMode } = useDarkMode();
  const [visitorCount, setVisitorCount] = useState<string>('...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        setIsLoading(true);
        setError(false);
        
        // Fetch the SVG badge from hits.sh
        const response = await fetch('https://hits.sh/jessica-calderon.github.io.svg?style=flat-square', {
          method: 'GET',
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch visitor count');
        }

        const svgText = await response.text();
        
        // Extract number using regex - looking for numbers in the SVG
        // The SVG typically contains text elements with numbers like "123" or "123 hits"
        // Try to find the largest number (likely the hit count)
        const numberMatches = svgText.match(/\d+/g);
        
        if (numberMatches && numberMatches.length > 0) {
          // Get the largest number (usually the hit count)
          const numbers = numberMatches.map(n => parseInt(n, 10));
          const count = Math.max(...numbers);
          // Pad to 5 digits
          const paddedCount = count.toString().padStart(5, '0');
          setVisitorCount(paddedCount);
        } else {
          throw new Error('Could not extract visitor count');
        }
      } catch (err) {
        console.error('Error fetching visitor count:', err);
        setError(true);
        setVisitorCount('00000');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  // Theme-aware styling - always match panel text style
  const textClasses = `text-black dark:text-white transition-all duration-300`;

  return (
    <p className={`text-xs ${textClasses}`}>
      {isLoading ? '...' : error ? `Total Visitors: 00000` : `Total Visitors: ${visitorCount}`}
    </p>
  );
};

export default PixelCounter;

