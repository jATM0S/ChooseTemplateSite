import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
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
  const [uploadedFile, setUploadedFile] = useState(null);
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

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile(file);

    // Create FormData for image upload
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      // Upload the image first
      const uploadResponse = await axios.post(
        "http://localhost:5000/upload",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update formData with new image name
      const updatedFormData = {
        ...formData,
        heroImage: file.name,
      };

      // Update the JSON data
      await axios.post("http://localhost:5000/updateTemp2", updatedFormData);

      // Update local state after both operations are successful
      setFormData(updatedFormData);

      console.log("Image uploaded and JSON updated successfully");
    } catch (error) {
      console.error("Error during upload:", error);
      alert("Failed to upload image: " + error.message);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const autoResize = (element) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
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
    if (event) event.preventDefault();

    try {
      if (uploadedFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", uploadedFile);

        await axios.post("http://localhost:5000/upload", imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await axios.post("http://localhost:5000/updateTemp2", formData);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes: " + error.message);
    }
  };

  return (
    <form
      className="w-full flex flex-col items-center space-y-4 bg-gray-100"
      onSubmit={handleSubmit}
    >
      <div className="w-full relative">
        <textarea
          name="name"
          placeholder="Company name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 w-full text-2xl bg-gray-200 sm:text-center text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 "
        />
        <button
          type="button"
          onClick={() => navigate("/temp2")}
          className="text-gray-700 text-xl absolute right-28 hover:bg-gray-300 p-3 rounded-md"
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => navigate("/service2")}
          className="text-gray-700 text-xl absolute right-3 hover:bg-gray-300 hover:border-black p-3 rounded-md"
        >
          Services
        </button>
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
        <textarea
          name="heroMessage"
          placeholder="Welcome to Our Website"
          className="text-4xl font-bold mb-4 text-center text-gray-800 bg-transparent resize-none w-full overflow-hidden focus:outline-none"
          value={formData.heroMessage}
          onChange={handleChange}
        />

        <div
          {...getRootProps()}
          className={`absolute bottom-4 right-4 p-4 border border-dashed rounded-md cursor-pointer transition-colors ${
            isDragActive ? "bg-blue-300" : "bg-blue-200"
          }`}
        >
          <input {...getInputProps()} />
          <p>{isDragActive ? "Drop the image here" : "Upload Image"}</p>
        </div>
      </div>

      {/* About Section */}
      <div className=" w-full bg-gray-200 p-8 rounded-md">
        <div className="flex flex-col items-center justify-center w-full bg-white">
          <textarea
            name="aboutUs"
            placeholder="About Us"
            value={formData.aboutUs}
            onChange={handleChange}
            className="text-3xl font-semibold text-center rounded-xl bg-white p-4 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="description"
            placeholder="Company's description here..."
            value={formData.description}
            onChange={handleChange}
            className="p-4 text-center text-gray-800 rounded-lg bg-white w-full md:w-4/5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Footer */}
      <textarea
        name="footerMessage"
        placeholder="© All rights reserved."
        value={formData.footerMessage}
        onChange={handleChange}
        className="text-gray-700 text-center p-4 my-4 w-full bg-white rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="w-full flex justify-center gap-5 bg-black p-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors w-1/4"
        >
          Save Layout
        </button>
        <button
          className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400 transition-colors w-1/4"
          onClick={() => navigate("/templates")}
        >
          Back to templates
        </button>
      </div>
    </form>
  );
}
