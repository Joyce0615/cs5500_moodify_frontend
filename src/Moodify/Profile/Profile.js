import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const username = localStorage.getItem("user");

  if (username) {
    fetch(`http://127.0.0.1:5001/api/profile?username=${username}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error("Error retrieving profile:", data.error);
        } else {
          displayUserProfile(data); // Function to update UI with profile data
        }
      })
      .catch(error => console.error("Error fetching profile:", error));
  } else {
    console.error("No username found in local storage.");
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('user', "");
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
        const newdata = {
          img: data.fileUrl.toString(),
          username: localStorage.getItem("user"),
        };
        console.log(newdata);

        const res = await fetch('http://127.0.0.1:5001/api/img', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Specify JSON content type
          },
          body: JSON.stringify(newdata)
        });
        if (res.ok) {
          console.log("Upload to MySQL successfully");
          displayUserProfile(newdata); // Update the UI with the new profile image
        }
        console.log("Image uploaded successfully", data.fileUrl);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function displayUserProfile(profile) {
    document.getElementById("name").innerText = profile.username;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("profileImage").src = profile.img ? profile.img : "/images/profile.jpg";
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
            id="profileImage"
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
        <h1 id="name"></h1>
        <p id="email"></p>
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
