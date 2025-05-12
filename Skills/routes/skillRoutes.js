const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const verifyToken = require('../middleware/verifyToken');

// @route   POST /api/yourskills
// @desc    Create a new skill (Protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const skill = await Skill.create({
      ...req.body,
      user: req.userId
    });
    res.status(201).json(skill);
  } catch (error) {
    console.error("Error creating skill:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// @route   GET /api/yourskills
// @desc    Get all skills for current user (Protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.userId });
    res.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/yourskills/:id
// @desc    Update a skill by ID (Protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedSkill = await Skill.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedSkill) {
      return res.status(404).json({ error: 'Skill not found or unauthorized' });
    }
    res.json(updatedSkill);
  } catch (error) {
    console.error("Error updating skill:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// @route   DELETE /api/yourskills/:id
// @desc    Delete a skill by ID (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedSkill = await Skill.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    if (!deletedSkill) {
      return res.status(404).json({ error: 'Skill not found or unauthorized' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error("Error deleting skill:", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
