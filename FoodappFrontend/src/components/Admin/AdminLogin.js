import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Import the CSS file

const AdminLogin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace with server-side validation in production
    const adminCredentials = {
      userId: "admin",
      password: "123",
    };

    if (userId === adminCredentials.userId && password === adminCredentials.password) {
      // Redirect on successful login
      window.location.href = "http://localhost:5173";
    } else {
      setError("Invalid User ID or Password");
    }
  };

  return (
    <div className="login-container">
      <br/>
      <br/>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
