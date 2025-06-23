require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware to authenticate requests using JWT
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach userId to request for later use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;