import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SourceFilter from './SourceFilter';
import NewsList from './NewsList';

function HomePage() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState([]);

  // Fetch news whenever query or selected sources change
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Prepare query parameters dynamically based on selected sources and query
        const queryParams = new URLSearchParams();
        if (query) queryParams.append('q', query);
        // Only append sources if there are any selected
        if (selectedSources.length) queryParams.append('q', selectedSources.join('OR'));

        const response = await axios.get(`http://localhost:3000/news?${queryParams.toString()}`);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [query, selectedSources]); // Fetch news again when query or selected sources change

  const handleSearch = (newQuery) => setQuery(newQuery);

  const handleSourceChange = (source) => {
    setSelectedSources((prevSources) => {
      if (prevSources.includes(source)) {
        // Remove the source if already selected
        return prevSources.filter((s) => s !== source);
      } else {
        // Add the new source to selected sources
        return [...prevSources, source];
      }
    });
  };

  return (
    <div className='home'>
      <SearchBar onSearch={handleSearch} />
      <SourceFilter onSourceChange={handleSourceChange} />
      <NewsList news={news} />
    </div>
  );
}

export default HomePage;
