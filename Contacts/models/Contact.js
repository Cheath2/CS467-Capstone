const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  notes: {
    type: String
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job' // Optional reference for linking to jobs
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);