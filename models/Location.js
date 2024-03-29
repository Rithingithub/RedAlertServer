const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
