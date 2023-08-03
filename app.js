const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000; // Change this to your desired port

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/redalert', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Enable CORS
app.use(cors());

// Parse incoming JSON data
app.use(bodyParser.json());

// Define the Location model
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: Date,
});
const Location = mongoose.model('Location', locationSchema);

// Define the API endpoint to receive location data
app.post('/api/location', (req, res) => {
  const { latitude, longitude } = req.body;
  const newLocation = new Location({
    latitude,
    longitude,
    timestamp: new Date(),
  });
  newLocation.save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// Define the API endpoint to fetch location data


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
