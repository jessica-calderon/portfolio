import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Profile Picture and Basic Info */}
      <div className="bg-white border-2 border-blue-500 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-20 h-20 bg-gray-300 border-2 border-blue-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">JC</span>
          </div>
          <div className="flex-1">
            <p className="text-xs text-black">She/Her</p>
            <p className="text-xs text-black">San Antonio, TEXAS</p>
            <p className="text-xs text-black">United States</p>
            <p className="text-xs text-black mt-2">Last Login: 2 minutes ago</p>
            <p className="text-xs text-black">Mood: coding 😊</p>
            <div className="mt-2">
              <a href="#" className="text-xs text-blue-600 hover:underline">View My: Pics | Videos</a>
            </div>
          </div>
        </div>
      </div>

      {/* Contacting Jessica */}
      <div className="bg-blue-100 border-2 border-blue-500 p-4">
        <h3 className="font-bold text-black text-sm mb-3">Contacting Jessica</h3>
        <div className="grid grid-cols-2 gap-2">
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">✉️</span> Send Message
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">👥</span> Add to Friends
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">💬</span> Instant Message
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">👥+</span> Add to Group
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">↗️</span> Forward to Friend
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">⭐</span> Add to Favorites
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">🚫</span> Block User
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center">
            <span className="mr-1">⭐</span> Rank User
          </a>
        </div>
      </div>

      {/* MySpace URL */}
      <div className="bg-white border border-black p-3">
        <p className="text-xs text-black">MySpace URL:</p>
        <a href="#" className="text-xs text-blue-600 hover:underline">http://www.myspace.com/jessicacalderon</a>
      </div>

      {/* Jessica's Interests */}
      <div className="bg-white border-2 border-blue-500 p-4">
        <h3 className="font-bold text-blue-600 text-sm mb-3">Jessica's Interests</h3>
        <div className="space-y-2 text-xs">
          <div>
            <span className="font-bold text-black">General:</span>
            <p className="text-black">Coding, Web Development, AI, Retro Gaming, Photography</p>
          </div>
          <div>
            <span className="font-bold text-black">Music:</span>
            <p className="text-black">Synthwave, Electronic, Indie Rock, 80s Music</p>
          </div>
          <div>
            <span className="font-bold text-black">Movies:</span>
            <p className="text-black">Sci-Fi, Documentaries, Classic Films</p>
          </div>
          <div>
            <span className="font-bold text-black">Television:</span>
            <p className="text-black">Tech Shows, Documentaries, Sci-Fi Series</p>
          </div>
          <div>
            <span className="font-bold text-black">Books:</span>
            <p className="text-black">Programming Books, Sci-Fi Novels, Tech Articles</p>
          </div>
          <div>
            <span className="font-bold text-black">Heroes:</span>
            <p className="text-black">Tech Innovators, Open Source Contributors</p>
          </div>
        </div>
      </div>

      {/* Jessica's Links */}
      <div className="bg-white border-2 border-blue-500 p-4">
        <h3 className="font-bold text-blue-600 text-sm mb-3">Jessica's Links</h3>
        <div className="space-y-1 text-xs">
          <div>
            <span className="font-bold text-black">GitHub:</span>
            <a href="#" className="text-blue-600 hover:underline ml-1">github.com/jessicacalderon</a>
          </div>
          <div>
            <span className="font-bold text-black">LinkedIn:</span>
            <a href="#" className="text-blue-600 hover:underline ml-1">linkedin.com/in/jessicacalderon</a>
          </div>
          <div>
            <span className="font-bold text-black">Portfolio:</span>
            <a href="#" className="text-blue-600 hover:underline ml-1">jessicacalderon.dev</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;