const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection URL - Replace with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://learnoverse:learnoverse123@cluster0.mongodb.net/learnoverse?retryWrites=true&w=majority';

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

// 10 Popular YouTube Video IDs for seeding
const videoIds = [
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

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Clear existing videos
    await Video.deleteMany({});
    console.log('Cleared existing videos');

    // Insert new video IDs
    const videos = videoIds.map(videoId => ({ videoId }));
    await Video.insertMany(videos);
    
    console.log(`Successfully seeded ${videoIds.length} video IDs:`);
    videoIds.forEach((id, index) => {
      console.log(`${index + 1}. ${id}`);
    });

    // Verify the data
    const count = await Video.countDocuments();
    console.log(`\nTotal videos in database: ${count}`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, videoIds };
