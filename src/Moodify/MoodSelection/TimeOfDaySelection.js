import React, { useState } from 'react';
import './MoodSelection.css';


export default function TimeSelection() {
  const [selectedTime, setSelectedTime] = useState(null);

  const timeOfDayOptions = [
    'Morning', 'Afternoon', 'Evening', 'Night'
  ];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
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
    </div>
  );
}
