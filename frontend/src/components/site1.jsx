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
    <div className="flex flex-col items-center space-y-4 w-full bg-gray-900">
      <div className="w-full relative p-4 bg-gray-950">
        {/* Centered Text */}
        <div className="text-2xl text-white rounded-md sm:text-center ">
          {formData.name}
        </div>

        {/* Buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-4">
          <button
            type="button"
            className="text-white  text-xl hover:bg-gray-800 p-3 rounded-md"
          >
            Home
          </button>
          <button
            type="button"
            className="text-white  text-xl hover:bg-gray-800 p-3 rounded-md"
          >
            Services
          </button>
        </div>
      </div>
      {/* Hero Section */}
      <div
        className="flex flex-col w-full h-auto min-h-[29rem] justify-center items-center p-8 relative bg-gray-800"
        style={{
          background: formData.heroImage
            ? `url(${`/uploads/${formData.heroImage}`}) center/cover no-repeat`
            : "",
        }}
      >
        <div className="text-5xl font-bold mb-4 text-center text-white rounded-2xl bg-inherit w-full overflow-hidden">
          {formData.heroMessage}
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col items-center justify-center w-full p-8">
        <div className="text-3xl font-semibold text-center rounded-xl bg-inherit h-auto w-auto text-white">
          {formData.aboutUs}
        </div>
        <div className="p-3 text-center text-white rounded-lg bg-inherit h-auto w-full md:w-4/5 ">
          {formData.description}
        </div>
      </div>

      {/* Footer */}
      <div className="text-white text-center p-8 my-8 w-full bg-inherit overflow-hidden  bg-gray-950">
        {formData.footerMessage}
      </div>
    </div>
  );
}
