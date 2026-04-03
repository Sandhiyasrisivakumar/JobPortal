// ✅ Load .env first
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

console.log(
  "OPENAI_API_KEY loaded:",
  process.env.OPENAI_API_KEY ? "✅ Yes" : "❌ No"
);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aiRoutes from "./routes/ai.js";

const app = express();

// ===== CORS Setup =====
// Allow requests from your frontend Vercel URL and local Vite dev server
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite dev server
      "https://job-portal-xh2e.vercel.app", // Your deployed frontend URL
      "https://job-portal-olive-three.vercel.app" // other possible frontend URLs
    ],
    credentials: true, // if you use cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

// ===== Middleware =====
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

// ===== Connect to MongoDB =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
  

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});