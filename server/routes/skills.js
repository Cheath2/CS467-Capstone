// server/routes/skills.js

// Express router to define /api/skills endpoints
const express = require('express');
const router  = express.Router();

// Mongoose model for Skill documents
const Skill = require('../models/Skill');

// Controller functions to add/remove a skill on the authenticated user
const {
  addSkillToUser,
  removeSkillFromUser
} = require('../controllers/skillController');

/**
 * @route   GET /api/skills
 * @desc    List all skills in the database
 * @access  Protected (via verifyToken in index.js)
 * @note    Useful to discover valid skill _id values before linking them to a user
 */
router.get('/', async (req, res) => {
  try {
    // Fetch every Skill, selecting only the fields we care about
    const allSkills = await Skill.find().select('name level');
    return res.json(allSkills);
  } catch (err) {
    console.error('Error listing skills:', err);
    return res.status(500).json({ error: 'Could not list skills' });
  }
});

/**
 * @route   POST /api/skills/user
 * @desc    Link an existing skill to the authenticated user
 * @body    { skillId: "<Skill ObjectId>" }
 * @access  Protected (via verifyToken in index.js)
 */
router.post('/user', addSkillToUser);

/**
 * @route   DELETE /api/skills/user/:skillId
 * @desc    Unlink a skill from the authenticated user
 * @param   skillId  The ObjectId of the Skill to remove
 * @access  Protected (via verifyToken in index.js)
 */
router.delete('/user/:skillId', removeSkillFromUser);

module.exports = router;
