import React, { useState } from 'react';
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
  const [file, setFile] = useState(null);
  //handle logout
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/Moodify/Login');
  };

  //upload image
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const response = await fetch('http://127.0.0.1:5001/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {
                console.log("Image uploaded successfully",data.fileurl);
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image"></div>
        <h2>James S. William</h2>
      </div>
        {/*upload image */}
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
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