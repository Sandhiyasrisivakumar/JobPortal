import { useState } from "react";
import "./ApplyJob.css";
import { FaUser, FaEnvelope, FaPhone, FaFileUpload } from "react-icons/fa";

function ApplyJob() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    // backend connect later
    alert("Application submitted successfully ✅");
  };

  return (
    <div className="apply-container">
      <div className="apply-card">
        <h2>Apply for Job</h2>
        <p className="subtitle">Fill in your details carefully</p>

        <form>
          <div className="input-group">
            <FaUser className="icon" />
            <input type="text" placeholder="Full Name" required />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="Email Address" required />
          </div>

          <div className="input-group">
            <FaPhone className="icon" />
            <input type="text" placeholder="Phone Number" required />
          </div>

          <div className="input-group file-group">
            <FaFileUpload className="icon" />
            <input type="file" required />
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
