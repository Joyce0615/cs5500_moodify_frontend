import React, {useEffect, useState} from 'react';
import './Login.css';
import NavigationBar from '../Navigation/NavigationBar';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const backgroundImage = '../images/background.png';

  const handleLogin = async () => {
    if (!username && !password) {
      setError('Username and Password are required');
    } else if (!username) {
      setError('Username is required');
    } else if (!password) {
      setError('Password is required');
    } else {
      try {
        const response = await fetch(`${process.env.REACT_APP_REMOTE_SERVER}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          console.log('Login successful');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem("user", username);
          localStorage.setItem('email', email);
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
        setError("Password or Username is incorrect. Please try again");
      }
    }
  };

  return (
    <div className="full-screen-container">
      <img src={backgroundImage} alt="Background" />
      <div className="login-container">
        <NavigationBar/>
        <h2>Welcome to Moodify</h2>
        <p className="signup-prompt">
          Not have an account? <Link to="/Moodify/SignUp">Sign up</Link>
        </p>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password input"
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
