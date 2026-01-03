const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ SIMPLE CORS — REQUIRED for Vercel + Render
app.use(cors());

app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ API routes
app.use("/api", require("./routes/contactRoutes"));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Contact Hub Backend is running 🚀");
});

// ✅ Render port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
