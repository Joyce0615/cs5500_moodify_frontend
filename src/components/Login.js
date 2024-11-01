import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', username, password);
  };

  const handleContinueAsGuest = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h1>Food Ordering App</h1>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <button className="create-account-button">
        Create Account
      </button>
      <button className="guest-button" onClick={handleContinueAsGuest}>
        Continue as guest
      </button>
    </div>
  );
}

export default Login;