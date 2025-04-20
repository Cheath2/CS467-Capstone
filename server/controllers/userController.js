// server/controllers/userController.js

const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
  try {
    // req.userId is set by verifyToken middleware
    const user = await User.findById(req.userId)
      .select('-password')                                  // omit password hash
      .populate('skills', 'name proficiency');              // pull in skill name & proficiency

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user object with populated skills
    res.json(user);

  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ error: 'Server error fetching user' });
  }
};
