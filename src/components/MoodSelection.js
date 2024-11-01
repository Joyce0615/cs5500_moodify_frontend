import React, { useState } from 'react';
import '../styles/MoodSelection.css';

function MoodSelection() {
  const [selectedMood, setSelectedMood] = useState('Peaceful');
  
  const moods = [
    'Angry', 'Carefree', 'Ecstatic', 'Peaceful', 'Sad', 'Serious', 'Uplifting'
  ];

  return (
    <div className="mood-container">
      <h1>What mood are you in?</h1>
      <p>Select your current mood based on how you are feeling so that we can suggest the music you need.</p>

      <div className="mood-slider">
        {moods.map((mood, index) => (
          <div
            key={index}
            className={`mood-item ${selectedMood === mood ? 'active' : ''}`}
            onClick={() => setSelectedMood(mood)}
          >
            {mood}
          </div>
        ))}
      </div>

      <button className="recommendations-button">
        Get recommendations
      </button>
    </div>
  );
}

export default MoodSelection;
