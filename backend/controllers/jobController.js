import Job from "../models/Job.js";
import Application from "../models/Application.js";

// ==========================
// ADMIN → CREATE JOB
// ==========================
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id, // admin id
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ==========================
// USER → GET ALL JOBS
// ==========================
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// ==========================
// USER → APPLY JOB
// ==========================
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    // check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // prevent duplicate apply
    const alreadyApplied = await Application.findOne({
      jobId,
      user: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    const application = await Application.create({
      jobId: job._id,
      jobTitle: job.title,
      company: job.company,
      user: req.user.id,
      userEmail: req.user.email,
    });

    res.status(201).json({
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Apply job failed" });
  }
};
