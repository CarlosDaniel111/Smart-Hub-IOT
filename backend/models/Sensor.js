const { Schema, model } = require('mongoose');

const SensorSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  humidity: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  vibration: {
    type: Number,
    required: true,
  },
  aperture: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

module.exports = model('Sensor', SensorSchema);