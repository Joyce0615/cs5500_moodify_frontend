import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodSelection.css';

export default function MoodSelection() {
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

  const moods = [
    'Happy', 'Sad', 'Angry', 'Calm', 'Excited', 'Tired', 'Anxious', 'Relaxed', 
    'Confused', 'Bored'
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    navigate('/Moodify/ActivitySelection'); // when select mood navigate to activity
  };

  return (
    <div className="mood-container">
      <h1>What mood are you in?</h1>
      <p>Select your current mood based on your feelings</p>

      <div className="mood-slider">
        {moods.map((mood, index) => (
          <div
            key={index}
            className={`mood-item ${selectedMood === mood ? 'active' : ''}`}
            onClick={() => handleMoodSelect(mood)}
          >
            {mood}
          </div>
        ))}
      </div>
    </div>
  );
}
