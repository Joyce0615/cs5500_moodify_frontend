import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodSelection.css';


export default function ActivitySelection() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const navigate = useNavigate();

  const activities = [
    'Working', 'Studying', 'Exercising', 'Socializing', 'Relaxing', 'Traveling', 
    'Eating', 'Shopping', 'Gaming', 'Meditating', 'Watching TV', 
    'Reading',
  ];

  useEffect(() => {
    const savedActivity = localStorage.getItem('selectedActivity');
    if (savedActivity) {
      setSelectedActivity(savedActivity);
    }
  }, []);

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    localStorage.setItem('selectedActivity', activity);
  };

  const handleBack = () => {
    navigate('/Moodify/MoodSelection');
  };

  const handleNext = () => {
    localStorage.setItem('lastMoodSubPage', 'WeatherSelection');
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
      <div className="button-container">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button 
          className="next-button" 
          onClick={handleNext} 
          disabled={selectedActivity === null}
        >
          Next
        </button>
      </div>
    </div>
  );
}
