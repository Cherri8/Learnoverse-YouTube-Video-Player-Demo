const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL - Replace with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://learnoverse:learnoverse123@cluster0.mongodb.net/learnoverse?retryWrites=true&w=majority';

// YouTube API Key - Replace with your actual API key
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Video Schema
const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Video = mongoose.model('Video', videoSchema);

// Function to fetch video metadata from YouTube API
async function fetchVideoMetadata(videoIds) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoIds.join(','),
        key: YOUTUBE_API_KEY
      }
    });

    return response.data.items.map(item => ({
      videoId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnails: {
        default: item.snippet.thumbnails.default?.url,
        medium: item.snippet.thumbnails.medium?.url,
        high: item.snippet.thumbnails.high?.url,
        standard: item.snippet.thumbnails.standard?.url,
        maxres: item.snippet.thumbnails.maxres?.url
      },
      duration: item.contentDetails.duration,
      viewCount: item.statistics.viewCount,
      likeCount: item.statistics.likeCount,
      tags: item.snippet.tags || []
    }));
  } catch (error) {
    console.error('Error fetching YouTube metadata:', error.response?.data || error.message);
    throw error;
  }
}

// Routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Learnoverse server is running' });
});

// Get all videos with enriched metadata
app.get('/api/videos', async (req, res) => {
  try {
    // Fetch video IDs from MongoDB
    const videos = await Video.find({}).select('videoId');
    
    if (videos.length === 0) {
      return res.json({ 
        success: false, 
        message: 'No videos found in database. Please seed the database first.',
        videos: []
      });
    }

    const videoIds = videos.map(video => video.videoId);
    
    // Fetch metadata from YouTube API
    const enrichedVideos = await fetchVideoMetadata(videoIds);
    
    res.json({
      success: true,
      count: enrichedVideos.length,
      videos: enrichedVideos
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching videos',
      error: error.message
    });
  }
});

// Get single video by ID
app.get('/api/videos/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    // Check if video exists in database
    const video = await Video.findOne({ videoId });
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found in database'
      });
    }

    // Fetch metadata from YouTube API
    const enrichedVideos = await fetchVideoMetadata([videoId]);
    
    if (enrichedVideos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Video not found on YouTube'
      });
    }

    res.json({
      success: true,
      video: enrichedVideos[0]
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching video',
      error: error.message
    });
  }
});

// Add a new video ID (for testing purposes)
app.post('/api/videos', async (req, res) => {
  try {
    const { videoId } = req.body;
    
    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: 'Video ID is required'
      });
    }

    // Check if video already exists
    const existingVideo = await Video.findOne({ videoId });
    if (existingVideo) {
      return res.status(409).json({
        success: false,
        message: 'Video already exists in database'
      });
    }

    // Create new video entry
    const video = new Video({ videoId });
    await video.save();

    res.status(201).json({
      success: true,
      message: 'Video added successfully',
      video: { videoId }
    });
  } catch (error) {
    console.error('Error adding video:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding video',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Learnoverse server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Videos API: http://localhost:${PORT}/api/videos`);
});

module.exports = app;
