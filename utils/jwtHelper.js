const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Replace with a secure secret key

// Sign a new JWT
exports.signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};

// Verify an existing JWT
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};