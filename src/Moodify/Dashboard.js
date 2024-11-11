import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSelectionContext } from '../App';
import '../styles/Dashboard.css';

const genres = ['Americana', 'Rock', 'Hip-Hop', 'R&B/Soul', 'Electronic', 'Pop', 'Country', 'Alternative', 'Christian', 'Blues', 'Indie'];

function Dashboard() {
  const { updateSelection } = useContext(UserSelectionContext);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre) ? prevSelected.filter((g) => g !== genre) : [...prevSelected, genre]
    );
  };

  const handleNext = () => {
    if (selectedGenres.length > 0) {
      updateSelection('genre', selectedGenres);
      navigate('/age-selection');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Tap on the genres you like</h1>
      <div className="genre-bubbles">
        {genres.map((genre) => (
          <div key={genre} className={`bubble ${selectedGenres.includes(genre) ? 'selected' : ''}`} onClick={() => toggleGenre(genre)}>
            {genre}
          </div>
        ))}
      </div>
      <button className="next-button" onClick={handleNext} disabled={selectedGenres.length === 0}>
        Next
      </button>
    </div>
  );
}

export default Dashboard;

