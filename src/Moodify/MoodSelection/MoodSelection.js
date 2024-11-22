import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodSelection.css';

export default function MoodSelection() {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const navigate = useNavigate();

  const moods = [
    'Happy', 'Sad', 'Angry', 'Calm', 'Excited', 'Tired', 'Anxious', 'Relaxed', 
    'Confused', 'Bored', 'Hopeful', 'Lonely', 'Empowered', 'Inspired', 'Annoyed'
  ];

  useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem('selectedMoods')) || [];
    setSelectedMoods(Array.isArray(savedMoods) ? savedMoods : []);
    localStorage.setItem('lastMoodSubPage', 'MoodSelection');
  }, []);

  const handleMoodSelect = (mood) => {
    let updatedMoods = [...selectedMoods];
  
    if (selectedMoods.includes(mood)) {
      updatedMoods = selectedMoods.filter((selectedMood) => selectedMood !== mood);
    } else if (selectedMoods.length < 3) {
      updatedMoods = [...selectedMoods, mood];
    } else {
      return;
    }
    setSelectedMoods(updatedMoods);
    localStorage.setItem('selectedMoods', JSON.stringify(updatedMoods));
  };

  const handleNext = () => {
    localStorage.setItem('lastMoodSubPage', 'ActivitySelection');
    navigate('/Moodify/ActivitySelection');
  };

  return (
    <div className="mood-container">
      <h1>What mood are you in?</h1>
      <p style={{ marginBottom: '0' }}>Select your current mood based on your feelings</p>
      <p >(Select up to 3 moods)</p>

      <div className="mood-slider">
        {moods.map((mood, index) => (
          <div
            key={index}
            className={`mood-item ${selectedMoods.includes(mood) ? 'active' : ''}`}
            onClick={() => handleMoodSelect(mood)}
          >
            {mood}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="next-button" onClick={handleNext} disabled={selectedMoods.length === 0}>
          Next
        </button>
      </div>
    </div>
  );
}
