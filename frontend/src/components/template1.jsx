import React, { useState, useEffect } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "Guthi Sangsthan",
    heroMessage: "Welcome to the GuthiSite",
    aboutUs: "About Us",
    description:
      "Guthi is a traditional socio-cultural institution in Nepal, primarily among the Newar community, that organizes and manages communal and religious activities. It serves as a trust or association responsible for maintaining temples, performing rituals, preserving heritage, and managing land or resources allocated to it. Guthi members share responsibilities and benefits, ensuring the continuity of cultural and spiritual practices.",
    footerMessage: "@All rights reserved.",
  });

  // Function to auto-resize textareas
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

    // Auto-resize if it's a textarea
    if (e.target.tagName.toLowerCase() === "textarea") {
      autoResize(e.target);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    alert("Form submitted: " + JSON.stringify(formData, null, 2));
  };

  // Initialize auto-resize for all textareas
  useEffect(() => {
    document.querySelectorAll("textarea").forEach((textarea) => {
      autoResize(textarea);
    });
  }, [formData]);

  return (
    <form
      className="flex flex-col items-center space-y-4 w-full bg-black"
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
          className="p-2 w-full bg-transparent text-center text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col bg-yellow-600 w-full h-auto min-h-[29rem] justify-center items-center p-8">
        <textarea
          name="heroMessage"
          placeholder="Welcome to Our Website"
          className="text-5xl font-bold mb-4 text-center text-white rounded-2xl bg-inherit resize-none w-full overflow-hidden"
          value={formData.heroMessage}
          onChange={handleChange}
        />
      </div>

      {/* About Section */}
      <div className="flex flex-col items-center justify-center w-full bg-green-400 p-8">
        <textarea
          name="aboutUs"
          placeholder="About Us"
          value={formData.aboutUs}
          onChange={handleChange}
          className="text-3xl font-semibold text-center rounded-xl bg-inherit h-auto w-auto"
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
        className="bg-gray-900 text-white text-center p-8 my-8 w-full bg-inherit resize-none overflow-hidden"
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
