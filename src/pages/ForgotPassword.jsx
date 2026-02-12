import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

const handleSubmit = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    setMessage("❌ No user found. Please register first.");
    return;
  }

  if (storedUser.email === email) {
    setMessage("✅ Password reset link sent to your email");
    setTimeout(() => navigate("/"), 2000);
  } else {
    setMessage("❌ Email not found");
  }
};


  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit}>Reset Password</button>

      <p className="msg">{message}</p>
    </div>
  );
}

export default ForgotPassword;
