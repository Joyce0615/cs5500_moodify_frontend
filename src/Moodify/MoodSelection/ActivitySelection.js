import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodSelection.css';


export default function ActivitySelection() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const navigate = useNavigate();

  const activities = [
    'Working', 'Studying', 'Exercising', 'Socializing', 'Relaxing', 'Traveling', 
    'Eating', 'Shopping', 'Sleeping', 'Gaming', 'Meditating', 'Watching TV', 
    'Reading',
  ];

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    navigate('/Moodify/WeatherSelection');
  };

  return (
    <div className="mood-container">
      <h1>What are you currently doing?</h1>
      <p>Select your current activity</p>
      <div className="mood-slider">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`mood-item ${selectedActivity === activity ? 'active' : ''}`}
            onClick={() => handleActivitySelect(activity)}
          >
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
}
