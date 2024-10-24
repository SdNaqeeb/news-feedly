import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (error.response) {
        // Set specific error messages based on server response
        if (error.response.status === 401) {
          const { error } = error.response.data;
          if (error === 'Invalid email or password') {
            setErrorMessage('Password incorrect.'); // Specific error for incorrect password
          } else {
            setErrorMessage('User not found.'); // Specific error for user not found
          }
        } else {
          setErrorMessage('Login failed. Please try again later.'); // Generic error message
        }
      }
    }
  };

  const handleClick = () => navigate("/register");

  return (
    <div className="login-container">
      <div className="glass-card">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="hoverable" onClick={handleClick}>
            register
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
