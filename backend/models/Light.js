const { Schema, model } = require('mongoose');

const LightSchema = new Schema({
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
  state: {
    type: Boolean,
    required: true,
  },
  intensity: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

module.exports = model('Light', LightSchema);