const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  createContact,
  getContacts,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

router.use(verifyToken);

router.post('/', createContact);
router.get('/', getContacts);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
