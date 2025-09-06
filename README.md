# Learnoverse Server - Node.js Backend

A Node.js Express server that connects to MongoDB and integrates with YouTube Data API to provide enriched video metadata.

## Features

- **MongoDB Integration**: Stores YouTube video IDs and retrieves them efficiently
- **YouTube Data API**: Fetches real-time metadata (title, thumbnails, duration, views, etc.)
- **RESTful API**: Clean endpoints for video data retrieval
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Cross-origin resource sharing for React Native client

## API Endpoints

### GET /health
Health check endpoint to verify server status.

**Response:**
```json
{
  "status": "OK",
  "message": "Learnoverse server is running"
}
```

### GET /api/videos
Fetches all videos from MongoDB and enriches them with YouTube metadata.

**Response:**
```json
{
  "success": true,
  "count": 10,
  "videos": [
    {
      "videoId": "dQw4w9WgXcQ",
      "title": "Rick Astley - Never Gonna Give You Up",
      "channelTitle": "RickAstleyVEVO",
      "description": "The official video for...",
      "thumbnails": {
        "default": "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
        "medium": "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        "high": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
      },
      "duration": "PT3M33S",
      "viewCount": "1234567890",
      "likeCount": "12345678",
      "publishedAt": "2009-10-25T06:57:33Z"
    }
  ]
}
```

### GET /api/videos/:videoId
Fetches a single video by ID with enriched metadata.

### POST /api/videos
Adds a new video ID to the database (for testing purposes).

**Request Body:**
```json
{
  "videoId": "dQw4w9WgXcQ"
}
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- YouTube Data API key from Google Cloud Console

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     YOUTUBE_API_KEY=your_youtube_api_key
     PORT=3000
     ```

3. **Get YouTube API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable YouTube Data API v3
   - Create credentials (API Key)
   - Copy the API key to your `.env` file

4. **MongoDB Setup:**
   - Create a MongoDB Atlas cluster or use local MongoDB
   - Create a database named `learnoverse`
   - Get your connection string and add it to `.env`

### Running the Server

1. **Seed the database:**
   ```bash
   npm run seed
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

3. **Verify server is running:**
   - Open http://localhost:3000/health
   - Should return: `{"status":"OK","message":"Learnoverse server is running"}`

## MongoDB Connection

**Important:** The MongoDB connection URL is included in the code as required by the assignment:

```javascript
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://learnoverse:learnoverse123@cluster0.mongodb.net/learnoverse?retryWrites=true&w=majority';
```

This allows direct access to the database for evaluation purposes.

## Database Schema

### Videos Collection
```javascript
{
  videoId: String (required, unique),
  createdAt: Date (default: now)
}
```

The server only stores video IDs in MongoDB. All other metadata (title, thumbnails, etc.) is fetched in real-time from the YouTube Data API.

## Seeded Video IDs

The database is pre-seeded with 10 popular YouTube video IDs:

1. `dQw4w9WgXcQ` - Rick Astley - Never Gonna Give You Up
2. `kJQP7kiw5Fk` - Despacito - Luis Fonsi ft. Daddy Yankee
3. `JGwWNGJdvx8` - Shape of You - Ed Sheeran
4. `RgKAFK5djSk` - Wiz Khalifa - See You Again ft. Charlie Puth
5. `CevxZvSJLk8` - Katy Perry - Roar
6. `hTWKbfoikeg` - Smash Mouth - All Star
7. `YQHsXMglC9A` - Adele - Hello
8. `fWNaR-rxAic` - Carly Rae Jepsen - Call Me Maybe
9. `iLBBRuVDOo4` - Gangnam Style - PSY
10. `L_jWHffIx5E` - Smash Mouth - All Star (Official Video)

## Error Handling

The server includes comprehensive error handling for:
- MongoDB connection issues
- YouTube API rate limits and errors
- Invalid video IDs
- Network connectivity problems

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **axios**: HTTP client for YouTube API
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
