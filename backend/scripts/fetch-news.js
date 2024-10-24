const fetchNewsFromAPI = require('../routes/news').fetchNewsFromAPI;

fetchNewsFromAPI()
  .then(() => console.log('News fetched and saved'))
  .catch(err => console.error('Error fetching news:', err));