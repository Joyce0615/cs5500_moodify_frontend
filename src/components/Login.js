import React, { useState, useEffect} from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Required');
    } else {
      console.log('Logging in with:', username, password);
      // Add actual login logic here
    }
  };

  useEffect(() => {
    const createBubble = () => {
        const container = document.querySelector('.full-screen-container');
        const bubble = document.createElement('span');
        const size = Math.random() * 60 + 20; // Random size between 20 and 80px

        // Randomly assign either the red or green bubble class
        const isRed = Math.random() > 0.5;
        bubble.classList.add(isRed ? 'red-bubble' : 'green-bubble');
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * window.innerWidth}px`;
        bubble.style.top = `${Math.random() * window.innerHeight}px`;

        container.appendChild(bubble);

        setTimeout(() => {
            bubble.remove();
        }, 10000); // Match the animation duration
    };

    const interval = setInterval(createBubble, 200);
    setTimeout(() => clearInterval(interval), 5000);

    return () => clearInterval(interval);
}, []);


return (
  <div className="full-screen-container">
    <div className="login-container">
      <h1>Welcome to Moodify</h1>
      <p className="signup-prompt">
        Not have an account? <a href="/signup">Sign up</a>
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
        {!username && <span className="error">{error}</span>}
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
        {!password && <span className="error">{error}</span>}
      </div>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  </div>
  );
}

export default Login;