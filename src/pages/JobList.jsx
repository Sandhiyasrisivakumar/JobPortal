import { useState, useEffect } from "react";
import axios from "axios";
import "./JobList.css";
import { useNavigate } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] =("");
  const navigate = useNavigate();

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs"); // ✅ removed localhost
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  // Search filter
 const filteredJobs = Array.isArray(jobs)
  ? jobs.filter((job) => {
      const query = (search || "").toLowerCase();

      return (
        (job.title || "").toLowerCase().includes(query) ||
        (job.company || "").toLowerCase().includes(query) ||
        (job.location || "").toLowerCase().includes(query) ||
        (job.skills || []).join(" ").toLowerCase().includes(query)
      );
    })
  : [];


  return (
    <div className="joblist-page">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by title, skill, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <h2>Available Jobs</h2>

      {filteredJobs.length === 0 && (
        <p style={{ textAlign: "center" }}>No jobs found</p>
      )}

      {filteredJobs.map((job) => (
        <div className="job-card" key={job._id}>
          <div className="job-main">
            <h3>{job.title}</h3>
            <p className="company">{job.company}</p>
            <p className="meta">
              📍 {job.location} • 🕒 {job.type}
            </p>
          </div>

          <button
            className="view-btn"
            onClick={() =>
              setSelectedJob(
                selectedJob?._id === job._id ? null : job
              )
            }
          >
            {selectedJob?._id === job._id
              ? "Hide Details"
              : "View Details"}
          </button>

          {/* Job Details */}
          {selectedJob?._id === job._id && (
            <div className="job-details">
              <p>
                <strong>Salary:</strong> {job.salary}
              </p>

              <p className="desc">{job.description}</p>

              <div className="skills">
                {job.skills &&
                  job.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
              </div>

              <button
                className="apply-btn"
                onClick={() => navigate(`/apply/${job._id}`)}
              >
                Apply Now
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default JobList;
