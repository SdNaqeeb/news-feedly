import React, { useState } from 'react';

function SourceFilter({ onSourceChange }) {
  const [sources] = useState([
    'entertainment',
    'fitness',
    'health',
    'apple',
    'sport',
    'politics',
    // Add more sources here
  ]);

  const handleCheckboxChange = (source) => {
    onSourceChange(source);
  };

  return (
    <div className="source-filter">
      <h3>Select Sources:</h3>
      {sources.map((source) => (
        <div key={source}>
          <input
            type="checkbox"
            id={source}
            value={source}
            onChange={() => handleCheckboxChange(source)}
          />
          <label htmlFor={source}>{source}</label>
        </div>
      ))}
    </div>
  );
}

export default SourceFilter;
