import React, { useState, useEffect } from 'react';
import './MusicNews.css';
import musicNewsData from './musicNews.json'

function getRandomNews(newsArray, count) {
  const shuffled = [...newsArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const MusicNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const randomNews = getRandomNews(musicNewsData, 8);
    setNews(randomNews);
  }, []);

  return (
    <div className="music-news-container">
      <h1>Today's Music News</h1>
      <div className="news-cards">
        {news.map((item, index) => (
          <div key={index} className="news-card">
            <h2>{item.title}</h2>
            <p>{item.snippet}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicNews;