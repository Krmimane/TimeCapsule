import React, { useState } from "react";
import API from  "../axiosConfig";
import { useNavigate } from "react-router-dom";

import { Navigation } from "../components/navigation";
import '../styles/style.css';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await API.post("/login", { email, password });
      const { access_token } = response.data;

      // Stocker le token dans localStorage
      localStorage.setItem("auth_token", access_token);

      setError("");
      navigate("/Profile"); // Redirection vers le tableau de bord
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div><Navigation />
    <div className="login-container">

      <div className="login-left">
        <img
          src="https://i.pinimg.com/736x/2e/9c/a9/2e9ca90a6c4e81681f142158a2bf3c1f.jpg" // Remplacez par une vraie image
          alt="Illustration"
        />
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div></div>
  );
};
