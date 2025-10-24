import React from 'react';
import Sidebar from './components/Sidebar';
import AboutMe from './components/AboutMe';
import Technologies from './components/Technologies';
import TopProjects from './components/TopProjects';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* MySpace Header */}
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">MySpace</h1>
            <span className="text-sm">a place for friends</span>
          </div>
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search Users" className="px-2 py-1 text-black text-sm" />
            <button className="bg-blue-500 px-3 py-1 text-sm">Search</button>
            <a href="#" className="text-sm">Help</a>
            <a href="#" className="text-sm">LogOut</a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-blue-500 text-white py-1 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex space-x-6 text-sm">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Browse</a>
            <a href="#" className="hover:underline">Search</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Music</a>
            <a href="#" className="hover:underline">Favorites</a>
            <a href="#" className="hover:underline">Invite</a>
            <a href="#" className="hover:underline">Mail</a>
            <a href="#" className="hover:underline">Forum</a>
            <a href="#" className="hover:underline">Groups</a>
            <a href="#" className="hover:underline">Events</a>
            <a href="#" className="hover:underline">Videos</a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Profile Banner */}
        <div className="bg-white border-2 border-blue-500 p-4 mb-4">
          <h2 className="text-xl font-bold text-black">Jessica Calderon is your Friend.</h2>
        </div>

        <div className="flex gap-4">
          {/* Left Sidebar - MySpace Profile Style */}
          <div className="w-1/3">
            <Sidebar />
          </div>
          
          {/* Right Main Content */}
          <div className="w-2/3 space-y-4">
            <AboutMe />
            <Technologies />
            <TopProjects />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
