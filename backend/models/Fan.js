const { Schema, model } = require('mongoose');

const FanSchema = new Schema({
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
  isActive: {
    type: Boolean,
    required: true,
  },
});

module.exports = model('Fan', FanSchema);