import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodSelection.css';

export default function WeatherSelection() {
  const [selectedWeather, setSelectedWeather] = useState(null);

  const navigate = useNavigate();

  const weatherOptions = [
    'Sunny', 'Cloudy', 'Rainy', 'Stormy', 'Snowy', 'Windy', 'Foggy', 'Humid', 'Breezy'
  ];

  useEffect(() => {
    const savedWeather = localStorage.getItem('selectedWeather');
    if (savedWeather) {
      setSelectedWeather(savedWeather);
    }
  }, []);

  const handleWeatherSelect = (weather) => {
    setSelectedWeather(weather);
    localStorage.setItem('selectedWeather', weather);
  };

  const handleBack = () => {
    navigate('/Moodify/ActivitySelection');
  };

  const handleNext = () => {
    navigate('/Moodify/TimeOfDaySelection');
  };

  return (
    <div className="mood-container">
      <h1>How’s the weather today?</h1>
      <div className="mood-slider">
        {weatherOptions.map((weather, index) => (
          <div
            key={index}
            className={`mood-item ${selectedWeather === weather ? 'active' : ''}`}
            onClick={() => handleWeatherSelect(weather)}
          >
            {weather}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button className="next-button" onClick={handleNext} disabled={!selectedWeather}>
          Next
        </button>
      </div>
    </div>
  );
}