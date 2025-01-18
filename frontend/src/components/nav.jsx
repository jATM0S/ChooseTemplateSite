import React from "react";
import { FaCogs } from "react-icons/fa";

export default function Nav() {
  return (
    <nav className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between px-6 shadow-lg">
      {/* Left Section: Heading */}
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold tracking-wide">Template Site</h1>
      </div>

      {/* Right Section: User Profile and Settings */}
      <div className="flex items-center space-x-6">
        
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-purple-600 font-bold">U</span>
          </div>
          <span className="text-white font-medium">Username</span>
        </div>

        {/* Settings Icon */}
        <button className="p-2 bg-white rounded-full hover:bg-gray-200">
          <FaCogs className="h-5 w-5 text-purple-600" />
        </button>
      </div>
    </nav>
  );
}
