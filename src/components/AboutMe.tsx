import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="bg-orange-500 border-2 border-blue-500 p-4">
      <h2 className="font-bold text-white text-sm mb-3">Jessica's Blurbs</h2>
      <div className="space-y-3 text-xs">
        <div>
          <span className="font-bold text-blue-600">About me:</span>
          <p className="text-black mt-1">
            I'm Jessica and I'm here to help you. Send me a message if you're confused by anything. Before asking me a question, 
            please check the FAQ to see if your question has already been answered.
          </p>
          <p className="text-black mt-2">
            I may have been on your friend list when you signed up. If you don't want me to be, click "Edit Friends" and remove me!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;