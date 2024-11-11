import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { UserSelectionContext } from '../../App'; // Import the context
import './MoodSelection.css';

function MoodSelection() {
  const [selectedMood, setSelectedMood] = useState('Peaceful');
  // const { updateSelection } = useContext(UserSelectionContext); // Access the updateSelection function
  const navigate = useNavigate();

  const moods = [
    'Angry', 'Carefree', 'Ecstatic', 'Peaceful', 'Sad', 'Serious', 'Uplifting'
  ];

  // const handleGetRecommendations = () => {
  //   updateSelection('mood', selectedMood); // Store the selected mood
  //   navigate('/songs'); // Navigate to the Songs page
  // };

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

      {/* <button className="recommendations-button" onClick={handleGetRecommendations}> */}
        {/* Get recommendations
      </button> */}
    </div>
  );
}

export default MoodSelection;

