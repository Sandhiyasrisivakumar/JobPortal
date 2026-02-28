import { useNavigate } from "react-router-dom";
import "./ApplicationSuccess.css";

function ApplicationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="checkmark">✓</div>
        <h2>Application Submitted Successfully!</h2>
        <p>
          Thank you for applying. Our recruitment team will review your
          application and contact you soon.
        </p>

        <button
          className="back-btn"
          onClick={() => navigate("/jobs")}
        >
          Back to Jobs
        </button>
      </div>
    </div>
  );
}

export default ApplicationSuccess;