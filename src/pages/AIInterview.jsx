import { useState, useEffect } from "react";
import axios from "axios";
import "./AIInterview.css";

function AIInterview() {
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs for dropdown
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://jobportal-1-x84n.onrender.com/api/jobs");
        setJobs(res.data); // array of jobs from backend
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const handleGenerate = async () => {
    if (!role) return alert("Please select a job role");

    setLoading(true);
    setQuestions([]);

    try {
      const res = await axios.post(
        "https://jobportal-1-x84n.onrender.com/api/ai/questions",
        { role }
      );
      const list = res.data.questions.split(/\r?\n/).filter(q => q.trim() !== "");
      setQuestions(list);
    } catch (err) {
      console.error("Error generating questions:", err);
      alert("Failed to generate questions. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="ai-page">
      <h2>AI Interview Question Generator</h2>
      <p>Select a job to get relevant technical questions:</p>

      <div className="ai-form">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">-- Select Job Role --</option>
          {jobs.map((job) => (
            <option key={job._id} value={job.title}>
              {job.title} @ {job.company}
            </option>
          ))}
        </select>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>

      {questions.length > 0 && (
        <div className="questions-list">
          <h3>Generated Questions:</h3>
          <ol>
            {questions.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default AIInterview;