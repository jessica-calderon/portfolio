import React from 'react';

const MusicPlayer: React.FC = () => {
  return (
    <div className="bg-white border-2 border-blue-500 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-blue-600 text-sm">Jessica's Music Player</h3>
        <div className="flex space-x-1">
          <button className="bg-blue-500 text-white text-xs px-2 py-1 hover:bg-blue-600">PLAY</button>
          <button className="bg-blue-500 text-white text-xs px-2 py-1 hover:bg-blue-600">PAUSE</button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 border border-blue-500 flex items-center justify-center">
            <span className="text-sm">♪</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-black text-xs">Currently Playing</p>
            <p className="text-xs text-black">Synthwave Dreams - Retro Vibes</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="w-full bg-gray-300 h-1">
            <div className="bg-blue-500 h-1 w-1/3"></div>
          </div>
          <div className="flex justify-between text-xs text-black">
            <span>1:23</span>
            <span>4:56</span>
          </div>
        </div>
        
        <div className="text-xs text-black bg-gray-100 p-2 border border-gray-300">
          ♪ Now playing: Synthwave Dreams - Retro Vibes | Next: Cyberpunk Nights - Neon City | Upcoming: Digital Love - Future Bass ♪
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;