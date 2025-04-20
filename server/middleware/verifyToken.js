// server/middleware/verifyToken.js
const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const [, token] = header.split(' ');
  if (!token) {
    return res.status(401).json({ error: 'Malformed token' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;      // { userId, email, iat, exp }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
