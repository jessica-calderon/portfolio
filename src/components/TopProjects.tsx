import React from 'react';

const TopProjects: React.FC = () => {
  return (
    <div className="bg-white border-2 border-blue-500 p-4">
      <h2 className="font-bold text-black text-sm mb-3">Jessica's Friend Space</h2>
      <a href="#" className="text-xs text-blue-600 hover:underline">[view all]</a>
      <p className="text-xs text-black mt-2">Jessica has 2049 friends.</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-gray-300 border border-gray-400 mx-auto mb-1"></div>
            <p className="text-xs text-black">Friend {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProjects;