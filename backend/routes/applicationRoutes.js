import express from "express";
import multer from "multer";
import Application from "../models/Application.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* =========================
   Multer config (Resume upload)
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* =========================
   POST – Apply for a Job (Student)
   URL: /api/applications
========================= */
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, jobId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const application = new Application({
      name,
      email,
      phone,
      jobId,
      resume: req.file.filename
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully ✅"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   GET – All Applications (ADMIN ONLY)
   URL: /api/applications
========================= */
router.get("/", adminAuth, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title company")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
