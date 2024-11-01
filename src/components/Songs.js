import React, { useContext, useEffect, useState } from 'react';
import { UserSelectionContext } from '../App';
import '../styles/Songs.css';

function Songs() {
  const { userSelections } = useContext(UserSelectionContext);
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  useEffect(() => {
    // Mock fetching recommended songs based on selections
    const fetchRecommendedSongs = () => {
      const mockSongs = [
        { title: 'Song A', artist: 'Artist 1' },
        { title: 'Song B', artist: 'Artist 2' },
        { title: 'Song C', artist: 'Artist 3' },
        { title: 'Song D', artist: 'Artist 4' },
      ];
      setRecommendedSongs(mockSongs); // Replace with real recommendation logic if available
    };

    fetchRecommendedSongs();
  }, [userSelections]);

  return (
    <div className="songs-container">
      <h1>Recommended Songs</h1>
      <p>Based on your selections</p>
      <div className="song-list">
        {recommendedSongs.map((song, index) => (
          <div key={index} className="song-item">
            <div className="song-info">
              <p className="song-title">{song.title}</p>
              <p className="song-artist">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Songs;

