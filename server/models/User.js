const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, unique: true, required: true },
  password:  { type: String, required: true },

  // Optional reference to related skills
  skills:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],

  // Optional profile fields
  phone:      { type: String },
  bio:        { type: String },
  profileImage: { type: String }, // Could be base64 or a URL

  // Fields for token-based session handling
  refreshToken:           { type: String },
  refreshTokenExpiresAt:  { type: Date }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
