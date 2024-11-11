import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  // const recommendations = [
  //   { title: 'Every Night (Night Visions)', artist: 'Imagine Dragons' },
  //   { title: 'Atlantic (Under the Iron Sea)', artist: 'Keane' },
  //   { title: 'One More Night (Overexposed)', artist: 'Maroon 5' },
  //   { title: 'Honey Bee (Red River Blue)', artist: 'Blake Shelton' },
  // ];
  const navigate = useNavigate();

  //handle logout
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/Moodify/Login');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image"></div>
        <h2>James S. William</h2>
      </div>
      <div className="tabs">
        <span className="active-tab">Favourite Songs</span>
        <span>Profile</span>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Profile;