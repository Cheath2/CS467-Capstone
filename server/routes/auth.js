// server/routes/auth.js
const express                   = require('express');
const { body, validationResult }= require('express-validator');
const bcrypt                    = require('bcryptjs');
const jwt                       = require('jsonwebtoken');
const User                      = require('../models/User');
const router                    = express.Router();

// Validation chains
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
      if (await User.findOne({ email })) {
        throw new Error('Email already in use');
      }
    }),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .isLength({ max: 100 }).withMessage('Password too long')
];

const loginChecks = [
  body('email')
    .normalizeEmail()
    .isEmail().withMessage('A valid email is required'),
  body('password')
    .notEmpty().withMessage('Password cannot be empty')
];

// POST /api/auth/register
router.post(
  '/register',
  registrationChecks,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array().map(e => e.msg) });
    }

    const { firstName, lastName, email, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      const user = await new User({ firstName, lastName, email, password: hash }).save();

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({
        token,
        user: { id: user._id, firstName, lastName, email }
      });
    } catch (err) {
      console.error('Registration error:', err);
      if (err.code === 11000) {
        return res.status(409).json({ error: 'Email already registered' });
      }
      res.status(500).json({ error: 'Registration failed, please try again later' });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  loginChecks,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array().map(e => e.msg) });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Login failed, please try again later' });
    }
  }
);

module.exports = router;
