// server/routes/auth.js

const express                   = require('express');
const { body }                  = require('express-validator');
const { register, login }       = require('../controllers/authController');
const router                    = express.Router();

// Validation chains for registration
const registrationChecks = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name too long'),
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name too long'),
  body('email')
    .normalizeEmail()
    .isEmail().withMessage('Must be a valid email')
    .custom(async email => {
      const User = require('../models/User');
      if (await User.findOne({ email })) {
        throw new Error('Email already in use');
      }
    }),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .isLength({ max: 100 }).withMessage('Password too long')
];

// Validation chains for login
const loginChecks = [
  body('email')
    .normalizeEmail()
    .isEmail().withMessage('A valid email is required'),
  body('password')
    .notEmpty().withMessage('Password cannot be empty')
];

/**
 * @route   POST /api/auth/register
 * @desc    Validate + register a new user
 * @access  Public
 */
router.post(
  '/register',
  registrationChecks,
  register
);

/**
 * @route   POST /api/auth/login
 * @desc    Validate + authenticate user, return JWT
 * @access  Public
 */
router.post(
  '/login',
  loginChecks,
  login
);

module.exports = router;
