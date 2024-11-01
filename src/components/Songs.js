import React from 'react';
import '../styles/Songs.css';


function Songs() {
  const songs = [
    { title: 'Song A', url: 'https://link-to-song-a.com' },
    { title: 'Song B', url: 'https://link-to-song-b.com' },
    { title: 'Song C', url: 'https://link-to-song-c.com' }
  ];

  return (
    <div className="songs">
      <h2>Recommended Songs</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <a href={song.url} target="_blank" rel="noopener noreferrer">
              {song.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Songs;
