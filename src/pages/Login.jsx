import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    // Dummy login check
    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem("user", JSON.stringify({ email }));

      if (remember) {
        localStorage.setItem("rememberUser", email);
      }

      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
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
