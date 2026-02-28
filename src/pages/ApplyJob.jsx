import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ApplyJob.css";
import { FaUser, FaEnvelope, FaPhone, FaFileUpload } from "react-icons/fa";

function ApplyJob() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    // Here you will connect backend later

    // Redirect after success
    navigate("/application-success");
  };

  return (
    <div className="apply-container">
      <div className="apply-card">
        <h2>Apply for Job</h2>
        <p className="subtitle">Fill in your details carefully</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaPhone className="icon" />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="input-group file-group">
            <FaFileUpload className="icon" />
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="apply-btn">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyJob;