const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS configuration for Vercel frontend
app.use(
  cors({
    origin: [
      "https://contact-hub-frontend.vercel.app", // your Vercel app
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
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

// ✅ Optional health check (nice touch)
app.get("/", (req, res) => {
  res.send("Contact Hub Backend is running 🚀");
});

// ✅ Render port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
