import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialFormData = {
  name: "",
  heroMessage: "",
  aboutUs: "",
  description: "",
  footerMessage: "",
  heroImage: "",
  cards: "",
};

export default function Template1() {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getTemp1Data");
        setFormData(response.data); // Set the initial form data from JSON file
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    };
    loadData();
  }, []); // this runs only once when the component mounts

  return (
    <div className="w-full flex flex-col items-center space-y-4 bg-gray-100">
      {/* nav */}
      <div className="w-full relative p-4 bg-gray-200">
        {/* Centered Text */}
        <div className="text-2xl text-gray-700 rounded-md sm:text-center ">
          {formData.name}
        </div>

        {/* Buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-4">
          <button
            type="button"
            className="text-gray-700 text-xl hover:bg-gray-300 p-3 rounded-md"
          >
            Home
          </button>
          <button
            type="button"
            className="text-gray-700 text-xl hover:bg-gray-300 p-3 rounded-md"
          >
            Services
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="flex flex-col w-full h-auto min-h-[29rem] justify-center items-center p-8 relative bg-gray-200 rounded-md"
        style={{
          background: formData.heroImage
            ? `url(${`/uploads/${formData.heroImage}`}) center/cover no-repeat`
            : "",
        }}
      >
        <div className="text-4xl font-bold mb-4 text-center text-gray-800 bg-transparent w-full overflow-hidden">
          {formData.heroMessage}
        </div>
      </div>

      {/* About Section */}
      <div className=" w-full bg-gray-200 p-8 rounded-md">
        <div className="flex flex-col items-center justify-center w-full bg-white">
          <div className="text-3xl font-semibold text-center rounded-xl bg-white p-4 w-full text-gray-800">
            {formData.aboutUs}
          </div>
          <div className="p-4 text-center text-gray-800 rounded-lg bg-white w-full md:w-4/5 ">
            {formData.description}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        name="footerMessage"
        className="text-gray-700 text-center p-4 my-4 w-full bg-white rounded-md"
      >
        {formData.footerMessage}
      </div>
    </div>
  );
}
