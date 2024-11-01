import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AgeSelection from './components/AgeSelection';
import SexSelection from './components/SexSelection';
import MoodSelection from './components/MoodSelection';
import Songs from './components/Songs';
import ProfileButton from './components/ProfileButton';
import Profile from './components/Profile';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ProfileButton />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/age-selection" element={<AgeSelection />} />
          <Route path="/sex-selection" element={<SexSelection />} />
          <Route path="/mood-selection" element={<MoodSelection />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
