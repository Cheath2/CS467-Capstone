// server/models/Skill.js

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ['Beginner','Intermediate','Advanced'],
    default: 'Beginner'
  },
  linkedJobs: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
