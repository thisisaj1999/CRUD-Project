const mongoose = require('mongoose');

const userData = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, `${this.username} already exists.`],
  },
  contact: {
    type: Number,
    required: true,
    unique: [true, `${this.username} already exists.`],
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

// collection
const User = new mongoose.model('User', userData);

module.exports = User;
