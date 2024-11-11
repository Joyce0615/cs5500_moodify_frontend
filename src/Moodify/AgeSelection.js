import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Selection.css';

const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55+'];

function AgeSelection() {
  const [selectedAge, setSelectedAge] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedAge) {
      navigate('/sex-selection');
    }
  };

  return (
    <div className="selection-container">
      <h1>Select Your Age Range</h1>
      <div className="bubbles">
        {ageRanges.map((age) => (
          <div
            key={age}
            className={`bubble ${selectedAge === age ? 'selected' : ''}`}
            onClick={() => setSelectedAge(age)}
          >
            {age}
          </div>
        ))}
      </div>
      <button className="next-button" onClick={handleNext} disabled={!selectedAge}>
        Next
      </button>
    </div>
  );
}

export default AgeSelection;
