import React, { useState } from 'react';
import '../styles/Profile.css';

function Profile() {
  const [rating, setRating] = useState(null);

  const recommendations = [
    { title: 'Every Night (Night Visions)', artist: 'Imagine Dragons' },
    { title: 'Atlantic (Under the Iron Sea)', artist: 'Keane' },
    { title: 'One More Night (Overexposed)', artist: 'Maroon 5' },
    { title: 'Honey Bee (Red River Blue)', artist: 'Blake Shelton' },
  ];

  const handleRating = (score) => {
    setRating(score);
    console.log('User rated:', score);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image"></div>
        <h2>James S. William</h2>
        <p>2.3 GB / 5 GB</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: '46%' }}></div>
        </div>
      </div>
      
      <div className="tabs">
        <span className="active-tab">Recommendation History</span>
        <span>Your Favourites</span>
        <span>Playlist</span>
      </div>

      <div className="recommendations">
        {recommendations.map((song, index) => (
          <div key={index} className="song-item">
            <div className="song-info">
              <p className="song-title">{song.title}</p>
              <p className="song-artist">{song.artist}</p>
            </div>
            <button className="rate-button" onClick={() => handleRating(index + 1)}>
              Rate
            </button>
          </div>
        ))}
      </div>
      
      {rating && <p className="rating-message">Thank you for rating: {rating} stars!</p>}
    </div>
  );
}

export default Profile;

