import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodSelection.css';


export default function TimeSelection() {
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();

  const timeOfDayOptions = [
    'Morning', 'Afternoon', 'Evening', 'Night'
  ];

  useEffect(() => {
    const savedTime = localStorage.getItem('selectedTime');
    if (savedTime) {
      setSelectedTime(savedTime);
    }
  }, []);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    localStorage.setItem('selectedTime', time);
  };

  const handleBack = () => {
    navigate('/Moodify/WeatherSelection');
  };

  const getRecommendation = () => {
    //reset four different selection in localStorage
    localStorage.removeItem('selectedMoods');
    localStorage.removeItem('selectedActivity');
    localStorage.removeItem('selectedWeather');
    localStorage.removeItem('selectedTime');
    navigate('/Moodify/MusicNews');
  };

  return (
    <div className="mood-container">
      <h1>What time of day is it?</h1>
      <div className="mood-slider">
        {timeOfDayOptions.map((time, index) => (
          <div
            key={index}
            className={`mood-item ${selectedTime === time ? 'active' : ''}`}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button className="get-recommendation-button" onClick={getRecommendation} disabled={!selectedTime}>
          Get Recommendation
        </button>
      </div>
    </div>
  );
}
