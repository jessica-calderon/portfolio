import React, { useState, useEffect } from 'react';

interface PixelCounterProps {
  isMyspaceMode: boolean;
}

const PixelCounter: React.FC<PixelCounterProps> = ({ isMyspaceMode }) => {
  const [visitorCount, setVisitorCount] = useState<string>('...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        setIsLoading(true);
        setError(false);
        
        // Use AllOrigins proxy to avoid CORS issues
        const target = "https://hits.sh/jessica-calderon.github.io/portfolio/.svg?style=flat-square";
        const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(target);
        
        const res = await fetch(proxyUrl);

        if (!res.ok) {
          throw new Error('Failed to fetch visitor count');
        }

        const text = await res.text();
        
        // Extract number using regex: >(\d+)<
        const match = text.match(/>(\d+)</);
        
        if (match && match[1]) {
          const count = parseInt(match[1], 10);
          // Pad to 5 digits (e.g., 00001)
          const paddedCount = count.toString().padStart(5, '0');
          setVisitorCount(paddedCount);
        } else {
          throw new Error('Could not extract visitor count from SVG');
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

  // Theme-aware styling
  // MySpace Mode: neon green text, black bg
  // Professional Mode: gray bg, subtle border, light/dark text
  const textClasses = isMyspaceMode
    ? `text-[#00ff66] transition-all duration-300`
    : `text-gray-800 dark:text-gray-200 transition-all duration-300`;

  return (
    <p className={`text-xs ${textClasses}`}>
      {isLoading ? '...' : error ? `Total Visitors: 00000` : `Total Visitors: ${visitorCount}`}
    </p>
  );
};

export default PixelCounter;

