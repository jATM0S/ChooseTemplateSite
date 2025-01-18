import { useNavigate } from "react-router-dom";

import Nav from "./nav";
export default function Templates() {
  const navigate = useNavigate();
  return (
    <div>
      <Nav />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Select a Template
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border">
          {/* Template Cards */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center overflow-hidden">
              <div className="h-full w-full transition-transform duration-200 transform hover:scale-105">
                <h3 className="text-white text-lg font-semibold flex items-center justify-center h-full">
                  template1
                </h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-4">something something</p>
              <button
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                onClick={() => navigate("/temp1")}
              >
                Choose
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center overflow-hidden">
              <div className="h-full w-full transition-transform duration-200 transform hover:scale-105">
                <h3 className="text-white text-lg font-semibold flex items-center justify-center h-full">
                  template
                </h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-4">something something</p>
              <button
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                onClick={() => navigate("/temp2")}
              >
                Choose
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
