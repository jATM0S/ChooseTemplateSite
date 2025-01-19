import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./nav";

function Selected() {
  return (
    <div className="bg-green-500 text-gray-100 py-2 px-4 rounded-md">
      Selected
    </div>
  );
}

export default function Templates() {
  const navigate = useNavigate();
  const [choosenTemplate, setChoosenTemplate] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getChoosen");
        setChoosenTemplate(response.data.choosenTemplate); // Set the initial form data from JSON file
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
      console.log(choosenTemplate);
    };

    loadData();
  }, []);
  const changeSelectedTemplate = async (templateId) => {
    try {
      setChoosenTemplate(templateId);
      await axios.post("http://localhost:5000/choose", {
        choosenTemplate: templateId,
      });
    } catch {
      console.error("Error saving changes:", error);
      alert("Failed to save changes: " + error.message);
    }
  };
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
              <p className="text-gray-700 mb-4">Dark template</p>
              <div className="flex gap-5">
                <button
                  className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                  onClick={() => changeSelectedTemplate(1)}
                >
                  Choose
                </button>
                <button
                  className="bg-gray-400 text-gray-900 py-2 px-4 rounded-md hover:bg-purple-700"
                  onClick={() => navigate("/temp1")}
                >
                  Edit
                </button>
                {choosenTemplate == 1 ? <Selected /> : <></>}
              </div>
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
              <p className="text-gray-700 mb-4">Light template</p>
              <div className="flex gap-5">
                <button
                  className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                  onClick={() => changeSelectedTemplate(2)}
                >
                  Choose
                </button>
                <button
                  className="bg-gray-400 text-gray-900 py-2 px-4 rounded-md hover:bg-purple-700"
                  onClick={() => navigate("/temp2")}
                >
                  Edit
                </button>
                {choosenTemplate == 2 ? <Selected /> : <></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
