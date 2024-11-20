import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState(null);

  const username = localStorage.getItem("user");

  useEffect(() => {
    const username = localStorage.getItem("user");

    if (username) {
      fetch(`http://127.0.0.1:5001/api/profile?username=${username}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error("Error retrieving profile:", data.error);
          } else {
            setProfile(data);
          }
        })
        .catch(error => console.error("Error fetching profile:", error));
    } else {
      console.error("No username found in local storage.");
    }
  }, []); 

  // Handle logout
  const handleLogout = () => {
    localStorage.clear(); // clear all selection
    navigate('/Moodify/Login');
  };

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    handleUpload(event.target.files[0]); // Automatically upload when a file is selected
  };

  // Handle file upload
  const handleUpload = async (selectedFile) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5001/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        const newProfile = {
          ...profile,
          img: data.fileUrl, // upload image
        };

        setProfile(newProfile); // update local
        localStorage.setItem("profileImage", data.fileUrl);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
            id="profileImage"
            src={profile.img || "/images/profile.jpg"}
            alt="Profile Image"
            onClick={() => document.getElementById('fileInput').click()} // Trigger file input on image click
            style={{ cursor: 'pointer' }} // Add cursor style to indicate clickability
        />
        <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }} // Hide the input element
            onChange={handleFileChange} // Trigger file change handler
        />
        <h2 id="name">{profile.username}</h2>
        <p id="email">{profile.email}</p>
      </div>

      <div className="tabs">
        <span className="active-tab">Favourite Songs</span>
      </div>

      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
