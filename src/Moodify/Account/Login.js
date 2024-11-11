import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username && !password) {
      setError('Username and Password are required');
    } else if (!username) {
      setError('Username is required');
    } else if (!password) {
      setError('Password is required');
    } else {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          console.log('Login successful');
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/Moodify/MoodSelection');
        } else {
          //handle error
          const data = await response.json();
          if (response.status === 404) {
            setError(data.message); // user is not exist
          } else if (response.status === 401) {
            setError(data.message); // password incorrect
          } else {
            setError(data.message || 'An error occurred. Please try again.');
          }
        }
      } catch (error) {
        // internet error
        console.error("Error logging in:", error);
        setError("An unexpected error occurred. Please check your connection and try again.");
      }
    }
  };
  

  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h1>Welcome to Moodify</h1>
        <p className="signup-prompt">
          Not have an account? <Link to="/Moodify/SignUp">Sign up</Link>
        </p>
        <div className="input-container">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(''); // Clear error on input change
            }}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(''); // Clear error on input change
            }}
          />
        </div>
        <br/>
        {error && <span className="error text-danger">{error}</span>}
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
