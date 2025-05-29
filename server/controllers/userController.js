const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('skills', 'name proficiency');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);

  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ error: 'Server error fetching user' });
  }
};

exports.updateCurrentUser = async (req, res) => {
  try {
    console.log('🔍 Incoming update request from userId:', req.userId);
    console.log('📦 Request body:', req.body);

    const { firstName, lastName, email, phone, bio, profileImage } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ✅ Update fields conditionally
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;
    if (profileImage !== undefined) user.profileImage = profileImage;

    // ✅ Only change email if it's new and not in use
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && !existingUser._id.equals(user._id)) {
        return res.status(409).json({ error: 'Email already in use' });
      }
      user.email = email;
    }

    await user.save();

    const populatedUser = await user.populate('skills', 'name proficiency');
    const userObj = populatedUser.toObject();
    delete userObj.password;
    delete userObj.__v;

    res.json(userObj);

  } catch (err) {
    console.error('❌ Error updating user:', err);
    res.status(500).json({ error: 'Server error updating profile' });
  }
};
