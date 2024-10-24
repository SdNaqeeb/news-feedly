// models/News.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  url: String,
  source: String,
  publishedAt: Date,
});

module.exports = mongoose.model('News', newsSchema);
