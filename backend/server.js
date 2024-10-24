const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const dotenv = require("dotenv");
const axios = require("axios");

const newsRoutes = require("./routes/news"); // Importing the news routes

const News = require('./models/News'); // Import the News model
dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins for development
app.use(bodyParser.json());
app.use("/news", newsRoutes); // Use news routes

const fetchAndSaveNews = async () => {
  const apiKey = 'ffeb89818dc64315850bd81981fff974';
  const url = `https://newsapi.org/v2/everything?q=health OR sport OR apple OR politics OR fitness OR entertainment&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles;

    // Save each article to MongoDB
    articles.forEach(async (article) => {
      const existingNews = await News.findOne({ title: article.title });
      if (!existingNews) {
        const newNews = new News({
          title: article.title,
          description: article.description,
          content: article.content,
          url: article.url,
          source: article.source.name,
          publishedAt: new Date(article.publishedAt),
        });
        await newNews.save();
      }
    });

    console.log('News fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

// Schedule the cron job to run every 24 hours
cron.schedule('0 0 * * *', fetchAndSaveNews);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
