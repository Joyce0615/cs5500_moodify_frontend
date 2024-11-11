import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Selection.css';

const genders = ['Male', 'Female'];

function SexSelection() {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedGender) {
      navigate('/mood-selection');
    }
  };

  return (
    <div className="selection-container">
      <h1>Select Your Gender</h1>
      <div className="bubbles">
        {genders.map((gender) => (
          <div
            key={gender}
            className={`bubble ${selectedGender === gender ? 'selected' : ''}`}
            onClick={() => setSelectedGender(gender)}
          >
            {gender}
          </div>
        ))}
      </div>
      <button className="next-button" onClick={handleNext} disabled={!selectedGender}>
        Next
      </button>
    </div>
  );
}

export default SexSelection;
