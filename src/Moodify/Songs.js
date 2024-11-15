import React, { useState } from "react";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = {
    activity: localStorage.getItem('selectedActivity').toString(),
    mood: localStorage.getItem('selectedMoods').toString(),
    time: localStorage.getItem('selectedTime').toString(),
    weather: localStorage.getItem('selectedWeather').toString()
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

getRecommendation();


  if (loading) return <p>Loading recommendations...</p>;
  return (
      <div>
        <h1>Recommended Songs</h1>
        <ul>
          {Array.isArray(songs) ? (
              songs.map((song, index) => (
                  <li key={index}>
                    <strong>{song.title}</strong> by {song.artist} -{" "}
                    <a href={song.link} target="_blank" rel="noopener noreferrer">
                      Listen
                    </a>
                  </li>
              ))
          ) : (
              <p>No songs available</p>
          )}
        </ul>
      </div>
  );
};

export default Songs;


