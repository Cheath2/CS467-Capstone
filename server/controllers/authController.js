// server/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const User   = require('../models/User');

// Environment-driven constants
const ACCESS_TOKEN_SECRET    = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRES   = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS, 10) || 7;

/**
 * Create a short-lived JWT access token
 * @param {Object} user  Mongoose user document
 * @returns {string}     Signed JWT
 */
function signAccessToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email },            // payload
    ACCESS_TOKEN_SECRET,                                // secret
    { expiresIn: ACCESS_TOKEN_EXPIRES }                 // options
  );
}

/**
 * Handle user registration
 */
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array().map(e => e.msg) });
  }

  const { firstName, lastName, email, password } = req.body;
  try {
    // Prevent duplicate emails
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);
    const user = await new User({ firstName, lastName, email, password: hash }).save();

    // Issue tokens
    const accessToken  = signAccessToken(user);
    const refreshToken = crypto.randomBytes(64).toString('hex');

    // Persist refresh token and expiry
    user.refreshToken = refreshToken;
    user.refreshTokenExpiresAt = Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24*60*60*1000;
    await user.save();

    // Set HTTP-only cookie for the refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge:   REFRESH_TOKEN_EXPIRES_DAYS * 24*60*60*1000
    });

    // Response
    res.status(201).json({
      token: accessToken,
      user: { id: user._id, firstName, lastName, email }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

/**
 * Handle user login
 */
exports.login = async (req, res) => {
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

    // Issue new tokens
    const accessToken  = signAccessToken(user);
    const refreshToken = crypto.randomBytes(64).toString('hex');

    user.refreshToken = refreshToken;
    user.refreshTokenExpiresAt = Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24*60*60*1000;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge:   REFRESH_TOKEN_EXPIRES_DAYS * 24*60*60*1000
    });

    res.json({
      token: accessToken,
      user: {
        id:        user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        skills:    user.skills
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

/**
 * Refresh access token using a valid refresh token cookie
 */
exports.refresh = async (req, res) => {
  const tokenCookie = req.cookies.refreshToken;
  if (!tokenCookie) {
    return res.status(401).json({ error: 'No refresh token' });
  }

  try {
    const user = await User.findOne({ refreshToken: tokenCookie });
    if (!user || user.refreshTokenExpiresAt < Date.now()) {
      return res.status(403).json({ error: 'Invalid or expired refresh token' });
    }

    // Rotate tokens
    const newAccess  = signAccessToken(user);
    const newRefresh = crypto.randomBytes(64).toString('hex');

    user.refreshToken = newRefresh;
    user.refreshTokenExpiresAt = Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24*60*60*1000;
    await user.save();

    res.cookie('refreshToken', newRefresh, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge:   REFRESH_TOKEN_EXPIRES_DAYS * 24*60*60*1000
    });

    res.json({ token: newAccess });
  } catch (err) {
    console.error('Refresh error:', err);
    res.status(500).json({ error: 'Could not refresh token' });
  }
};

/**
 * Log out the user (invalidate refresh token)
 */
exports.logout = async (req, res) => {
  const tokenCookie = req.cookies.refreshToken;
  if (tokenCookie) {
    await User.updateOne(
      { refreshToken: tokenCookie },
      { $unset: { refreshToken: '', refreshTokenExpiresAt: '' } }
    );
  }

  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Strict' });
  res.json({ message: 'Logged out' });
};
