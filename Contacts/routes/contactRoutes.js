const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const verifyToken = require('../middleware/verifyToken'); // Middleware to protect routes

// @route   POST /api/contacts
// @desc    Create a new contact (Protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newContact = new Contact({
      ...req.body,
      user: req.userId  // Set user based on token
    });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route   GET /api/contacts
// @desc    Get all contacts for current user (Protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.userId });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/contacts/:id
// @desc    Update a contact (Protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Contact not found or unauthorized' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Contact not found or unauthorized' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;