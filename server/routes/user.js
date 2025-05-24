const express = require('express');
const User = require('../models/User');
const { getCurrentUser, updateCurrentUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @route   GET /api/user/me
 * @desc    Fetch the authenticated user's profile (without password) and populated skills
 * @access  Protected (verifyToken applied in index.js)
 */
router.get('/me', getCurrentUser);

/**
 * @route   PUT /api/user/me
 * @desc    Update authenticated user's profile (bio, phone, image, etc.)
 * @access  Protected
 */
router.put('/me', updateCurrentUser);

/**
 * @route   DELETE /api/user/skills/:skillId
 * @desc    Remove a skill from the authenticated user's profile
 * @access  Protected
 */
router.delete('/skills/:skillId', async (req, res) => {
  try {
    // req.userId is set by your verifyToken middleware
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Remove the skill ObjectId from the user's skills array
    user.skills.pull(req.params.skillId);
    await user.save();

    res.json({ 
      message: '✅ Skill removed from your profile',
      skills: user.skills 
    });
  } catch (err) {
    console.error('Error removing skill:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
