// server/models/Skill.js

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner','Intermediate','Advanced'],
    default: 'Beginner'
  },
  linkedJobs: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }
  ],
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:true,
    }
}, { timestamps: true });

// Compound index: unique skill name per user
skillSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Skill', skillSchema);
