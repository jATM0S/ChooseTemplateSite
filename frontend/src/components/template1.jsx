import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

// Initial temp1Data (can be loaded from a file in real-world usage)
let temp1Data = {
  name: "",
  heroMessage: "",
  aboutUs: "",
  description: "",
  footerMessage: "",
  heroImage: "",
};

export default function App() {
  const [formData, setFormData] = useState(temp1Data);
  const [heroBackground, setHeroBackground] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Load data from a JSON file (or API)
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getTemp1Data');
        console.log(response.data);
        setFormData(response.data); // Set the initial form data from JSON file
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    };
    loadData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setHeroBackground(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const autoResize = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (e.target.tagName.toLowerCase() === "textarea") {
      autoResize(e.target);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Update the JSON file with form data
    try {
      const response = await axios.post('http://localhost:5000/updateTemp1', formData);
      alert("JSON updated successfully");
    } catch (error) {
      alert("Failed to update JSON: " + error.message);
    }

    // Handle file upload (optional)
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      try {
        const response = await axios.post("http://localhost:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Image uploaded successfully: " + response.data.filePath);
      } catch (error) {
        alert("Failed to upload image: " + error.message);
      }
    } else {
      alert("No image uploaded!");
    }
  };

  return (
    <form
      className="flex flex-col items-center space-y-4 w-full bg-gray-900"
      onSubmit={handleSubmit}
    >
      {/* Nav */}
      <div className="w-full">
        <textarea
          type="text"
          name="name"
          placeholder="Company name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 w-full text-2xl bg-black text-center text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Hero Section */}
      <div
        className="flex flex-col w-full h-auto min-h-[29rem] justify-center items-center p-8 relative bg-gray-800"
        style={{
          background: heroBackground ? `url(${heroBackground}) center/cover no-repeat` : "",
        }}
      >
        <textarea
          name="heroMessage"
          placeholder="Welcome to Our Website"
          className="text-5xl font-bold mb-4 text-center text-white rounded-2xl bg-inherit resize-none w-full overflow-hidden"
          value={formData.heroMessage}
          onChange={handleChange}
        />

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className="absolute bottom-4 right-4 p-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
        >
          <input {...getInputProps()} />
          <p>Upload Image</p>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col items-center justify-center w-full bg-gray-800 p-8">
        <textarea
          name="aboutUs"
          placeholder="About Us"
          value={formData.aboutUs}
          onChange={handleChange}
          className="text-3xl font-semibold text-center rounded-xl bg-inherit h-auto w-auto text-white"
        />
        <textarea
          name="description"
          placeholder="Company's description here..."
          value={formData.description}
          onChange={handleChange}
          className="p-3 text-center text-white rounded-lg bg-inherit h-auto w-full md:w-4/5 resize-none focus:outline-slate-400 "
        />
      </div>

      {/* Footer */}
      <textarea
        name="footerMessage"
        placeholder="© All rights reserved."
        value={formData.footerMessage}
        onChange={handleChange}
        className="text-white text-center p-8 my-8 w-full bg-inherit resize-none overflow-hidden"
      />

      <div className="w-full flex justify-center bg-white">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 my-4 rounded-md hover:bg-blue-700 w-1/4"
        >
          Save Layout
        </button>
      </div>
    </form>
  );
}
