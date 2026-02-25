const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env file
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// PORT
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});