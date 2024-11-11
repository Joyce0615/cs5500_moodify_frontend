import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodSelection.css';

export default function WeatherSelection() {
  const [selectedWeather, setSelectedWeather] = useState(null);

  const navigate = useNavigate();

  const weatherOptions = [
    'Sunny', 'Cloudy', 'Rainy', 'Stormy', 'Snowy', 'Windy', 'Foggy'
  ];

  const handleWeatherSelect = (weather) => {
    setSelectedWeather(weather);
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
    </div>
  );
}