// server/routes/skillsRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const {
  addSkillToUser,
  removeSkillFromUser,
  getSkillFrequency,
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');

// Apply verifyToken to all routes
router.use(verifyToken);

// Frequency analytics route (MUST be before "/")
router.get('/frequency', getSkillFrequency);

// User-specific skill linking
router.post('/user', addSkillToUser);
router.delete('/user/:skillId', removeSkillFromUser);

// Skill CRUD routes
router.post('/', createSkill);
router.get('/', getSkills);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

module.exports = router;
