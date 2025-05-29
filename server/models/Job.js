const mongoose = require('mongoose');

/**
 * Job Schema defines the structure for storing job application entries.
 */
const jobSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company:  { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String },
  status:   { type: String, enum: ['active','applied','interviewing','offer','rejected'], default: 'applied' },
  notes:    { type: String },
  deadline: { type: Date },
  skills: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
