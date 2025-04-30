const mongoose = require('mongoose');

/**
 * Job Schema defines the structure for storing job application entries.
 */
const jobSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company:  { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String },
  status:   { type: String, enum: ['applied','interviewing','offer','rejected'], default: 'applied' },
  notes:    { type: String },
  deadline: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
