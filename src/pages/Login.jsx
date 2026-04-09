import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        email,
        password
      }
    );

    console.log("LOGIN RESPONSE:", res.data);

    // store token
    localStorage.setItem("token", res.data.token);

    // OPTIONAL: store user info
    localStorage.setItem("user", JSON.stringify(res.data.user));

    if (remember) {
      localStorage.setItem("rememberUser", email);
    }

    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Login failed");
  }
};




  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue to Job Portal</p>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>
<p
  className="forgot-link"
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>
        </div>

        <button type="submit">Login</button>

        <p>
  Don't have an account?{" "}
  <Link to="/Register" className="register-link">
    Register
  </Link>
</p>

      </form>
    </div>
  );
}

export default Login;
