const mongoose = require('mongoose');

/**
 * Job Schema defines the structure for storing job application entries.
 */
const jobSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company:  { type: String, required: true },
  role:     { type: String, required: true },
  location: { type: String },

  status:   { type: String, enum: ['active','applied','interviewing','offer','rejected'], default: 'applied' },

  link:     { type: String },              // ✅ ADDED
  note:     { type: String },              // ✅ RENAMED from 'notes'
  date:     { type: Date },                // ✅ RENAMED from 'deadline'

  skills:   {
  type: [String],
  required: true,
  validate: {
    validator: function (arr) {
      return Array.isArray(arr) && arr.length > 0;
    },
    message: 'At least one skill is required.'
  }
}
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
