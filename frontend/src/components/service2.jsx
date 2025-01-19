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
  cards: [],
};

// Create a separate CardUpload component to handle individual card uploads
const CardUpload = ({ index, onImageUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onImageUpload(acceptedFiles[0], index),
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="w-full flex justify-center mb-4">
      <input {...getInputProps()} />
      <button
        type="button"
        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors ${
          isDragActive ? "bg-blue-600" : ""
        }`}
      >
        {isDragActive ? "Drop Image Here" : "Upload Image"}
      </button>
    </div>
  );
};

export default function Template1() {
  const [formData, setFormData] = useState(initialFormData);
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getTemp2Data");
        setFormData(response.data);
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    };
    loadData();
  }, []);

  const handleCardImageUpload = async (file, cardIndex) => {
    if (!file) return;

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      await axios.post("http://localhost:5000/upload", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedCards = [...formData.cards];
      updatedCards[cardIndex].image = file.name;

      const updatedFormData = {
        ...formData,
        cards: updatedCards,
      };

      await axios.post("http://localhost:5000/updateTemp2", updatedFormData);
      setFormData(updatedFormData);
    } catch (error) {
      console.error("Error uploading card image:", error);
      alert("Failed to upload card image: " + error.message);
    }
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile(file);
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      await axios.post("http://localhost:5000/upload", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedFormData = {
        ...formData,
        heroImage: file.name,
      };

      await axios.post("http://localhost:5000/updateTemp2", updatedFormData);
      setFormData(updatedFormData);
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

  const handleDescriptionChange = (index, value) => {
    const updatedCards = [...formData.cards];
    updatedCards[index].description = value;
    setFormData({
      ...formData,
      cards: updatedCards,
    });
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
      {/* nav */}
      <div className="w-full relative border">
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

      {/* Cards Section */}
      <div className="flex flex-wrap gap-6 p-6 w-full justify-evenly">
        {formData.cards.map((card, index) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-md p-4 sm:w-64 flex flex-col items-center w-full"
          >
            {/* Card Image */}
            <div className="w-full h-40 bg-gray-200 mb-4 flex items-center justify-center">
              {card.image ? (
                <img
                  src={`/uploads/${card.image}`}
                  alt="Card Image"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-600">No Image</p>
              )}
            </div>

            {/* Image Upload Button */}
            <CardUpload index={index} onImageUpload={handleCardImageUpload} />

            {/* Description Section */}
            <textarea
              value={card.description}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              placeholder="Add Description"
              className="w-full p-2 bg-gray-100 rounded-md resize-none focus:outline-none"
              rows="4"
            />
          </div>
        ))}
        <div className="flex flex-col justify-evenly">
          <button
            className="bg-white w-20 h-20 text-3xl rounded-2xl font-bold border border-black"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                cards: [
                  ...prev.cards,
                  {
                    id: prev.cards.length + 1, // Increment ID based on the array length
                    image: "",
                    description: "",
                  },
                ],
              }))
            }
          >
            +
          </button>
          <button
            className="bg-white w-20 h-20 text-3xl rounded-2xl font-bold border border-black"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                cards: prev.cards.slice(0, -1), // Removes the last element of the cards array
              }))
            }
          >
            -
          </button>
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
