import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileButton.css';

function ProfileButton() {
  const navigate = useNavigate();

  return (
    <button className="profile-button" onClick={() => navigate('/profile')}>
      Profile
    </button>
  );
}

export default ProfileButton;
