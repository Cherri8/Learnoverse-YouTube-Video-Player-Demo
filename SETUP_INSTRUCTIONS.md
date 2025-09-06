# Learnoverse - Complete Setup Instructions

## 🚀 Quick Start Guide

Follow these steps to get the Learnoverse YouTube video player app running on your system.

### Prerequisites

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **React Native CLI** - Install globally:
   ```bash
   npm install -g react-native-cli
   ```
3. **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/atlas)
4. **YouTube Data API Key** - [Get from Google Cloud Console](https://console.cloud.google.com/)

### Step 1: MongoDB Setup

1. **Create MongoDB Atlas Cluster:**
   - Sign up/login to MongoDB Atlas
   - Create a new cluster (free tier is fine)
   - Create a database named `learnoverse`
   - Create a collection named `videos`

2. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

### Step 2: YouTube API Setup

1. **Google Cloud Console:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable "YouTube Data API v3"
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Copy your API key

### Step 3: Server Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   copy .env.example .env
   ```

4. **Edit .env file with your credentials:**
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   YOUTUBE_API_KEY=your_youtube_api_key_here
   PORT=3000
   ```

5. **Seed the database:**
   ```bash
   npm run seed
   ```

6. **Start the server:**
   ```bash
   npm start
   ```

7. **Verify server is running:**
   - Open http://localhost:3000/health
   - Should see: `{"status":"OK","message":"Learnoverse server is running"}`

### Step 4: Client Setup

1. **Open new terminal and navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **For iOS (macOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Update server URL in client:**
   - Open `src/services/api.js`
   - Update `BASE_URL` if needed:
     - Android emulator: `http://10.0.2.2:3000`
     - iOS simulator: `http://localhost:3000`
     - Physical device: `http://YOUR_COMPUTER_IP:3000`

5. **Start Metro bundler:**
   ```bash
   npx react-native start
   ```

6. **Run the app (in new terminal):**
   
   **For Android:**
   ```bash
   npx react-native run-android
   ```
   
   **For iOS:**
   ```bash
   npx react-native run-ios
   ```

## 📱 Testing the App

1. **App should launch** showing "Learnoverse" with a list of 10 YouTube videos
2. **Tap any video** to open the video player screen
3. **Video should play** inside the app (not redirect to YouTube)
4. **Navigate back** to see the list again
5. **Try different videos** to verify all functionality

## 🔧 Troubleshooting

### Server Issues

- **MongoDB connection error:** Check your connection string and network access
- **YouTube API error:** Verify your API key and quota limits
- **Port already in use:** Change PORT in .env file

### Client Issues

- **Metro bundler issues:**
  ```bash
  npx react-native start --reset-cache
  ```

- **Android build issues:**
  ```bash
  cd android && ./gradlew clean && cd ..
  ```

- **Network connection error:** 
  - Check if server is running on correct port
  - Update BASE_URL in api.js with correct IP address

### Common Solutions

1. **Clear React Native cache:**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Reinstall node_modules:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **For Android emulator network issues:**
   - Use `http://10.0.2.2:3000` instead of `localhost:3000`

## 📋 Assignment Deliverables Checklist

- ✅ **MongoDB**: 10 video IDs stored, connection URL in code
- ✅ **Server**: Node.js with YouTube API integration
- ✅ **Client**: React Native with video list and player screens
- ✅ **In-app playback**: Using react-native-youtube-iframe
- ✅ **GitHub repos**: Separate client/ and server/ directories
- ✅ **README files**: Setup instructions provided
- ⏳ **Screen recording**: Record 2-minute demo (app launch → list → tap → play → back → tap another)

## 🎥 Screen Recording Instructions

Record a 2-minute video showing:
1. App launch
2. List of 10 videos displayed
3. Tap on a video
4. Video plays inside the app
5. Navigate back to list
6. Tap on another video
7. Second video plays

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure server is running before starting the client
4. Check network connectivity between client and server

**MongoDB Connection URL for Assignment Evaluation:**
```
mongodb+srv://learnoverse:learnoverse123@cluster0.mongodb.net/learnoverse?retryWrites=true&w=majority
```

This connection URL is included in the server code as required by the assignment specifications.
