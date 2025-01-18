import React, { useState } from "react";
import API from  "../axiosConfig";
import { Navigation } from "../components/navigation";
import '../styles/style.css';
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePicture) formData.append("profile_picture", profilePicture);

    try {
      const response = await API.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Si vous envoyez un fichier
        },
      });
      setSuccess("Account created successfully!");
      setError("");
      setIsLoading(false);

      // Optionnellement, rediriger l'utilisateur après l'inscription
      navigate("/login"); // Redirection vers la page de connexion
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div><Navigation />
    <div className="signup-container">
      <div className="signup-left">
        <img
          src="https://i.pinimg.com/736x/2e/9c/a9/2e9ca90a6c4e81681f142158a2bf3c1f.jpg"
          alt="Illustration"
        />
      </div>
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Create Account</h2>
          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          
          {/* Disable button if loading */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
          
          <div className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </form>
      </div>
    </div></div>
  );
};
