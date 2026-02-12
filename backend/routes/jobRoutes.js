import express from "express";
import {
  createJob,
  getJobs,
  applyJob
} from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/*
 ADMIN
 Add Job (protected)
*/
router.post("/", protect, createJob);

/*
 USER
 Get all jobs (public)
*/
router.get("/", getJobs);

/*
 USER
 Apply for a job (protected)
*/
router.post("/apply", protect, applyJob);

export default router;
