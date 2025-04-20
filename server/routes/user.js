// server/routes/user.js

const express         = require('express');
const { getCurrentUser } = require('../controllers/userController');
const router          = express.Router();

/**
 * @route   GET /api/user/me
 * @desc    Fetch the authenticated user's profile (without password) and populated skills
 * @access  Protected
 */
router.get('/me', getCurrentUser);

module.exports = router;
