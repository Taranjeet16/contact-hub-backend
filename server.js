const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ FIXED CORS: allow all origins (recommended for interview/demo apps)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ API routes
app.use("/api", require("./routes/contactRoutes"));

// ✅ Health check (optional but nice)
app.get("/", (req, res) => {
  res.send("Contact Hub Backend is running 🚀");
});

// ✅ Render port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
