import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [file, setFile] = useState(null);
  const username = localStorage.getItem("user");

  useEffect(() => {
    const fetchProfile = async () => {
      if (username) {
        try {
          const response = await fetch(`${process.env.REACT_APP_REMOTE_SERVER}/api/profile?username=${username}`);
          const data = await response.json();
          if (data.error) {
            console.error("Error retrieving profile:", data.error);
          } else {
            setProfile(data);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        console.error("No username found in local storage.");
      }
    };

    const fetchLikedSongs = async () => {
      if (username) {
        try {
          const response = await fetch(`${process.env.REACT_APP_REMOTE_SERVER}/api/liked-songs/${username}`);
          const data = await response.json();
          if (data.error) {
            console.error("Error retrieving liked songs:", data.error);
          } else {
            setLikedSongs(data);
          }
        } catch (error) {
          console.error("Error fetching liked songs:", error);
        }
      }
    };

    fetchProfile();
    fetchLikedSongs();
  }, [username]);

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
      const response = await fetch(`${process.env.REACT_APP_REMOTE_SERVER}/api/upload`, {
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

  const handleUnlike = async (title, artist) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REMOTE_SERVER}/api/unlike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          title: title,
          artist: artist,
        }),
      });
  
      if (response.ok) {
        setLikedSongs((prevSongs) =>
          prevSongs.filter((song) => song.title !== title || song.artist !== artist)
        );
        console.log("Song unliked successfully");
      } else {
        const error = await response.json();
        console.error("Failed to unlike the song:", error.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error unliking the song:", error);
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
      <div className="favourite-songs-container">
        <div className="table-container">
          <table className="songs-table">
            <thead>
              <tr>
                <th>Song Name</th>
                <th>Artist</th>
                <th>Actions</th>
                <th>Like</th>
              </tr>
            </thead>
            <tbody>
              {likedSongs.length > 0 ? (
                likedSongs.map((song, index) => (
                  <tr key={index}>
                    <td className="song-name">{song.title}</td> 
                    <td className="song-artist">{song.artist}</td>
                    <td className="song-actions">
                      <a href={song.link} target="_blank" rel="noopener noreferrer">
                        Listen
                      </a>
                    </td> 
                    <td className="song-like">
                      <button
                        className={`like-button ${likedSongs.includes(song) ? "liked" : ""}`}
                        onClick={() => handleUnlike(song.title, song.artist)}
                      >
                        ♥
                      </button>
                    </td> 
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No liked songs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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