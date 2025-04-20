// server/controllers/skillController.js

const Skill = require('../models/Skill');
const User  = require('../models/User');

/**
 * Add an existing skill to the authenticated user.
 * Expects: { skillId: "<Skill ObjectId>" } in body,
 * and req.userId set by verifyToken middleware.
 */
exports.addSkillToUser = async (req, res) => {
  console.log('🔐 addSkillToUser: req.userId =', req.userId);
  console.log('🔐 addSkillToUser: req.headers.authorization =', req.headers.authorization);
  const { skillId } = req.body;
  try {
    // 1) Verify the skill exists
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }

    // 2) Load the user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // 3) Prevent duplicate entries
    if (user.skills.some(id => id.toString() === skillId)) {
      return res.status(400).json({ msg: 'User already has this skill' });
    }

    // 4) Add skill and save
    user.skills.push(skillId);
    await user.save();

    // 5) Populate the skills field (new populate API)
    await user.populate({
      path: 'skills',
      select: 'name level'    // include only name and level
    });

    // 6) Return the newly populated skills array
    return res.json(user.skills);
  } catch (err) {
    console.error('Error in addSkillToUser:', err);
    return res.status(500).json({ error: 'Could not add skill' });
  }
};

/**
 * Remove a skill from the authenticated user.
 * Expects :skillId as URL param,
 * and req.userId set by verifyToken middleware.
 */
exports.removeSkillFromUser = async (req, res) => {
  const { skillId } = req.params;
  try {
    // 1) Load the user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // 2) Filter out the skill
    const originalCount = user.skills.length;
    user.skills = user.skills.filter(id => id.toString() !== skillId);

    // 3) If nothing was removed, skill wasn't on the user
    if (user.skills.length === originalCount) {
      return res.status(400).json({ msg: 'Skill not linked to user' });
    }

    // 4) Save updated user
    await user.save();

    // 5) Populate the remaining skills
    await user.populate({
      path: 'skills',
      select: 'name level'
    });

    // 6) Return updated skills array
    return res.json(user.skills);
  } catch (err) {
    console.error('Error in removeSkillFromUser:', err);
    return res.status(500).json({ error: 'Could not remove skill' });
  }
};
