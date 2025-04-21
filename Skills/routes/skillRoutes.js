const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  linkedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }]
});

module.exports = mongoose.model('Skill', skillSchema);
