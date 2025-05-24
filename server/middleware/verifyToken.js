// server/middleware/verifyToken.js
const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Dual compatibility
    req.userId = decoded.userId;
    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(401).json({ msg: 'Token invalid' });
  }
};
