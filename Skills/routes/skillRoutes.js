const express = require('express');
const router = express.Router();
const Skill = require('../models/skills');

// Create a new skill
router.post('/', async (req, res) => {
  console.log("POST /api/skills hit");
  console.log("Request Body:", req.body);

  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    console.error(" Error creating skill:", error.message);
    res.status(400).json({ error: error.message });
  }
});


// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update an existing skill
router.put('/:id', async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,     // find by ID from URL
      req.body,          // update with data from request body
      { new: true }      // return the updated document
    );
    if (!updatedSkill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(updatedSkill);
  } catch (error) {
    console.error("Error updating skill:", error.message);
    res.status(400).json({ error: error.message });
  }
});

//  Delete a skill
router.delete('/:id', async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error("Error deleting skill:", error.message);
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
