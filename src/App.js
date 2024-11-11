import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Moodify/Account/Login';
import MoodSelection from './Moodify/MoodSelection/MoodSelection';
import ActivitySelection from './Moodify/MoodSelection/ActivitySelection';
import WeatherSelection from './Moodify/MoodSelection/WeatherSelection';
import TimeOfDaySelection from './Moodify/MoodSelection/TimeOfDaySelection';
import Profile from './Moodify/Profile/Profile';
import NavigationBar from './Moodify/Navigation/NavigationBar';
import MusicNews from './Moodify/MusicNews/MusicNews';
import Signup from './Moodify/Account/Signup';

function App() {

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <NavigationBar /> 
        <div style={{ marginLeft: '220px', padding: '20px', flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/Moodify/Login" element={<Login />} /> 
            <Route path="/Moodify/Signup" element={<Signup />} /> 
            <Route path="/Moodify/MoodSelection" element={<MoodSelection />} /> 
            <Route path="/Moodify/ActivitySelection" element={<ActivitySelection />} />
            <Route path="/Moodify/WeatherSelection" element={<WeatherSelection />} />
            <Route path="/Moodify/TimeOfDaySelection" element={<TimeOfDaySelection />} />
            <Route path="/Moodify/Profile" element={<Profile />} /> 
            <Route path="/Moodify/MusicNews" element={<MusicNews />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;

