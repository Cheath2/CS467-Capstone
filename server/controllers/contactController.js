const Contact = require('../models/Contact');

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create({ ...req.body, user: req.userId });
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get all contacts for user
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update a contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
