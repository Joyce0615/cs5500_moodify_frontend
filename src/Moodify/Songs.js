import React, { useState, useEffect } from "react";
import "./Songs.css";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedSongs, setLikedSongs] = useState([]);
  const username = localStorage.getItem("user");

  const data = {
    activity: localStorage.getItem("selectedActivity")?.toString() || "",
    mood: localStorage.getItem("selectedMoods")?.toString() || "",
    time: localStorage.getItem("selectedTime")?.toString() || "",
    weather: localStorage.getItem("selectedWeather")?.toString() || "",
  };

    // Replace this with your API endpoint
  const getRecommendation = async () => {

    console.log(data);
    const response = await fetch("http://127.0.0.1:5001/api/recommend", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'  // Specify JSON content type
      },
      body: JSON.stringify(data),
    });
    if(response.ok){

      const music= await response.json();
      console.log(music);
      setSongs(music.recommendations);

      setLoading(false);
    }
  }

  const toggleLike = async (index) => {
    const selectedSong = songs[index];
    if (!selectedSong || !username) {
      console.error("No song or user available");
      return;
    }
 
    if (likedSongs.includes(index)) {
      setLikedSongs(likedSongs.filter((i) => i !== index));
  
      try {
        const response = await fetch("http://127.0.0.1:5001/api/unlike", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            title: selectedSong.title,
            artist: selectedSong.artist,
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log("Song unliked successfully:", result.message);
        } else {
          console.error("Failed to unlike the song");
          const errorData = await response.json();
          console.error("Error details:", errorData);
        }
      } catch (error) {
        console.error("Error unliking the song:", error);
      }
      return;
    }
  
    setLikedSongs([...likedSongs, index]);
  
    try {
      const response = await fetch("http://127.0.0.1:5001/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          title: selectedSong.title,
          artist: selectedSong.artist,
          link: selectedSong.link,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Song liked successfully:", result.message);
      } else {
        console.error("Failed to like the song");
      }
    } catch (error) {
      console.error("Error liking the song:", error);
    }
  };
  
  useEffect(()=>{
    getRecommendation();
  },[]);

  if (loading) return <p>Loading recommendations...</p>;
  
  return (
    <div className="container">
      <h1>Recommended Songs</h1>
      <div className="songs-table">
        <div className="songs-header">
          <div className="song-name">Song Name</div>
          <div className="song-artist">Artist</div>
          <div className="song-actions">Actions</div>
          <div className="song-like">Like</div>
        </div>
        {Array.isArray(songs) ? (
          songs.map((song, index) => (
            <div className="song-row" key={index}>
              <div className="song-name">{song.title}</div>
              <div className="song-artist">{song.artist}</div>
              <div className="song-actions">
                <a href={song.link} target="_blank" rel="noopener noreferrer">
                  Listen
                </a>
              </div>
              <div className="song-like">
                <button
                  className={`like-button ${likedSongs.includes(index) ? "liked" : ""}`}
                  onClick={() => toggleLike(index)}
                >
                  ♥
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No songs available</p>
        )}
      </div>
    </div>
  );
};


export default Songs;


