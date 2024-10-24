import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    try {
      const response = await axios.post('http://localhost:3000/users/register', { name, email, password });
      console.log(response.data); // Handle successful registration (e.g., redirect to login)
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // Set specific error messages based on server response
        if (error.response.status === 400) {
          const { error } = error.response.data;
          setErrorMessage(error || 'Registration failed.'); // Show specific error message
        } else {
          setErrorMessage('Registration failed. Please try again later.'); // Generic error message
        }
      }
    }
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="glass-card">
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <p onClick={handleClick}>
          Already registered? <span className="hoverable">Login</span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
