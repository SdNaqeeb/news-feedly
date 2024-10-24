import React from 'react';
import NewsItem from './NewsItem';

function NewsList({ news }) {
  return (
    <div className='news-list'>
      {news.map((item) => (
        <NewsItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default NewsList;