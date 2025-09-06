const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock video IDs (same as in seed.js)
const mockVideoIds = [
  'dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
  'kJQP7kiw5Fk', // Despacito - Luis Fonsi ft. Daddy Yankee
  'JGwWNGJdvx8', // Shape of You - Ed Sheeran
  'RgKAFK5djSk', // Wiz Khalifa - See You Again ft. Charlie Puth
  'CevxZvSJLk8', // Katy Perry - Roar
  'hTWKbfoikeg', // Smash Mouth - All Star
  'YQHsXMglC9A', // Adele - Hello
  'fWNaR-rxAic', // Carly Rae Jepsen - Call Me Maybe
  'iLBBRuVDOo4', // Gangnam Style - PSY
  'L_jWHffIx5E'  // Smash Mouth - All Star (Official Video)
];

// Mock YouTube API data for demonstration
const mockVideoData = {
  'dQw4w9WgXcQ': {
    title: 'Rick Astley - Never Gonna Give You Up (Official Video)',
    channelTitle: 'RickAstleyVEVO',
    description: 'The official video for "Never Gonna Give You Up" by Rick Astley',
    thumbnails: {
      default: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg',
      medium: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      high: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    duration: 'PT3M33S',
    viewCount: '1234567890',
    likeCount: '12345678',
    publishedAt: '2009-10-25T06:57:33Z'
  },
  'kJQP7kiw5Fk': {
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    channelTitle: 'LuisFonsiVEVO',
    description: 'Official Music Video for Despacito',
    thumbnails: {
      default: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/default.jpg',
      medium: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/mqdefault.jpg',
      high: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg'
    },
    duration: 'PT4M42S',
    viewCount: '8234567890',
    likeCount: '45678901',
    publishedAt: '2017-01-12T16:00:01Z'
  },
  'JGwWNGJdvx8': {
    title: 'Ed Sheeran - Shape of You (Official Video)',
    channelTitle: 'Ed Sheeran',
    description: 'Official music video for Shape of You by Ed Sheeran',
    thumbnails: {
      default: 'https://i.ytimg.com/vi/JGwWNGJdvx8/default.jpg',
      medium: 'https://i.ytimg.com/vi/JGwWNGJdvx8/mqdefault.jpg',
      high: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg'
    },
    duration: 'PT3M54S',
    viewCount: '5678901234',
    likeCount: '23456789',
    publishedAt: '2017-01-30T11:04:14Z'
  }
};

// Function to get mock video metadata
function getMockVideoMetadata(videoIds) {
  return videoIds.map(videoId => {
    // Use mock data if available, otherwise generate generic data
    if (mockVideoData[videoId]) {
      return {
        videoId,
        ...mockVideoData[videoId]
      };
    }
    
    // Generate generic mock data for other video IDs
    return {
      videoId,
      title: `Sample Video Title - ${videoId}`,
      channelTitle: 'Sample Channel',
      description: `This is a sample video description for video ID: ${videoId}`,
      thumbnails: {
        default: `https://i.ytimg.com/vi/${videoId}/default.jpg`,
        medium: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        high: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      },
      duration: 'PT4M13S',
      viewCount: Math.floor(Math.random() * 1000000000).toString(),
      likeCount: Math.floor(Math.random() * 10000000).toString(),
      publishedAt: '2023-01-01T12:00:00Z'
    };
  });
}

// Routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Learnoverse demo server is running' });
});

// Get all videos with mock metadata
app.get('/api/videos', async (req, res) => {
  try {
    console.log('Fetching videos with mock data...');
    
    // Use mock video IDs
    const enrichedVideos = getMockVideoMetadata(mockVideoIds);
    
    res.json({
      success: true,
      count: enrichedVideos.length,
      videos: enrichedVideos,
      note: 'This is demo data for testing purposes'
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
    
    // Check if video ID is in our mock list
    if (!mockVideoIds.includes(videoId)) {
      return res.status(404).json({
        success: false,
        message: 'Video not found in database'
      });
    }

    // Get mock metadata
    const enrichedVideos = getMockVideoMetadata([videoId]);
    
    if (enrichedVideos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
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

// Start server
app.listen(PORT, () => {
  console.log(`Learnoverse demo server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Videos API: http://localhost:${PORT}/api/videos`);
  console.log('Using mock data for demonstration purposes');
});

module.exports = app;
