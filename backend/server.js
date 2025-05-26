const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

app.use(cors());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));



// Define a schema and model for songs
const songSchema = new mongoose.Schema({
    artist: String,
    song: String,
    duration: String,
    image: String,
    url: String
},{collection: 'songs'});

const Song = mongoose.model('Song', songSchema);

// API endpoint to get songs
app.get('/api/songs', async (req, res) => {
    const limit = parseInt(req.query.limit) || 0; // Get limit from query, default to 0 for all songs

    try {
        const songs = await Song.find().limit(limit); // Fetch songs from MongoDB
        res.json(songs); // Send songs as JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching songs', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
