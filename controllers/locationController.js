const Location = require('../models/Location');

async function createLocation(req, res) {
  const { latitude, longitude } = req.body;
  try {
    const newLocation = new Location({
      latitude,
      longitude,
    });
    await newLocation.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function getLocations(req, res) {
  try {
    const locations = await Location.find({}, 'latitude longitude createdAt updatedAt');
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = {
  createLocation,
  getLocations,
};
