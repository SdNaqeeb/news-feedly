import React from 'react';

function NewsItem({ item }) {
  return (
    <div className="news-card">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
}

export default NewsItem;