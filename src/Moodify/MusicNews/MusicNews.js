import React from 'react';
import './MusicNews.css';

function MusicNews() {
  const news = [
    { id: 1, title: "New Album Release: Artist X", content: "Artist X releases their latest album today!" },
    { id: 2, title: "Top Chart Update", content: "Song Y tops the charts for the second week in a row." },
    { id: 3, title: "Music Festival Announced", content: "A new music festival is coming to town this summer." },
    { id: 4, title: "Exclusive Interview with Artist Z", content: "Catch our exclusive interview with Artist Z about their new project." },
  ];

  return (
    <div className="music-news-container">
      <h1>Today's Music News</h1>
      <div className="news-feed">
        {news.map((item) => (
          <div key={item.id} className="news-item">
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicNews;
