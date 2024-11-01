import React from 'react';
import '../styles/Profile.css';


function Profile() {
  const likedSongs = ["Song A", "Song B", "Song C"];
  const history = ["Song X", "Song Y", "Song Z"];
  
  return (
    <div className="profile">
      <h2>Profile</h2>
      <div>
        <h3>Liked Songs</h3>
        <ul>
          {likedSongs.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Listening History</h3>
        <ul>
          {history.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
