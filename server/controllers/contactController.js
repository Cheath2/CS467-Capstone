const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create({ ...req.body, user: req.user.id });
    res.status(201).json(contact);
  } catch (err) {
    console.error("❌ Error creating contact:", err);
    res.status(400).json({ error: err.message });
  }
};

// Get all contacts for user
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const userId = req.user.id;

    const contact = await Contact.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(contactId), user: new mongoose.Types.ObjectId(userId) },
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found or unauthorized' });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error("❌ Error updating contact:", err);
    res.status(400).json({ error: err.message });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const userId = req.user.id;

    console.log("🗑️ Attempting to delete contact ID:", contactId);
    console.log("🔐 For user ID:", userId);

    // Validate the ID format
    if (!isValidObjectId(contactId)) {
      console.warn("❗ Invalid contact ID format");
      return res.status(400).json({ error: 'Invalid contact ID format' });
    }

    const contact = await Contact.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(contactId),
      user: new mongoose.Types.ObjectId(userId)
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found or unauthorized' });
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    console.error("🔥 Error deleting contact:", err);
    res.status(500).json({ error: err.message });
  }
};
