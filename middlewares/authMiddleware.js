const jwtHelper = require('../utils/jwtHelper');
const User = require('../models/User');

// Middleware to check if the user is authenticated
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwtHelper.verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid user.' });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized access.' });
  }
};

// Middleware to check for specific roles (e.g., 'core' or 'club')
const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: 'Forbidden: Insufficient permissions.' });
  }
  next();
};

module.exports = { authenticate, authorize };