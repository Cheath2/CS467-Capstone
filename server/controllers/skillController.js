// server/controllers/skillController.js

const Skill = require('../models/Skill');
const User  = require('../models/User');
const Job   = require('../models/Job')
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

exports.getSkillFrequency = async (req, res) => {
  try {
    // 1. Fetch all jobs and user skills
    const jobs = await Job.find({ user: req.userId });
    const knownSkills = await Skill.find({ user: req.userId }).select('name level');

    // 2. Create frequency map
    const frequencyMap = {};
    const knownSkillNames = knownSkills.map(s => s.name.toLowerCase());

    // 3. Count skill mentions across jobs
    jobs.forEach(job => {
      (job.skills || []).forEach(skill => {
        const key = skill.trim().toLowerCase();
        if (!key) return;

        frequencyMap[key] = frequencyMap[key] || { count: 0, userKnows: false, level: null };
        frequencyMap[key].count += 1;
      });
    });

    // 4. Match with user-known skills
    for (const skill of knownSkills) {
      const name = skill.name.trim().toLowerCase();
      if (frequencyMap[name]) {
        frequencyMap[name].userKnows = true;
        frequencyMap[name].level = skill.level;
      }
    }

    const totalJobs = jobs.length;

    // 5. Format result
    const result = Object.entries(frequencyMap).map(([skill, data]) => {
      const percent = totalJobs > 0 ? Math.round((data.count / totalJobs) * 100) : 0;
      return {
        skill,
        mentionedInJobs: data.count,
        mentionedPercent: percent,
        userKnows: data.userKnows,
        comfort: data.level || 'N/A',
        summary: `'${skill}' is noted in ${percent}% of your applications.`
      };
    });

    res.json(result);
  } catch (err) {
    console.error('Skill analysis failed:', err);
    res.status(500).json({ error: 'Failed to analyze skill usage' });
  }
};


// Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create({ ...req.body, user: req.userId });
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all skills for the authenticated user
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update a skill
exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.status(200).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.status(200).json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
