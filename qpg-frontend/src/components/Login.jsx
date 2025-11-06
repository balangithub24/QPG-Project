import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ⚙️ Temporary local login logic (replace later with backend API)
    let role = "";

    if (username === "admin" && password === "admin123") {
      role = "ADMIN";
    } else if (username === "teacher" && password === "teacher123") {
      role = "TEACHER";
    } else if (username === "student" && password === "student123") {
      role = "STUDENT";
    } else {
      alert("Invalid username or password!");
      return;
    }

    // 🧾 Store login data in localStorage
    const userData = {
      username,
      role,
      token: "dummy-jwt-token", // you can replace this after backend login works
    };

    localStorage.setItem("user", JSON.stringify(userData));

    // 🔀 Redirect based on role
    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "TEACHER") {
      navigate("/teacher/dashboard");
    } else if (role === "STUDENT") {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="login-footer">© 2025 QPG Project | Secure Access Portal</p>
      </div>
    </div>
  );
}

export default Login;
