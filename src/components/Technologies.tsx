import React from 'react';

const Technologies: React.FC = () => {
  const blogEntries = [
    'approving comments ...',
    'new homepage look',
    'what\'s going on with friend counts?',
    'extended network',
    'am i online?'
  ];

  return (
    <div className="bg-white border-2 border-blue-500 p-4">
      <h2 className="font-bold text-black text-sm mb-3">Jessica's Latest Blog Entry</h2>
      <a href="#" className="text-xs text-blue-600 hover:underline">[Subscribe to this Blog]</a>
      <div className="mt-3 space-y-1">
        {blogEntries.map((entry, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-xs text-black">{entry}</span>
            <a href="#" className="text-xs text-blue-600 hover:underline">(view more)</a>
          </div>
        ))}
      </div>
      <a href="#" className="text-xs text-blue-600 hover:underline mt-2 block">[View All Blog Entries]</a>
    </div>
  );
};

export default Technologies;