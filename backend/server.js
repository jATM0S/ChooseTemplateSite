const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/uploads"); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(express.json());

app.get("/getChoosen", (req, res) => {
  const jsonFilePath = path.join(__dirname, "data", "choosen.json");

  // Read the JSON file asynchronously
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the JSON file");
    }

    try {
      const parsedData = JSON.parse(data); // Parse the file content
      res.json(parsedData); // Send the parsed JSON as the response
    } catch (err) {
      res.status(500).send("Error parsing the JSON file");
    }
  });
});

app.post("/choose", (req, res) => {
  const { choosenTemplate } = req.body;

  // Path to your JSON file
  const jsonFilePath = path.join(__dirname, "data/choosen.json");
  const updatedData = {
    choosenTemplate: choosenTemplate,
  };
  // Write the updated data to the JSON file
  fs.writeFile(jsonFilePath, JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error writing to JSON file");
    }
    res.send("JSON file updated successfully");
  });
});

app.get("/getTemp1Data", (req, res) => {
  const jsonFilePath = path.join(__dirname, "data", "temp1Data.json");

  // Read the JSON file asynchronously
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the JSON file");
    }

    try {
      const parsedData = JSON.parse(data); // Parse the file content
      res.json(parsedData); // Send the parsed JSON as the response
    } catch (err) {
      res.status(500).send("Error parsing the JSON file");
    }
  });
});

app.post("/updateTemp1", (req, res) => {
  const updatedData = req.body;
  // Path to your JSON file
  const jsonFilePath = path.join(__dirname, "data/temp1Data.json");

  // Write the updated data to the JSON file
  fs.writeFile(jsonFilePath, JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error writing to JSON file");
    }
    res.send("JSON file updated successfully");
  });
});

app.get("/getTemp2Data", (req, res) => {
  const jsonFilePath = path.join(__dirname, "data", "temp2Data.json");

  // Read the JSON file asynchronously
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the JSON file");
    }

    try {
      const parsedData = JSON.parse(data); // Parse the file content
      res.json(parsedData); // Send the parsed JSON as the response
    } catch (err) {
      res.status(500).send("Error parsing the JSON file");
    }
  });
});

app.post("/updateTemp2", (req, res) => {
  const updatedData = req.body;
  // Path to your JSON file
  const jsonFilePath = path.join(__dirname, "data/temp2Data.json");

  // Write the updated data to the JSON file
  fs.writeFile(jsonFilePath, JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error writing to JSON file");
    }
    res.send("JSON file updated successfully");
  });
});

// File upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "File uploaded successfully",
    filePath: `http://localhost:${PORT}/uploads/${req.file.filename}`,
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
