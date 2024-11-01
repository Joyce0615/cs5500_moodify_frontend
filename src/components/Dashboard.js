// import React, { useState } from 'react';
// import '../styles/Dashboard.css';

// const genres = [
//   'Americana', 'Rock', 'Hip-Hop', 'R&B/Soul', 'Electronic', 
//   'Pop', 'Country', 'Alternative', 'Christian', 'Blues', 'Indie'
// ];

// function Dashboard() {
//   const [selectedGenres, setSelectedGenres] = useState([]);

//   const toggleGenre = (genre) => {
//     setSelectedGenres((prevSelected) =>
//       prevSelected.includes(genre)
//         ? prevSelected.filter((g) => g !== genre)
//         : [...prevSelected, genre]
//     );
//   };

//   const handleNext = () => {
//     // Proceed to age/gender/mood selection based on your flow
//     console.log("Selected genres:", selectedGenres);
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Tap on the genres you like</h1>
//       <p>Tap twice on the ones you love, press and hold on the ones you hate.</p>
//       <div className="genre-bubbles">
//         {genres.map((genre) => (
//           <div
//             key={genre}
//             className={`bubble ${selectedGenres.includes(genre) ? 'selected' : ''}`}
//             onClick={() => toggleGenre(genre)}
//           >
//             {genre}
//           </div>
//         ))}
//       </div>
//       <button className="next-button" onClick={handleNext}>
//         Next
//       </button>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const genres = [
  'Americana', 'Rock', 'Hip-Hop', 'R&B/Soul', 'Electronic', 
  'Pop', 'Country', 'Alternative', 'Christian', 'Blues', 'Indie'
];

function Dashboard() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((g) => g !== genre)
        : [...prevSelected, genre]
    );
  };

  const handleNext = () => {
    if (selectedGenres.length > 0) {
      navigate('/age-selection'); // Ensure this path matches the route in App.js
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Tap on the genres you like</h1>
      <p>Tap twice on the ones you love, press and hold on the ones you hate.</p>
      <div className="genre-bubbles">
        {genres.map((genre) => (
          <div
            key={genre}
            className={`bubble ${selectedGenres.includes(genre) ? 'selected' : ''}`}
            onClick={() => toggleGenre(genre)}
          >
            {genre}
          </div>
        ))}
      </div>
      <button className="next-button" onClick={handleNext} disabled={selectedGenres.length === 0}>
        Next
      </button>
    </div>
  );
}

export default Dashboard;
