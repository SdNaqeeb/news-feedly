// routes/news.js
const express = require('express');
const News = require('../models/News'); // Import the News model
const router = express.Router();

// Fetch news with optional filters (query and sources)
router.get('/', async (req, res) => {
  const { q, sources } = req.query;
  let query = {};

  // Search by query in title, description, or content
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } }, // Case-insensitive search
      { description: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } },
    ];
  }

  // Filter by selected sources
  if (sources) {
    query.source = { $in: sources.split(',') };
  }

  try {
    const news = await News.find(query).sort({ publishedAt: -1 }); // Sort by latest news
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error });
  }
});

module.exports = router;
