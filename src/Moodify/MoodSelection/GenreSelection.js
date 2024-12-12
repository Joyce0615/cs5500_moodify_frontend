import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodSelection.css';

export default function GenreSelection() {
    const [selectedGenres, setSelectedGenres] = useState(null);
    const navigate = useNavigate();
  
    const genres = [
      'Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop', 'Country', 'EDM', 'Blues',
      'Reggae', 'Metal', 'R&B', 'Folk', 'Punk', 'Soul', 'Funk'
    ];
  
    useEffect(() => {
      const savedGenres = localStorage.getItem('selectedGenres');
      if (savedGenres){
        setSelectedGenres(savedGenres)
      }
    }, []);
  
    const handleGenreSelect = (genre) => {
      setSelectedGenres(genre);
      localStorage.setItem('selectedGenres', genre);
    };

    const handleBack = () => {
        navigate('/Moodify/MoodSelection');
      };
  
    const handleNext = () => {
      localStorage.setItem('lastGenreSubPage', 'ActivitySelection');
      navigate('/Moodify/ActivitySelection');
    };
  
    return (
        <div className="mood-container">
        <h1>Select the music genres you want to listen</h1>
        <div className="mood-slider">
          {genres.map((genre, index) => (
            <div
              key={index}
              className={`mood-item ${selectedGenres === genre ? 'active' : ''}`}
              onClick={() => handleGenreSelect(genre)}
            >
              {genre}
            </div>
          ))}
        </div>

        <div className="button-container">
            <button className="back-button" onClick={handleBack}>
                Back
            </button>

            <button className="next-button" onClick={handleNext} disabled={selectedGenres === null}>
                Next
            </button>
        </div>
      </div>
    );
  }